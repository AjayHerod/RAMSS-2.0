import { Component, OnInit } from '@angular/core';
import {course} from './course';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  constructor() { }

  //For Bootstrap alert messages
  public failureMsg:string = "";
  public showFailure:boolean = false;
  
  //For showing the school year
  public fallYear:number;
  public winterYear:number;
  public summerYear:number;
  
  //For sending the school year inside query
  public fYear:number = 19;
  public wYear:number = 20;
  public sYear:number = 20;
  
  //For keeping track of selected items
  public termSelected:string = "You must select a term to begin.";
  public yearSelected:number;
  
  //For showing and hiding the condition for a term to be selected.
  public queryButton:boolean=false;
  public queryMsg:string;
  
  //For holding the course objects.
  public courseObjects = [];

  ngOnInit() {
	this.fallYear = 2019;
	this.winterYear = 2020;
	this.summerYear = 2020;
  }

  //If fall term is selected
  chooseFall(){
	$(".btn").removeClass("active");
    $('#fallButton').addClass('active');
	this.termSelected = "F";
	this.yearSelected = this.fYear;
	this.queryButton = true;
  }

  //If winter term is selected
  chooseWinter(){
	$(".btn").removeClass("active");
    $('#winterButton').addClass('active');
	this.termSelected = "W";
	this.yearSelected = this.wYear;
	this.queryButton = true;
  }

  //If summer term is selected
  chooseSummer(){
	$(".btn").removeClass("active");
    $('#summerButton').addClass('active');
	this.termSelected = "S";
	this.yearSelected = this.sYear;
	this.queryButton = true;
	
  }

  //Queries DB for courses
  queryCourses(){
	this.courseObjects = [];
	this.showFailure = false;
	var fac = (<HTMLInputElement>document.getElementById("subject")).value;
	var cn = (<HTMLInputElement>document.getElementById("courseNum")).value;
	var openyn = (<HTMLInputElement>document.getElementById("check1")).checked;
	var qTerm = ((this.termSelected).toString()+(this.yearSelected).toString());
	
	if (fac == ""){
		this.failureMsg = "A Faculty must be entered.";
		this.showFailure=true;
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
				this.queryMsg = "Results: "+data.length+" Found | Query: Term: "+qTerm+", Faculty: "+fac+", Course Number: "+cn+", Open Only?: "+openyn;
				
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}
	
	
  }
}
