import { Component, OnInit } from '@angular/core';
import {course} from './course';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  constructor() { }

  public fallYear:number;
  public winterYear:number;
  public summerYear:number;
  public termSelected:string;
  public openyn:boolean=true;
  public yearSelected:number;
  
  public courseObjects = [];

  ngOnInit() {
	this.fallYear = 2019;
	this.winterYear = 2020;
	this.summerYear = 2020;
  }

  chooseFall(){
	$(".btn").removeClass("active");
    $('#fallButton').addClass('active');
	this.termSelected = "Fall";
	this.yearSelected = this.fallYear;
  }

  chooseWinter(){
	$(".btn").removeClass("active");
    $('#winterButton').addClass('active');
	this.termSelected = "Winter";
	this.yearSelected = this.winterYear;
  }

  chooseSummer(){
	$(".btn").removeClass("active");
    $('#summerButton').addClass('active');
	this.termSelected = "Spring/Summer";
	this.yearSelected = this.summerYear;
  }

  queryCourses(){
	var fac = (<HTMLInputElement>document.getElementById("subject")).value;
	var cn = (<HTMLInputElement>document.getElementById("courseNum")).value;
	console.log("yes");
	$.ajax({
		method: 'post',
		url: '/queryCourses',
		contentType: 'application/json',
		data: JSON.stringify({term:this.termSelected, year:this.yearSelected, faculty:fac, courseNum:cn, openyn:true}),
		success: (data) => {
			console.log(data);
			for (var i in data){
				var c = new course(data[i].CourseCode, data[i].Faculty, data[i].Cost, 
				data[i].Credit, data[i].Professor, data[i].LectureDates, data[i].LabDates, 
				data[i].ExamDates, data[i].SeatsTaken, data[i].SeatsOpen);
				this.courseObjects.push(c);
			}
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
}
