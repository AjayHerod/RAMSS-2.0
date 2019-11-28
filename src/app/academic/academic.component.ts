import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})
export class AcademicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	$.ajax({
		method: 'post',
		url: '/loadCalendar',
		contentType: 'application/json',
		success: (data) => {
			console.log(data);
		},
		error: function() {
			console.log("Failed to connect to server");
		}
	 }) 
	
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

