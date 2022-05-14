import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../icons-provider.module";
import {UserManagementComponent} from './user-management/user-management.component';
import {DemoNgZorroAntdModule} from "../../ng-zorro-antd.module";
import {ReactiveFormsModule} from "@angular/forms";
import en from "@angular/common/locales/en";
import {UserManagementService} from "./user-management/user-management.service";
import {HttpClientModule} from "@angular/common/http";

registerLocaleData(en);

@NgModule({
  imports: [AdminRoutingModule, NzLayoutModule, NzMenuModule, IconsProviderModule, HttpClientModule, DemoNgZorroAntdModule, ReactiveFormsModule, CommonModule],
  declarations: [AdminComponent, UserManagementComponent],
  exports: [AdminComponent],
  providers: [UserManagementService]
})
export class AdminModule { }
