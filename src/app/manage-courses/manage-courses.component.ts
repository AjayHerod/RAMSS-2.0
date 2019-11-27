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
  public successMsg:string = "";
  public showFailure:boolean = false;
  public showSuccess:boolean = false;
  
  //For showing the school year
  public fallYear:number;
  public winterYear:number;
  public summerYear:number;
  
  //For sending the school year inside query
  public fYear:number = 19;
  public wYear:number = 20;
  public sYear:number = 20;
  
  //For keeping track of selected items
  public termSelected:string = "None. You must select a term to begin.";
  public yearSelected:number;
  
  //For showing and hiding the condition for a term to be selected.
  public queryButton:boolean=false;
  public queryMsg:string;
  
  //For holding the course objects.
  public courseObjects = [];
  public mcourseObjects = [];

  //To lock course selection.
  public allowedYears:string;
  
  public addButton: boolean = true;
  public swapButton: boolean = true;
  public dropButton: boolean = true;
  public seats:boolean = true;
  
  public swap1;
  
  ngOnInit() {
	this.fallYear = 2019;
	this.winterYear = 2020;
	this.summerYear = 2020;
	this.loadTerms();
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
  
  //Get current courses from DB.
  loadCourses(){
	this.seats = false;
	this.hideAlerts();
	$.ajax({
		method: 'post',
		url: '/loadCourses',
		contentType: 'application/json',
		success: (data) => {
			this.courseObjects = [];
			for (var i in data){
				var cCourse = new curCourse(data[i].CourseCode, data[i].Faculty, data[i].Cost, data[i].Credit, 
				data[i].Professor, data[i].LectureDates, data[i].LabDates, data[i].ExamDates, data[i].Term);
				this.courseObjects.push(cCourse);
				this.turnOnSDoffA();
				this.changeQueryMsg("Query: Current Courses");
			}
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
  
  //Get current courses from DB, filter the ones that can be swapped and put it into the modal.
  loadmCourses(){
	$.ajax({
		method: 'post',
		url: '/loadCourses',
		contentType: 'application/json',
		success: (data) => {
			this.mcourseObjects = [];
			for (var i in data){
				if(this.allowedYears.includes(data[i].Term) == true){
					var cCourse = new curCourse(data[i].CourseCode, data[i].Faculty, data[i].Cost, data[i].Credit, 
					data[i].Professor, data[i].LectureDates, data[i].LabDates, data[i].ExamDates, data[i].Term);
					this.mcourseObjects.push(cCourse);
				}
			}
			$('#swapModal').modal('show');
			console.log(this.mcourseObjects);
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
  
  //Loads the terms.
  loadTerms(){
	 $.ajax({
		method: 'post',
		url: '/getTerms',
		contentType: 'application/json',
		success: (data) => {
			this.allowedYears = data;
		},
		error: function() {
			console.log("Failed to connect to server");
		}
	 }) 
	}
  
  

  //Queries DB for courses
  queryCourses(){
	this.courseObjects = [];
	this.hideAlerts();
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
				this.changeQueryMsg("Results: "+data.length+" Found | Query: Term: "+qTerm+", Faculty: "+fac+", Course Number: "+cn+", Open Only?: "+openyn);
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}
  }
  
  
  //Requests server to add courses.
  addCourses(index){
	if (this.checkAvailable(this.courseObjects[index]) == true){ 
		$.ajax({
			method: 'post',
			url: '/addCourses',
			contentType: 'application/json',
			data: JSON.stringify({coursecode: this.courseObjects[index].coursecode}),
			success: (data) => {
				if(data == "success"){
					this.changeSuccessAlert("Course Successfully Added!");
				}
				else if (data == "duplicate entry"){
					this.changeAlert("You are already enrolled in this course.");
				}
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})  
	}
	else {
		this.changeAlert("This course is full.");
	}
  }
  
  
  //Requests server to drop courses.
  dropCourses(index){
	var cc = this.courseObjects[index].coursecode;
	if(this.validateAvailability(index)==true){
		$.ajax({
			method: 'post',
			url: '/dropCourses',
			contentType: 'application/json',
			data: JSON.stringify({coursecode: cc}),
			success: (data) => {
				this.loadCourses();
				this.changeSuccessAlert("Course successfully dropped!");
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})  
	}else{
		this.changeAlert("The period for dropping a course in the current term has passed.");
	}
  }
  
  
  //Checks if courses can be swapped.
  displayswapCourses(index){
	this.hideAlerts();
	if(this.validateAvailability(index)==true){
		this.swap1 = this.courseObjects[index];
		this.loadmCourses();
	}else{
		this.changeAlert("The period for swapping a course in the current term has passed.");
	}
  }
  
  
  //Requests server to swap courses.
  swapCourse(index){
	var codedrop = this.mcourseObjects[index].coursecode;
	var codeadd = this.swap1.coursecode;
	var ca = this.checkAvailable(this.swap1);
	
	if(codedrop != codeadd && ca == true){
		$.ajax({
			method: 'post',
			url: '/swapCourses',
			contentType: 'application/json',
			data: JSON.stringify({codeadd:codeadd, codedrop:codedrop}),
			success: (data) => {
				//console.log(data);
				$('#swapModal').modal('hide');
				this.changeSuccessAlert("Courses successfully swapped!");
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})    
	}
	else if (ca == false){
		$('#swapModal').modal('hide');
		this.changeAlert("This course is full.");
	}
	else{
		$('#swapModal').modal('hide');
		this.changeAlert("You are already enrolled in this course.");
	}
  }
  
  
  
    
  
  //Helper methods
  
  //Returns true if a course is available to be dropped in the current term.
  validateAvailability(index){
	if(this.allowedYears.includes(this.courseObjects[index].term)){
		return true;
	}
	else {
		return false;
	}
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
	this.swapButton = false;
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
		this.hideAlerts();
		this.failureMsg = message;
		this.showFailure = true;
		window.scrollBy(0,-10000);
	}
	
	changeSuccessAlert(message){
		this.hideAlerts();
		this.successMsg = message;
		this.showSuccess = true;
		window.scrollBy(0,-10000);
	}
	
	changeQueryMsg(message){
		this.queryMsg = message;
	}
	
	hideAlerts(){
		this.showFailure = false;
		this.showSuccess = false;
	}
	
	checkAvailable(a){
		if(a.seatsopen - a.seatstaken > 0){
			return true;
		}
		else {
			return false;
		}
		
	}
	
}
