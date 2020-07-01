import request from '@/utils/request'

const requestUrl = '/banners'

// list接口
export const FetchList = (params) => request.get(`${requestUrl}`, { params })

// 添加
export const Add = (params) => request.post(`${requestUrl}`, params)

// 修改
export const Update = (id, params) => request.put(`${requestUrl}/${id}`, params)

// 删除
export const Del = (id, params) => request.delete(`${requestUrl}/${id}`, params)
