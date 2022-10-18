import { Component, Input, OnInit } from '@angular/core';
import { JobObject } from 'src/app/models/job-object';
import { UserJobs } from 'src/app/models/user-jobs';

@Component({
  selector: 'app-jobs-received',
  templateUrl: './jobs-received.component.html',
  styleUrls: ['./jobs-received.component.css']
})
export class JobsReceivedComponent implements OnInit {

  @Input()
  jobsObjects: JobObject[] = [];

  @Input()
  userJobs: UserJobs[] = [];

  receviedJobs: UserJobs[] = [];

  constructor() { }

  ngOnInit(): void {
    this.userJobs.forEach(j => {
      if (j.jobReceived) {
        this.receviedJobs.push(j);
      }
    })
  }

  isSaved(job: JobObject) {
    let jSaved: UserJobs = this.userJobs.find((j: UserJobs) => (j.jobId === job.id)) || new UserJobs();
    return jSaved.savedJob || false;
  }

  isJobReceived(job: JobObject) {
    let jReceived: UserJobs = this.userJobs.find((j: UserJobs) => (j.jobId === job.id)) || new UserJobs();
    return jReceived?.jobReceived;
  }

}
