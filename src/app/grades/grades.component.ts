import { Component, OnInit } from '@angular/core';
import {gpaCalc} from './gpaCalc';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor() { }

  public years = []; 
  public gradeObjects = [];
  
  public fGrades = [];
  public wGrades = [];
  public sGrades = [];
  
  public cGPA = 0;
  public fGPA = 0;
  public wGPA = 0;
  public sGPA = 0;
  
  public selectedOption: number;
  public cYear = 1000;
  
  ngOnInit() {
	this.loadGrades();  
  }
  
  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }


  loadGrades(){
	$.ajax({
		method: 'post',
		url: '/loadGrades',
		contentType: 'application/json',
		success: (data) => {
			for (var i in data){
				//console.log(data[i]);
				this.years.push(data[i].Year);
				this.gradeObjects.push(data[i]);
			}				
			this.years = (this.years).filter(this.onlyUnique);
			this.filterGrades(this.years[0]);
			this.selectedOption = this.years[0];
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
  
  getGrades(){
	this.filterGrades(this.selectedOption);
  }
  
  filterGrades(year){
	this.wGrades = [];
	this.fGrades = [];
	this.sGrades = [];
	for (var i in this.gradeObjects){
		if (this.gradeObjects[i].Year == year){
			if (this.gradeObjects[i].Semester == "W"){
				this.wGrades.push(this.gradeObjects[i]);
			}
			else if (this.gradeObjects[i].Semester == "F"){
				this.fGrades.push(this.gradeObjects[i]);
			}
			else if (this.gradeObjects[i].Semester == "S"){
				this.sGrades.push(this.gradeObjects[i]);
			}
		}
	}
	this.cYear = year;
	this.calculateStats();
  } 
  
  calculateStats(){
	this.wGPA = 0;
	this.fGPA = 0;
	this.sGPA = 0;
	this.cGPA = 0;
	var gpa = new gpaCalc();
	this.wGPA = gpa.getGPA(this.wGPA, this.wGrades);
	this.fGPA = gpa.getGPA(this.fGPA, this.fGrades);
	this.sGPA = gpa.getGPA(this.sGPA, this.sGrades);
	this.calculatecGPA();
  }
  
  calculatecGPA(){
	var counter = 0;
	//console.log(this.gradeObjects);
	if (this.gradeObjects.length > 0){
		for (var i in this.gradeObjects){
			this.cGPA = this.cGPA + this.convertGPA(this.gradeObjects[i].Grade); 
			counter = counter + 1;
		}
		this.cGPA = Number((this.cGPA/counter).toFixed(2));
	}
	else{
		this.cGPA = 0;
	}
  }
  
  
  convertGPA(grade){
	if (grade == "A+"){
		return 4.33;
	}
	else if (grade == "A"){
		return 4;
	}
	else if (grade == "A-"){
		return 3.67;
	}
	else if (grade == "B+"){
		return 3.33;
	}
	else if (grade == "B"){
		return 3;
	}
	else if (grade == "B-"){
		return 2.67;
	}
	else if (grade == "C+"){
		return 2.33;
	}
	else if (grade == "C"){
		return 2;
	}
	else if (grade == "C-"){
		return 1.67;
	}
	else if (grade == "D+"){
		return 1.33;
	}
	else if (grade == "D"){
		return 1.33;
	}
	else if (grade == "D-"){
		return 1;
	}
	else if (grade == "F"){
		return 0;
	}
	
  }
}
