import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,} from '@angular/router';
import { GeneralService } from '../servicios/general.service';
// const updateuser = environment.API_URL+ '/update/';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent implements OnInit {
user:any;
userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usuarioService:GeneralService) { 
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.user = new this.user();
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:["",Validators.required],
      nombre:["",Validators.required],
      apellido:["",Validators.required],
      edad:["",Validators.required],
  }); 
  }
  update(){
    let nombre =this.userForm.get('nombre').value;
    let apellido =this.userForm.get('apellido').value;
    let edad =this.userForm.get('edad').value;
    let email =this.userForm.get('email').value;
    if(this.userForm.invalid){
      const Toast = Swal.fire({
        position: 'top-right',
        icon:'error',
        title:'Datos Requeridos',
        showConfirmButton: false,
        timer: 3000
      });
    }else{
      let Data = {
        data:{
          nombre,
          apellido,
          edad,
          email
        }
      };
     let user= this.usuarioService.put(
      'update',this.user._id,Data);
      if (user) {
        this.router.navigate(['/menu']);
        localStorage.clear();
      }
    }
  }
}
