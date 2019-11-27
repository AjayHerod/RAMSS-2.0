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
  
  public fYear:number = 19;
  public wYear:number = 20;
  public sYear:number = 20;
  
  public termSelected:string = "You must select a term to begin.";
  public yearSelected:number;
  public queryButton:boolean=false;
  public queryMsg:string;
  
  public courseObjects = [];

  ngOnInit() {
	this.fallYear = 2019;
	this.winterYear = 2020;
	this.summerYear = 2020;
  }

  chooseFall(){
	$(".btn").removeClass("active");
    $('#fallButton').addClass('active');
	this.termSelected = "F";
	this.yearSelected = this.fYear;
	this.queryButton = true;
  }

  chooseWinter(){
	$(".btn").removeClass("active");
    $('#winterButton').addClass('active');
	this.termSelected = "W";
	this.yearSelected = this.wYear;
	this.queryButton = true;
  }

  chooseSummer(){
	$(".btn").removeClass("active");
    $('#summerButton').addClass('active');
	this.termSelected = "S";
	this.yearSelected = this.sYear;
	this.queryButton = true;
	
  }

  queryCourses(){
	this.courseObjects = [];
	var fac = (<HTMLInputElement>document.getElementById("subject")).value;
	var cn = (<HTMLInputElement>document.getElementById("courseNum")).value;
	var openyn = (<HTMLInputElement>document.getElementById("check1")).checked;
	var qTerm = ((this.termSelected).toString()+(this.yearSelected).toString());
	
	if (fac == ""){
		alert("Faculty is required.");
	}
	else{
		$.ajax({
			method: 'post',
			url: '/queryCourses',
			contentType: 'application/json',
			data: JSON.stringify({term: qTerm, faculty:fac, courseNum:cn, openyn:openyn}),
			success: (data) => {
				console.log(data);
				for (var i in data){
					var c = new course(data[i].CourseCode, data[i].Faculty, data[i].Cost, 
					data[i].Credit, data[i].Professor, data[i].LectureDates, data[i].LabDates, 
					data[i].ExamDates, data[i].SeatsTaken, data[i].SeatsOpen, data[i].Term);
					this.courseObjects.push(c);
				}
				this.queryMsg = "Results: "+data.length+" Course | Query: Term: "+qTerm+", Faculty: "+fac+", Course Number: "+cn+", Open Only?: "+openyn;
				
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}
	
	
  }
}
