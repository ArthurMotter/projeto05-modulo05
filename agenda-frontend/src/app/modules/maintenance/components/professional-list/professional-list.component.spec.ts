import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfessionalListComponent } from './professional-list.component';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Page } from '../../../../core/models/page.model';
import { Professional } from '../../../../core/models/professional.model';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({ selector: 'app-modal', template: '', standalone: true })
class MockModalComponent {
  @Input() title: string = '';
  open() { }
  close() { }
}

@Component({ selector: 'app-professional-form', template: '', standalone: true })
class MockProfessionalFormComponent {
  @Input() professional?: Professional;
  resetForm() { }
}

describe('ProfessionalListComponent', () => {
  let component: ProfessionalListComponent;
  let fixture: ComponentFixture<ProfessionalListComponent>;
  let professionalServiceSpy: jasmine.SpyObj<ProfessionalService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const mockPage: Page<Professional> = {
    content: [],
    pageable: { sort: { sorted: true, unsorted: false, empty: false }, pageNumber: 0, pageSize: 10, offset: 0, paged: true, unpaged: false },
    last: true, totalPages: 0, totalElements: 0, sort: { sorted: true, unsorted: false, empty: false }, first: true,
    size: 10, number: 0, numberOfElements: 0, empty: true
  };

  beforeEach(async () => {
    const pServiceSpy = jasmine.createSpyObj('ProfessionalService', ['getProfissionais', 'delete']);
    const tServiceSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      declarations: [ProfessionalListComponent],
      imports: [FormsModule, MockModalComponent, MockProfessionalFormComponent],
      providers: [
        { provide: ProfessionalService, useValue: pServiceSpy },
        { provide: ToastService, useValue: tServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalListComponent);
    component = fixture.componentInstance;
    professionalServiceSpy = TestBed.inject(ProfessionalService) as jasmine.SpyObj<ProfessionalService>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    professionalServiceSpy.getProfissionais.and.returnValue(of(mockPage));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load professionals on init', () => {
    const specificMockPage = { ...mockPage, content: [{ id: 1, name: 'Test Pro', email: '', phone: '', active: true, areas: [] }], totalElements: 1 };
    professionalServiceSpy.getProfissionais.and.returnValue(of(specificMockPage));

    fixture.detectChanges();

    expect(component.page).toBeDefined();
    expect(component.page?.content.length).toBe(1);
    expect(professionalServiceSpy.getProfissionais).toHaveBeenCalledWith(0, 10, '');
  });

  it('should load professionals on init', () => {
    const mockPage: Page<Professional> = {
      content: [{ id: 1, name: 'Test Professional', email: 'test@email.com', phone: '123', active: true, areas: [] }],
      pageable: { sort: { sorted: true, unsorted: false, empty: false }, pageNumber: 0, pageSize: 10, offset: 0, paged: true, unpaged: false },
      last: true, totalPages: 1, totalElements: 1, sort: { sorted: true, unsorted: false, empty: false }, first: true,
      size: 10, number: 0, numberOfElements: 1, empty: false
    };
    professionalServiceSpy.getProfissionais.and.returnValue(of(mockPage));
    fixture.detectChanges();
    expect(component.page).toBeDefined();
    expect(component.page?.content.length).toBe(1);
    expect(professionalServiceSpy.getProfissionais).toHaveBeenCalledWith(0, 10, '');
  });

  it('should set title and open modal when openModalForNew is called', () => {
    component.formModal = jasmine.createSpyObj('ModalComponent', ['open']);
    component.formComponent = jasmine.createSpyObj('ProfessionalFormComponent', ['resetForm']);
    component.openModalForNew();
    expect(component.modalTitle).toBe('Novo Profissional');
    expect(component.formModal.open).toHaveBeenCalled();
    expect(component.formComponent.resetForm).toHaveBeenCalled();
  });
});