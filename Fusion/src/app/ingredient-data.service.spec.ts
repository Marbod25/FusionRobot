import { TestBed } from '@angular/core/testing';

import { IngredientDataService } from './ingredient-data.service';

describe('CategoryDataService', () => {
  let service: IngredientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
