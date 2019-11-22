import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public accManage: any = true;
  public perManage: any = false;
  title = 'RAMSS2';
  
  toggleView(buttonName):any{
	this.hideAll();
	if (buttonName == "accManage"){
		this.accManage = "true";
	}
	else if(buttonName == "perManage"){
		this.perManage = "true";
	}
  }
  
  
  hideAll(){
	  this.accManage = false;
	  this.perManage = false;
  }
  
  
}
