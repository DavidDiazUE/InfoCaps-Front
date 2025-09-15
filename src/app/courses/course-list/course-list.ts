import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService, Course } from '../course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  providers: [CourseService]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  selectedLevel = 'all';
  selectedCategory = 'all';

  
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

}