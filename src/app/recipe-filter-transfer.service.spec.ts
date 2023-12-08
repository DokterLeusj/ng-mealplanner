import { TestBed } from '@angular/core/testing';

import { RecipeFilterTransferService } from './recipe-filter-transfer.service';

describe('RecipeFilterService', () => {
  let service: RecipeFilterTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeFilterTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
