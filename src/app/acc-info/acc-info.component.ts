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
  public courseFees: string = "";
  public grants: string = "";
  public comFees: string = "";
  public RSU: string = "";
  public RAC: string = "";
  public Printing: string = "";
  public Health: string = "";
  public ancFees: string = "";
  constructor() { }

  ngOnInit() {
	  $.ajax({
			method: 'post',
			url: '/loadAccount',
			contentType: 'application/json',
			success: (data) => {
				this.accBalance = "$"+ data[0][0].Balance.toString();
				this.schoolFees = "$"+ data[0][0].Fees.toString();
				this.balanceOwing = "$"+ data[1].toString();
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
	  })
	  
	  $.ajax({
			method: 'post',
			url: '/loadTuition',
			contentType: 'application/json',
			success: (data) => {
				this.grants = "$" + data[0][0].Grants.toString();
				this.comFees = "$" + data[1].toString();
				this.RSU = "$" +data[0][0].RSU.toString();
				this.RAC = "$" +data[0][0].RAC.toString();
				this.Printing = "$" +data[0][0].Printing.toString();
				this.Health = "$" +data[0][0].Health.toString();
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
	  })

  }




}
