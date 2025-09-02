import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Area } from '../../../../core/models/area.model';
import { Professional } from '../../../../core/models/professional.model';
import { AreaService } from '../../../../core/services/area.service';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-professional-form',
  standalone: false,
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnInit, OnChanges {
  @Input() professional?: Professional;
  @Output() onSave = new EventEmitter<void>();

  form!: FormGroup;
  areas$!: Observable<Area[]>;

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private areaService: AreaService,
    private toastService: ToastService
  ) {
    this.createForm();
  }

  // Methods
  ngOnInit(): void {
    this.areas$ = this.areaService.getAreas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['professional'] && this.professional) {
      this.form.patchValue({
        ...this.professional,
        areaIds: this.professional.areas?.map(a => a.id) || []
      });
    }
  }

  // Handlers
  createForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.email]],
      phone: [''],
      areaIds: [[] as number[], [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  resetForm(): void {
    this.form.reset({
      id: null,
      name: '',
      email: '',
      phone: '',
      areaIds: [],
      active: true
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const professionalData = this.form.value;
    this.professionalService.save(professionalData).subscribe({
      next: () => {
        this.toastService.showSuccess('Profissional salvo com sucesso!');
        this.onSave.emit();
        this.resetForm();
      },
      error: (err) => {
        console.error("Error saving professional", err);
        this.toastService.showError('Erro ao salvar profissional.');
      }
    });
  }

  // Helpers
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get areaIds() { return this.form.get('areaIds'); }
}