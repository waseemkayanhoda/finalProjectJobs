import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchForm } from 'src/app/models/search-form';
import { SharedService } from 'src/app/service/shared/shared.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private _router: Router,
    private sharedService: SharedService,
  ) {
    this.searchForm = this._fb.group({
      what: new FormControl(''),
      where: new FormControl(''),
      description: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  sendSearchData() {
    let jobTitle: string = this.searchForm.get('what')?.value;
    let jobLocation: string = this.searchForm.get('where')?.value;
    let jobDescription: string = this.searchForm.get('description')?.value;

    const searchForm = new SearchForm(jobTitle, jobLocation, jobDescription);

    this.userService.getJobsBySearch(searchForm).subscribe(
      (response) => {
        localStorage.setItem('Search-Form', JSON.stringify({ jobTitle, jobLocation, jobDescription }));
        this._router.navigate(['jobs']);
        this.sharedService.changeJobData(response);
      }
    );
  }

}
