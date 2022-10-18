import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfDocument } from 'src/app/models/pdf-document';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-upload-cv-popup-dialog',
  templateUrl: './upload-cv-popup-dialog.component.html',
  styleUrls: ['./upload-cv-popup-dialog.component.css']
})
export class UploadCvPopupDialogComponent implements OnInit {

  title!: string;
  btnValue!: string;

  isSend: boolean = false;
  isSelected: boolean = false;

  userId!: number;
  jobId!: number;

  selectedFile!: File;
  selectedCVid: number | undefined;

  msg: string = '';
  displayMsg: boolean = false;

  fileError: { status: boolean, msg: string } = { status: false, msg: 'The field file exceeds its maximum permitted size of 1MB' };

  userPdfDocs!: PdfDocument[];

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UploadCvPopupDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jobId = data.jobId;
    this.isSend = false;
    switch (data.title) {
      case 'AddNewCV':
        this.title = 'Add New CV';
        this.btnValue = 'Upload';
        break;
      case 'SendCV':
        this.title = 'Send CV';
        this.btnValue = 'Send';
        this.isSend = true;
        if (data.userPdfDocs) {
          this.userPdfDocs = data.userPdfDocs;
        }
        break;
    }
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.id) {
      this.userId = user?.id;
    }
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size >= 1048576) {
      this.fileError.status = true;
    } else {
      this.fileError.status = false;
      this.isSelected = true;
    }
  }

  selectCV(event: Event) {
    this.isSelected = true;
    this.selectedCVid = Number((<HTMLInputElement>event.target).value);
  }

  resetForm() {
    this.isSelected = false;
    this.selectedCVid = undefined;
  }

  cvOption() {
    switch (this.data.title) {
      case 'AddNewCV':
        this.uploadCV();
        break;
      case 'SendCV':
        this.sendCV();
        break;
    }
  }

  uploadCV() {
    this.userService.uploadCV(this.userId, this.selectedFile).subscribe({
      next: (response) => {
        if (response) {
          this.msg = "Resume was successfully received";
        } else {
          this.msg = "Somthing went wrong check the file!"
        }
        this.displayMsg = true;
      },
      error: (error) => {
        console.log(error);
        this.msg = "Somthing went wrong check the file!"
        this.displayMsg = true;
      },
      complete: () => {
        this.closePopup();
      }
    });
  }

  sendCV() {
    this.userService.uploadAndSendCV(this.userId, this.jobId, this.selectedCVid, this.selectedFile).subscribe({
      next: (response) => {
        if (response) {
          this.msg = "Resume was successfully received";
        } else {
          this.msg = "Somthing went wrong check the file!"
        }
        this.displayMsg = true;
      },
      error: (error) => {
        console.log(error);
        this.msg = "Somthing went wrong check the file!"
        this.displayMsg = true;
      },
      complete: () => {
        this.closePopup();
      }
    });

  }

  closePopup() {
    this.dialogRef.close(true);
  }

}
