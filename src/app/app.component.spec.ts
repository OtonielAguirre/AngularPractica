import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

class MockLoginComponent{}

describe('AppComponent', () => {

  let utilSvcSpy = jasmine.createSpyObj<UtilService>
  ('UtilService',['getToken','deleteToken','isLogged']);

  utilSvcSpy.isLogged = new Subject<boolean>();

  let router:Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path:'login',
            component: MockLoginComponent
          }
        ]),
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide : UtilService, useValue: utilSvcSpy}
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it(`should create app with user logged in`, () => {
    utilSvcSpy.getToken.and.returnValues('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeTrue();
  });

  it(`should create app with user is not logged in`, () => {
    utilSvcSpy.getToken.and.returnValues(null);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeFalse();
  });

  it(`should recieve isLogged from UtilSvc true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(true);

    expect(app.isLogged).toBeTrue();
  });

  it(`should recieve isLogged from UtilSvc false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(false);

    expect(app.isLogged).toBeFalse();
  });

  it('should logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(utilSvcSpy.deleteToken).toHaveBeenCalled();
    //expect(location.href).toContain('/login')
  });

  it('should add two numbers and return a result',() => {
    const fixure = TestBed.createComponent(AppComponent);
    const app = fixure.componentInstance;
    const res = app.suma(1,3);
    expect(res).toEqual(4);
  })
});
