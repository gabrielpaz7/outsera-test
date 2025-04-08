import { Component } from '@angular/core';
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
  filteredMovies: Movie[] = [];

  yearFilter: number | null = null;
  winnerFilter: boolean | null = null;

  itemsPerPage!: number;
  currentPage!: number;
  totalPages!: number;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(request?: MovieRequest) {
    request = request ?? { page: 0, size: environment.default_page_size };

    this.movieService.getMovies(request).subscribe({
      next: (response: MovieResponse) => {
        this.movies = response.content;
        this.filteredMovies = response.content;
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
    this.filteredMovies = this.movies.filter(movie => {
      const yearMatch = this.yearFilter ? movie.year == this.yearFilter : true;
      const winnerMatch = this.winnerFilter ? movie.winner == this.winnerFilter : true;
      return yearMatch && winnerMatch;
    });
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies({page: this.currentPage, size: this.itemsPerPage});
    }
  }

  nextPage() {
    if (this.currentPage < (this.totalPages - 1)) {
      this.currentPage++;
      this.loadMovies({page: this.currentPage, size: this.itemsPerPage});
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies({ page: this.currentPage, size: this.itemsPerPage });
    }
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.loadMovies({page: this.currentPage, size: this.itemsPerPage});
  }

  goToLastPage() {
    this.currentPage = (this.totalPages - 1);
    this.loadMovies({page: this.currentPage, size: this.itemsPerPage});
  }
}
