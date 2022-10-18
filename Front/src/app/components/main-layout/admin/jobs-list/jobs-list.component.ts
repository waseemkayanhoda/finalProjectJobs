import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { JobObject } from 'src/app/models/job-object';
import { AdminService } from 'src/app/service/admin-service/admin.service';
import { UsersListPopupComponent } from '../users-list-popup/users-list-popup.component';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs: JobObject[] = [];
  jobsLength: number = 0;
  jobsByPage: JobObject[] = [];
  isLoading: boolean = true;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.adminService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.pagination(this.jobs);
      }
    })
  }

  // Paginator
  pagination(filteredJobs: JobObject[]) {
    if (filteredJobs.length > 0) {
      this.jobsLength = filteredJobs.length;
      this.jobsByPage = filteredJobs.slice(0, 10);
    } else {
      this.jobsLength = this.jobs.length;
      this.jobsByPage = this.jobs.slice(0, 10);
    }
    this.isLoading = false;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.jobs.length) {
      endIndex = this.jobs.length;
    }
    this.jobsByPage = this.jobs.slice(startIndex, endIndex);
  }

  userSentCv(jobId: number) {
    this.adminService.getUsersSentCvToJob(jobId).subscribe({
      next: (response) => {
        if (response) {
          this.dialog.open(UsersListPopupComponent, {
            data: {
              users: response
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
