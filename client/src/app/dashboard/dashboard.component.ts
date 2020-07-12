import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:any[];
  admi:any[];
  estudiante:any[];
  constructor() {  if (sessionStorage.getItem("rol")) {
   this.user =  JSON.parse(sessionStorage.getItem("rol"))
    console.log(this.user.length)
    if(this.user.length===13){
    this.admi=this.user
    }if(this.user.length===10){
    this.estudiante=this.user
    }
  }
}

  ngOnInit(): void {
  }

}
