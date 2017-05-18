/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeyValService } from './key-val.service';

describe('KeyValService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyValService]
    });
  });

  it('should ...', inject([KeyValService], (service: KeyValService) => {
    expect(service).toBeTruthy();
  }));
});
