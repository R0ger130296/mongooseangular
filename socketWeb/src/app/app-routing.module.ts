import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { EdituserComponent } from './edituser/edituser.component'
import { DashboardComponent } from './dashboard/dashboard.component'
const routes: Routes = [
    {path:'',redirectTo: '/login', pathMatch: 'full'},
    {path: 'login',component: LoginComponent},
    {path:'edit',component: EdituserComponent},
    {path:'home',component: DashboardComponent},
    {
        path: 'menu',loadChildren:()=>
        import('./menu-usarios/menu.module')
        .then((m)=>m.MenuModule)},
    {
        path: 'usuarios-nuevo',loadChildren:()=>
        import('./usuarios-nuevo/usuarios-nuevo.module')
        .then((m)=>m.UsuariosNuevoModule)},
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class appRoutingModule{}