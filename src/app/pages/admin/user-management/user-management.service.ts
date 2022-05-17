import {Injectable} from "@angular/core";
import {UserInfoModel} from "../../../models/user_info.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../../constants/GlobalConstants";
import {RoleModel} from "../../../models/role.model";
import {BaseResponseModel} from "../../../models/base_response.model";
import {SearchUserInfoModel} from "../../../models/search/search_userinfo_model";
import {BasePagingResponseModel} from "../../../models/base_paging_response_model";

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {

  private readonly API_USER_INFO_NAME = 'user-info';
  private readonly API_ROLE_NAME = 'roles';

  constructor(private http: HttpClient) {
  }

  getAllUserInfo(query: SearchUserInfoModel): Observable<BasePagingResponseModel<UserInfoModel>> {
    return this.http
      .post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/search", query)
      .pipe(
        map((response:BasePagingResponseModel<UserInfoModel>) => {
          return response;
        })
      )
  }

  getAllRole(): Observable<RoleModel[]> {
    return this.http.get(GlobalConstants.API_ENDPOINT + this.API_ROLE_NAME + "/all").pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  adminCreateUser(value: any): Observable<BaseResponseModel<UserInfoModel>> {
    return this.http.post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/create", value).pipe(
      map((response:BaseResponseModel<UserInfoModel>) => {
        return response;
      })
    )
  }

  adminDeleteUser(value: any): Observable<BaseResponseModel<Object>> {
    return this.http.post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/delete", value).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  adminEditUser(value:any): Observable<BaseResponseModel<Object>> {
    return this.http.post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/update", value).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
