export interface BasePagingResponseModel<T> {
  status?: number,
  message?: string,
  data?: {
    page?:number,
    size?:number,
    total?:number,
    data?: T[]
  }
}
