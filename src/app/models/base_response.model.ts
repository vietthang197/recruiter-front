export interface BaseResponseModel<T> {
  status?: number,
  message?: string,
  data?: T
}
