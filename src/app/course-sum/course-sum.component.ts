import { Component, OnInit, } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
	selector: 'app-course-sum',
	providers: [DayService, WeekService, MonthService], 
  templateUrl: './course-sum.component.html',
  styleUrls: ['./course-sum.component.css']
})
export class CourseSumComponent implements OnInit {

  constructor() { }

	public scheduleViews = ['Day','Week', 'Month'];
	public workWeekDays: number[]= [1, 2, 3, 4, 5];

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
