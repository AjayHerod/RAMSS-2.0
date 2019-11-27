import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-info',
  templateUrl: './per-info.component.html',
  styleUrls: ['./per-info.component.css']
})
export class PerInfoComponent implements OnInit {

  formFields = ["First name", "Last name", "Address", "Phone number", "Email", "Emergency contact"];

  firstName: string;
  lastName: string;
  address: string;
  phoneNum: string;
  email: string;
  emergencyContact: string;
  public showSuccess:boolean=false;
  public successMsg:string;
  constructor() { }

  ngOnInit() {
	  this.loadUserInfo();
  }



  //Function gets personal information.
  loadUserInfo(){
	$.ajax({
		method: 'post',
		url: '/loadUser',
		contentType: 'application/json',
		success: (data) =>{
			console.log(data);
			var studentInfo = data[0];
			var fullName = studentInfo.Name.split(" ");
			this.firstName = fullName[0];
			this.lastName = fullName[1];
			this.address = studentInfo.Address;
			this.phoneNum = studentInfo.PhoneNumber;
			this.email = studentInfo.Email;
			this.emergencyContact = studentInfo.EmergencyContact;
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})
  }
  

  // Update personal info in database after form submission.
  submitUserInfo() {
	// send data using ajax
	this.hideAlerts();
	var address = (<HTMLInputElement>document.getElementById("address")).value;
	var phonenum = (<HTMLInputElement>document.getElementById("phonenum")).value;
	var email = (<HTMLInputElement>document.getElementById("email")).value;
	var emergencycontact = (<HTMLInputElement>document.getElementById("ec")).value;
	$.ajax({
		method: 'post',
		url: '/updateProfile',
		data: JSON.stringify({address:address, phonenum:phonenum, email:email, emergencycontact:emergencycontact}),
		contentType: 'application/json',
		success: (data) =>{
			this.loadUserInfo();
			this.changeSuccessAlert("Information successfully updated.");
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})
  
  }
  
  
changeSuccessAlert(message){
	this.hideAlerts();
	this.successMsg = message;
	this.showSuccess = true;
	window.scrollBy(0,-10000);
}
  
  hideAlerts(){
	this.showSuccess = false;
  }

}
