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

}
