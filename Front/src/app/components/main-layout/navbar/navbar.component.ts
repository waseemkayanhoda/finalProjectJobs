import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private sharedService: SharedService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn()

    this.sharedService.status.subscribe((val) => {
      if (val) {
        this.isLoggedIn();
      }
    });

  }

  isLoggedIn() {
    let user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.loggedIn = true;
      this.isAdmin = user?.role === 'ADMIN' ? true : false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.loggedIn = false;
    this._router.navigate(['login']);
  }
}
