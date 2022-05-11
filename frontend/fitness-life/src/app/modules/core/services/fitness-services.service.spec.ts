import { TestBed } from '@angular/core/testing';

import { FitnessServicesService } from './fitness-services.service';

describe('FitnessServicesService', () => {
  let service: FitnessServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
