import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWordsComponent } from './common-words.component';

describe('CommonWordsComponent', () => {
  let component: CommonWordsComponent;
  let fixture: ComponentFixture<CommonWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
