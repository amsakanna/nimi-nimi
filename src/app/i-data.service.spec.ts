/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IDataService } from './i-data.service';

describe('IDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IDataService]
    });
  });

  it('should ...', inject([IDataService], (service: IDataService) => {
    expect(service).toBeTruthy();
  }));
});
