import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosNuevoComponent } from './usuarios-nuevo.component';


const routes: Routes = [
  {path:'',component:UsuariosNuevoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosNuevoRoutingModule { }
