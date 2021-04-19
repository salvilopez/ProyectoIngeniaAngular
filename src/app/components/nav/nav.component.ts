import { Component, DoCheck, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements DoCheck {
  routerUrl: boolean = true;
  routerUrlEtiqueta: boolean = false;
  routerUrlExperto: boolean = false;
  totalExper:any = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public authService: AuthService
  ) {}
  ngDoCheck(): void {
    this.totalExper=localStorage.getItem('totalExpert');

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

  mostrarNav(): boolean {
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
          return false;
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
