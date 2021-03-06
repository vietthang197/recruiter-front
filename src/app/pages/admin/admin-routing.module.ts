import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent , children: [
      {
        path: 'user-management', component: UserManagementComponent
      },
      { path: 'jobs', loadChildren: () => import('./job-management/jobs.module').then(m => m.JobsModule) }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
