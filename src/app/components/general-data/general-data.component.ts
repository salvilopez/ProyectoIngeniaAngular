import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag/tag.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ExpertService } from 'src/app/services/expert/expert.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Expert } from 'src/app/models/expert/expert.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from 'src/app/services/tag/tags.service';
import { data } from 'jquery';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit {
  @Input() expertDetail: any;
  telefonovisible: boolean = false;
  emailvisible: boolean = false;
  direccionvisible: boolean = false;
  linkedinvisible: boolean = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  expDetail: any;
  expActualizado: any;
  selected: string = '';
  archivoCapturado: any;
  archivoBase64: any;
  nombreUsu:any;
  tagCreada:any;
  expertSubscription: Subscription = new Subscription();
  tagSubscription: Subscription = new Subscription();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private expertService: ExpertService,private snackBar: MatSnackBar, private tagService:TagsService) {
  }

  ngOnInit(): void {


    if(this.expertDetail!=undefined){
      this.expDetail=this.expertDetail;
    }
    if(this.expActualizado!==undefined){
      this.expDetail=this.expDetail;
      this.expActualizado=undefined;
    }
  }
  ocultar(): string {

    return 'disabled';
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let nomCreador:any=localStorage.getItem("username");
    let tag: Tag = new Tag(value,new Date(),nomCreador,new Date())
    tag.id=undefined;
    if ((value || '').trim()) {
          this.addTag(tag)
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  addTag( tag:Tag) {
      this.tagSubscription = this.tagService.createTags(tag).subscribe(
        (response) => {
         this.tagCreada=response
         this.expDetail.tagList.push(this.tagCreada);
         this.actualizarExperto();
        },
        (error) => {
         console.log(error.message)
        }
      );
  }


  actualizarExperto() {
    this.expDetail.update_at = new Date();
    let body = {
      ...this.expDetail,
    }
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expActualizado = response;
      this.snackBar.open(
        'Actualizacion Correcta',
        ``,
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
    },(error)=>{
      this.snackBar.open(
        'Fallo al actualizar',
        ``,
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
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

  verPdf() {
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


