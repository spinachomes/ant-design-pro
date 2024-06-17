import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
// let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';
//
// const getAccess = () => {
//   return access;
// };

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
    //   return;
    // }
    res.send({
      success: true,
      data: {
        name: '管理员',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: 'admin',
        email: 'admin@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: 'admin',
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    // access = '';
    res.send({ data: {}, success: true });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
  'POST /api/oauth2/token': async (req: Request, res: Response) => {
    await waitTime(500);
    res.status(200).send({
      access_token:
        'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTM5ODUxODIyNiIsImlzcyI6Imh0dHA6Ly9zdWJtYXJpbmUucndvY2oudG9wL3N1Ym1hcmluZSIsInVzZXJJZCI6MzQxMDAwODE0ODQ4NjksInd4X29wZW5faWQiOiJvdmpNSjZSbGlnZTdGWjFCaEFzaHlCbXlPRjUwIiwiaXNfYWRtaW4iOnRydWUsImF1ZCI6InN1Ym1hcmluZSIsIm5iZiI6MTcxODYwNTc4NSwidXNlcl90eXBlIjoxLCJwaG9uZSI6IjE1Mzk4NTE4MjI2Iiwic2NvcGUiOlsicGMiXSwibmFtZSI6Iuadjua4heazoiIsImV4cCI6MTcxODYxMjk4NSwiaWF0IjoxNzE4NjA1Nzg1LCJqdGkiOiJiZDVjNmU1OC0zNGMxLTQ4MDItYTk0Zi03OThiYzM3MDAyZDYifQ.XT2Pzz9rNXl0AV5SXIieAr6Je0mWxqubg_KMFqacFKO_fUEhUetviwRBsX-Otuw75kqbLGkkzYzecCMHLFdXQXZM7TIfr7WPTBZryi5TKJ3sRbEwKl4I-Fl5OUQmhZJMizTphmKcq-sb-P9VvE5hFpAB-Z7WOOeN1BMBqLDv2tT_ymz2-gOqFt379gF_-ZJETRQJCUBk_kvDqnKAKLQ6lcd4KSpdx969patDucwIfNBurOYWeIlidB-o_JT1rnB9zeye4hPc8XVac4AxLjh7Vi4997E1XyNpeZ__6uKjgyrMBcKauayQ5-kIUW1Z0cKYOltJwJEkFAY3_SBt4G2BnQ',
      refresh_token:
        'OVpw1asqf5lQxNCV48RORKdF-Cvupb4t8VE6XA0MZskaDfW5q_Ha1vrdLQBPu1g5uiWl5h4Z-1l6M-LWKGlw0EGi7YHyj2pkL-ne4nfQhGNam4yZSe_6eIbhmnYa3DSP',
      scope: 'pc',
      token_type: 'Bearer',
      expires_in: 7199,
    });
  },
};
