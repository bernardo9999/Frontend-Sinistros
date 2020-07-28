import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

   formData: Car;
   list: Car [];

  readonly rootURL = "http://167.71.249.87:8000/fabcar";

  constructor(private http: HttpClient) { }

    
    refreshList(){
      this.http.get(this.rootURL+'/getAllCar')
      .toPromise().then (res => this.list = res as Car[])
    }
}
