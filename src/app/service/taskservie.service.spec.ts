import { TestBed } from '@angular/core/testing';

import { TaskservieService } from './taskservie.service';

describe('TaskservieService', () => {
  let service: TaskservieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskservieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
