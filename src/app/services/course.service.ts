//Service to get courses from web service
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url: string = "https://webbutveckling.miun.se/files/ramschema.json";
  http = inject(HttpClient)


  //Get courses
  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
  }

}

