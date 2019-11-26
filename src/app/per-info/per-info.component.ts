import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-info',
  templateUrl: './per-info.component.html',
  styleUrls: ['./per-info.component.css']
})
export class PerInfoComponent implements OnInit {

  info = ["First name", "Last name", "Address", "Phone number", "Email", "Emergency contact"];
  
  constructor() { }

  ngOnInit() {
  }



  //Function gets personal information.
  loadUserInfo(){
	$.ajax({
		method: 'post',
		url: '/loadUser',
		contentType: 'application/json',
		success: (data) =>{
			console.log(data);
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	})
  }

}
