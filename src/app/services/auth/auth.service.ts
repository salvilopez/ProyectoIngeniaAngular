import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserRequest } from 'src/app/models/user/user-request.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * usuario para el login
   * @param user Usuario para el login
   * @returns observable el usuario con el token del login
   */
  login(user: UserRequest): Observable<any> {
    let body = {
      email: user.email,
      password: user.password,

     };
    return this.http.post('http://localhost:8082/auth/login', body);
  }
/**
 * Metodo para Actualizar Usuario
 * @param usu
 * @returns
 */
  actualizarUser(usu: User): Observable<User> {

    return this.http.put<User>('http://localhost:8082/auth/username',usu);
  }
  /**
   *  Metodo pra obtener User oir Username
   * @param username
   * @returns
   */
  getbyUsername(username: string): Observable<User> {

    return this.http.get<User>('http://localhost:8082/auth/username/'+username);
  }
  /**
   * Metodo getter de log
   */
  get loggedIn() {
    return this.isLoggedIn;
  }
  getloggedIn() {
    return this.isLoggedIn;
  }
  /**
   * Metodo setter de log
   */
  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  /**
   * Metodo register del usuario
   * @param user usuario de registro
   * @returns devuelve el usuario con el token de registro
   */
  register(user: UserRequest): Observable<any> {
    let body = {
      email: user.email,
      password: user.password,
    };
    console.table(body);

    return this.http.post('http://localhost:8082/auth/registro', body);
  }

  /**
   * Metodo para convertir cualquier imagen a base64
   * @param $event
   * @returns
   */
  extraerBase64 = async ($event: any) =>
  new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
    } catch (e) {
      return null;
    }
  });

}
