import {NgModule} from '@angular/core';

import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../icons-provider.module";
import {UserManagementComponent} from './user-management/user-management.component';

@NgModule({
  imports: [AdminRoutingModule, NzLayoutModule, NzMenuModule, IconsProviderModule],
  declarations: [AdminComponent, UserManagementComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
