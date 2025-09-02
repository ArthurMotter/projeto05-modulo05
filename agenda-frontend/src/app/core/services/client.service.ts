import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { Client } from '../models/client.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = `${environment.baseUrl}/clients`;

  constructor(private http: HttpClient) { }

  getClientsPage(nameFilter: string, page: number, size: number): Observable<Page<Client>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'name,asc'); 

    if (nameFilter) {
      params = params.set('name', nameFilter); 
    }

    return this.http.get<Page<Client>>(this.baseUrl, { params });
  }

  getClientsWithNameContaining(clientNameFilter:string):Observable<Page<Client>>{
    let url = `${this.baseUrl}?name_like=${clientNameFilter}&_limit=10`;
    return this.http.get<Page<Client>>(url);
  }

  delete(client: Client): Observable<void> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<void>(url);
  }

  save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  getClientById(id: number): Observable<Client> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  update(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }
}