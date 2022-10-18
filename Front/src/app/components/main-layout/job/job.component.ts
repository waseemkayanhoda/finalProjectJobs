import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobObject } from 'src/app/models/job-object';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/service/shared/shared.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { UploadCvPopupDialogComponent } from '../upload-cv-popup-dialog/upload-cv-popup-dialog.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  @Input()
  job: JobObject | undefined;

  @Input()
  saved: boolean = false;

  @Input()
  isJobReceived: boolean = false;

  hover: boolean = false;

  isUser: boolean = true;

  constructor(
    private _router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.isUser = user.role === 'USER' ? true : false;
    }
  }

  saveJob() {
    let isLogged = localStorage.getItem('isLoggedIn');
    if (isLogged == 'true') {
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.id) {
        if (this.job?.id) {
          this.userService.saveJob(user.id, this.job?.id).subscribe({
            next: (response) => {
              localStorage.setItem('user', JSON.stringify(response));
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              this.saved = !this.saved;
            }
          });
        }
      }
    } else {
      this._router.navigate(['login']);
    }
  }

  sendCV() {
    let user: User = JSON.parse(localStorage.getItem('user') || '{}');
    let userPdfDocs = user.pdfDocuments;
    this.dialog.open(UploadCvPopupDialogComponent, {
      data: { title: 'SendCV', jobId: this.job?.id, userPdfDocs: userPdfDocs }
    }).afterClosed().subscribe(
      (response) => {
        if (response) {
          this.isJobReceived = true;
        }
      }
    );
  }

}



