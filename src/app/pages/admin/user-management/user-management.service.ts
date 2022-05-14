import {Injectable} from "@angular/core";
import {DefaultDataService} from "@ngrx/data";
import {UserInfoModel} from "../../../models/user_info.model";

@Injectable()
export class UserManagementService extends DefaultDataService<UserInfoModel> {

}
