import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public accManage: any = true;
  public perManage: any = false;
  public courseSum: any = false;
  public manageCourses: any = false;
  public grades: any = false;
  public academic: any = false;
  public requests: any = false;
  title = 'RAMSS2.0';
  
  toggleView(buttonName):any{
	this.hideAll();
	if (buttonName == "accManage"){
		this.accManage = "true";
	}
	else if(buttonName == "perManage"){
		this.perManage = "true";
	}
	else if(buttonName == "courseSum"){
		this.courseSum = "true";
	}
	else if(buttonName == "manageCourses"){
		this.manageCourses = "true";
	}
	else if(buttonName == "grades"){
		this.grades = "true";
	}
	else if(buttonName == "academic"){
		this.academic = "true";
	}
	else if(buttonName == "requests"){
		this.requests = "true";
	}
  }
  
  
  hideAll(){
	  this.accManage = false;
	  this.perManage = false;
	  this.courseSum = false;
	  this.manageCourses = false;
	  this.grades = false;
	  this.academic = false;
	  this.requests = false;
  }
  
  
}
