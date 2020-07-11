import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import {appRoutingModule} from './app-routing.module';
import { RouterModule } from '@angular/router';
import { EdituserComponent } from './edituser/edituser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EdituserComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SocketIoModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
