import { Component, OnInit } from '@angular/core';
import { course } from '../course-sum/course';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})
export class AcademicComponent implements OnInit {
	constructor() { }

				/* Course code, grade */
	public cCourses: [string, string][] = new Array();
	public prCourses: [string, string][] = new Array();
	public oeCourses: [string, string][] = new Array();
	public laCourses: [string, string][] = new Array();
	public lbCourses: [string, string][] = new Array();


	ngOnInit() {
		this.loadSchedule();
		this.loadGrades();
	} 
		

	loadGrades() {
		$.ajax({
			method: 'post',
			url: '/loadGrades',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
				data.forEach(course => {
					switch(course.Type) {
						case "R":
							this.cCourses.push([course.Course, course.Grade]);
							break;
		
						case "LA":
							this.laCourses.push([course.Course, course.Grade]);
							break;
		
						case "LB":
							this.lbCourses.push([course.Course, course.Grade]);
							break;
							
						case "OE":
							this.oeCourses.push([course.Course, course.Grade]);
							break;
		
						case "P":
							this.prCourses.push([course.Course, course.Grade]);
							break;
					}

				});
				console.log(this.cCourses);
				console.log(this.prCourses);
				console.log(this.laCourses);
				console.log(this.lbCourses);
				console.log(this.oeCourses);

			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})

	}
  
	loadSchedule() {
		$.ajax({
			method: 'post',
			url: '/loadCalendar',
			contentType: 'application/json',
			success: (data) => {
				//console.log(data);
			},
			error: function() {
				console.log("Failed to connect to server");
			}
		 })
	}
  
}

