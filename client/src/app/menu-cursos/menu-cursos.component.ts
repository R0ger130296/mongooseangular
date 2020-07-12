import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router,NavigationEnd} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebServiceService } from '../servicios/web.service.service';
import { GeneralService } from '../servicios/general.service'
@Component({
  selector: 'app-menu-cursos',
  templateUrl: './menu-cursos.component.html',
  styleUrls: ['./menu-cursos.component.scss']
})
export class MenuCursosComponent implements OnInit {
  navigationSubcription;
  curso=[];
  private url: string;
  user:any[];
  admi:any[];
  estudiante:any[];
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
      if (sessionStorage.getItem("rol")) {
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
   this.getCursos();
  }
  getCursos(): void {
    this.http
      .get(`${this.url}cursos`, this.servidor.getHeaders())
      .subscribe((data: any) => {
        console.log(data)
        data.data.forEach((element) => {
          this.curso.push(element);
        });
      });
  }
  public edit(curso): void {
    sessionStorage.setItem('curso', JSON.stringify(curso));
    this.router.navigate(['/edit-curso']);
  }

  deletecursor(_id) {
    this.usuarioServic.delete('curso_delete', _id);
    this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cursos']);
        });
  }
}

