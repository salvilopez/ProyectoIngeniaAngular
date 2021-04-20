import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag/tag.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ExpertService } from 'src/app/services/expert/expert.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Expert } from 'src/app/models/expert/expert.model';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit ,DoCheck{
  @Input() expertDetail: any;
  telefonovisible:boolean=false;
  emailvisible:boolean=false;
  direccionvisible:boolean=false;
  linkedinvisible:boolean=false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  expDetail :any;
  expActualizado :any;
  selected: string = '';
  archivoCapturado:any;
  archivoBase64:any;
  expertSubscription: Subscription = new Subscription();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private expertService: ExpertService) {
  }
  ngDoCheck(): void {
    if(this.expertDetail!=undefined){
      this.expDetail=this.expertDetail;
    }
    if(this.expActualizado!==undefined){
      this.expDetail=this.expDetail;
      this.expActualizado=undefined;
    }
  }

  ngOnInit(): void {

  }

ocultar():string {

  return 'disabled';
}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let tag = new Tag(
        value.trim(),
        new Date(),
        'salvi@gmail.com',
        new Date()
      );
      tag.id=this.expDetail.tagList.length+1;
      this.expDetail.tagList.push(tag);
      this.actualizarExperto();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  actualizarExperto() {
    console.log("antes del update");
    this.expDetail.update_at=new Date();
    let body={
      ...this.expDetail,

    }
    console.log("--------------------")
    console.log("antes del update");
    console.log(body)
    console.log("--------------------")
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expActualizado = response;
      console.log("--------------------")
      console.log("depues del update");
      console.log(this.expActualizado)
      console.log("--------------------")
    });
  }
  remove(tag: Tag): void {
    const index = this.expDetail.tagList.indexOf(tag);

    if (index >= 0) {
      this.expDetail.tagList.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
  }



  verPdf(){
  //  console.log("descargando pdf")
  //  let doc = new jsPDF();
  //  var url = this.expDetail.fichero_cv
  //  var iframe ="<iframe width='100% height='100%' src'"+url+"'></iframe>";
  //  var x:any=window.open();
  //  x.document.open();
  ///  x.document.write(iframe)
  //  x.document.close();
   // document.location.href=url;
  }

  /**
 * Metodo para sub imagen del input y cambiarla a base64
 * @param event
 */


  showPreviewCv(event: any) {
    this.archivoCapturado = event.target.files[0];
    //
    //TODO---.- Importante de Leer ..------

   //TODO opcional porque el servidor no acepta tamaño de la imagen base64
   //TODO(cambiar por lo comentado de abajo , si el servidor admite Base64)

    //TODO----------------------------------------------
   this.expertService
     .extraerBase64(this.archivoCapturado)
    .then((base64: any) => {
      this.archivoBase64 = base64.base;
      this.expDetail.fichero_cv = base64.base;
      this.actualizarExperto()
     });
        //TODO----------------------------------------------
  }
}


