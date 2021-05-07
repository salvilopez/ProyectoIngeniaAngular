import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dialog-new-pass',
  templateUrl: './dialog-new-pass.component.html',
  styleUrls: ['./dialog-new-pass.component.scss']
})
export class DialogNewPassComponent implements OnInit {
  emailnoexiste=false;
  passwordForm: FormGroup = new FormGroup({});
  emailSubscription: Subscription = new Subscription();
  email="";
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:{email:string},
    public dialogRef: MatDialogRef<DialogNewPassComponent>){}
  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
  }
  ngOnInit(): void {

    this.email=JSON.parse(this.data.email)
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  passwordOlvided() {
    if (
      this.passwordForm.valid &&
      this.passwordForm.value.password
    ) {


      console.log(this.passwordForm.value.password);
      this.emailSubscription = this.authService.nuevoEmail(this.email,this.passwordForm.value.password).subscribe(
        (response) => {
          this.snackBar.open(
            'OK!',
          " Contraseña Cambiada Correctamente Revise su Email",
            {
            duration: 2000,
             horizontalPosition: 'center',
            verticalPosition: 'top',
            }
          );
        },
        (error) => {
         
        }
      );
    }
    this.closeDialog();
    this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
    this.router.navigateByUrl('/login', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/login"]));
}


}


