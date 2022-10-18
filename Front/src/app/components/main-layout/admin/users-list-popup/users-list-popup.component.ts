import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list-popup',
  templateUrl: './users-list-popup.component.html',
  styleUrls: ['./users-list-popup.component.css']
})
export class UsersListPopupComponent implements OnInit {

  users!: User[];

  constructor(
    private dialogRef: MatDialogRef<UsersListPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.users = data.users;
  }

  ngOnInit(): void {
  }

}
