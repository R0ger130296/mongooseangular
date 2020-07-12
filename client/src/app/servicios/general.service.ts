import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web.service.service';
import { PermisosService } from './permisos.service';
import { Datarx } from '../modelos/datarx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
private url:string;
  constructor(private http:HttpClient,
    private servidor: WebServiceService,
    private permisos:PermisosService) {
      this.url=servidor.getUrl()}


insert(endPoint: string,dataInsert:object):Array<any>{
let returndata:Array<any>=[];
this.http.post<Datarx>(`${this.url}${endPoint}`,dataInsert,this.servidor.getHeaders())
.subscribe(data=>{
  if(data.transaccion){
    returndata =data.data;
    this.permisos.decodificarToken(data.token);
  }else{
    const Toast = Swal.fire({
      position: 'top-right',
      icon:'error',
      title:`${data.msg}`,
      showConfirmButton: false,
      timer: 3000
    });
  }
});
return returndata;
}

delete(endPoint: string, _id: string): Array<any> {
  let returnData: Array<any> = [];
  this.http
    .delete<Datarx>(`${this.url}${endPoint}/${_id}`, this.servidor.getHeaders())
    .subscribe((data) => {
      if (data.transaccion) {
        returnData = data.data;
        this.permisos.decodificarToken(data.token);
      } else {
        alert(data.msg);
      }
    });
  return returnData;
}
put(endPoint: string, _id: string,Data: object): Array<any> {
  let returnData: Array<any> = [];
  this.http.put<Datarx>(
      `${this.url}${endPoint}/${_id}`,Data,this.servidor.getHeaders()
    )
    .subscribe((data) => {
      if (data.transaccion) {
        returnData = data.data;
        this.permisos.decodificarToken(data.token);
      } else {
      }
    });
  return returnData;
}
post(endPoint: string,dataSend: object): Array<any> {
  let returnData: Array<any> = [];
  this.http
    .post<Datarx>(
      `${this.url}${endPoint}`,
      dataSend,
      this.servidor.getHeaders()
    )
    .subscribe((data) => {
      if (data.transaccion) {
        returnData = data.data;
        this.permisos.decodificarToken(data.token);
      } else {
        alert(data.msg);
      }
    });
  return returnData;
}
}
// get():Array<any>{
// let returnData: Array<any>=[];
// this.http.get<Datarx>(`${this.url}usuarios`,this.servidor.obtenerHeaders())
// .subscribe(data=>{
//   if(data.trasanncion){
//     returnData = data.data;
//     console.log(returnData)
//     console.log(data.data)
//     this.permisos.decodificarToken(data.token);
//   }else{
//     const Toast = Swal.fire({
//       position: 'top-right',
//       icon:'error',
//       title:`${data.msg}`,
//       showConfirmButton: false,
//       timer: 3000
//     });
//   }
// });
// return returnData;
// }

