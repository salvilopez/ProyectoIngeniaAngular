import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoIngenia';
  routerUrl:any;
  constructor(public router: Router){



  }

checkUrllogin():boolean {
  if(this.router.url === '/expertos'||this.router.url === '/etiquetas') return false;

  return true;
}
}
