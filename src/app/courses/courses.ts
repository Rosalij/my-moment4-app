//Component to display and manage courses
import { Component, inject, signal, computed } from '@angular/core';
import { Courses } from '../models/courses';
import { CourseService } from '../services/course.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class CoursesComponent {
//service
  courseService = inject(CourseService);

//signals
  allCourses = signal<Courses[]>([]);
  //reactive search term
  searchTerm = signal(''); 

//computed filtered courses based on search term
  filteredCourses = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.allCourses();
    return this.allCourses().filter(course =>
      course.coursename.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term)
    );
  });

sortOrder = signal<{ [key: string]: boolean }>({
  coursename: true, 
  code: true,       
  progression: true   
});

//sort by column 
sortBy(column: keyof Courses): void {
  const direction = this.sortOrder()[column];
  const sorted = [...this.allCourses()].sort((a, b) => {
    const valA = String(a[column]).toLowerCase();
    const valB = String(b[column]).toLowerCase();
//compare
    if (direction) {
      return valA.localeCompare(valB);//Ascending
    } else {
      return valB.localeCompare(valA);//descending
    }
  });
  //Update signal with sorted array
  this.allCourses.set(sorted);
  this.sortOrder.update(order => {
  //toggle direction
    order[column] = !direction; 
    return order;
  });
}
//form
searchInput = new FormControl('');

//on init, get courses and subscribe to search input changes
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.allCourses.set(courses);
    });

    //update searchTerm signal on input changes
    this.searchInput.valueChanges.subscribe(value => {
      this.searchTerm.set(value ?? '');
    });
  }
}