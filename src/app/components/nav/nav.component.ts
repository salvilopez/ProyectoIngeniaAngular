import { Component, DoCheck, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddTagComponent } from '../dialog-add-tag/dialog-add-tag.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements DoCheck, OnInit {
  routerUrl: boolean = true;
  routerUrlEtiqueta: boolean = false;
  routerUrlExperto: boolean = false;
  totalExper: any = 0;
  totalTags: any = 0;
  username: any;
  userLogueado: any;
  userActualizado: any;
  archivoCapturado: any;
  authSubscription: Subscription = new Subscription();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
                public router: Router,
                public authService: AuthService,
                public dialog: MatDialog) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.authSubscription = this.authService
      .getbyUsername(this.username)
      .subscribe((res) => {
        this.userLogueado = res;
      });
  }
  ngDoCheck(): void {
    if (this.userLogueado == undefined) {
      this.userLogueado = this.userLogueado as User;
    }

    this.totalExper = localStorage.getItem('totalExpert');
    this.totalTags = localStorage.getItem('totalTags');

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        //console.log(e.url);

        this.routerUrlExperto = e.url.includes('expertos/');
        this.routerUrlEtiqueta = e.url.includes('etiquetas/');
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogAddTagComponent);
  }

  showPreviewImg(event: any) {
    this.archivoCapturado = event.target.files[0];
    //
    //TODO---.- Importante de Leer ..------

    //TODO opcional porque el servidor no acepta tamaño de la imagen base64
    //TODO(cambiar por lo comentado de abajo , si el servidor admite Base64)

    //TODO----------------------------------------------
    this.authService
      .extraerBase64(this.archivoCapturado)
      .then((base64: any) => {
        this.userLogueado.img = base64.base;
        this.actualizarUsu();
      });
    //TODO----------------------------------------------
  }

  actualizarUsu() {
    let body = {
      ...this.userLogueado,
    };
    console.log('--------------------');
    console.log('antes del update');
    console.log(body);
    console.log('--------------------');
    this.authService.actualizarUser(body).subscribe((response) => {
      this.userActualizado = response;
      this.userLogueado = response;
      console.log('--------------------');
      console.log('depues del update');
      console.log(this.userActualizado);
      console.log('--------------------');
    });
  }
  pagActisEtiquetasPage(): boolean {
    switch (this.router.url) {
      case '/etiquetas':
        return true;
        break;
      case '/etiquetas/**':
        return true;
        break;
      case '/expertos':
        return false;
        break;
      case '/expertos/**':
        return false;
        break;
      default:
        return false;
        break;
    }
  }
  pagActual(): string {
    return this.router.url;
  }
  mostrarNav(): boolean {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routerUrlExperto = e.url.includes('expertos/');
        this.routerUrlEtiqueta = e.url.includes('etiquetas/');
      }
    });


    if (!this.routerUrlExperto) {
      switch (this.router.url) {
        case '/expertos':
          return true;
          break;
        case '/etiquetas':
          return true;
          break;
        case '/expertos/**':
          return true;
          break;
        case '/etiquetas/**':
          return true;
          break;
        case '/login':
          return false;
          break;
        case '/registro':
          return false;
          break;
        default:
          return true;
          break;
      }
    } else if (this.routerUrlExperto) {
      return this.routerUrlExperto;
    } else if (this.routerUrlExperto) {
      return this.routerUrlEtiqueta;
    }
    return false;
  }
}
