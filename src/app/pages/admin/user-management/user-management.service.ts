import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {UserInfoModel} from "../../../models/user_info.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../../constants/GlobalConstants";

@Injectable()
export class UserManagementService extends DefaultDataService<UserInfoModel> {

  private readonly API_NAME = 'user-info';

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('userInfoModel', http, httpUrlGenerator);
  }

  override getAll(): Observable<UserInfoModel[]> {
    return this.http
      .get(GlobalConstants.API_MOCK_ENDPOINT + this.API_NAME + "/search")
      .pipe(
        map((data: any) => {
          const userInfoModel: UserInfoModel[] = [];
          for (let key in data) {
            userInfoModel.push({...data[key], id: key});
          }
          return userInfoModel;
        })
      );
  }

}
