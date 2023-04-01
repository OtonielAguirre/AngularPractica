import { Component } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Computer } from '../model/computer.model';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];

  constructor(private computersrv: ComputerService) {
    this.loadData();
  }

  loadData() {
    this.computersrv.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }

  deleteComputer(item: Computer) {
    this.computersrv.deleteComputers(item.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }
}
