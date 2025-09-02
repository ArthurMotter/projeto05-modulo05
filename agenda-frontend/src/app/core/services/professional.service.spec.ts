import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

import { ProfessionalService, ProfessionalRequest } from './professional.service';
import { Professional } from '../models/professional.model';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environment.development';

describe('ProfessionalService', () => {
  let service: ProfessionalService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}/professionals`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfessionalService, DatePipe] // DatePipe is a dependency of your service
    });
    service = TestBed.inject(ProfessionalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for getProfissionais (replaces getAll)
  it('should retrieve professionals from the API via GET', () => {
    // 1. Arrange: Create a complete mock Page object matching your model
    const mockPage: Page<Professional> = {
      content: [
        { id: 1, name: 'Ana Silva', email: 'ana@email.com', phone: '111', active: true, areas: [] },
        { id: 2, name: 'Bruno Costa', email: 'bruno@email.com', phone: '222', active: false, areas: [] }
      ],
      pageable: { sort: { sorted: true, unsorted: false, empty: false }, pageNumber: 0, pageSize: 10, offset: 0, paged: true, unpaged: false },
      last: true,
      totalPages: 1,
      totalElements: 2,
      sort: { sorted: true, unsorted: false, empty: false },
      first: true,
      size: 10,
      number: 0,
      numberOfElements: 2,
      empty: false
    };

    // 2. Act: Call the correct service method
    service.getProfissionais(0, 10, '').subscribe(page => {
      // 3. Assert
      expect(page.content.length).toBe(2);
      expect(page.content).toEqual(mockPage.content);
    });

    // 4. Assert (HTTP): Expect a GET request to the correct URL with correct params
    const expectedUrl = `${apiUrl}?page=0&size=10&sort=name,asc`;
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockPage);
  });

  // Test for the save method (replaces getById)
  it('should create a new professional via POST when save is called without an ID', () => {
    const newProfessionalRequest: ProfessionalRequest = {
      name: 'Carlos Pereira',
      email: 'carlos.p@example.com',
      phone: '21999998888',
      active: true,
      areaIds: [1]
    };

    const mockSavedProfessional: Professional = {
      id: 3, // The backend would generate the ID
      name: 'Carlos Pereira',
      email: 'carlos.p@example.com',
      phone: '21999998888',
      active: true,
      areas: [{id: 1, name: 'Cabelo'}]
    };

    service.save(newProfessionalRequest).subscribe(professional => {
      expect(professional.id).toBe(3);
      expect(professional.name).toEqual(newProfessionalRequest.name);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newProfessionalRequest);
    request.flush(mockSavedProfessional);
  });
});