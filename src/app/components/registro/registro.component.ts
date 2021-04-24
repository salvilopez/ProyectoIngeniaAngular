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
  mensajeUserRepetido: boolean = false;
  fomuVal:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email]),],
      password: ['', Validators.required],
    });
  }


  get emailInvalido() {
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }
  get passInvalido() {
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
            "OK",
            'Registro Correcto',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/login']);
        },
        (error) => {
          switch (error.status) {
            case 400:
              this.snackBar.open(
                "Error: " + error.status,
                'Email Ya Existe en la Base de datos',
                {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
              break;
            default:
              break;
          }

          sessionStorage.removeItem('Token');
        }
      );
    }



  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}



