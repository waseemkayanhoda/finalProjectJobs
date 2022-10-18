import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/models/reset-password';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordForm: FormGroup;
  emailError: { status: boolean, msg: string } = { status: false, msg: 'Email is invalid!' };
  passwordError: { status: boolean, msg: string } = { status: false, msg: 'Old password is not correct!' };
  passwordResetSuccessMsg: { status: boolean, msg: string } = { status: false, msg: 'Password changed successfully' }
  isPasswordMatch: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.resetPasswordForm = this._fb.group({
      email: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }


  checkPasswordMatch() {
    let newPass = this.resetPasswordForm.get('newPassword')?.value;
    let confirmNewPass = this.resetPasswordForm.get('confirmNewPassword')?.value;

    if (newPass !== '' && confirmNewPass === '') {
      this.passwordError.status = false
      this.isPasswordMatch = false;
    } else if (newPass !== confirmNewPass) {
      this.passwordError.status = true;
      this.passwordError.msg = 'Password not match!';
      this.isPasswordMatch = false;
    } else {
      this.passwordError.status = false;
      this.passwordError.msg = '';
      this.isPasswordMatch = true;
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      let resetPass = new ResetPassword(
        this.resetPasswordForm.get('email')?.value,
        this.resetPasswordForm.get('oldPassword')?.value,
        this.resetPasswordForm.get('newPassword')?.value,
      );

      this.authService.resetPassword(resetPass).subscribe({
        next: (response) => {
          this.passwordResetSuccessMsg.status = true;
        },
        error: (error) => {
          console.log(JSON.parse(error.error))
          this.passwordError.status = true;
          this.passwordError.msg = JSON.parse(error.error).message;
        },
        complete: () => {
          console.log('complete...')
        }
      });
    }
  }

}
