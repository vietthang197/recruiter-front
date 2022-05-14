import {RoleModel} from "./role.model";

export interface UserInfoModel {
  id: number,
  username: string,
  fullName: string,
  email: string,
  phone: string,
  roles: RoleModel[]

}
