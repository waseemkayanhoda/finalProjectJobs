import { Component, OnInit } from '@angular/core';
import { UserJobs } from 'src/app/models/user-jobs';
import { SharedService } from 'src/app/service/shared/shared.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    // get user from localStorage if loggedIn
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      this.userService.getUser(user.id).subscribe({
        next: (data) => {
          localStorage.setItem('user', JSON.stringify(data));
        },
        error: (error) => {
          console.error(error)
        },
        complete: () => {
          let saved: UserJobs[] = [];
          let received: UserJobs[] = [];
          user?.userJobs.forEach((job: UserJobs) => {
            if (job.savedJob) {
              saved.push(job);
            }
            if (job.jobReceived) {
              received.push(job);
            }
          });
          this.sharedService.savedJobsData(saved);
          this.sharedService.receivedJobsData(received);
        }
      });
    }

  }

}
