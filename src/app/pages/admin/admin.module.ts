import {NgModule} from '@angular/core';

import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../icons-provider.module";
import {UserManagementComponent} from './user-management/user-management.component';
import {DemoNgZorroAntdModule} from "../../ng-zorro-antd.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [AdminRoutingModule, NzLayoutModule, NzMenuModule, IconsProviderModule, DemoNgZorroAntdModule, ReactiveFormsModule, CommonModule],
  declarations: [AdminComponent, UserManagementComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
