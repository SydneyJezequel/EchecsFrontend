import { TestBed } from '@angular/core/testing';

import { EchecsserviceService } from './echecsservice.service';

describe('EchecsserviceService', () => {
  let service: EchecsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchecsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
