import { JsonPipe } from '@angular/common';
import { FormCreateAppointmentComponent } from './../../components/form-create-appointment/form-create-appointment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { AppointmentType, Appointment } from '../../../../core/models/appointment.models';
import { Area } from '../../../../core/models/area.model';
import { Client } from '../../../../core/models/client.model';
import { Professional } from '../../../../core/models/professional.model';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AreaService } from '../../../../core/services/area.service';
import { ClientService } from '../../../../core/services/client.service';
import { ProfessionalService } from '../../../../core/services/professional.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Time } from '../../components/time/models/time';

@Component({
  selector: 'app-create-appointment-page',
  standalone: false,
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css']
})
export class CreateAppointmentPageComponent implements OnInit {

  areas: Area[] = [];
  appointmentTypes: AppointmentType[] = [];
  professionalsByArea: Professional[] = [];
  selectedProfessional: Professional = {} as Professional;
  appointment: Appointment = {} as Appointment;

  //Calendar Component
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  selectedDate !: Date;
  calendarError: string = "";

  //Time Component
  selectedTime !: Time;
  availableTimes: Time[] = [];
  timeError: string = "";

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent !: FormCreateAppointmentComponent;

  constructor(private areaService: AreaService,
    private clientService: ClientService,
    private professionalService: ProfessionalService,
    private appointmentService: AppointmentService,
    private toastService: ToastService
  ) { }


  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  onSelectedTime(time: Time) {
    this.selectedTime = time;
    this.timeError = "";
  }


  onSelectedProfessional(professional: Professional) {
    this.selectedProfessional = professional;
    this.calendarMonth = new Date();
    this.loadAvailableDays();
    this.availableTimes = [];
  }

  onSelectedDate(date: Date) {
    this.selectedDate = date;
    this.calendarError = "";
    this.loadAvailableTimes();
  }

  loadAvailableTimes() {
    this.professionalService.getAvailableTimes(this.selectedProfessional, this.selectedDate).subscribe({
      next: times => this.availableTimes = times
    })
  }

  loadAvailableDays() {
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: days => this.availableDays = days
    })
  }

  onChangedMonth(date: Date) {
    this.calendarMonth = date;
    this.availableTimes = [];
    this.loadAvailableDays();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsWithNameContaining(term)),
      map(page => page.content || [])
    );
  }


  loadAppointmentTypes() {
    this.appointmentService.getAppointmentTypes().subscribe(
      {
        next: types => this.appointmentTypes = types
      }
    )
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas
    });

  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea = professionals;
      }
    });
    this.availableDays = [];
    this.availableTimes = [];
  }

  clean() {
    this.formCreateAppointmentComponent.cleanForm();
    this.availableTimes = [];
    this.availableDays = [];
    this.appointment = {} as Appointment;
  }

  createAppointment(modalConfirm: ModalComponent) {
    this.formCreateAppointmentComponent.submitted = true;
    this.checkDateAndTimeErros();

    if (this.isAppointmentValid()) {
      /*
      this.appointment = this.createAppointmentObject();
      modalConfirm.open({ size: "lg" }).then(confirm => {
        if (confirm) {
          this.appointmentService.save(this.appointment).subscribe({
            next: () => {
              this.toastService.showSuccess('Agendamento criado com sucesso!');
              this.clean();
            },
            error: (e) => {
              this.toastService.showError('Erro ao criar agendamento.');
            }
          });
        }
      });
      */
    }
  }

  private createAppointmentObject(): Appointment {
    let appointment: Appointment = {} as Appointment;
    appointment = { ...this.formCreateAppointmentComponent.appointmentForm.value };
    appointment.startTime = this.selectedTime.startTime;
    appointment.endTime = this.selectedTime.endTime;
    appointment.date = this.selectedDate;
    return appointment;
  }

  private checkDateAndTimeErros(): void {
    if (!this.selectedDate) {
      this.calendarError = "*Selecione uma data!";
    }

    if (!this.selectedTime) {
      this.timeError = "*Selecione um horário!";
    }
  }

  private isAppointmentValid(): boolean {
    return !!(this.formCreateAppointmentComponent.appointmentForm.valid && this.selectedDate && this.selectedTime);
  }


}
