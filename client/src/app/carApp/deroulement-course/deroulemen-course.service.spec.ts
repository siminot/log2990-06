import { TestBed, inject } from '@angular/core/testing';

import { DeroulemenCourseService } from './deroulemen-course.service';

describe('DeroulemenCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeroulemenCourseService]
    });
  });

  it('should be created', inject([DeroulemenCourseService], (service: DeroulemenCourseService) => {
    expect(service).toBeTruthy();
  }));
});
