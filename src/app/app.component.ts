import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProyectoIngenia';
  routerUrl: boolean = false;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  mostrarNav(): boolean {
    switch (this.router.url) {
      case '/expertos':
        return true;
        break;
      case '/etiquetas':
        return true;
        break;
      case '/expertos/:id':
        return true;
        break;
      case '/etiquetas/:id':
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
  }
}
