import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosNuevoRoutingModule } from './usuarios-nuevo-routing.module';
import { UsuariosNuevoComponent } from './usuarios-nuevo.component';


@NgModule({
  declarations: [UsuariosNuevoComponent],
  imports: [
    CommonModule,
    UsuariosNuevoRoutingModule
  ]
})
export class UsuariosNuevoModule { }
