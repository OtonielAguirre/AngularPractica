import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { Observable, of, throwError } from 'rxjs';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;
  let computerSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService',['saveComputers']);
  let routerSpy = jasmine.createSpyObj<Router>('Router',['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComputerComponent ],
      imports:[MatInputModule, MatInputModule, BrowserAnimationsModule,ReactiveFormsModule],
      providers: [{provide: ComputerService, useValue: computerSvcSpy},
      {provide: Router, useValue:routerSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should save computer', () => {
    computerSvcSpy.saveComputers.and.returnValue(of({}))
    component.formComputer?.patchValue({
      brand:'HP',
      model: 'Pavilion'
    })
    const obs = component.saveComputer();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

    
  it('should not save computer', () => {
    computerSvcSpy.saveComputers.and.returnValue(throwError(() => {'Computer not found'}));
    component.saveComputer();
  });
});
