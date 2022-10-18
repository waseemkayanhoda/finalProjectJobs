import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListPopupComponent } from './users-list-popup.component';

describe('UsersListPopupComponent', () => {
  let component: UsersListPopupComponent;
  let fixture: ComponentFixture<UsersListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
