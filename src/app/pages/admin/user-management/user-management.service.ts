import {Injectable} from "@angular/core";
import {UserInfoModel} from "../../../models/user_info.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../../constants/GlobalConstants";
import {RoleModel} from "../../../models/role.model";
import {BaseResponseModel} from "../../../models/base_response.model";

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {

  private readonly API_USER_INFO_NAME = 'user-info';
  private readonly API_ROLE_NAME = 'roles';

  constructor(private http: HttpClient) {
  }

  getAllUserInfo(): Observable<UserInfoModel[]> {
    return this.http
      .post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/search", {page: 0, size: 10})
      .pipe(
        map((response: any) => {
          return response.data.data;
        })
      );
  }

  getAllRole(): Observable<RoleModel[]> {
    return this.http.get(GlobalConstants.API_ENDPOINT + this.API_ROLE_NAME + "/all").pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  adminCreateUser(value: any): Observable<BaseResponseModel> {
    return this.http.post(GlobalConstants.API_ENDPOINT + this.API_USER_INFO_NAME + "/create", value).pipe(
      map((response:BaseResponseModel) => {
        return response;
      })
    )
  }
}
