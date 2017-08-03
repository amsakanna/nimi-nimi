/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddrService } from './addr.service';

describe('AddrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddrService]
    });
  });

  it('should ...', inject([AddrService], (service: AddrService) => {
    expect(service).toBeTruthy();
  }));
});
