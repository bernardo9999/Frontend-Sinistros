import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  formData: Car;
  list: Car[];

  readonly rootURL = "http://167.71.249.87:8000/fabcar";

  constructor(private http: HttpClient) { }

  postCreateCar(formData: Car): Observable<Car> {
    console.log(this.formData)
    return this.http.post<Car>(this.rootURL + '/createCar', { car: this.formData, "ownerID": "joao" })
  }
  refreshList() {
    this.http.get(this.rootURL + '/getAllCar')
      .toPromise().then(res => this.list = res as Car[])
  }

  // 1) validar se form data vai sem this.
  
  postCar(formData: Car): Observable<Car> {
    return this.http.post<Car>(this.rootURL + '/createCar', { car: formData, "ownerID": "joao" })
  }

  postUpdateCar(formData: Car): Observable<Car> {
    return this.http.post<Car>(this.rootURL + '/updateProprietarioCar/', { "id": formData._id, "proprietario": formData._proprietario })
  }
  
  deleteOneCar(_id: string) {
    return this.http.post(this.rootURL + '/deleteOneCar/', { "id": _id })
  }
}