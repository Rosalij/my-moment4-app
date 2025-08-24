//Routes for the app
import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses';

export const routes: Routes = [
  { path: '', component: CoursesComponent, pathMatch: 'full' },
];