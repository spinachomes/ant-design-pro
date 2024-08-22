import { request } from '@umijs/max';
import type { SortOrder } from 'antd/lib/table/interface';
import { API } from '@/services/ant-design-pro/typings';

export async function list(query: Record<string, any>, sort: Record<string, SortOrder>) {
  return request<API.PageData<Sys.CampRole[]>>(`/sys/log/operation/list`, {
    method: 'POST',
    data: { query, sort },
    isPageRequest: true,
  });
}

export async function detail(params?: Record<string, any>) {
  return request<Sys.CampRole>(`/sys/log/operation/detail`, { method: 'GET', params: params });
}
