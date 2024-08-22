import { request } from '@umijs/max';
import { SortOrder } from 'antd/lib/table/interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function tree(query?: Record<string, any>, sort?: Record<string, SortOrder>) {
  return request<Sys.CampDept>(`/sys/dept/tree`, { method: 'GET', isPageRequest: true });
}

// export async function list(query: Record<string, any>, sort: Record<string, SortOrder>) {
//   return request<API.PageData<API.CampDept[]>>(`/sys/dept/list`, {
//     method: 'POST', data: {query, sort},
//     isProTable: true
//   });
// }
//
// export async function add(data: API.CampDept) {
//   return request<void>(`/sys/dept/add`, {method: 'POST', data: data});
// }
//
// export async function detail(id: number) {
//   return request<API.CampDept>(`/sys/dept/detail`, {method: 'GET', params: {id}});
// }
//
// export async function edit(data: API.CampDept) {
//   return request<void>(`/sys/dept/edit`, {method: 'POST', data: data});
// }
//
// export async function remove(id: number) {
//   return request<void>(`/sys/dept/delete`, {method: 'POST', params: {id}});
// }
