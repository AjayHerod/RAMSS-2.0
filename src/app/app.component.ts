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
  public loggedIn: boolean = false;

  public studentNo: string = "";
  public username: string="";
  public password: string="";
  
  title = 'RAMSS2.0';
  
  ngOnInit() {  
	this.checkLogin();
  }
  
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
  login(){
	$.ajax({
		method: 'post',
		url: '/loadLogin',
		contentType: 'application/json',
		data: JSON.stringify({username: this.username, password:this.password}),
		success: (data) =>{
			document.cookie = "studentNo="+data[0].StudentNo;
			this.checkLogin();
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})
  }
  
  checkLogin(){
	if (document.cookie.length>10){
		this.loggedIn=true;
		console.log(document.cookie);
		console.log((document.cookie.split(";")[0]).split("=")[1]);
		this.studentNo = document.cookie.split(";")[0].split("=")[1];
	}
	else{
		this.loggedIn=false;
	}
	
  }
  
  logout(){
	document.cookie = "studentNo=";
	this.checkLogin();
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
