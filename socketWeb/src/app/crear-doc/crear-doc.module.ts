import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { CrearDocRoutingModule } from './crear-doc-routing.module';
import { CrearDocComponent } from './crear-doc.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ListaDocumentosComponent } from './lista-documentos/lista-documentos.component'
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketJWTService } from '../servicios/socket-jwt.service';
import { DocumentosService } from '../servicios/documentos.service'
@NgModule({
  declarations: [CrearDocComponent,
    DocumentosComponent,
    ListaDocumentosComponent
  ],
  imports: [
    CommonModule,
    CrearDocRoutingModule,
    FormsModule,
    SocketIoModule,
    RouterModule,
  ],
  providers:[DocumentosService,
    SocketJWTService
  ]
})
export class CrearDocModule { }
