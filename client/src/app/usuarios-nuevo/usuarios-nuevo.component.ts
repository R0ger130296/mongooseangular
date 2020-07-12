import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../servicios/general.service'

// const createuser = environment.API_URL + '/insert';
@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.scss'],
  providers: [ NgxSpinnerService]
})
export class UsuariosNuevoComponent implements OnInit {
  createuserForm: FormGroup;
  navigationSubcription;
  constructor(private spinner: NgxSpinnerService,
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private router: Router,
  private userService: GeneralService) {
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
    this.createuserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      passw: ['', [Validators.required]],
    });
  }
createuser(){   
  let nombre =this.createuserForm.get('nombre').value;
  let apellido =this.createuserForm.get('apellido').value;
  let edad =this.createuserForm.get('edad').value;
  let email =this.createuserForm.get('email').value;
  let passw =this.createuserForm.get('passw').value;
   if (this.createuserForm.invalid) {
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
          nombre,
          apellido,
          edad,
          email,
          passw,
          rol: 'estudiante',
        },
      };
      let user = this.userService.post('insert',datos)
       if (user) {
        this.router.navigate(['/menu']);
      }
    }
  };
}