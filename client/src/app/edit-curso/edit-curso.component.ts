import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,} from '@angular/router';
import { GeneralService } from '../servicios/general.service';
@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.scss']
})
export class EditCursoComponent implements OnInit {
  curso:any;
  cursoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usuarioService:GeneralService) {  if (sessionStorage.getItem("curso")) {
      this.curso = JSON.parse(sessionStorage.getItem("curso"));
    } else {
      this.curso = new this.curso();
    }
  }
  ngOnInit(): void {
    this.cursoForm = this.formBuilder.group({
      titulo:["",Validators.required],
      profesor:["",Validators.required],
      description:["",Validators.required],
      asignatura:["",Validators.required],
  });
  }
  update(){
    let titulo =this.cursoForm.get('titulo').value;
    let profesor =this.cursoForm.get('profesor').value;
    let description =this.cursoForm.get('description').value;
    let asignatura =this.cursoForm.get('asignatura').value;
    if(this.cursoForm.invalid){
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
          titulo,
          profesor,
          description,
          asignatura
        }
      };
     let curso= this.usuarioService.put(
      'update_curso',this.curso._id,Data);
      if (curso) {
        this.router.navigate(['/cursos']);
        localStorage.clear();
      }
    }
  }
}
