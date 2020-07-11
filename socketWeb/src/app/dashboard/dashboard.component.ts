import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:any[];

  constructor() {  if (sessionStorage.getItem("user")) {
   this.user =  JSON.parse(sessionStorage.getItem("rol"));
    console.log(this.user)
  }
}

  ngOnInit(): void {
  }

}
