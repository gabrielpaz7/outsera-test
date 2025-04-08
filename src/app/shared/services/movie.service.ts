import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse } from '../models/movie-response.interface';
import { environment } from 'src/environments/environment';
import { MovieRequest } from '../models/movie-request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(request: MovieRequest): Observable<MovieResponse> {
    const endpoint: string = `${environment.apiUrl}/movies`

    let params: HttpParams = new HttpParams();
    for(const key in request) {
      const value = request[key as keyof MovieRequest];
      if (value !== undefined && value !== null) {
        params = params.set(key, value);
      }
    }    
    return this.http.get<MovieResponse>(endpoint, { params });
  }


}
