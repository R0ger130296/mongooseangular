import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { UsuariosNuevoRoutingModule } from './usuarios-nuevo-routing.module';
import { UsuariosNuevoComponent } from './usuarios-nuevo.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [UsuariosNuevoComponent],
  imports: [
    CommonModule,
    UsuariosNuevoRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsuariosNuevoModule { }
