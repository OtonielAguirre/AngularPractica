import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoginService } from './login.service';
import { LoginRequest } from '../model/login.model';
import { Observable } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http post ok ',inject([HttpTestingController],(httpMock: HttpTestingController) => {
    const req = {
      email: 'correo@ejemplo.com',
      password:'123'
    } as LoginRequest;
    const obs = service.login(req);

    expect(obs instanceof Observable).toBeTrue();
    obs.subscribe({
      next: (response) =>{
        expect(response).toBeDefined()
      }
    });
    const request = httpMock.expectOne('https://reqres.in/api/login');
    expect(request.request.body).toEqual(req);
    expect(request.request.method).toBe('POST');
    const resToken = {
      token: 'token'
    };
    request.flush(resToken);
  }))

  it('should http post return error ',inject([HttpTestingController],(httpMock: HttpTestingController) => {
    const req = {
      email: 'correo@ejemplo.com',
      password:'123'
    } as LoginRequest;
    const obs = service.login(req);

    expect(obs instanceof Observable).toBeTrue();
    obs.subscribe({
      error: (err) =>{
        expect(err.error.type).toBe('User not found')
      }
    });
    const request = httpMock.expectOne('https://reqres.in/api/login');
    expect(request.request.body).toEqual(req);
    expect(request.request.method).toBe('POST');
    request.error(new ErrorEvent('User not found'))
  }))

});


