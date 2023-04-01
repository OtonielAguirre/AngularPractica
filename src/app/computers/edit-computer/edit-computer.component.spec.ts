import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';

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
  });

  it('should change computer', () => {
    computerSvcSpy.changeComputers.and.returnValue(of({}));
    component.formComputer?.patchValue({
      brand: 'HP',
      model: 'Pavilion',
    });
    const obs = component.changeComputer;
    expect();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

      
  it('should not change computer', () => {
    computerSvcSpy.saveComputers.and.returnValue(throwError(() => {'Computer not found'}));
    component.changeComputer();
  });
});
