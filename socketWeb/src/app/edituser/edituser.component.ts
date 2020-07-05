import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { environment} from '../../environments/environment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationEnd} from '@angular/router';
const updateuser = environment.API_URL+ '/update/';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent implements OnInit {
user:any;
userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router) { 
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
  update(user){
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
      let loginData = {
        data:{
          nombre,
          apellido,
          edad,
          email
        }
      };
      this.http.put(updateuser+`${user._id}`,loginData).subscribe(data=>{
      console.log(Object.values(data).length)
      if(Object.values(data).length===3){
        this.router.navigate(['/menu']);
        }else{
          const Toast = Swal.fire({
            position: 'top-right',
            icon:'error',
            title:'Datos no Actualizados',
            showConfirmButton: false,
            timer: 3000
          });
        } 
      });
    }
  }
}
