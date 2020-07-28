import { Injectable } from '@angular/core';
import { Multas } from './multas.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetranService {

  formData: Multas;
  list: Multas [];

 readonly rootURLmultas = "http://167.71.249.87:8002/multas";

 constructor(private http: HttpClient) { }

   
   refreshList(){
     this.http.get(this.rootURLmultas+'/getAllMultas')
     .toPromise().then (res => this.list = res as Multas[])
   }

   updateMultasPagoValor(id): Observable<Object> {
    return this.http.post(this.rootURLmultas + '/updateMultasPagoValor/', {id});
  }
}
