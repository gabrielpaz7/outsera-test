import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/shared/models/movie.interface';
import { ProducerWinInterval, StudioWinCount, YearWithMultipleWinners } from 'src/app/shared/models/projection-response.interface';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  yearsWithMultipleWinners: YearWithMultipleWinners[] = []
  studiosWinCount: StudioWinCount[] = []
  producersWinInterval: { min: ProducerWinInterval[], max: ProducerWinInterval[] } = { min: [], max: [] }
  winningMoviesByYear: Movie[] = []

  form!: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.getYearsWithMultipleWinners();
    this.getStudiosWinCount();
    this.getProducersWinInterval();
    this.getWinningMoviesByYear();

    //@TODO: Make API calls in parallel using forkJoin
  }

  initForm() {
    const currentYear = new Date().getFullYear();
    this.form = this.formBuilder.group({
      selectedYear: [currentYear]
    });
  }

  getYearsWithMultipleWinners() {
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (response: { years: YearWithMultipleWinners[] }) => {
        this.yearsWithMultipleWinners = response.years;
      },
      error: (error) => {
        console.error('Error fetching years with multiple winners:', error);
      }
    });
  }

  getStudiosWinCount() {
    this.movieService.getStudiosWinCount().subscribe({
      next: (response: { studios: StudioWinCount[] }) => {
        this.studiosWinCount = response.studios;
        this.studiosWinCount.sort((a, b) => b.winCount - a.winCount);
        this.studiosWinCount = this.studiosWinCount.slice(0, 3);
      },
      error: (error) => {
        console.error('Error fetching studios win count:', error);
      }
    });
  }

  getProducersWinInterval() {
    this.movieService.getProducersWinInterval().subscribe({
      next: (response: {min: ProducerWinInterval[], max: ProducerWinInterval[]}) => {
        this.producersWinInterval = response;
        this.producersWinInterval.max.sort((a, b) => b.interval - a.interval);
        this.producersWinInterval.min.sort((a, b) => b.interval - a.interval);
      },
      error: (error) => {
        console.error('Error fetching producers winning interval:', error);
      }
    });
  }

  getWinningMoviesByYear() {
    const year: number = this.form.get('selectedYear')?.value;

    this.movieService.getWinningMoviesByYear(year).subscribe({
      next: (response: Movie[]) => {
        this.winningMoviesByYear = response;
        this.winningMoviesByYear.sort((a, b) => b.year - a.year);
      },
      error: (error) => {
        console.error('Error fetching winning movies by year:', error);
      }
    });
  }


}
