import { request } from '@umijs/max';
import type { SortOrder } from 'antd/lib/table/interface';
import { API } from '@/services/ant-design-pro/typings';

export async function list(query: Record<string, any>, sort: Record<string, SortOrder>) {
  return request<API.PageData<Sys.CampRole>>(`/sys/role/list`, {
    method: 'POST',
    data: { query, sort },
    isPageRequest: true,
  });
}

export async function add(data: Sys.CampRole) {
  return request<void>(`/sys/role/add`, { method: 'POST', data: data });
}

export async function detail(params?: Record<string, any>) {
  return request<Sys.CampRole>(`/sys/role/detail`, { method: 'GET', params: params });
}

export async function edit(data: Sys.CampRole) {
  return request<void>(`/sys/role/edit`, { method: 'POST', data: data });
}

export async function remove(id?: number) {
  return request<void>(`/sys/role/delete`, { method: 'POST', params: { id } });
}

export async function options() {
  return request<API.Option<number>[]>(`/sys/role/options`, { method: 'GET' });
}
