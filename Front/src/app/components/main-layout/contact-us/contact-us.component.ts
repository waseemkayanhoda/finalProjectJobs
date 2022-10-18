import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup

  msg: string = '';
  isMsg: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
  ) {
    this.contactForm = this._fb.group({
      fullName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  send() {
    let contactInfo: Object;
    contactInfo = {
      fullName: this.contactForm.get('fullName')?.value,
      email: this.contactForm.get('email')?.value,
      phoneNumber: this.contactForm.get('phoneNumber')?.value,
    }
    this.userService.contactUs(contactInfo).subscribe({
      next: (response) => {
        if (response) {
          this.msg = "Thanks for contacting us. We'll get back to you as soon as possible.";
          this.isMsg = true;
        }
      },
      error: (e) => {
        this.msg = "Something went wrong!";
        this.isMsg = true;
      }
    })
  }

}
