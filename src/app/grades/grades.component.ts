import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor() { }

  public years = []; 
  public queryYear: string = "";
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
				console.log(data[i]);
				this.years.push(data[i].Year);
			}				
			this.years = (this.years).filter(this.onlyUnique);
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
    })
  }
  
  filterGrades(){
	  
	  
  } 
}
