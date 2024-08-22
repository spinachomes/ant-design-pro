import { request } from '@umijs/max';
import type { SortOrder } from 'antd/lib/table/interface';
import { API } from '@/services/ant-design-pro/typings';

export async function list(query: Record<string, any>, sort: Record<string, SortOrder>) {
  return request<API.PageData<Sys.CampDictType[]>>(`/sys/dict/list`, {
    method: 'POST',
    data: { query, sort },
    isPageRequest: true,
  });
}

export async function add(data: Sys.CampDictType) {
  return request<any>(`/sys/dict/add`, { method: 'POST', data: data });
}

export async function detail(params?: Record<string, any>) {
  return request<Sys.CampDictType>(`/sys/dict/detail`, { method: 'GET', params: params });
}

export async function edit(data: Sys.CampDictType) {
  return request<any>(`/sys/dict/edit`, { method: 'POST', data: data });
}

export async function remove(id: number) {
  return request<void>(`/sys/dict/delete`, { method: 'POST', params: { id } });
}

export async function options() {
  return request<API.Option<number>[]>(`/sys/dict/options`, { method: 'GET' });
}

export async function listDictData(query: Sys.CampDictDataQuery, sort: Record<string, SortOrder>) {
  return request<API.PageData<Sys.CampDictType[]>>(`/sys/dict/data/list`, {
    method: 'POST',
    data: { query, sort },
    isPageRequest: true,
  });
}

export async function addDictData(data: Sys.CampDictData) {
  return request<any>(`/sys/dict/data/add`, { method: 'POST', data: data });
}

export async function editDictData(data: Sys.CampDictData) {
  return request<any>(`/sys/dict/data/edit`, { method: 'POST', data: data });
}

export async function removeDictData(id: number) {
  return request<void>(`/sys/dict/data/delete`, { method: 'POST', params: { id } });
}

export async function dictOptions(dictTypes: string[]) {
  if (dictTypes?.length <= 0) {
    console.error('字典表查询，对象为空');
    return {} as API.OptionMap;
  }
  return request<API.OptionMap>(`/sys/dict/data/options`, { method: 'POST', data: [...dictTypes] });
}
