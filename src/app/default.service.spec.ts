/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultService } from './default.service';

describe('DefaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultService]
    });
  });

  it('should ...', inject([DefaultService], (service: DefaultService) => {
    expect(service).toBeTruthy();
  }));
});
