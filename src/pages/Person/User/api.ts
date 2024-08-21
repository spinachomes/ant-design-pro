import { request } from '@umijs/max';

export async function map(userIds: number[]) {
  const idsMap: Map<number, boolean> = new Map();
  for (let i = 0; i < userIds.length; i++) {
    const e = userIds[i];
    if (e !== undefined && e !== null) {
      idsMap.set(e, true);
    }
  }
  const ids = Object.keys(idsMap);
  if (ids.length === 0) {
    return Promise.resolve({});
  }
  return request<Record<number, string>>(`/sys/user/map`, { method: 'POST', data: ids });
}

export async function editPassword(data: {
  campUserId: number;
  oldPassword: string;
  newPassword: string;
}) {
  return request<void>(`/sys/user}/edit/password`, { method: 'POST', params: { ...data } });
}
