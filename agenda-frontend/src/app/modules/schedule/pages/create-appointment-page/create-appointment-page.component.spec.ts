import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppointmentPageComponent } from './create-appointment-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

// Import Services to be mocked
import { AreaService } from '../../../../core/services/area.service';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ClientService } from '../../../../core/services/client.service';
import { ToastService } from '../../../../core/services/toast.service';

// Import Child Components and Pipes
import { FormCreateAppointmentComponent } from '../../components/form-create-appointment/form-create-appointment.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { TimeComponent } from '../../components/time/time.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TimePipe } from '../../../../shared/pipes/time.pipe'; 
import { Area } from '../../../../core/models/area.model';
import { Professional } from '../../../../core/models/professional.model';


describe('CreateAppointmentPageComponent', () => {
  let component: CreateAppointmentPageComponent;
  let fixture: ComponentFixture<CreateAppointmentPageComponent>;

  // Create spies for all injected services
  let professionalServiceSpy: jasmine.SpyObj<ProfessionalService>;
  let areaServiceSpy: jasmine.SpyObj<AreaService>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Initialize the spies
    professionalServiceSpy = jasmine.createSpyObj('ProfessionalService', ['getAvailableDays', 'getAvailableTimes']);
    areaServiceSpy = jasmine.createSpyObj('AreaService', ['getAreas', 'getActiveProfessionalsFromArea']);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getAppointmentTypes', 'save']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    // Mock initial API calls from ngOnInit
    areaServiceSpy.getAreas.and.returnValue(of([]));
    appointmentServiceSpy.getAppointmentTypes.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        TimePipe,
      ],
      declarations: [
        CreateAppointmentPageComponent,
        FormCreateAppointmentComponent,
        CalendarComponent,
        TimeComponent,
        ModalComponent,
      ],
      providers: [
        DatePipe,
        { provide: AreaService, useValue: areaServiceSpy },
        { provide: ProfessionalService, useValue: professionalServiceSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        ClientService 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load areas and appointment types on init', () => {
    expect(areaServiceSpy.getAreas).toHaveBeenCalled();
    expect(appointmentServiceSpy.getAppointmentTypes).toHaveBeenCalled();
  });

  it('should call getActiveProfessionalsFromArea when an area is selected', () => {
    const mockArea: Area = { id: 1, name: 'Cabelo' };
    const mockProfessionals: Professional[] = [{ id: 1, name: 'Ana Silva', active: true, areas: [], email: '', phone: '' }];
    
    // Configure the spy to return mock data when called
    areaServiceSpy.getActiveProfessionalsFromArea.and.returnValue(of(mockProfessionals));

    // Simulate the event from the child component
    component.onSelectedArea(mockArea);

    // Check that the service method was called with the correct argument
    expect(areaServiceSpy.getActiveProfessionalsFromArea).toHaveBeenCalledWith(mockArea);
    
    // Check that the component's property was updated
    expect(component.professionalsByArea).toEqual(mockProfessionals);
  });

  it('should call getAvailableDays when a professional is selected', () => {
    const mockProfessional: Professional = { id: 1, name: 'Ana Silva', active: true, areas: [], email: '', phone: '' };
    const mockDays = [2, 4, 9, 11];

    professionalServiceSpy.getAvailableDays.and.returnValue(of(mockDays));
    
    component.onSelectedProfessional(mockProfessional);
    
    expect(component.selectedProfessional).toBe(mockProfessional);
    expect(professionalServiceSpy.getAvailableDays).toHaveBeenCalled();
    expect(component.availableDays).toEqual(mockDays);
  });
  
  it('should call getAvailableTimes when a date is selected', () => {
      const mockTimes = [{ startTime: '09:00', endTime: '09:30', available: true }];
      
      // Setup: A professional and date must be selected first
      component.selectedProfessional = { id: 1, name: 'Ana', active: true, areas: [], email: '', phone: '' };
      const selectedDate = new Date('2025-10-10T12:00:00Z');

      professionalServiceSpy.getAvailableTimes.and.returnValue(of(mockTimes as any));
      
      component.onSelectedDate(selectedDate);
      
      expect(component.selectedDate).toBe(selectedDate);
      expect(professionalServiceSpy.getAvailableTimes).toHaveBeenCalledWith(component.selectedProfessional, selectedDate);
      expect(component.availableTimes).toEqual(mockTimes as any);
  });

});