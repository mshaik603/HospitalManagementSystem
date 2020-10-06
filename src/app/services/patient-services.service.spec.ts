import { TestBed } from '@angular/core/testing';

import { PatientServicesService } from './patient-services.service';

describe('PatientServicesService', () => {
  let service: PatientServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
