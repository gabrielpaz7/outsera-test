import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClient } from '@angular/common/http';

describe('@MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    const StubHttpClient = jasmine.createSpyObj(HttpClient, ['get', 'post']);
    service = new MovieService(StubHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
