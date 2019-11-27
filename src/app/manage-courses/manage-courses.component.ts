import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
	this.fallYear = 2019;
	this.winterYear = 2020;
	this.summerYear = 2020;
  }

  chooseFall(){
	$(".btn").removeClass("active");
    $('#fallButton').addClass('active');
  }

  chooseWinter(){
	$(".btn").removeClass("active");
    $('#winterButton').addClass('active');
  }

  chooseSummer(){
	$(".btn").removeClass("active");
    $('#summerButton').addClass('active');
  }

}
