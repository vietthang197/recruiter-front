import {Injectable} from "@angular/core";

@Injectable()
export class GlobalConstants {
  public static readonly API_ENDPOINT: string = ' https://api.kttk.xyz/api/v1/';
  public static readonly API_MOCK_ENDPOINT: string = 'http://localhost:9999/api/v1/';
}
