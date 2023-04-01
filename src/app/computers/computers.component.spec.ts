import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputerService } from '../services/computer.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;
  let computerSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService',['getComputers','deleteComputers']);

  computerSvcSpy.getComputers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputersComponent ],
      imports:[MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule],
      providers:[{provide: ComputerService, useValue: computerSvcSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete computer', () =>{
    const mockResponse ={

    } as Computer;
    computerSvcSpy.deleteComputers.and.returnValue(of(mockResponse));
    expect(computerSvcSpy.deleteComputers).toBeDefined()
  })
});
