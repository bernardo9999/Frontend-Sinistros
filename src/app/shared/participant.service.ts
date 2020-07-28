import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  readonly rootURL = "http://167.71.249.87:8000/fabcar";
  readonly rootURLfinanceiro = "http://167.71.249.87:8001/financeiro";

  constructor(private http: HttpClient) { }

  getOneParticipant(id: number): Observable<Object> {
    return this.http.get(this.rootURL + '/getOneParticipant/' + id, {});
  }

  getOneParticipantFinanceiro(id: number): Observable<Object> {
   return this.http.get(this.rootURLfinanceiro + '/getOneParticipant/' + id, {});
  }
}
