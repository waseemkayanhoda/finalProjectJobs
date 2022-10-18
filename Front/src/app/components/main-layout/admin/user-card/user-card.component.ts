import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin-service/admin.service';
import { UserCvListComponent } from '../user-cv-list/user-cv-list.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  user!: User;

  isCvDisabled: boolean = false;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.user.pdfDocuments) {
      this.isCvDisabled = this.user.pdfDocuments?.length > 0 ? false : true;
    }
  }

  deleteUser() {
    if (this.user.id) {
      this.adminService.deleteUser(this.user.id).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['']).then(() => {
              this.router.navigateByUrl('admin-profile/users');
            });
          } else {
            alert('Something went wrong!');
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }



  openCVList() {
    let userPdfDocs = this.user.pdfDocuments;
    this.dialog.open(UserCvListComponent, {
      data: {
        userFullName: this.user.firstName + ' ' + this.user.lastName,
        userPdfDocs: userPdfDocs
      }
    });
  }

}
