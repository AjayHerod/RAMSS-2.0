import { Component, OnInit } from '@angular/core';
import {ancillaryFee} from './ancFee';
import {mandatoryFee} from './manFee';
import {courseFee} from './courseFee';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css']
})
export class AccInfoComponent implements OnInit {
	
  public accBalance: string = "";
  public schoolFees: string = "";
  public balanceOwing: string = "";
  public courseFees: number;
  
  public grants: string = "";
  
  public comFees: string = "";
  public ancFees: number;
  
  public manObjects = [];
  public ancObjects = [];
  public courseObjects = [];
  public payments= [];
  
  public courseFee : courseFee; 
  public ancFee : ancillaryFee; 
  public manFee : mandatoryFee; 

  public modalHeader: string = "";
  public modalBody: string="";

  public OIButton: boolean = false;
  public OOButton: boolean = false;


  constructor() { }

  ngOnInit() {	  
    $.ajax({
		method: 'post',
		url: '/loadCourses',
		contentType: 'application/json',
		success: (data) => {
			for (var i in data){
				this.courseFee = new courseFee(data[i].CourseCode, data[i].Cost);
				this.courseObjects.push(this.courseFee);
			}
			this.courseFees = 0;
			for (var i in this.courseObjects){
				this.courseFees = this.courseFees + this.courseObjects[i].cost;
			}
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
			
			this.grants = data[0][0].Grants.toString();				
			this.comFees = data[1].toString();
		},
		error: function() {
			console.log("Failed to Retrieve data");
		}
	  })
	  this.loadAncFees();
	  this.loadPaymentsMade();
    }

	openModal(object){
		$('#ancModal').modal('show');
		this.modalHeader = object.name;
		this.modalBody = "Description: "+ object.description;
		if (object.opt == 0){
			this.OIButton = true;
			this.OOButton = false;
		}else{
			this.OOButton = true;
			this.OIButton = false;
		}
	}
	
	optIn(){
		$.ajax({
			method: 'POST',
			url: '/OptIn',
			data: JSON.stringify({name:this.modalHeader}),
			contentType: 'application/json',
			success: function(data) {
				$('#ancModal').modal('hide');
			}
        })
		this.loadAncFees();
	}
	

	optOut(){
		$.ajax({
			method: 'POST',
			url: '/OptOut',
			data: JSON.stringify({name:this.modalHeader}),
			contentType: 'application/json',
			success: function(data) {
				$('#ancModal').modal('hide');
			}
        })
		this.loadAncFees();
		
	}
	
	loadAccount(){
		this.accBalance = "";
		this.schoolFees = "";
		this.balanceOwing = "";
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
	}
	
	
	
	loadAncFees(){
		this.ancObjects = [];
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
					if (this.ancObjects[i].opt == 1){
						this.ancObjects[i].cost = ancData[i].Cost;
					}
					else{
						this.ancObjects[i].cost = 0;
					}
				}
		
				this.ancFees = 0;
				for (var i in this.ancObjects){
					this.ancFees = this.ancFees + this.ancObjects[i].cost;
				}
				
				this.loadAccount();
		
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}
	
	loadPaymentsMade(){
		this.payments = [];
		$.ajax({
			method: 'post',
			url: '/loadPaymentsMade',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
				for (var key in data[0]){
					if (key != "StudentNo"){
						this.payments.push(key+": $"+data[0][key]);
					}
				}
				
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
    })
	}

}
