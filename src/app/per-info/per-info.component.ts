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
  }

}
