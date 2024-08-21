import { request } from '@umijs/max';
import type { SortOrder } from 'antd/lib/table/interface';
import { API } from '@/services/ant-design-pro/typings';

export async function list(query: Record<string, any>, sort: Record<string, SortOrder>) {
  return request<API.PageData<Sys.CampMenu[]>>(`/sys/menu/list`, {
    method: 'POST',
    data: { query, sort },
    isPageRequest: true,
  });
}

export async function add(data: Sys.CampMenu) {
  return request<void>(`/sys/menu/add`, { method: 'POST', data: data });
}

export async function detail(params?: Record<string, any>) {
  return request<Sys.CampMenu>(`/sys/menu/detail`, { method: 'GET', params: params });
}

export async function edit(data: Sys.CampMenu) {
  return request<void>(`/sys/menu/edit`, { method: 'POST', data: data });
}

export async function remove(id: number) {
  return request<void>(`/sys/menu/delete`, { method: 'POST', params: { id } });
}
