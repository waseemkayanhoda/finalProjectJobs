import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCvPopupDialogComponent } from './upload-cv-popup-dialog.component';

describe('UploadCvPopupDialogComponent', () => {
  let component: UploadCvPopupDialogComponent;
  let fixture: ComponentFixture<UploadCvPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCvPopupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCvPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
