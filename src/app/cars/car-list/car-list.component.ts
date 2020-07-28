import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/car.service';
import { Car } from 'src/app/shared/car.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private service: CarService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }
  populateForm(car: Car) {
    this.service.formData = Object.assign({}, car);
  }

  onDelete(_id: string) {
    if (confirm('Tem certeza que quer apagar este registro?')) {
      this.service.deleteOneCar(_id).subscribe(res => {
        this.toastr.warning('Remoção exitosa', 'Registro de Carro');
        this.service.refreshList();
      })
    }
  }
}