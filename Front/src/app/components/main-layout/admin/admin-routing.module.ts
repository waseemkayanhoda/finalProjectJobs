import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {
    path: 'admin-profile', component: AdminProfileComponent, children: [
      { path: 'users', component: UsersListComponent },
      { path: 'jobs', component: JobsListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
