import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfDocument } from 'src/app/models/pdf-document';
import { AdminService } from 'src/app/service/admin-service/admin.service';

@Component({
  selector: 'app-user-cv-list',
  templateUrl: './user-cv-list.component.html',
  styleUrls: ['./user-cv-list.component.css']
})
export class UserCvListComponent implements OnInit {

  fullname!: string;
  pdfDocsList!: PdfDocument[];

  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UserCvListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fullname = data.userFullName;
    this.pdfDocsList = data.userPdfDocs;
  }

  ngOnInit(): void {
  }

  openCV(cvId: number | undefined) {
    if (cvId != undefined) {
      this.adminService.openCV(cvId).subscribe({
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



}
