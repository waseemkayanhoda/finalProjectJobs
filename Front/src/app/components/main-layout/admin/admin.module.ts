import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserCvListComponent } from './user-cv-list/user-cv-list.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersListPopupComponent } from './users-list-popup/users-list-popup.component';

@NgModule({
  declarations: [
    AdminProfileComponent,
    UsersListComponent,
    UserCardComponent,
    UserCvListComponent,
    JobsListComponent,
    UsersListPopupComponent,
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AdminProfileComponent]
})
export class AdminModule { }
