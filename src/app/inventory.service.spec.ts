/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should ...', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});
