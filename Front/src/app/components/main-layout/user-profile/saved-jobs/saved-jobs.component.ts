import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { JobObject } from 'src/app/models/job-object';
import { UserJobs } from 'src/app/models/user-jobs';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  @Input()
  jobsObjects: JobObject[] = [];

  @Input()
  userJobs: UserJobs[] = [];

  savedJobs: UserJobs[] = [];

  constructor() { }

  ngOnInit(): void {
    this.userJobs?.forEach(j => {
      if(j.savedJob) {
        this.savedJobs.push(j);
      }
    });
  }

  isSaved(job: JobObject) {
    let jSaved = this.userJobs.find((j: UserJobs) => (j.jobId === job.id));
    return jSaved?.savedJob;
  }

  isJobReceived(job: JobObject) {
    let jReceived = this.userJobs.find((j: UserJobs) => (j.jobId === job.id));
    return jReceived?.jobReceived || false;
  }

}
