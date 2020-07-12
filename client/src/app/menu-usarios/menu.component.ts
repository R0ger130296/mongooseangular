import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router,NavigationEnd} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebServiceService } from '../servicios/web.service.service';
import { GeneralService } from '../servicios/general.service'
// const getusuarios= environment.API_URL+ '/usuarios';
// const deleteusuarios = environment.API_URL+ '/usuario_delete/';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ NgxSpinnerService]
})
export class MenuComponent implements OnInit {
  navigationSubcription;
  user=[];
  private url: string;
  constructor(private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private servidor: WebServiceService,
    private usuarioServic:GeneralService) {
      this.url=servidor.getUrl();
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
    this.getUsers();
  }

  getUsers(): void {
    this.http
      .get(`${this.url}usuarios`, this.servidor.getHeaders())
      .subscribe((data: any) => {
        console.log(data)
        data.data.forEach((element) => {
          this.user.push(element);
        });
      });
  }
  public edit(user): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/edit']);
  }

  deleteuser(_id) {
    this.usuarioServic.delete('usuario_delete', _id);
    this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/menu']);
        });
  }
  // deleteuser(user){
  //   this.http.delete(deleteusuarios+`${user}`).subscribe(data=>{
  //     console.log(Object.values(data).length)
  //     if(Object.values(data).length===3){
  //       const Toast = Swal.fire({
  //         position: 'center',
  //         icon:'success',
  //         title:'Borrado',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     }
  //   })
  // }

}