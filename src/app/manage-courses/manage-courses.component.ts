import { Component, OnInit } from '@angular/core';
import {course} from './course';
import {curCourse} from './curCourse';

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

  //To lock course selection.
  public allowedYears:string = "W20, S20";
  
  public addButton: boolean = true;
  public swapButton: boolean = true;
  public dropButton: boolean = true;
  public seats:boolean = true;
  
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
  
  loadCourses(){
	this.seats = false;
	this.courseObjects = [];
	this.showFailure = false;
	$.ajax({
		method: 'post',
		url: '/loadCourses',
		contentType: 'application/json',
		success: (data) => {
			for (var i in data){
				var cCourse = new curCourse(data[i].CourseCode, data[i].Faculty, data[i].Cost, data[i].Credit, 
				data[i].Professor, data[i].LectureDates, data[i].LabDates, data[i].ExamDates, data[i].Term);
				this.courseObjects.push(cCourse);
				this.turnOnSDoffA();
			}
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
  

  //Queries DB for courses
  queryCourses(){
	this.courseObjects = [];
	this.showFailure = false;
	var fac = (<HTMLInputElement>document.getElementById("subject")).value;
	var cn = (<HTMLInputElement>document.getElementById("courseNum")).value;
	var openyn = (<HTMLInputElement>document.getElementById("check1")).checked;
	var qTerm = ((this.termSelected).toString()+(this.yearSelected).toString());
	
	this.validateQuery(qTerm);
	
	if (fac == ""){
		this.changeAlert("A Faculty must be entered.");
	}
	else{
		$.ajax({
			method: 'post',
			url: '/queryCourses',
			contentType: 'application/json',
			data: JSON.stringify({term: qTerm, faculty:fac, courseNum:cn, openyn:openyn}),
			success: (data) => {
				this.courseObjects = [];
				//console.log(data);
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
  work(i){
	 console.log(i); 
  }
  
  addCourses(index){
	$.ajax({
		method: 'post',
		url: '/addCourses',
		contentType: 'application/json',
		data: JSON.stringify({coursecode: this.courseObjects[index].coursecode}),
		success: (data) => {
			console.log(data);
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})  
  }
  
  dropCourses(){
	$.ajax({
		method: 'post',
		url: '/dropCourses',
		contentType: 'application/json',
		data: JSON.stringify({coursecode: "CPS847"}),
		success: (data) => {
			console.log(data);
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})  
  }
  
  turnOffASD(){
	this.addButton = false;
	this.swapButton = false;
	this.dropButton = false;
  }
  
  turnOnASoffD(){
	this.addButton = true;
	this.swapButton = true;
	this.dropButton = false;
  }
  
  turnOnSDoffA(){
	this.addButton = false;
	this.swapButton = true;
	this.dropButton = true;
  }
  
  validateQuery(qTerm){
	this.seats = true;
	if (this.allowedYears.includes(qTerm)){
		this.turnOnASoffD();
	}
	else{
		this.turnOffASD();
		this.changeAlert("The course selection period for this term has already passed.");
	}
  }
	
	changeAlert(message){
		this.failureMsg = message;
		this.showFailure=true;
	}
	
}
