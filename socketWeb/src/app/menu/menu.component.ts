import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { Router,NavigationEnd} from '@angular/router';
import { environment} from '../../environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';

const getusuarios= environment.API_URL+ '/usuarios';
const deleteusuarios = environment.API_URL+ '/usuario_delete/';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ NgxSpinnerService]
})
export class MenuComponent implements OnInit {
  navigationSubcription;
  user:any
  constructor(private spinner: NgxSpinnerService,private http: HttpClient,private router: Router) {
    this.navigationSubcription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
   }

  ngOnInit(): void {
    this.getuser()
  }

getuser(){
this.http.get(getusuarios).subscribe(data=>{
  let datos=Object.values(data)
  datos.forEach(element => {
    this.user=element
    console.log(element)
  });
})
}

deleteuser(user){
  this.http.delete(deleteusuarios+`${user}`).subscribe(data=>{
    console.log(Object.values(data).length)
    if(Object.values(data).length===3){
      const Toast = Swal.fire({
        position: 'center',
        icon:'success',
        title:'Borrado',
        showConfirmButton: false,
        timer: 3000
      });
    }
  })
}
public edit(user): void {
  sessionStorage.setItem('user', JSON.stringify(user));
  this.router.navigate(['/edit']);
}

}
