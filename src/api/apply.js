import request from '@/utils/request'

// const requestUrl = '/banners'

// 融资
export const FetchFinances = (params) => request.get(`/apply_finances`, { params })

// 入驻
export const FetchSettleds = (params) => request.get(`/apply_settleds`, { params })

// 参观
export const FetchVisits = (params) => request.get(`/apply_visits`, { params })
