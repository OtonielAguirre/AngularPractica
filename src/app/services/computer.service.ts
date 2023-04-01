import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Computer } from '../model/computer.model';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  constructor(private http: HttpClient) {}

  getComputers() {
    return this.http.get<Computer[]>('http://localhost:7000/computers');
  }

  saveComputers(data: Computer) {
    return this.http.post('http://localhost:7000/computers', data);
  }

  deleteComputers(id: number) {
    return this.http.delete('http://localhost:7000/computers/' + id);
  }

  changeComputers(computer: Computer, id: number) {
    return this.http.put('http://localhost:7000/computers/' + id, computer);
  }

  getComputer(id: number) {
    return this.http.get('http://localhost:7000/computers/' + id);
  }
}
