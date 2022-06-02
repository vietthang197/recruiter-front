import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {JobsRoutingModule} from "./jobs-routing.module";
import {AdminComponent} from "./../admin.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../../icons-provider.module";
import {DemoNgZorroAntdModule} from "../../../ng-zorro-antd.module";
import {ReactiveFormsModule} from "@angular/forms";
import en from "@angular/common/locales/en";
import {HttpClientModule} from "@angular/common/http";
import {JobsManagementComponent} from './jobs-management/jobs-management.component';
import {TypeJobManagementComponent} from "./type-job-management/type-job-management.component";
import {SkillManagementComponent} from "./skill-management/skill-management.component";

registerLocaleData(en);

@NgModule({
  imports: [JobsRoutingModule, NzLayoutModule, NzMenuModule,
    IconsProviderModule, HttpClientModule, DemoNgZorroAntdModule, ReactiveFormsModule,
    CommonModule],
  declarations: [
    JobsManagementComponent,
    TypeJobManagementComponent,
    SkillManagementComponent
  ],
  exports: [],
  providers: []
})
export class JobsModule {
}
