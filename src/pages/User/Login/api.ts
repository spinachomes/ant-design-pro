// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import md5 from 'js-md5';
import qs from 'qs';

/** 获取验证码 */
export async function getCode(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/anon/kaptcha', {
    method: 'GET',
    needAuth: false,
    ...(options || {}),
  });
}

export async function login(data: {
  username: string;
  password: string;
  code: string;
  codeId: string;
}) {
  // @ts-ignore
  data.password = md5(data.password);
  const req = {
    ...data,
    grant_type: 'password',
    client_id: 'camp-pc',
    client_secret: 'b18f0206616f9e5170ea1cda9617a550',
  };
  return request(`/oauth/token`, {
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

export async function refreshToken(data: { refresh_token: string }) {
  const req = {
    ...data,
    grant_type: 'refresh_token',
    client_id: 'camp-pc',
    client_secret: 'b18f0206616f9e5170ea1cda9617a550',
  };
  return request(`/oauth/token`, {
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
