import { MovieListComponent } from './movie-list.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { MovieRequest } from 'src/app/shared/models/movie-request.interface';
import { MovieResponse } from 'src/app/shared/models/movie-response.interface';

describe('@MovieListComponent', () => {
  let component: MovieListComponent;
  let movieService: MovieService;

  const mockMovieResponse = {
    "content": [
      {
        "id": 1,
        "year": 1980,
        "title": "Can't Stop the Music",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Allan Carr"
        ],
        "winner": true
      },
      {
        "id": 2,
        "year": 1980,
        "title": "Cruising",
        "studios": [
          "Lorimar Productions",
          "United Artists"
        ],
        "producers": [
          "Jerry Weintraub"
        ],
        "winner": false
      },
      {
        "id": 3,
        "year": 1980,
        "title": "The Formula",
        "studios": [
          "MGM",
          "United Artists"
        ],
        "producers": [
          "Steve Shagan"
        ],
        "winner": false
      },
      {
        "id": 4,
        "year": 1980,
        "title": "Friday the 13th",
        "studios": [
          "Paramount Pictures"
        ],
        "producers": [
          "Sean S. Cunningham"
        ],
        "winner": false
      },
      {
        "id": 5,
        "year": 1980,
        "title": "The Nude Bomb",
        "studios": [
          "Universal Studios"
        ],
        "producers": [
          "Jennings Lang"
        ],
        "winner": false
      },
      {
        "id": 6,
        "year": 1980,
        "title": "The Jazz Singer",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Jerry Leider"
        ],
        "winner": false
      },
      {
        "id": 7,
        "year": 1980,
        "title": "Raise the Titanic",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "William Frye"
        ],
        "winner": false
      },
      {
        "id": 8,
        "year": 1980,
        "title": "Saturn 3",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Stanley Donen"
        ],
        "winner": false
      },
      {
        "id": 9,
        "year": 1980,
        "title": "Windows",
        "studios": [
          "United Artists"
        ],
        "producers": [
          "Mike Lobell"
        ],
        "winner": false
      },
      {
        "id": 10,
        "year": 1980,
        "title": "Xanadu",
        "studios": [
          "Universal Studios"
        ],
        "producers": [
          "Lawrence Gordon"
        ],
        "winner": false
      },
      {
        "id": 11,
        "year": 1981,
        "title": "Mommie Dearest",
        "studios": [
          "Paramount Pictures"
        ],
        "producers": [
          "Frank Yablans"
        ],
        "winner": true
      },
      {
        "id": 12,
        "year": 1981,
        "title": "Endless Love",
        "studios": [
          "PolyGram",
          "Universal Studios"
        ],
        "producers": [
          "Dyson Lovell"
        ],
        "winner": false
      },
      {
        "id": 13,
        "year": 1981,
        "title": "Heaven's Gate",
        "studios": [
          "United Artists"
        ],
        "producers": [
          "Joann Carelli"
        ],
        "winner": false
      },
      {
        "id": 14,
        "year": 1981,
        "title": "The Legend of the Lone Ranger",
        "studios": [
          "Associated Film Distribution",
          "Universal Studios"
        ],
        "producers": [
          "Walter Coblenz"
        ],
        "winner": false
      },
      {
        "id": 15,
        "year": 1981,
        "title": "Tarzan, the Ape Man",
        "studios": [
          "MGM",
          "United Artists"
        ],
        "producers": [
          "John Derek"
        ],
        "winner": false
      }
    ],
    "pageable": {
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "offset": 0,
      "pageSize": 15,
      "pageNumber": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": 14,
    "totalElements": 206,
    "last": false,
    "size": 15,
    "number": 0,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "first": true,
    "numberOfElements": 15,
    "empty": false
  };

  beforeEach(() => {
    const StubHttpClient = jasmine.createSpyObj(HttpClient, ['get', 'post']);
    movieService = new MovieService(StubHttpClient);
    component = new MovieListComponent(movieService);
  });

  it('#should create component', () => {
    expect(component).toBeTruthy();
  });
  
  it('#should call api service on init', () => {
    spyOn(movieService, 'getMovies').and.returnValue(of(mockMovieResponse));
    component.ngOnInit();
    expect(movieService.getMovies).toHaveBeenCalled();
  });

  it('#should load movies and update component state', () => {
    const request: MovieRequest = { page: 0, size: 15 };
    spyOn(movieService, 'getMovies').withArgs(request).and.returnValue(of(mockMovieResponse));
  
    component.loadMovies();
  
    expect(movieService.getMovies).toHaveBeenCalledWith(request);
    expect(component.movies).toEqual(mockMovieResponse.content);
    expect(component.filteredMovies).toEqual(mockMovieResponse.content);
    expect(component.itemsPerPage).toBe(mockMovieResponse.size);
    expect(component.currentPage).toBe(mockMovieResponse.number);
    expect(component.totalPages).toBe(mockMovieResponse.totalPages);
  });

  it('#should log an error when movieService.getMovies fails', () => {
    const mockError = new Error('API failure');
  
    spyOn(movieService, 'getMovies').and.returnValue(throwError(() => mockError));
    const consoleSpy = spyOn(console, 'error');
  
    component.loadMovies();
  
    expect(movieService.getMovies).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching movies:', mockError);
  });

  it('#should filter movies by year and winner', () => {
    component.movies = mockMovieResponse.content;
  
    component.yearFilter = 1981;
    component.winnerFilter = true;
  
    component.applyFilters();
  
    expect(component.filteredMovies).toEqual([
      {
        "id": 11,
        "year": 1981,
        "title": "Mommie Dearest",
        "studios": [
          "Paramount Pictures"
        ],
        "producers": [
          "Frank Yablans"
        ],
        "winner": true
      }
    ]);
  });

  it('#should decrement page and call loadMovies when currentPage > 0', () => {
    component.currentPage = 2;
    component.itemsPerPage = 10;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.prevPage();
  
    expect(component.currentPage).toBe(1);
    expect(loadMoviesSpy).toHaveBeenCalledWith({ page: 1, size: 10 });
  });

  it('#should not call loadMovies when currentPage is 0', () => {
    component.currentPage = 0;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.prevPage();
  
    expect(loadMoviesSpy).not.toHaveBeenCalled();
    expect(component.currentPage).toBe(0);
  });

  it('#should increment page and call loadMovies when currentPage < totalPages - 1', () => {
    component.currentPage = 1;
    component.totalPages = 3;
    component.itemsPerPage = 10;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.nextPage();
  
    expect(component.currentPage).toBe(2);
    expect(loadMoviesSpy).toHaveBeenCalledWith({ page: 2, size: 10 });
  });

  it('#should not call loadMovies when currentPage is last page', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.nextPage();
  
    expect(loadMoviesSpy).not.toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('#should go to the specified page when within range', () => {
    component.totalPages = 5;
    component.itemsPerPage = 10;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.goToPage(2);
  
    expect(component.currentPage).toBe(2);
    expect(loadMoviesSpy).toHaveBeenCalledWith({ page: 2, size: 10 });
  });

  it('#should not change page or call loadMovies if page is out of range', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.goToPage(10);
  
    expect(component.currentPage).toBe(1);
    expect(loadMoviesSpy).not.toHaveBeenCalled();
  });
  
  it('#should go to first page and call loadMovies with page 0', () => {
    component.currentPage = 3;
    component.itemsPerPage = 10;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.goToFirstPage();
  
    expect(component.currentPage).toBe(0);
    expect(loadMoviesSpy).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
  
  it('#should go to last page and call loadMovies with last page index', () => {
    component.totalPages = 5;
    component.itemsPerPage = 10;
    const loadMoviesSpy = spyOn(component, 'loadMovies');
  
    component.goToLastPage();
  
    expect(component.currentPage).toBe(4);
    expect(loadMoviesSpy).toHaveBeenCalledWith({ page: 4, size: 10 });
  }); 
});
