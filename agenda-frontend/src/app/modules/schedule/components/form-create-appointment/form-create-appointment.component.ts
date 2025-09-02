import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorFunction } from 'rxjs';
import { AppointmentType } from '../../../../core/models/appointment.models';
import { Area } from '../../../../core/models/area.model';
import { Client } from '../../../../core/models/client.model';
import { Professional } from '../../../../core/models/professional.model';

@Component({
  selector: 'app-form-create-appointment',
  standalone: false,
  templateUrl: './form-create-appointment.component.html',
  styleUrls: ['./form-create-appointment.component.css']
})
export class FormCreateAppointmentComponent {

  @Input()
  areas: Area[] = [];

  @Input()
  appointmentTypes: AppointmentType[] = [];

  @Input()
  professionals: Professional[] = [];

  @Input()
  searchClients !: OperatorFunction<string, readonly Client[]>;

  @Output()
  selectedAreaEvent = new EventEmitter<Area>();

  @Output()
  selectedProfessionalEvent = new EventEmitter<Professional>();

  submitted: boolean = false;

  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      area: ['', Validators.required],
      professional: [{ value: '', disabled: true }, Validators.required],
      type: ['', Validators.required],
      client: ['', Validators.required],
      comments: ['']
    });

  }

  //Used by typeahead component
  formatter = (client: Client) => client.name;

  onAreaChanged() {
    this.selectedAreaEvent.emit(this.appointmentForm.value["area"]);
    this.appointmentForm.controls["professional"].enable();
  }

  onProfessionalChanged() {
    this.selectedProfessionalEvent.emit(this.appointmentForm.value["professional"]);
  }

  getSelectedClient(): Client {
    return this.appointmentForm.controls["client"].value;
  }

  cleanForm() {
    this.appointmentForm.reset();
    this.submitted = false;
  }

  get afArea() {
    return this.appointmentForm.get('area');
  }

  get afProfessional() {
    return this.appointmentForm.get('professional');
  }

  get afAppointmentType() {
    return this.appointmentForm.get('type');
  }

  get afClient() {
    return this.appointmentForm.get('client');
  }
}
