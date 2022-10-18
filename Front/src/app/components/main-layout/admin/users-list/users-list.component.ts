import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin-service/admin.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];

  constructor(
    private adminService: AdminService,

  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.userList = users;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
