import { Injectable } from '@angular/core';
import { Financeiro } from './finances.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankContactService {

  formData: Financeiro;

  readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";

  constructor(private http: HttpClient) { }

  postCreateFinanceiro(formData: Financeiro): Observable<Financeiro> {
    console.log(this.formData)
    console.log(formData)
    return this.http.post<Financeiro>(this.rootURLfinanceiro + '/createFinanceiro', {financeiro: this.formData} )
  }

  deleteOneFinanceiro(_id: string) {
    return this.http.post(this.rootURLfinanceiro + '/deleteOneFinanceiro/', { "id": _id })
  }
}
