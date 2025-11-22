import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreateAppointmentComponent } from './form-create-appointment.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Area } from '../../../../core/models/area.model';
import { Professional } from '../../../../core/models/professional.model';

describe('FormCreateAppointmentComponent', () => {
  let component: FormCreateAppointmentComponent;
  let fixture: ComponentFixture<FormCreateAppointmentComponent>;

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbTypeaheadModule 
      ],
      declarations: [
        FormCreateAppointmentComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when created', () => {
    expect(component.appointmentForm.valid).toBeFalsy();
  });

  it('should disable the professional field initially', () => {
    expect(component.appointmentForm.controls['professional'].disabled).toBeTruthy();
  });

  it('should emit selectedAreaEvent and enable professional field when area changes', () => {
    // Spy on the event emitter to see if it's called
    spyOn(component.selectedAreaEvent, 'emit');

    const mockArea: Area = { id: 1, name: 'Cabelo' };
    
    // Set the value of the area form control
    component.appointmentForm.controls['area'].setValue(mockArea);

    // Manually trigger the onAreaChanged method (or simulate a change event)
    component.onAreaChanged();
    fixture.detectChanges();

    // Assert that the event was emitted with the correct value
    expect(component.selectedAreaEvent.emit).toHaveBeenCalledWith(mockArea);
    
    // Assert that the professional control is now enabled
    expect(component.appointmentForm.controls['professional'].enabled).toBeTruthy();
  });

  it('should emit selectedProfessionalEvent when professional changes', () => {
  spyOn(component.selectedProfessionalEvent, 'emit');
  
  const mockProfessional: Professional = { id: 1, name: 'Ana Silva', areas: [], active: true, email: '', phone: '' };

  component.appointmentForm.controls['professional'].enable();

  // Set the value of the professional form control
  component.appointmentForm.controls['professional'].setValue(mockProfessional);
  
  component.onProfessionalChanged();

  expect(component.selectedProfessionalEvent.emit).toHaveBeenCalledWith(mockProfessional);
});
});