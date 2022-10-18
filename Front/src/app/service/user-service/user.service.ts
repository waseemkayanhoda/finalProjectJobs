import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobObject } from 'src/app/models/job-object';
import { SearchForm } from 'src/app/models/search-form';
import { User } from '../../models/user';
import { ResetPassword } from './../../models/reset-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUser(userId: number) {
    return this._http.get('http://localhost:8080/user/getUser/' + userId);
  }

  getJobsBySearch(searchForm: SearchForm): Observable<JobObject[]> {
    return this._http.post<JobObject[]>('http://localhost:8080/user/getJobsBySearch', searchForm);
  }

  saveJob(user: User, jobId: number) {
    return this._http.put('http://localhost:8080/user/saveJob/' + jobId, user);
  }

  getUserJobs(userId: number): Observable<any> {
    return this._http.get('http://localhost:8080/user/getUserJobs/' + userId);
  }

  uploadAndSendCV(userId: number, jobId: number, cvId: number | undefined, cvFile: File) {
    if (cvId) {
      return this._http.put('http://localhost:8080/user/updateUserJobCV/' + userId + '/' + jobId, cvId);
    } else {
      const formData: FormData = new FormData();
      formData.append('file', cvFile);
      return this._http.post('http://localhost:8080/user/uploadAndSendCV/' + userId + '/' + jobId, formData, {
        reportProgress: true,
        responseType: 'json'
      });
    }
  }

  uploadCV(userId: number, cvFile: File) {
    const formData: FormData = new FormData();
    formData.append('file', cvFile);
    return this._http.post('http://localhost:8080/user/uploadCV/' + userId, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  openCV(cvId: number): Observable<any> {
    return this._http.get('http://localhost:8080/user/getCV/' + cvId, { responseType: 'blob', observe: 'response' });
  }

  getCV(): Observable<any> {
    return this._http.get('http://localhost:8080/user/getCV', { responseType: 'blob', observe: 'response' });
  }

  deleteCV(userId: number, cvId: number): Observable<any> {
    return this._http.delete('http://localhost:8080/user/deleteCV/' + userId + '/' + cvId);
  }

  contactUs(contactInfo: Object) {
    return this._http.post('http://localhost:8080/user/contact/', contactInfo)
  }

  getCommonWords() {
    return this._http.get('http://localhost:8080/user/getCommonWords');
  }
}
