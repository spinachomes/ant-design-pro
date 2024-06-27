// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import qs from 'querystring';
import { API } from '@/services/ant-design-pro/typings';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(data: { username?: string; password?: string }) {
  const req = {
    ...data,
    grant_type: 'password',
    client_id: 'test',
    client_secret: 'test@123',
  };
  return request(`/oauth2/token`, {
    method: 'POST',
    data: qs.stringify(req),
    needAuth: false,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function refreshToken(data: { refresh_token: string }) {
  const req = {
    ...data,
    grant_type: 'refresh_token',
    client_id: 'test',
    client_secret: 'test@123',
  };
  return request(`/oauth2/token`, {
    method: 'POST',
    data: qs.stringify(req),
    needAuth: false,
    skipErrorHandler: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(data: API.RuleListItem, options?: { [key: string]: any }) {
  return request<void>('/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
      data: data,
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
