import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Professional } from '../models/professional.model';
import { Time } from '../../modules/schedule/components/time/models/time';
import { environment } from '../../../environments/environment.development';
import { Page } from '../models/page.model';

// --- backend DTO ---
export interface ProfessionalRequest {
  id?: number;
  name: string;
  phone: string;
  email: string;
  active: boolean;
  areaIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  baseUrl = `${environment.baseUrl}/professionals`;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getProfissionais(
    page: number,
    size: number,
    name: string
  ): Observable<Page<Professional>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'name,asc'); 

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<Page<Professional>>(this.baseUrl, { params });
  }

  // Handle both create and update
  save(data: ProfessionalRequest): Observable<Professional> {
    if (data.id) {
      // If an ID exists, it's an update (PUT)
      return this.http.put<Professional>(`${this.baseUrl}/${data.id}`, data);
    } else {
      // If no ID, it's a create (POST)
      return this.http.post<Professional>(this.baseUrl, data);
    }
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProfessionalsByArea(areaId: number): Observable<Professional[]> {
    const url = `${environment.baseUrl}/areas/${areaId}/professionals`; 
    
    return this.http.get<Page<Professional>>(url).pipe(
      map(page => page.content) 
    );
  }

  // In professional.service.ts

  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]> {

    // 1. Get the year and month from the calendar date
    const year = calendar.getFullYear();
    const month = calendar.getMonth();

    // 2. Calculate the first day of the month
    const firstDay = new Date(year, month, 1);
    
    // 3. Calculate the last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // 4. Format the dates into 'YYYY-MM-DD' strings, which the backend expects
    const start = this.datePipe.transform(firstDay, 'yyyy-MM-dd');
    const end = this.datePipe.transform(lastDay, 'yyyy-MM-dd');

    // 5. Build the new URL with the correct 'start' and 'end' parameters
    const url = `${this.baseUrl}/${professional.id}/availability-days?start=${start}&end=${end}`;

    return this.http.get<number[]>(url);
  }

  getAvailableTimes(professional: Professional, selectedDate: Date): Observable<Time[]> {
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
    const url = `${this.baseUrl}/${professional.id}/availability-times?date=${formattedDate}`;

    return this.http.get<Time[]>(url);
  }
}