import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public status: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public shareJobs: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public savedJobs: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public receivedJobs: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }

  changeData(value: any) {
    this.status.next(value);
  }

  changeJobData(value: any) {
    this.shareJobs.next(value);
  }

  savedJobsData(value: any) {
    this.savedJobs.next(value);
  }

  receivedJobsData(value: any) {
    this.receivedJobs.next(value);
  }

}
