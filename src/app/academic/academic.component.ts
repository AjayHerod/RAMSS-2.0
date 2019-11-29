import { Component, OnInit } from '@angular/core';
import { course } from '../course-sum/course';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})
export class AcademicComponent implements OnInit {


	public allCourses: string[] = new Array();
						/* Course code, grade */
	public cCourses: [string, string][] = new Array();
	public prCourses: [string, string][] = new Array();
	public oeCourses: [string, string][] = new Array();
	public laCourses: [string, string][] = new Array();
	public lbCourses: [string, string][] = new Array();
	
	
	public busCourses: [string, string][] = new Array();
	public mthCourses: [string, string][] = new Array();
	public conCourses: [string, string][] = new Array();


	public cProgress: string;
	public prProgress: string;
	public oeProgress: string;
	public laProgress: string;
	public lbProgress: string;

	public mthProgress: string;
	public conProgress: string;
	public busProgress: string;

							/* category, progress */
	public advisementReport: [string, string][] = new Array();


	constructor() { }


	ngOnInit() {
		this.loadGrades();
		this.loadSchedule();
	} 
		

	loadGrades() {
		$.ajax({
			method: 'post',
			url: '/loadGradesSort',
			contentType: 'application/json',
			success: (data) => {
				data.forEach(course => {
					this.allCourses.push(course.Course);

					// based on course type
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
						
						case "B":
						case "A":
						case "P":
							this.prCourses.push([course.Course, course.Grade]);
							break;
						
						case "P, OE":
						case "OE, P":
							this.prCourses.push([course.Course, course.Grade]);
							this.oeCourses.push([course.Course, course.Grade]);
							break;
					}

					// specific types of courses (subset of the professionally-related)
					switch (course.Course.substring(0, 3)) {
						case "MTH":
							this.mthCourses.push([course.Course, course.Grade]);
							break;
						
						case "ACC":
							this.busCourses.push([course.Course, course.grade]);
							break;
						
						case "CPS":
							if (course.Type == 'P') {
								this.conCourses.push([course.Course, course.grade]);
							}
							break;
					}

				});

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
				let requiredAmount = data[0];

				this.laProgress = this.evaluateProgress(requiredAmount.LiberalA, requiredAmount.LiberalA, this.laCourses);
				this.lbProgress = this.evaluateProgress(requiredAmount.LiberalB, requiredAmount.LiberalB, this.lbCourses);
				this.oeProgress = this.evaluateProgress(requiredAmount.Open, requiredAmount.Open, this.oeCourses);
				this.prProgress = this.evaluateProgress(9, 9, this.prCourses);

				let mandatoryCoursesAmount = requiredAmount.Required.split(",").length;
				this.cProgress = this.evaluateProgress(mandatoryCoursesAmount, mandatoryCoursesAmount, this.cCourses);

				this.mthProgress = this.evaluateProgress(1, 3, this.mthCourses);
				this.conProgress = this.evaluateProgress(requiredAmount.ConNum, requiredAmount.ConNum, this.conCourses);
				this.busProgress = this.evaluateProgress(1, 3, this.busCourses);

				// create final advisement report
				this.advisementReport = [['Compulsory', this.cProgress], ['Liberal A', this.laProgress], ['Liberal B', this.lbProgress], ['Open Elective', this.oeProgress], ['Professional Related', this.prProgress], ['Business', this.busProgress], ['Computer Science', this.conProgress], ['Math', this.mthProgress]];
			},
			error: function() {
				console.log("Failed to connect to server");
			}
		 })
	}

	evaluateProgress(min: number, max: number, coursesTaken: [string, string][]) {
		if (coursesTaken.length < min) {
			return min + " required, " + coursesTaken.length + " taken" + (min-coursesTaken.length) + " needed, " ;
		}
		else if (coursesTaken.length > max) {
			return "Exceeded";	
		}
		else {
			return min + " required, " + coursesTaken.length + " completed";
		}
	}
  
}

