import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobObject } from 'src/app/models/job-object';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>('http://localhost:8080/admin/getAllUsers');
  }

  deleteUser(userId: number) {
    return this._http.delete('http://localhost:8080/admin/deleteUser/' + userId);
  }

  openCV(cvId: number): Observable<any> {
    return this._http.get('http://localhost:8080/user/getCV/' + cvId, { responseType: 'blob', observe: 'response' });
  }

  getAllJobs() {
    return this._http.get<JobObject[]>('http://localhost:8080/admin/getAllJobs');
  }

  getUsersSentCvToJob(jobId: number) {
    return this._http.get<User[]>('http://localhost:8080/admin/getUsersSentCvToJob/' + jobId);
  }
}
