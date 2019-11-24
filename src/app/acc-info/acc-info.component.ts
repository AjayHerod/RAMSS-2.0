import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css']
})
export class AccInfoComponent implements OnInit {
	
  public accBalance: string = "";
  constructor() { }

  ngOnInit() {
	  $.ajax({
			method: 'post',
			url: '/loadAccount',
			contentType: 'application/json',
			success: (data) => {
				this.accBalance = data;
				//console.log(data);
			},
			error: function() {
				console.log("Failed to Retrieve");
			}
		})

  }




}
