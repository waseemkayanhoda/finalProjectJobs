import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './components/main-layout/login-layout/login/login.component';
import { AboutComponent } from './components/main-layout/about/about.component';
import { ContactUsComponent } from './components/main-layout/contact-us/contact-us.component';
import { FooterComponent } from './components/main-layout/footer/footer.component';
import { HomeComponent } from './components/main-layout/home/home.component';
import { LayoutComponent } from './components/main-layout/layout/layout.component';
import { NavbarComponent } from './components/main-layout/navbar/navbar.component';
import { ProfileComponent } from './components/main-layout/user-profile/profile/profile.component';
import { SavedJobsComponent } from './components/main-layout/user-profile/saved-jobs/saved-jobs.component';
import { JobsComponent } from './components/main-layout/jobs/jobs.component';
import { JobComponent } from './components/main-layout/job/job.component';
import { RegisterComponent } from './components/main-layout/login-layout/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobsReceivedComponent } from './components/main-layout/user-profile/jobs-received/jobs-received.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacyPolicyComponent } from './components/main-layout/footer-links/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/main-layout/footer-links/terms-and-conditions/terms-and-conditions.component';
import { CookiesComponent } from './components/main-layout/footer-links/cookies/cookies.component';
import { HelpComponent } from './components/main-layout/footer-links/help/help.component';
import { ResetPasswordComponent } from './components/main-layout/login-layout/reset-password/reset-password.component';
import { UploadCvPopupDialogComponent } from './components/main-layout/upload-cv-popup-dialog/upload-cv-popup-dialog.component';
import { AdminModule } from './components/main-layout/admin/admin.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonWordsComponent } from './components/main-layout/common-words/common-words.component';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    ContactUsComponent,
    FooterComponent,
    AboutComponent,
    SavedJobsComponent,
    ProfileComponent,
    JobsComponent,
    JobComponent,
    JobsReceivedComponent,
    RegisterComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    CookiesComponent,
    HelpComponent,
    ResetPasswordComponent,
    UploadCvPopupDialogComponent,
    CommonWordsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
