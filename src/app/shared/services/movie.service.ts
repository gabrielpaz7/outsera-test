import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse } from '../models/movie-response.interface';
import { environment } from 'src/environments/environment';
import { MovieRequest } from '../models/movie-request.interface';
import { Observable } from 'rxjs';
import { ProducerWinInterval, StudioWinCount, YearWithMultipleWinners } from '../models/projection-response.interface';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  endpoint: string = `${environment.apiUrl}/movies`

  constructor(private http: HttpClient) { }

  private getFormattedParams(request: MovieRequest): HttpParams {
    let params: HttpParams = new HttpParams();
    for (const key in request) {
      const value = request[key as keyof MovieRequest];
      if (value !== undefined && value !== null) {
        params = params.set(key, value);
      }
    }
    return params;
  }

  getMovies(request: MovieRequest): Observable<MovieResponse> {
    let params: HttpParams = this.getFormattedParams(request);
    return this.http.get<MovieResponse>(this.endpoint, { params })
  }

  getYearsWithMultipleWinners(): Observable<{years: YearWithMultipleWinners[]}> {
    let params: HttpParams = new HttpParams();
    params = params.set('projection', 'years-with-multiple-winners');
    return this.http.get<{years: YearWithMultipleWinners[]}>(this.endpoint, { params });
  }

  getStudiosWinCount(): Observable<{studios: StudioWinCount[]}> {
    let params: HttpParams = new HttpParams();
    params = params.set('projection', 'studios-with-win-count');
    return this.http.get<{studios: StudioWinCount[]}>(this.endpoint, { params });
  }

  getProducersWinInterval(): Observable<{min: ProducerWinInterval[], max: ProducerWinInterval[]}> {
    let params: HttpParams = new HttpParams();
    params = params.set('projection', 'max-min-win-interval-for-producers');
    return this.http.get<{min: ProducerWinInterval[], max: ProducerWinInterval[]}>(this.endpoint, { params });
  }

  getWinningMoviesByYear(year: number): Observable<Movie[]> {
    const params: HttpParams = this.getFormattedParams({ winner: true, year });
    return this.http.get<Movie[]>(this.endpoint, { params })
  }
}
