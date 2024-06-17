import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
// @ts-ignore
import FileSaver from 'file-saver';
import { history } from '@umijs/max';
import { refreshToken } from '@/services/ant-design-pro/api';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  message?: string;
  success: boolean;
  data: any;
  // errorCode?: number;
  // errorMessage?: string;
  // showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
let isRefreshToken = false; //是否正在刷新token

export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, code, message } = res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = {
          errorCode: code,
          errorMessage: message,
          showType: ErrorShowType.ERROR_MESSAGE,
          data,
        };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        if (opts?.skipErrorHandler) throw error;
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const resData = error.response.data;
        message.error(resData?.message || '发生错误,请稍候重试');
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      if (config.needAuth) {
        //在token存在且只有5分钟有效期时刷新token,实现简易刷新token
        const token = localStorage.getItem('access_token');
        let expiresAt = localStorage.getItem('expires_at');
        const refresh_token = localStorage.getItem('refresh_token');
        if (!isRefreshToken && token && expiresAt && refresh_token) {
          const now = new Date().getTime();
          const expires = Number(expiresAt);
          if (now > expires - 1000 * 60 * 5) {
            if (!isRefreshToken) {
              isRefreshToken = true;
              refreshToken({ refresh_token })
                .then((res) => {
                  localStorage.setItem('access_token', res.access_token);
                  localStorage.setItem('token_type', res.token_type);
                  localStorage.setItem('refresh_token', res.refresh_token);
                  const expires_at = new Date(now + res.expires_in * 1000).getTime();
                  localStorage.setItem('expires_at', expires_at + '');
                })
                .catch((error) => {
                  console.log('刷新token失败', error);
                  //删除刷新token已避免重复刷新错误
                  localStorage.removeItem('refresh_token');
                })
                .finally(() => {
                  isRefreshToken = false;
                });
            }
          }
        }
      }
      // 拦截请求配置，进行个性化处理。
      const newConfig = { ...config };
      if (config.needAuth) {
        // @ts-ignore
        newConfig.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      }
      if (config.isPageRequest) {
        const data = { ...(config.data ?? {}) };
        const q = { ...(data.query ?? {}) };
        if (data.query?.current) {
          q.pageNum = data.query?.current;
          delete q.current;
        }
        const sort = { ...(data.sort ?? {}) };
        if (Object.keys(sort).length > 0) {
          q.sortFields = [];
          for (const sortKey in sort) {
            if (sort.hasOwnProperty(sortKey)) {
              q.sortFields.push({
                sortField: sortKey,
                direction: sort[sortKey] === 'ascend' ? 'asc' : 'desc',
              });
            }
          }
        }
        newConfig.data = q;
      }
      return newConfig;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      try {
        if (response.config.responseType === 'blob') {
          if (response.status === 200) {
            // @ts-ignore
            const contentDisposition = response.headers.get('content-disposition') || '';
            // @ts-ignore
            const fileName = decodeURI(
              escape(
                contentDisposition.slice(
                  contentDisposition.search('filename=') + 'filename='.length,
                ),
              ),
            ).replaceAll('"', '');
            const f = response.data;
            return FileSaver.saveAs(f, decodeURIComponent(fileName));
          } else {
            message.error('下载文件出错');
          }
        } else {
          const res = response.data as unknown as ResponseStructure; //这里是关键，获取所有接口请求成功之后的数据
          if (res?.success) {
            const { data } = res;
            if (response.config.isPageRequest) {
              //是分页数据
              return {
                data: {
                  success: res.success,
                  total: data.total ?? 0,
                  data: data.list ?? data,
                },
              };
            } else {
              return { data };
            }
          } else {
            if (response.status === 401) {
              setTimeout(() => history.push('/user/login'), 1500);
            }
            // message.error(res.message || '发生错误,请稍候重试')
          }
          return response;
        }
      } catch (e) {
        console.log('发生错误', e);
        return message.error('发生错误,请稍候重试');
      }
    },
  ],
};
