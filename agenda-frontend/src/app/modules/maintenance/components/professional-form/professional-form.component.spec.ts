import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProfessionalFormComponent } from './professional-form.component';
import { AreaService } from '../../../../core/services/area.service';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ToastService } from '../../../../core/services/toast.service';

describe('ProfessionalFormComponent', () => {
  let component: ProfessionalFormComponent;
  let fixture: ComponentFixture<ProfessionalFormComponent>;
  let professionalServiceSpy: jasmine.SpyObj<ProfessionalService>;
  let areaServiceSpy: jasmine.SpyObj<AreaService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Create spies for all service dependencies
    const pServiceSpy = jasmine.createSpyObj('ProfessionalService', ['save']);
    const aServiceSpy = jasmine.createSpyObj('AreaService', ['getAreas']);
    const tServiceSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      declarations: [ ProfessionalFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProfessionalService, useValue: pServiceSpy },
        { provide: AreaService, useValue: aServiceSpy },
        { provide: ToastService, useValue: tServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFormComponent);
    component = fixture.componentInstance;

    // Get instances of spies
    professionalServiceSpy = TestBed.inject(ProfessionalService) as jasmine.SpyObj<ProfessionalService>;
    areaServiceSpy = TestBed.inject(AreaService) as jasmine.SpyObj<AreaService>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    // Mock the return value for getAreas since it's called in ngOnInit
    areaServiceSpy.getAreas.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid when all required fields are filled', () => {
    // Act: Fill in the form controls
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['areaIds'].setValue([1]);

    // Assert: The form should now be valid
    expect(component.form.valid).toBeTruthy();
  });

  it('should call the save method and emit onSave if form is valid', () => {
    // Arrange: Configure the spy and make the form valid
    professionalServiceSpy.save.and.returnValue(of({} as any));
    spyOn(component.onSave, 'emit');

    component.form.controls['name'].setValue('Jane Doe');
    component.form.controls['areaIds'].setValue([1]);

    // Act: Call the correct submit method
    component.save();

    // Assert
    expect(professionalServiceSpy.save).toHaveBeenCalled();
    expect(toastServiceSpy.showSuccess).toHaveBeenCalled();
    expect(component.onSave.emit).toHaveBeenCalled();
  });
});