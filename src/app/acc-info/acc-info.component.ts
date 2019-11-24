import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css']
})
export class AccInfoComponent implements OnInit {
	
  public accBalance: string = "";
  public schoolFees: string = "";
  public balanceOwing: string = "";
  constructor() { }

  ngOnInit() {
	  $.ajax({
			method: 'post',
			url: '/loadAccount',
			contentType: 'application/json',
			success: (data) => {
				this.accBalance = "$"+ data[0].toString();
				this.schoolFees = "$"+ data[1].toString();
				this.balanceOwing = "$"+ data[2].toString();
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})

  }




}
