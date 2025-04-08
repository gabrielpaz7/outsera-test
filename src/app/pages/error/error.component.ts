import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  error: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const error = this.router.getCurrentNavigation()?.extras.state;
    if (error) {
      this.error = error;
      console.log('Error:', error);
    }
  }
}
