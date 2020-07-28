import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/shared/reports.service';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css','../layout/layout.component.css']
})

export class ReportsComponent implements OnInit {

  constructor(private service: ReportsService) { }

  ngOnInit() {
    this.service.refreshList();
  }
populateForm(car: Car){
 this.service.formData = Object.assign({},car);
}

}