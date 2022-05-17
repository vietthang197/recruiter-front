import {BasePagingRequestModel} from "../base_paging_request";

export interface SearchUserInfoModel extends BasePagingRequestModel {
  username?:string,
  fullName?:string,
  roleName?:string,
  email?:string
}
