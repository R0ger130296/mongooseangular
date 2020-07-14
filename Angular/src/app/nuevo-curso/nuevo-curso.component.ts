import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../servicios/general.service'

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {
  createcursoForm: FormGroup;
  navigationSubcription;
  constructor(private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: GeneralService) {  this.navigationSubcription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
   }

  ngOnInit(): void {
    this.createcursoForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      description: ['', [Validators.required]],
      asignatura: ['', [Validators.required]],
    });
  }
  createcurso(){   
    let titulo =this.createcursoForm.get('titulo').value;
    let profesor =this.createcursoForm.get('profesor').value;
    let description =this.createcursoForm.get('description').value;
    let asignatura =this.createcursoForm.get('asignatura').value;
     if (this.createcursoForm.invalid) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Todos los campos son requeridos',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        let datos = {
          data: {
            titulo,
            profesor,
            description,
            asignatura,
          },
        };
        let user = this.userService.post('insert_curso',datos)
         if (user) {
          this.router.navigate(['/cursos']);
        }
      }
    };
  }