import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public infoBody = "Select a request to learn more.";
  constructor() { }
  ngOnInit() {
  }
  
  setInfo1(){
  }
  setInfo2(){
	this.infoHeader = "Proof of Enrolment Letter - Verifies that you are currently or were previously enrolled in a program.";
	this.infoBody = "This letter can be used for RESP purposes. \n\
				Confirm a Current Student – confirms your enrolment status for the current term or academic year. If you are currently enrolled in courses for the Fall term only, your enrolment will only be confirmed for the Fall. For degree program students, we will confirm enrolment in course intentions if available on your Ryerson record.\
				Confirm you were enrolled at Ryerson – this confirms you were previously a student at Ryerson, program or courses and years of attendance.";
    this.infoFooter = "Charge per Letter: $20 per letter, additional copies $5";
  }
  
  setInfo4(){
	this.infoHeader = "Eligibility to Graduate Letter - Verifies that you have met all of your graduation requirements for your program although you have not yet officially graduated.";
	this.infoBody = "You should be in your final year/semester of study, have applied/will be applying to graduate. ";
	this.infoFooter = "Charge per Letter: $20 per letter, additional copies $5";
  }
  
  setInfo5(){
	this.infoHeader = "Jury Duty Letter - Current students must login to their Student Center via RAMSS to request a letter verifying student status, for exemption from Jury Duty. "
  }

}
