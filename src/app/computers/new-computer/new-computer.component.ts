import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css'],
})
export class NewComputerComponent {
  formComputer?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private computersrv: ComputerService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(1)]],
      model: ['', Validators.required],
    });
  }
  saveComputer() {
    let data = this.formComputer?.value as Computer;
    this.computersrv.saveComputers(data).subscribe({
      next: (list) => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }
}
