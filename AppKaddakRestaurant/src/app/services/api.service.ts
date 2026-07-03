import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menu/categorias/`);
  }

  getComidas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menu/comidas/`);
  }

  crearComida(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/menu/comidas/`, data);
  }

  actualizarComida(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/menu/comidas/${id}/`, data);
  }

  eliminarComida(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/menu/comidas/${id}/`);
  }

  crearOrden(orden: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/ordenes/`, orden);
  }

  getClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/clientes/`);
  }

  getOrdenes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/ordenes/`);
  }
}
