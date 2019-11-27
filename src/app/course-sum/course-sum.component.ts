import { Component, OnInit, } from '@angular/core';
import {} from '@angular/cli';

@Component({
  selector: 'app-course-sum',
  templateUrl: './course-sum.component.html',
  styleUrls: ['./course-sum.component.css']
})
export class CourseSumComponent implements OnInit {

  constructor() { }

  public currentYear = 2019; //default
  public currentSemester = "Fall"; //default

  public currentCourses = ['CPS888','CPS889','CPS990'];

  ngOnInit() {
  }

  //dropCourse() {
    //drop course code
  //}
  
	loadCourses(){
      $.ajax({
			method: 'post',
			url: '/loadCourses',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}
	
	loadGrades(){
		$.ajax({
			method: 'post',
			url: '/loadGrades',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
    }
}
