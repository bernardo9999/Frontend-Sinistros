import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Financeiro } from './finances.model';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  readonly rootURL = "http://167.71.249.87:8000/fabcar";
  readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";
  readonly rootURLmultas = "http://167.71.249.87:8002/multas";

  constructor(private http: HttpClient) { }

  getOneCar(id: number): Observable<Object> {
    return this.http.get(this.rootURL + '/getOneCar/' + id, {})
  }

  getOneFinanceiro(id): Observable<Object>
  {
    return this.http.get(this.rootURLfinanceiro + '/getOneFinanceiro/' + id, {})
  }

  getOneMultas(id): Observable<Object>
  {
    return this.http.get(this.rootURLmultas + '/getOneMultas/' + id, {})
  }

  getHistoryCar(id: number): Observable<Object> {
    return this.http.get(this.rootURL + '/getHistoryCar/' + id, {});
  }

  updateFinanceiroPagoValor(pago): Observable<Object> {
    return this.http.post(this.rootURLfinanceiro + '/updateFinanceiroPagoValor/', { "id": pago._id, "assetOwner": pago._assetOwner });
  }
  
  updateMultasPagoValor(id): Observable<Object> {
    return this.http.post(this.rootURLmultas + '/updateMultasPagoValor/', {id});
  }

}
