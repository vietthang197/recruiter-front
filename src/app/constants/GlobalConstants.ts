import {Injectable} from "@angular/core";

@Injectable()
export class GlobalConstants {
  public static IS_PROD: boolean = true;
  public static readonly API_ENDPOINT: string = GlobalConstants.IS_PROD ? ' https://api.kttk.xyz/api/v1/' : 'http://localhost:9999/api/v1/';
}
