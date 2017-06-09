/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterService } from './router.service';

describe('RouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterService]
    });
  });

  it('should ...', inject([RouterService], (service: RouterService) => {
    expect(service).toBeTruthy();
  }));
});
