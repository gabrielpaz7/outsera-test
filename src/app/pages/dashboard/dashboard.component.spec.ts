import { DashboardComponent } from './dashboard.component';
import { HttpClient } from '@angular/common/http';
import { MovieService } from 'src/app/shared/services/movie.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('@DashboardComponent', () => {
  let component: DashboardComponent;
  let movieService: MovieService;
  let formBuilder: FormBuilder;

  const mockYearsWithMultipleWinners = {
    "years": [
      {
        "year": 1986,
        "winnerCount": 2
      },
      {
        "year": 1990,
        "winnerCount": 2
      },
      {
        "year": 2015,
        "winnerCount": 2
      }
    ]
  };

  const mockStudiosWinCount = {
    "studios": [
      {
        "name": "Columbia Pictures",
        "winCount": 7
      },
      {
        "name": "Paramount Pictures",
        "winCount": 6
      },
      {
        "name": "Warner Bros.",
        "winCount": 5
      },
      {
        "name": "20th Century Fox",
        "winCount": 4
      },
      {
        "name": "MGM",
        "winCount": 3
      },
      {
        "name": "Universal Studios",
        "winCount": 2
      },
      {
        "name": "Universal Pictures",
        "winCount": 2
      },
      {
        "name": "Hollywood Pictures",
        "winCount": 2
      },
      {
        "name": "Nickelodeon Movies",
        "winCount": 1
      },
      {
        "name": "C2 Pictures",
        "winCount": 1
      },
      {
        "name": "Summit Entertainment",
        "winCount": 1
      },
      {
        "name": "Hasbro",
        "winCount": 1
      },
      {
        "name": "Associated Film Distribution",
        "winCount": 1
      },
      {
        "name": "Revolution Studios",
        "winCount": 1
      },
      {
        "name": "First Look Pictures",
        "winCount": 1
      },
      {
        "name": "Focus Features",
        "winCount": 1
      },
      {
        "name": "Cannon Films",
        "winCount": 1
      },
      {
        "name": "United Artists",
        "winCount": 1
      },
      {
        "name": "Touchstone Pictures",
        "winCount": 1
      },
      {
        "name": "Samuel Goldwyn Films",
        "winCount": 1
      },
      {
        "name": "Quality Flix",
        "winCount": 1
      },
      {
        "name": "TriStar Pictures",
        "winCount": 1
      },
      {
        "name": "Franchise Pictures",
        "winCount": 1
      },
      {
        "name": "Relativity Media",
        "winCount": 1
      },
      {
        "name": "Castle Rock Entertainment",
        "winCount": 1
      },
      {
        "name": "Screen Gems",
        "winCount": 1
      },
      {
        "name": "Triumph Releasing",
        "winCount": 1
      },
      {
        "name": "DreamWorks",
        "winCount": 1
      }
    ]
  };

  const mockProducersWinInterval = {
    "min": [
      {
        "producer": "Joel Silver",
        "interval": 1,
        "previousWin": 1990,
        "followingWin": 1991
      }
    ],
    "max": [
      {
        "producer": "Matthew Vaughn",
        "interval": 13,
        "previousWin": 2002,
        "followingWin": 2015
      }
    ]
  };

  const mockWinningMoviesByYear = [
    {
      "id": 36,
      "year": 1986,
      "title": "Howard the Duck",
      "studios": [
        "Universal Studios"
      ],
      "producers": [
        "Gloria Katz"
      ],
      "winner": true
    },
    {
      "id": 37,
      "year": 1986,
      "title": "Under the Cherry Moon",
      "studios": [
        "Warner Bros."
      ],
      "producers": [
        "Bob Cavallo",
        "Joe Ruffalo",
        "Steve Fargnoli"
      ],
      "winner": true
    }
  ];

  beforeEach(() => {
    const StubHttpClient = jasmine.createSpyObj(HttpClient, ['get', 'post']);
    movieService = new MovieService(StubHttpClient);
    formBuilder = new FormBuilder();
    component = new DashboardComponent(movieService, formBuilder);
    component.initForm();
  });

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#should initialize form and make API calls', () => {
    const currentYear = new Date().getFullYear();
    
    spyOn(component, 'initForm');
    spyOn(movieService, 'getYearsWithMultipleWinners').and.returnValue(of(mockYearsWithMultipleWinners));
    spyOn(movieService, 'getStudiosWinCount').and.returnValue(of(mockStudiosWinCount));
    spyOn(movieService, 'getProducersWinInterval').and.returnValue(of(mockProducersWinInterval));
    spyOn(movieService, 'getWinningMoviesByYear').and.returnValue(of(mockWinningMoviesByYear));

    component.ngOnInit();

    expect(component.initForm).toHaveBeenCalled();
    expect(movieService.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(movieService.getStudiosWinCount).toHaveBeenCalled();
    expect(movieService.getProducersWinInterval).toHaveBeenCalled();
  });

  it('#should get years with multiple winners', () => {
    spyOn(movieService, 'getYearsWithMultipleWinners').and.returnValue(of(mockYearsWithMultipleWinners));

    component.getYearsWithMultipleWinners();
    expect(component.yearsWithMultipleWinners).toEqual(mockYearsWithMultipleWinners.years);
  });

  it('#should get studios win count', () => {
    spyOn(movieService, 'getStudiosWinCount').and.returnValue(of(mockStudiosWinCount));

    component.getStudiosWinCount();
    expect(component.studiosWinCount).toEqual(mockStudiosWinCount.studios.splice(0, 3));
  });

  it('#should get producers win intervals', () => {
    spyOn(movieService, 'getProducersWinInterval').and.returnValue(of(mockProducersWinInterval));

    component.getProducersWinInterval();
    expect(component.producersWinInterval).toEqual(mockProducersWinInterval);
  });

  it('#should get winning movies by year', () => {
    spyOn(movieService, 'getWinningMoviesByYear').and.returnValue(of(mockWinningMoviesByYear));

    component.getWinningMoviesByYear();
    expect(component.winningMoviesByYear).toEqual(mockWinningMoviesByYear);
  });
});
