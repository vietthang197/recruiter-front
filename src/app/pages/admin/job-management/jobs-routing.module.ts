import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobsManagementComponent} from "./jobs-management/jobs-management.component";
import {SkillManagementComponent} from "./skill-management/skill-management.component";
import {TypeJobManagementComponent} from "./type-job-management/type-job-management.component";

const routes: Routes = [
  {
    path: '', component: JobsManagementComponent , children: [
      {
        path: 'skill-management', component: SkillManagementComponent
      },
      {
        path: 'type-job-management', component: TypeJobManagementComponent
      }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
