import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-test',
  templateUrl: './dashboard-test.component.html',
  styleUrls: ['./dashboard-test.component.scss']
})
export class DashboardTestComponent implements OnInit {

  iframeUrl:string="localhost:4201/"
  constructor() { }

  ngOnInit(): void {
  }

}
