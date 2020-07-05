import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentosService } from '../../servicios/documentos.service';
import { Documentos } from '../../modelos/documentos';
import { Subscription } from 'rxjs';
import { startWith }  from 'rxjs/operators'

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit, OnDestroy {

  constructor(private doscService: DocumentosService ) { }
documento : Documentos;
private docSub:Subscription;

  ngOnInit(): void {
    this.gestionDoc()
  }
    gestionDoc(){
     this.docSub=this.doscService.documentoActual.pipe(
       startWith({id:'',doc:'Seleccione un documento o cree uno nuevo'})
     ).subscribe(documento=>{
       console.log(documento)
       this.documento=documento
      });
    }

    editDoc(){
      this.doscService.editDocumento(this.documento)
    }
    
  ngOnDestroy():void{
    this.docSub.unsubscribe();
  }
}
