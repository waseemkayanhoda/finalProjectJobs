import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonWord } from 'src/app/models/common-word';
import { JobObject } from 'src/app/models/job-object';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-common-words',
  templateUrl: './common-words.component.html',
  styleUrls: ['./common-words.component.css']
})
export class CommonWordsComponent implements OnInit {

  jobs!: JobObject[];
  commonWords: CommonWord[] = [];

  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<CommonWordsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jobs = data.jobs;
  }

  ngOnInit(): void {
    this.userService.getCommonWords().subscribe({
      next: (response) => {
        Object.entries(response).forEach(([key, value]) => {
          this.commonWords.push(new CommonWord(key, value));
        });
      },
      error: (err) => {

      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

}
