import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../core/models/client.model';
import { ClientService } from '../../../../core/services/client.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit, OnChanges {
  
  @Input() client?: Client;
  @Output() onSave = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastService: ToastService
  ) {
    this.createForm();
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && this.client) {
      this.form.patchValue(this.client);
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      comments: ['']
    });
  }

  resetForm(): void {
    this.form.reset({
      id: null,
      name: '',
      phone: '',
      dateOfBirth: '',
      comments: ''
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clientData = this.form.value;
    const operation = clientData.id
      ? this.clientService.update(clientData)
      : this.clientService.save(clientData);
    
    const successMessage = clientData.id ? 'Cliente atualizado com sucesso!' : 'Cliente salvo com sucesso!';

    operation.subscribe({
      next: () => {
        this.toastService.showSuccess(successMessage);
        this.onSave.emit();
        this.resetForm();
      },
      error: (err) => {
        console.error("Error saving client", err);
        this.toastService.showError('Erro ao salvar cliente.');
      }
    });
  }

  // Helpers
  get name() { return this.form.get('name'); }
  get phone() { return this.form.get('phone'); }
  get dateOfBirth() { return this.form.get('dateOfBirth'); }
}