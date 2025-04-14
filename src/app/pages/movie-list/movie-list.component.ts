import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MovieRequest } from 'src/app/shared/models/movie-request.interface';
import { MovieResponse } from 'src/app/shared/models/movie-response.interface';
import { Movie } from 'src/app/shared/models/movie.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  movies!: Movie[];

  yearFilter: FormControl = new FormControl();
  winnerFilter: FormControl = new FormControl(null);

  itemsPerPage!: number;
  currentPage!: number;
  totalPages!: number;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();

    this.yearFilter.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.applyFilters());

    this.winnerFilter.valueChanges
      .subscribe(() => this.applyFilters());
  }

  loadMovies(request?: MovieRequest) {
    request = request ?? { page: 0, size: environment.default_page_size };

    this.movieService.getMovies(request).subscribe({
      next: (response: MovieResponse) => {
        this.movies = response.content;
        this.itemsPerPage = response.size;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  applyFilters() {
    const request: MovieRequest = {
      page: 0,
      size: environment.default_page_size,
    };

    if(this.yearFilter.value 
        && this.yearFilter.value.length === 4 
        && !isNaN(Number(this.yearFilter.value))) {
      request.year = this.yearFilter.value;
    }

    if(this.winnerFilter.value) {
      request.winner = this.winnerFilter.value;
    }

    this.loadMovies(request);
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies(this.getPaginationRequest());
    }
  }

  nextPage() {
    if (this.currentPage < (this.totalPages - 1)) {
      this.currentPage++;
      this.loadMovies(this.getPaginationRequest());
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies(this.getPaginationRequest());
    }
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.loadMovies(this.getPaginationRequest());
  }

  goToLastPage() {
    this.currentPage = (this.totalPages - 1);
    this.loadMovies(this.getPaginationRequest());
  }

  getPaginationRequest(): MovieRequest {
    const request: MovieRequest = {
      page: this.currentPage,
      size: this.itemsPerPage,
    };

    if(typeof this.yearFilter.value === 'number') {
      request.year = this.yearFilter.value;
    }
    
    if(this.winnerFilter.value) {
      request.winner = this.winnerFilter.value;
    }

    return request;
  }
}
