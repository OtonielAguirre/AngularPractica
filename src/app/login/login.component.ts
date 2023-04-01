import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../model/login.model';
import { Route, Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginsrv: LoginService,
    private router: Router,
    private utilsrv: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginClick() {
    this.isLoading = true;
    console.log('Se dió click a login');
    console.log('valor form', this.formLogin?.value);
    const req = this.formLogin?.value as LoginRequest;
    this.loginsrv.login(req).subscribe({
      next: (response) => {
        console.log('respuesta', response);
        this.utilsrv.saveToken(response.token);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('completado');
        this.isLoading = false;
      },
    });
    console.log('Ya se envió la petición');
  }
}
