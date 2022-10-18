import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/models/reset-password';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  // create account
  createAccout(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    return this._http.post('http://localhost:8080/auth/createAccount', user, { headers: headers });
  }

  signing(email: string, password: string) {
    let user = { email, password }
    return this._http.post('http://localhost:8080/auth/signin', user);
  }

  resetPassword(resetPass: ResetPassword) {
    return this._http.post('http://localhost:8080/auth/resetPassword', resetPass, { responseType: 'text' });
  }

}
