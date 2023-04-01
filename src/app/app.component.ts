import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-2023';
  isLogged = false;

  constructor(private router: Router, private utilsrv: UtilService) {
    this.isLogged = Boolean(utilsrv.getToken());

    this.utilsrv.isLogged.subscribe({
      next: (val) => {
        this.isLogged = val;
      },
    });
  }
  logout() {
    this.utilsrv.deleteToken();
    this.router.navigate(['login']);
  }

  suma(a:number, b:number):number{
    return a+b;
  }
}
