import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentService } from './appointment.service';
import { AppointmentType, Appointment, AppointmentRequest } from '../models/appointment.models';
import { environment } from '../../../environments/environment.development';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppointmentService]
    });
    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // After each test, verify that there are no outstanding HTTP requests.
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAppointmentTypes', () => {
    it('should return an Observable<AppointmentType[]>', () => {
      // 1. Arrange: Define the mock data the API will return
      const mockAppointmentTypes: AppointmentType[] = [
        { id: 1, type: 'Corte' },
        { id: 2, type: 'Coloração' }
      ];

      // 2. Act: Call the service method
      service.getAppointmentTypes().subscribe(types => {
        // 3. Assert: Check if the data received is correct
        expect(types.length).toBe(2);
        expect(types).toEqual(mockAppointmentTypes);
      });

      // 4. Assert (HTTP): Expect a single GET request to the correct URL
      const req = httpMock.expectOne(`${apiUrl}/appointment-types`);
      expect(req.request.method).toBe('GET');

      // 5. Respond: "Flush" the request with the mock data, which triggers the subscribe() block above.
      req.flush(mockAppointmentTypes);
    });
  });

  describe('save', () => {
    it('should send a POST request to save a new appointment', () => {
      // 1. Arrange
      const newAppointmentRequest: AppointmentRequest = {
        date: new Date('2025-11-12'),
        startTime: '10:00:00',
        endTime: '10:30:00',
        comments: 'Test appointment',
        type: { id: 1 },
        area: { id: 1 },
        professional: { id: 1 },
        client: { id: 1 }
      };

      // The backend responds with the full Appointment object, including the new ID
      const mockSavedAppointment: Appointment = {
        id: 123,
        date: new Date('2025-11-12'),
        startTime: '10:00:00',
        endTime: '10:30:00',
        comments: 'Test appointment',
        type: { id: 1, type: 'Corte' },
        area: { id: 1, name: 'Cabelo' } as any,
        professional: { id: 1, name: 'Ana Silva' } as any,
        client: { id: 1, name: 'João da Silva' } as any
      };

      // 2. Act
      service.save(newAppointmentRequest).subscribe(response => {
        // 3. Assert
        expect(response.id).toBe(123);
        expect(response.comments).toBe('Test appointment');
      });

      // 4. Assert (HTTP)
      const req = httpMock.expectOne(`${apiUrl}/appointments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newAppointmentRequest);

      // 5. Respond
      req.flush(mockSavedAppointment);
    });
  });
});