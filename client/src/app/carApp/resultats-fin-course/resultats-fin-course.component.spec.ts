import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsFinCourseComponent } from './resultats-fin-course.component';

describe('ResultatsFinCourseComponent', () => {
  let component: ResultatsFinCourseComponent;
  let fixture: ComponentFixture<ResultatsFinCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatsFinCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsFinCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
