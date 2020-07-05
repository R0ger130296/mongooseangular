import { Injectable } from '@angular/core';
import {SocketJWTService} from '../servicios/socket-jwt.service';
import {Documentos} from '../modelos/documentos';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  contador =0;
  documentoActual=this.socket.fromEvent<Documentos>('gestionDato');
  docs=this.socket.fromEvent<string[]>('gestionDatos')
  
  constructor(private socket:SocketJWTService) {

  }
  getDocumento(id:string){
  if(this.socket.ioSocket.connected){
    this.socket.emit('getDoc',id);
  }else{
    const Toast = Swal.fire({
      position: 'center',
      icon:'error',
      title:'Sin coneccion',
      showConfirmButton: false,
      timer: 3000
    });
  }
  }

  postDocumento(){
    this.socket.emit('addDoc',{id: this.docId(), doc:''});
  }

  editDocumento(doc:Documentos){
    this.socket.emit('editDoc',doc)
  }
 
  private docId(){
    this.contador ++;
    const text =`documento :) ${this.contador}`;
    return text;
  }
}
 