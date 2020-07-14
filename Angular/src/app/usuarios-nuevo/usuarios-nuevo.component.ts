import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../servicios/general.service';
import { FileService } from '../servicios/file.service';
import { Datarx } from '../modelos/datarx'
// const createuser = environment.API_URL + '/insert';
@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.scss'],
  providers: [NgxSpinnerService],
})
export class UsuariosNuevoComponent implements OnInit {
  createuserForm: FormGroup;
  verFile: any;
  navigationSubcription;
  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: GeneralService,
    private fileService: FileService
  ) {
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
      verifypassw: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
    this.verFile = this.fileService.obtenerFile(
      'galeria',
      'M3RSqMLHQB4ZBqpz9rpwrY7q.png'
    );
  }
  changeFile(event): void {
    let imagen = this.createuserForm.get('file').value;
    if (imagen !== 'M3RSqMLHQB4ZBqpz9rpwrY7q.png') {
      this.fileService.deleteFile('galeria', imagen);
    }
    const filename = event.target.files;
    console.log(filename)
    this.fileService.guardarFile(filename).subscribe((data:Datarx)=>{
      console.log(data)
      if(data.transaccion){
        imagen = data.data[0];
        console.log(imagen)
        this.verFile=this.fileService.obtenerFile('galeria',imagen)
      }
    })
  }
  createuser() {
    let nombre = this.createuserForm.get('nombre').value;
    let apellido = this.createuserForm.get('apellido').value;
    let edad = this.createuserForm.get('edad').value;
    let email = this.createuserForm.get('email').value;
    let passw = this.createuserForm.get('passw').value;
    let verifypassw = this.createuserForm.get('verifypassw').value;
    if (this.createuserForm.valid) {
      if (passw != verifypassw) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No conisiden las contraseñas',
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
        let user = this.userService.post('insert', datos);
        if (user) {
          this.router.navigate(['/menu']);
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
