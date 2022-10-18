import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountForm: FormGroup;

  successMsg: boolean = false;
  failed: boolean = false;
  clicked = false;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private _router: Router,
  ) {
    this.accountForm = this._fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  createAccount() {
    this.clicked = true;
    let user = new User(0,
      this.accountForm.get('firstName')?.value,
      this.accountForm.get('lastName')?.value,
      this.accountForm.get('address')?.value,
      this.accountForm.get('email')?.value,
      this.accountForm.get('password')?.value
    );

    if (user.firstName && user.lastName && user.email && user.address && user.password) {
      this.authService.createAccout(user).subscribe({
        next: (response) => {
          if (response) {
            this.successMsg = true;
            delay(1000);
          }
        },
        error: (error) => {
          console.error(error);
          this.failed = true;
          this.clicked = false;
        },
        complete: () => {
          this.successMsg = true;
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 2000);
        }
      });
    }
  }

}
