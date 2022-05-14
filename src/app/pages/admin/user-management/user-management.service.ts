import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {UserInfoModel} from "../../../models/user_info.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../../constants/GlobalConstants";

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {

  private readonly API_NAME = 'user-info';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<UserInfoModel[]> {
    return this.http
      .post(GlobalConstants.API_ENDPOINT + this.API_NAME + "/search", {page: 0, size: 10})
      .pipe(
        map((data: any) => {
          return data.data.data;
        })
      );
  }

}
