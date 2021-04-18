import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRequest } from 'src/app/models/user/user-request.model';
import { UserResponse } from 'src/app/models/user/user-response.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  constructor(private authService: AuthService,   private snackBar: MatSnackBar,  private router: Router, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });

  }


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
          console.log(response)
          if (response.jwt) {
           this.snackBar.open(
              'Login realizado con exito',
            "",
              {
              duration: 2000,
               horizontalPosition: 'center',
              verticalPosition: 'top',
              }
            );
            sessionStorage.setItem('Token',"Jwt =  "+response.jwt);
            localStorage.setItem('username', user.email);
            this.authService.setLoggedIn(true);
            this.router.navigate(['/expertos']);
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
    } else {
      this.authService.setLoggedIn(false);
      this.snackBar.open('Error de el username y password', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

}
