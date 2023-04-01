import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]

    });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next:(val) =>{
          expect(val).toBeDefined(); 
          expect(val.length).toBe(1); 
          const first = val[0]; 
          expect(first.id).toBe(1)
          expect(first.brand).toBe('HP');
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers');
        expect(request.request.method).toBe('GET');

        request.flush([
          {
            id: 1,
            brand: 'HP',
            model: 'Pavilion'
          }
        ])
  }));

  it('should http post ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error:(err) =>{
          expect(err.error.type).toBe('computers not found')
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers');
        expect(request.request.method).toBe('GET');
        request.error(new ErrorEvent('computers not found'));
  }));

  it('should http post ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion'
      } as Computer

      const obs = service.saveComputers(comp);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next:(val) =>{
          expect(val).toBeDefined(); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers');
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(comp);
        request.flush({});
  }));

  it('should http post ok computers w/error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion'
      } as Computer

      const obs = service.saveComputers(comp);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error:(err) =>{
          expect(err.error.type).toBe('error saving computer'); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers');
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(comp);
        request.error(new ErrorEvent('error saving computer'))
  }));

  it('should http put ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'Matebook 15'
      } as Computer

      const obs = service.changeComputers(comp,1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next:(val) =>{
          expect(val).toBeDefined(); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(comp);
        request.flush({});
  }));

  it('should http put ok computers w/error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'Matebook 15'
      } as Computer

      const obs = service.changeComputers(comp,1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error:(err) =>{
          expect(err.error.type).toBe('error updating computer'); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(comp);
        request.error(new ErrorEvent('error updating computer'));
  }));

  it('should http delete ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {

      const obs = service.deleteComputers(1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next:(val) =>{
          expect(val).toBeDefined(); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('DELETE');
  }));

  it('should http delete ok computers w/error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {

      const obs = service.deleteComputers(1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error:(err) =>{
          expect(err.error.type).toBe('error deleting computer'); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('DELETE');
        request.error(new ErrorEvent('error deleting computer'));
  }));
 
  it('should http get one ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputer(1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next:(val) =>{
          expect(val).toBeDefined(); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('GET');

        request.flush([
          {
            id: 1,
            brand: 'HP',
            model: 'Pavilion'
          }
        ])
  }));

  it('should http get one ok computers w/error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputer(1);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error:(err) =>{
          expect(err.error.type).toBe('error getting one computer'); 
        }});
        const request = httpMock.expectOne('http://localhost:7000/computers/1');
        expect(request.request.method).toBe('GET');
        request.error(new ErrorEvent('error getting one computer'));
  }));
});
