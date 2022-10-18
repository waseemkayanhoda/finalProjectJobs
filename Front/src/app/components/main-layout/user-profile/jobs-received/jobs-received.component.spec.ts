import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsReceivedComponent } from './jobs-received.component';

describe('UserJobsComponent', () => {
  let component: JobsReceivedComponent;
  let fixture: ComponentFixture<JobsReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsReceivedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
