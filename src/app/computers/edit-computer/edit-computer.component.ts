import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId: number = 0;
  formComputer?: FormGroup;
  brandDef?: string;
  modelDef?: string;
  computerDef?: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private computersrv: ComputerService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(1)]],
      model: ['', Validators.required],
    });
    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });

    let ID = this.computerId;
    this.computersrv.getComputer(ID).subscribe({
      next: (lastComp) => {
        this.computerDef = lastComp.valueOf();
        this.brandDef = this.computerDef.brand;
        this.modelDef = this.computerDef.model;
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }

  changeComputer() {
    let data = this.formComputer?.value as Computer;
    let ID = this.computerId;
    console.log(ID);
    console.log(data);
    let compus = this.computersrv.changeComputers(data, ID).subscribe({
      next: (list) => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }
}
