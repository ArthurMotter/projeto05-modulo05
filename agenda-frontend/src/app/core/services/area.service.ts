import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { environment } from '../../../environments/environment.development';
import { Professional } from '../models/professional.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl = environment.baseUrl + "/areas";

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }

  getProfessionalsFromArea(area : Area): Observable<Professional[]>{
    let url = `${this.baseUrl}/${area.id}/professionals`;
    return this.http.get<Professional[]>(url);
  }

  getActiveProfessionalsFromArea(area : Area): Observable<Professional[]>{
    let url = `${this.baseUrl}/${area.id}/professionals?active=true`;
    return this.http.get<Professional[]>(url);
  }
}