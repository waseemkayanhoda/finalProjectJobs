import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobObject } from 'src/app/models/job-object';
import { User } from 'src/app/models/user';
import { UserJobs } from 'src/app/models/user-jobs';
import { UserService } from 'src/app/service/user-service/user.service';
import { UploadCvPopupDialogComponent } from '../../upload-cv-popup-dialog/upload-cv-popup-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  @Output()
  jobsObjects!: JobObject[];

  constructor(
    private _router: Router,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    try {
      let user = JSON.parse(localStorage.getItem('user') || '{}');

      if (user.email) {
        this.user = user;
        this.getSavedJobs();
        this._router.navigate(['profile']);
      } else {
        this._router.navigate(['login']);
      }
    } catch (error) {
      console.error(error)
    }
  }

  getSavedJobs() {
    if (this.user?.id) {
      this.userService.getUserJobs(this.user?.id).subscribe({
        next: (response) => {
          this.jobsObjects = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {

        }
      });
    }
  }

  userJobs() {
    return this.user?.userJobs || [];
  }

  uploadCV() {
    this.dialog.open(UploadCvPopupDialogComponent, {
      data: { title: 'AddNewCV' }
    }).afterClosed().subscribe(
      (response) => {
        if (response) {

        }
      }
    );
  }

  openCV(cvId: number | undefined) {
    if (cvId != undefined) {
      this.userService.openCV(cvId).subscribe({
        next: (response) => {
          let newVariable: any = window.navigator;
          var newBlob = new Blob([response.body], { type: "application/pdf" });
          if (newVariable && newVariable.msSaveOrOpenBlob) {
            newVariable.msSaveOrOpenBlob(newBlob);
            return;
          }

          const data = window.URL.createObjectURL(newBlob);
          const link = document.createElement('a');
          link.href = data;
          link.target = '_blank';
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

          setTimeout(() => {
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  deleteCV(cvId: number | undefined) {
    if (cvId != undefined && this.user.id != undefined) {
      this.userService.deleteCV(this.user.id, cvId).subscribe({
        next: (response) => {
          if (response) {
            this._router.navigate(['']).then(() => {
              this._router.navigateByUrl('profile');
            });
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  getCV() {
    this.userService.getCV().subscribe({
      next: (response) => {
        let newVariable: any = window.navigator;
        var newBlob = new Blob([response.body], { type: "application/pdf" });
        if (newVariable && newVariable.msSaveOrOpenBlob) {
          newVariable.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.target = '_blank';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
