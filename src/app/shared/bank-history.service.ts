import { Injectable } from '@angular/core';
import { Financeiro } from './finances.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankHistoryService {

 readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";

  constructor(private http: HttpClient) { }

  getOneParticipantFinanceiro(id: number): Observable<Object> {
    return this.http.get(this.rootURLfinanceiro + '/getOneParticipantFinanceiro/' + id, {});
  }

  getHistoryFinanceiro(id: number): Observable<Object> {
    console.log(id)
    return this.http.get(this.rootURLfinanceiro + '/getHistoryFinanceiro/' + id, {});
  }
}
