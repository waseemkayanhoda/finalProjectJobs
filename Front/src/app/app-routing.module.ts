import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './components/main-layout/admin/admin-profile/admin-profile.component';

import { AboutComponent } from './components/main-layout/about/about.component';
import { CookiesComponent } from './components/main-layout/footer-links/cookies/cookies.component';
import { HelpComponent } from './components/main-layout/footer-links/help/help.component';
import { PrivacyPolicyComponent } from './components/main-layout/footer-links/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/main-layout/footer-links/terms-and-conditions/terms-and-conditions.component';
import { HomeComponent } from './components/main-layout/home/home.component';
import { JobsComponent } from './components/main-layout/jobs/jobs.component';
import { LoginComponent } from './components/main-layout/login-layout/login/login.component';
import { RegisterComponent } from './components/main-layout/login-layout/register/register.component';
import { ResetPasswordComponent } from './components/main-layout/login-layout/reset-password/reset-password.component';
import { ProfileComponent } from './components/main-layout/user-profile/profile/profile.component';
import { SavedJobsComponent } from './components/main-layout/user-profile/saved-jobs/saved-jobs.component';
import { UsersListComponent } from './components/main-layout/admin/users-list/users-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'help', component: HelpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'savedJobs', component: SavedJobsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jobs', component: JobsComponent },

  { path: 'admin-profile', redirectTo: 'admin-profile/users', pathMatch: 'full' },
  { path: 'admin-profile', component: AdminProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
