import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses';


export const routes: Routes = [
{path: '', component: CoursesComponent},
{path: "", redirectTo: '/', pathMatch: 'full'},
 ]