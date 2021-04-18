import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements DoCheck, OnDestroy {
  title = 'ProyectoIngenia';
  routerUrl: boolean = false;
  constructor(public router: Router) {}
  ngOnDestroy(): void {
    this.routerUrl =this.mostrarNav();
  }
  ngDoCheck(): void {
    this.routerUrl =this.mostrarNav();
  }

  mostrarNav(): boolean {
    switch (this.router.url) {

      case '/expertos':
        return true;
        break;
      case '/etiquetas':
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
