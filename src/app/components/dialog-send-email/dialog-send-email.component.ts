import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dialog-send-email',
  templateUrl: './dialog-send-email.component.html',
  styleUrls: ['./dialog-send-email.component.scss']
})
export class DialogSendEmailComponent implements OnInit {
  emailexiste = false;
  email="";
  emailForm: FormGroup = new FormGroup({});
  emailSubscription: Subscription = new Subscription();
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogSendEmailComponent>) { }
  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
      password:['',Validators.required]
    });
  }
  get passInvalido(){
    return this.emailForm.get('password')?.invalid && this.emailForm.get('password')?.touched;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  checkpassword() {
    this.email=this.emailForm.value.email;
    this.authService.passolvidada(this.email).subscribe((response) => {
      console.log(response)
      this.emailexiste = response

    })
  }


  newPassword() {

alert("hola")


      this.email=this.emailForm.value.email
      let password= this.emailForm.value.password
      console.log("email => "+this.email)
      console.log("password =>"+password)
        this.emailSubscription = this.authService.nuevoPAss(this.email,password).subscribe(
          (response) => {
            alert("passok")
         
              this.snackBar.open(
                'ok!',
                " Contraseña cambiada correctamente",
                {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
              this.closeDialog();
              this.reloadCurrentRoute();
          }, (error) => {
            alert("fail")
            console.log(error)
          }
        );
    

  }
  reloadCurrentRoute() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/login"]));
  }




}
