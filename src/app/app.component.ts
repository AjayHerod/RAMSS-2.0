import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public accManage: any = true;
  title = 'RAMSS2';
  
  toggleAcc():any{
	if (this.accManage == true){
		this.accManage = false;
	}
	else{
		this.accManage = true;
	}
  }
  
  
  
  
}
