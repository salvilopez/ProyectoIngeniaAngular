import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { Expert } from 'src/app/models/expert/expert.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { ExpertService } from 'src/app/services/expert/expert.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-expert-form',
  templateUrl: './new-expert-form.component.html',
  styleUrls: ['./new-expert-form.component.scss'],
})
export class NewExpertFormComponent implements OnInit {
  addExpertForm: FormGroup = new FormGroup({});
  listaTags: Tag[] = [];
  expertSubscription: Subscription = new Subscription();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private expertService: ExpertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addExpertForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        nif: ['', Validators.required],
        contacto_telefono: ['', Validators.compose([ Validators.required,Validators.pattern('[0-9]{9}'), ]), ],
      contacto_email: ['', Validators.compose([Validators.required, Validators.email]), ],
      contacto_ciudad: ['', Validators.required],
      contacto_linkedin: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      tagList: '',
    });

  }
  get nombreinvalido(){
    return this.addExpertForm.get('nombre')?.invalid && this.addExpertForm.get('nombre')?.touched;
  }
  get nifinvalido(){
    return this.addExpertForm.get('nif')?.invalid && this.addExpertForm.get('nif')?.touched;
  }
  get telefonoinvalido(){
    return this.addExpertForm.get('contacto_telefono')?.invalid && this.addExpertForm.get('contacto_telefono')?.touched;
  }
  get emailinvalido(){
    return this.addExpertForm.get('contacto_email')?.invalid && this.addExpertForm.get('contacto_email')?.touched;
  }
  get ciudadinvalido(){
    return this.addExpertForm.get('contacto_ciudad')?.invalid && this.addExpertForm.get('contacto_ciudad')?.touched;
  }
  get linkedininvalido(){
    return this.addExpertForm.get('contacto_linkedin')?.invalid && this.addExpertForm.get('contacto_linkedin')?.touched;
  }
  get disponibilidadinvalido(){
    return this.addExpertForm.get('disponibilidad')?.invalid && this.addExpertForm.get('disponibilidad')?.touched;
  }
  /**
   * Metodo Crear Un experto
   */
  addExpertMethod(): void {
    if (
      this.addExpertForm.valid &&
      this.addExpertForm.value.nombre &&
      this.addExpertForm.value.nif &&
      this.addExpertForm.value.contacto_telefono &&
      this.addExpertForm.value.contacto_email &&
      this.addExpertForm.value.contacto_ciudad &&
      this.addExpertForm.value.contacto_linkedin &&
      this.addExpertForm.value.disponibilidad &&
      this.listaTags !== []
    ) {
      let experto: Expert = new Expert(this.addExpertForm.value.nombre, new Date(),new Date(),this.addExpertForm.value.nif,
        this.addExpertForm.value.disponibilidad, '',false,this.addExpertForm.value.contacto_telefono,this.addExpertForm.value.contacto_email,
        this.addExpertForm.value.contacto_ciudad,this.addExpertForm.value.contacto_linkedin, 0, 0,0,this.addExpertForm.value.nif,
        this.addExpertForm.value.contacto_email,'','', '', '', '','', '', 'pendiente' );
      experto.tagList = this.listaTags;
      this.expertSubscription = this.expertService
        .createExpert(experto)
        .subscribe((result) => {
          this.snackBar.open(
            '',
            `Experto creado correctamente`,
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
        },(error)=>{
          this.snackBar.open(
            '',
            error.message,
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
        });
    }

    this.reloadCurrentRoute();
  }

  /**
   * MEtodo para añadir la etiqueta a la lista de etiquetas
   * @param event
   */
  addTag(event: any): void {
    const value = event.target.value;
    if (value != '') {
      let nomCreador: any = localStorage.getItem('username');

      let tagnuevo = {};
      let tag1: Tag = new Tag(value, new Date(), nomCreador, new Date());

      let nombreTag = value.toString();

      let nuevaEtiqueta = {
        id: undefined,
        nombre: nombreTag,
        creador: nomCreador,
        created_at: new Date(),
        updated_at: new Date(),
        expertList: undefined,
      };
      if ((value || '').trim()) {
        this.listaTags.push(nuevaEtiqueta);
      }
    }
  }
  /**
   * MEtodo actualizar la ruta al añadir el experto
   */
  reloadCurrentRoute() {
   this.router
    .navigateByUrl('/addexperto', { skipLocationChange: true })
    .then(() => this.router.navigate(['/expertos']));
    window.location.reload();
  }
}
