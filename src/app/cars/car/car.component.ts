import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/car.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private service: CarService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      _id: null,
      _placa: '',
      _marca: '',
      _modelo: '',
      _cor: '',
      _proprietario: '',
      _alienado: false,
      _datafim: '',
      _multas: 0,
      _valor: 0,
      _assetOwner: '',
      _sinistros: [],
    }
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }
  insertRecord(form: NgForm) {
    this.service.postCreateCar(form.value)
      .subscribe(res => {
        this.toastr.success('Insersão Exitosa', 'Registro de Carro');
        this.resetForm(form);
        this.service.refreshList();
      })
  }
  updateRecord(form: NgForm) {
    this.service.postUpdateCar(form.value)
      .subscribe(res => {
        this.toastr.info('Atualização Exitosa', 'Registro de Carro');
        this.resetForm(form)
        this.service.refreshList();
      })
  }
}