import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'list', component: MovieListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
