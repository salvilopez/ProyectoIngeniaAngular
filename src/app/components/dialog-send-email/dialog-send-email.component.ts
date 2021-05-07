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
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  checkpassword() {
    console.log(this.emailForm.value.email)
    this.authService.passolvidada(this.emailForm.value.email).subscribe((response) => {
      console.log(response)
      this.emailexiste = response

    })
  }

  newPassword(){}
  passwordOlvided() {
    if (
      this.emailForm.valid &&
      this.emailForm.value.email
    ) {
      let email =this.emailForm.value.email

        this.emailSubscription = this.authService.passolvidada(email).subscribe(
          (response) => {

            if (response) {

            } else {
              this.snackBar.open(
                'Error 403',
                " Email no existe en Base de datos",
                {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
            }





          }, (error) => {
            console.log(error)
          }
        );
    }
    this.closeDialog();
    this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/login"]));
  }




}
