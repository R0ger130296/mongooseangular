import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment} from '../../environments/environment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const loginapi= environment.API_URL+ '/login';;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      passw:["",Validators.required],
  }); 
  }


  singIn(){
   let email =this.loginForm.get('email').value;
   let password =this.loginForm.get('passw').value;
   if(this.loginForm.invalid){
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
         email,
         password,
       }
     };
     this.http.post(loginapi,loginData).subscribe(data=>{
     console.log(Object.values(data))
     let  token=(Object.values(data))
     sessionStorage.setItem('token1', JSON.stringify(token) );
     console.log(token.length)
     if(token.length===1){
       this.router.navigate(['menu'])
     }else{
      window.location.reload();
     }
    })
    }
  }
   
}
