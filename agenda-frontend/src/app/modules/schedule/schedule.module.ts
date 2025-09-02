import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { TodayAppointmentsPageComponent } from './pages/today-appointments-page/today-appointments-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment-page/create-appointment-page.component';
import { CancelAppointmentPageComponent } from './pages/cancel-appointment-page/cancel-appointment-page.component';
import { ClientHistoryPageComponent } from './pages/client-history-page/client-history-page.component';
import { ProfessionalWorkdaysPageComponent } from './pages/professional-workdays-page/professional-workdays-page.component';
import { FormCreateAppointmentComponent } from './components/form-create-appointment/form-create-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TimeComponent } from './components/time/time.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TodayAppointmentsPageComponent,
    CreateAppointmentPageComponent,
    CancelAppointmentPageComponent,
    ClientHistoryPageComponent,
    ProfessionalWorkdaysPageComponent,
    FormCreateAppointmentComponent,
    CalendarComponent,
    TimeComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    JsonPipe,
    DatePipe
  ]
})
export class ScheduleModule { }
