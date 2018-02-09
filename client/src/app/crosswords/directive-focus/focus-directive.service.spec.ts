import { TestBed, inject } from '@angular/core/testing';

import { FocusDirectiveService } from './focus-directive.service';

describe('FocusDirectiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FocusDirectiveService]
    });
  });

  it('should be created', inject([FocusDirectiveService], (service: FocusDirectiveService) => {
    expect(service).toBeTruthy();
  }));
});
