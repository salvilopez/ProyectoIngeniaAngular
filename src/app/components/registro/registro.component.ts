import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserRequest } from 'src/app/models/user/user-request.model';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email]), ],
      password: ['', Validators.required],
    });
  }


get emailInvalido(){
  return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
}
get passInvalido(){
  return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
}
/**
 * Metodo de registro
 */
  submitRegisterForm() {
    if (
      this.registerForm.valid &&
      this.registerForm.value.email &&
      this.registerForm.value.password
    ) {
      let user: UserRequest = new UserRequest(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.authSubscription = this.auth.register(user).subscribe(
        (response) => {
            this.snackBar.open(
              'Registro realizado con exito',
              ``,
              {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
        },
        (error) => {
          this.snackBar.open(
            'Fallo en el Registro',
            'Error: ' + error.status + '  Introduce el usuario y el email Correcto',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          sessionStorage.removeItem('Token');
        }
      );
    }


    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}



