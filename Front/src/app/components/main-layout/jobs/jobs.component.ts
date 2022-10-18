import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { JobObject } from 'src/app/models/job-object';
import { SearchForm } from 'src/app/models/search-form';
import { UserJobs } from 'src/app/models/user-jobs';
import { SharedService } from 'src/app/service/shared/shared.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { CommonWordsComponent } from '../common-words/common-words.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: JobObject[] = [];

  globalFilterdJobs: JobObject[] = [];

  jobsByPage: JobObject[] = [];

  isLoading: boolean = true;

  jobsLength: number = 0;

  searchForm: FormGroup;

  companyTypeFilter: any;

  jobTypeFilter: any;

  jobSaved: boolean = false;

  savedJobsList: UserJobs[] = [];
  receivedJobsList: UserJobs[] = [];

  constructor(
    private _fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private matDialog: MatDialog,
  ) {

    let searchForm = JSON.parse(localStorage.getItem('Search-Form') || '{}');

    this.searchForm = this._fb.group({
      what: new FormControl(''),
      where: new FormControl(''),
      description: new FormControl('')
    })

    if (searchForm != undefined) {
      this.searchForm.patchValue({ what: searchForm.jobTitle, where: searchForm.jobLocation, description: searchForm.jobDescription })
    }


    this.sharedService.shareJobs.subscribe((val) => {
      if (val) {
        this.jobs = val;
        this.pagination([]);
      } else {
        this.getJobsBySearchParams();
      }
    });

    this.sharedService.savedJobs.subscribe(
      (response) => {
        this.savedJobsList = response;
      }
    );
    this.sharedService.receivedJobs.subscribe(
      (response) => {
        this.receivedJobsList = response;
      }
    )
  }

  ngOnInit(): void {
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


  // check if job is saved by user
  isJobSaved(jobId: number) {
    if (this.savedJobsList) {
      let jSaved = this.savedJobsList.find((j: UserJobs) => (j.jobId === jobId));
      return jSaved?.savedJob || false;
    }
    return false;
  }

  isJobReceived(jobId: number) {
    if (this.receivedJobsList) {
      let jReceived = this.receivedJobsList.find((j: UserJobs) => (j.jobId === jobId));
      return jReceived?.jobReceived || false;
    }
    return false;
  }

  getJobsBySearchParams() {
    const jobTitle: string = this.searchForm.get('what')?.value;
    const jobLocation: string = this.searchForm.get('where')?.value;
    const jobDescription: string = this.searchForm.get('description')?.value;

    const searchForm = new SearchForm(jobTitle, jobLocation, jobDescription);
    localStorage.setItem('Search-Form', JSON.stringify({ jobTitle, jobLocation, jobDescription }));

    this.userService.getJobsBySearch(searchForm).subscribe(
      (jobs) => {
        this.jobs = jobs;
        this.pagination([]);
        this.sharedService.changeJobData(jobs);

        this.companyTypeFilter = null;
        this.jobTypeFilter = null;
      });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.jobs.length) {
      endIndex = this.jobs.length;
    }
    this.jobsByPage = this.jobs.slice(startIndex, endIndex);
  }



  filterJob(event: Event, filter: string) {
    let filterdJobs: JobObject[] = this.jobs;
    if (filter) {
      if (this.companyTypeFilter && this.jobTypeFilter) {
        filterdJobs = filterdJobs.filter(j => j.companyType.toLowerCase() === this.companyTypeFilter.toLowerCase());
        filterdJobs = filterdJobs.filter(j => j.jobType.toLowerCase() === this.jobTypeFilter.toLowerCase());
        this.pagination(filterdJobs);
      } else {
        switch (filter) {
          case 'typeOfCompany':
            filterdJobs = filterdJobs.filter(j => j.companyType.toLowerCase() === this.companyTypeFilter.toLowerCase());
            this.pagination(filterdJobs);
            break;

          case 'jobType':
            filterdJobs = filterdJobs.filter(j => j.jobType.toLowerCase() === this.jobTypeFilter.toLowerCase());
            this.pagination(filterdJobs);
            break;
        }
      }
    }
    this.globalFilterdJobs = filterdJobs;
  }

  resetForm(formName: string) {
    let filterdJobs: JobObject[] = this.globalFilterdJobs;
    switch (formName) {
      case 'typeOfCompany':
        filterdJobs = this.jobs.filter(j => j.companyType && j.jobType?.toLowerCase() === this.jobTypeFilter?.toLowerCase());
        this.pagination(filterdJobs);
        break;

      case 'jobType':
        filterdJobs = this.jobs.filter(j => j.jobType && j.companyType?.toLowerCase() === this.companyTypeFilter?.toLowerCase());
        this.pagination(filterdJobs);
        break;
    }
    this.globalFilterdJobs = filterdJobs;
  }


  getCommonWords() {
    this.matDialog.open(CommonWordsComponent, {
      data: {
        jobs: this.globalFilterdJobs
      }
    });
  }

}
