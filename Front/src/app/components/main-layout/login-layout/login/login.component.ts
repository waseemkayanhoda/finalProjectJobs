import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMsg: boolean = false

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private _router: Router,
    private sharedService: SharedService,
  ) {
    this.signinForm = this._fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    try {
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email) {
        this._router.navigate(['']);
      } else {
        this._router.navigate(['login']);
      }
    } catch (error) {
      console.error(error)
    }
  }

  signin() {
    let email = this.signinForm.get('email')?.value;
    let password = this.signinForm.get('password')?.value;
    if (email && password) {
      this.authService.signing(email, password).subscribe({
        next: (user) => {
          // save user credentials in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', "true");
        },
        error: () => {
          this.errorMsg = true;
        },
        complete: () => {
          this._router.navigate(['']);
          this.sharedService.changeData(true);
        }
      });
    }
  }
}
