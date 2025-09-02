import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.models';
import { AppointmentType } from '../models/appointment.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl = environment.baseUrl;
  appointmentUrl = this.baseUrl + "/appointments";
  appointmentTypesUrl = this.baseUrl + "/appointment-types";

  constructor(private http: HttpClient) { }

  save(appointment: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.appointmentUrl,appointment);
  }

  getAppointmentTypes(): Observable<AppointmentType[]> {
    return this.http.get<AppointmentType[]>(this.appointmentTypesUrl);
  }

}
