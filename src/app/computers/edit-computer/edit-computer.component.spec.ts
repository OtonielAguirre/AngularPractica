import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;
  
  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputers', 'getComputer']
  );
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );
  activatedRouteSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        MatInputModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formComputer).toBeTruthy();

  });

  it('should load data', () => {
    activatedRouteSpy.params = of({ id: 1 });

    const computer: Computer = { id: 1, brand: 'HP', model: 'Pavilion' };

    computerSvcSpy.getComputer.and.returnValue(of(computer));

    component.formComputer?.patchValue(computer);

    expect(component.formComputer).toBeTruthy();
  });

  it('should params computer', () => {
    computerSvcSpy.changeComputers.and.returnValue(of({}));
    component.formComputer?.patchValue({
      brand: 'HP',
      model: 'Pavilion',
    });
    component.computerId;
    expect(activatedRouteSpy.params).toBe(NEVER);
  });

  it('should dont load data', () => {
    activatedRouteSpy.params = of({ id: 2 });

    computerSvcSpy.getComputer.and.returnValue(
      throwError(() => 'ERROR' + component.computerId)
    );

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  
  it('should update computer', () => {
    activatedRouteSpy.params = of({ id: 3 });
    computerSvcSpy.changeComputers.and.returnValue(of([]));
    component.changeComputer();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should dont update', () => {
    activatedRouteSpy.params = of({ id: 4 });
    computerSvcSpy.changeComputers.and.returnValue(
      throwError(() => 'error al hacer update')
    );
    component.changeComputer();
    expect(window.alert).toHaveBeenCalled();
  });
});
