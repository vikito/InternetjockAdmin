/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadService } from './preload.service';

describe('Service: Preload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadService]
    });
  });

  it('should ...', inject([PreloadService], (service: PreloadService) => {
    expect(service).toBeTruthy();
  }));
});