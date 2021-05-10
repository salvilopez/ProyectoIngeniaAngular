import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRequest } from 'src/app/models/user/user-request.model';
import { UserResponse } from 'src/app/models/user/user-response.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendEmailComponent } from '../dialog-send-email/dialog-send-email.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  formuVal:boolean = false;
  constructor(private authService: AuthService,   public dialog: MatDialog,  private snackBar: MatSnackBar,  private router: Router, private formBuilder: FormBuilder,) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email]), ],
      password: ['', Validators.required],
    });

  }

get emailInvalido(){
  return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
}
get passInvalido(){
  return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
}

  /**
   * Login
   */
  login(): void {
    if (
      this.loginForm.valid &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      let user: UserRequest = new UserRequest(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.authSubscription = this.authService.login(user).subscribe(
        (response:UserResponse) => {
          if (response.jwt) {
           this.snackBar.open(
              'Login realizado con exito',
            " Token Recibido Correctamente",
              {
              duration: 2000,
               horizontalPosition: 'center',
              verticalPosition: 'top',
              }
            );
            sessionStorage.setItem('Authorization',"Bearer "+response.jwt);
            localStorage.setItem('Authorization',"Bearer "+response.jwt);
            localStorage.setItem('username', this.loginForm.value.email);
            this.authService.setLoggedIn(true);
            this.router.navigate(['/expertos']);
          }else{
            this.router.navigate(['/login']);
            this.authService.setLoggedIn(false);
            sessionStorage.removeItem('Token')
          }
        },
        (error) => {

          this.snackBar.open(
            'Fallo en el Login',
            'Error: ' + error.status + ' : ',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.authService.setLoggedIn(false);
          sessionStorage.removeItem('Token')
        }
      );
    }
  }
  openDialog() {
    this.dialog.open(DialogSendEmailComponent);
  }
}
