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
	if (this.gradeObjects.length > 0){
		var gpa = new gpaCalc();
		this.cGPA = gpa.getGPA(this.cGPA, this.gradeObjects);
	}
	else{
		this.cGPA = 0;
	}
  }
}
