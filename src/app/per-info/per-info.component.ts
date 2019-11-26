import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-info',
  templateUrl: './per-info.component.html',
  styleUrls: ['./per-info.component.css']
})
export class PerInfoComponent implements OnInit {

  info = [
    {fieldName: "First name", modifiable: false},
    {fieldName: "Last name", modifiable: false},
    {fieldName: "Address", modifiable: true},
    {fieldName: "Phone number", modifiable: true},
    {fieldName: "Email", modifiable: true},
    {fieldName: "Emergency contact", modifiable: true}
  ];

  constructor() { }

  ngOnInit() {
  }

}
