import { Component, OnInit } from '@angular/core';
import {ancillaryFee} from './ancFee';
import {mandatoryFee} from './manFee';

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
  public ancFees: string = "";
  
  public manObjects = [];
  public ancObjects = [];
  public ancFee : ancillaryFee; 
  public manFee : mandatoryFee; 
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
				var fees = data[0][0]; //A Student's Mandatory Fees.
				
				for (var key in fees) {
					if(key !="Grants"){
					this.manFee = new mandatoryFee(key, fees[key]);
					this.manObjects.push(this.manFee);
					}
				}

				
				
				
				this.grants = "$" + data[0][0].Grants.toString();				
				this.comFees = "$" + data[1].toString();
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
	  })
	  
	  $.ajax({
			method: 'post',
			url: '/loadAncFees',
			contentType: 'application/json',
			success: (result) => {
				var stuAnc = result[0][0]; //A Student's Ancilary Fees.
				var ancData = result[1]; //The data for all ancilaries in the system.
				
				for (var key in stuAnc) {
					if (key != "StudentNo"){
						this.ancFee = new ancillaryFee(key, stuAnc[key], "", 0);
						this.ancObjects.push(this.ancFee); 
					}
				}
				
				for (var i in ancData){
					this.ancObjects[i].description = ancData[i].Description;
					this.ancObjects[i].cost = ancData[i].Cost;
				}
		
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
	  })

  }




}
