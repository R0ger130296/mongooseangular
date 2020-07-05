import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { EdituserComponent } from './edituser/edituser.component'
const routes: Routes = [
    {path:'',redirectTo: '/login', pathMatch: 'full'},
    {path: 'login',component: LoginComponent},
    {path:'edit',component: EdituserComponent},
    {
        path: 'menu',loadChildren:()=>
        import('./menu/menu.module')
        .then((m)=>m.MenuModule)},
    {
        path: 'usuarios-nuevo',loadChildren:()=>
        import('./usuarios-nuevo/usuarios-nuevo.module')
        .then((m)=>m.UsuariosNuevoModule)},
    {
        path: 'crear-doc',loadChildren:()=>
        import('./crear-doc/crear-doc.module')
        .then((m)=>m.CrearDocModule)
    },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class appRoutingModule{}