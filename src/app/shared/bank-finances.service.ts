import { Injectable } from '@angular/core';
import { Financeiro } from './finances.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankFinancesService {

  constructor(private http: HttpClient) { }

  formData: Financeiro;
  list: Financeiro[];
  
  readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";
  
  refreshList() {
    this.http.get(this.rootURLfinanceiro + '/getAllFinanceiro')
    .toPromise().then(res => this.list = res as Financeiro[])
  }
  
  updateFinanceiroPagoValor(pago): Observable<Object> {
    return this.http.post(this.rootURLfinanceiro + '/updateFinanceiroPagoValor/', { "id": pago._id, "assetOwner": pago._assetOwner });
  }
}