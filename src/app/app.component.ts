import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProyectoIngenia';
  routerUrlEtiqueta: boolean = false;
  routerUrlExperto: boolean = false;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  /**
   * Metodo para controlar lar Rutas del sideNav
   *
   * @returns booleano
   */
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
          case '/addexperto':
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
