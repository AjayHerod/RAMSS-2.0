import { Component, OnInit } from '@angular/core';
import { requestLog } from './requestLog';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public infoHeader: string = "";
  public infoBody:string = "Select a request to learn more.";
  public infoFooter: string = "";
  public showButton: boolean = false;
  public cRequest: string = "";
  public rLog : requestLog;
  public rObjects = [];
  public test = "test";
  public failureMsg = "Failed";
  public successMsg = "Request Completed. You can track its completion in View Requests.";
  public showSuccess: boolean = false;
  public showFailure: boolean = false;
  
  constructor() { }
  
  ngOnInit() {  
	
  }

  
  revealButton(){
	this.showButton = true;
  }
  
  setInfo1(){
	this.infoHeader = "Official Transcript";
	this.infoBody= "An official Ryerson transcript is a complete record of a student's enrollment at Ryerson University including all undergraduate, graduate and continuing education courses, as well as credits granted towards your program.";
	this.infoFooter = "The cost per transcript is $15 (If Fax, charge not included). To order transcripts via RAMSS, you must have a valid Visa, MasterCard or AMEX.";
	this.cRequest = "Official Transcript";
  }
  
  setInfo2(){
	this.infoHeader = "Proof of Enrolment Letter - Verifies that you are currently or were previously enrolled in a program.";
	this.infoBody = "This letter can be used for RESP purposes. \n\
				Confirm a Current Student – confirms your enrolment status for the current term or academic year. If you are currently enrolled in courses for the Fall term only, your enrolment will only be confirmed for the Fall. For degree program students, we will confirm enrolment in course intentions if available on your Ryerson record.\
				Confirm you were enrolled at Ryerson – this confirms you were previously a student at Ryerson, program or courses and years of attendance.";
    this.infoFooter = "Charge per Letter: $20 per letter, additional copies $5";
	this.cRequest = "Proof of Enrolment";
  }
  
  setInfo3(){
	this.infoHeader = "Confirmation of Graduation Status Letter";
	this.infoBody = "Verifies that you have officially graduated including year of graduation, degree/diploma/certificate and program. ";
	this.infoFooter = "Charge per Letter: Free of charge";
	this.cRequest = "Confirmation of Graduation Status Letter";
  }
  
  setInfo4(){
	this.infoHeader = "Eligibility to Graduate Letter - Verifies that you have met all of your graduation requirements for your program although you have not yet officially graduated.";
	this.infoBody = "You should be in your final year/semester of study, have applied/will be applying to graduate. ";
	this.infoFooter = "Charge per Letter: $20 per letter, additional copies $5";
	this.cRequest = "Eligibility to Graduate Letter";
  }
  
  setInfo5(){
	this.infoHeader = "Jury Duty Letter"
	this.infoBody = "Current students must login to their Student Center via RAMSS to request a letter verifying student status, for exemption from Jury Duty.";
	this.infoFooter = "Charge per Letter: Free of charge";
	this.cRequest = "Jury Duty Letter";
  }

  setInfo6(){
	this.infoHeader = "Transfer Credit Equivalency Letter - Identifies course(s) from other institutions that were used to grant credit towards a Ryerson program or certificate.";
	this.infoBody = "Note: request this letter if you were a Direct Entry transfer student from a college. This type of 'block' transfer credit does not show on your official transcript. Other transfer credit does. ";
	this.infoFooter = "Charge per Letter: $20 per letter, additional copies $5";
	this.cRequest = "Transfer Credit Equivalency Letter";
  }
  

  
  sendRequest(){
	this.showFailure=false;
	this.showSuccess=false;
	$.ajax({
		method: 'POST',
		url: '/loadUser',
		contentType: 'application/json',
		success: (data) => {
			if (data[0].Address != ""){
				$.ajax({
					method: 'POST',
					url: '/Request',
					data: JSON.stringify({type: this.cRequest}),
					contentType: 'application/json',
					success: (data) => {
						if (data == "failure"){
							this.failureMsg = "You have a request pending for this document.";
							this.showFailure=true;
							window.scrollBy(0,-1000);
						}
						else if(data == "succeed"){
							this.showSuccess=true;
							window.scrollBy(0,-1000);
						}
					}
				})
			}
			else{
				this.failureMsg = "You do not have an address attached to your account.";
				this.showFailure=true;
				window.scrollBy(0,-1000);
			}
		}
	})
	  
	  
	
  }
  
  openRequestModal(){
	this.rObjects = [];
	$.ajax({
		method: 'post',
		url: '/loadRequests',
		contentType: 'application/json',
		success: (data) =>{
			for (var i in data){
				var rLog = new requestLog(data[i].Type, data[i].Date, data[i].Status);
				this.rObjects.push(rLog);
			}
			$('#reqModal').modal('show');
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})
	
  }
}
