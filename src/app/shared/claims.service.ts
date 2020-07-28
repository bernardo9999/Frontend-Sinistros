import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Claim } from './claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  formData: Claim;

  readonly rootURL = "http://167.71.249.87:8000/fabcar";
  readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";

  constructor(private http: HttpClient) { }

  getOneCar(renavam): Observable<Object> {
    return this.http.get(`${this.rootURL}/getOneCar/${renavam}`, {});
  }

  postSinistro(data) {
    return this.http.post(`${this.rootURL}/createSinistro`, { data: data });
  }

  postDataSinistro(data): Observable<Object> {
    return this.http.post(this.rootURLfinanceiro + '/updateFinanceiroDataSinistro', data)
  }
}
