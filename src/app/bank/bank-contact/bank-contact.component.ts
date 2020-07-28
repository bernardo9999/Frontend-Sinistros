import { Component, OnInit } from '@angular/core';
import { BankContactService } from '../../shared/bank-contact.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-contact',
  templateUrl: './bank-contact.component.html',
  styleUrls: ['./bank-contact.component.css', './flexboxgrid.css']
})
export class BankContactComponent implements OnInit {

  constructor(private service: BankContactService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      _id: null,
      _datafim: '',
      _valor: null,
      _contrato: '',
      _assetOwner: "pedro",
      _datasinistro: '',
      _placa: ''
    }
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }
  insertRecord(form: NgForm) {
    this.service.postCreateFinanceiro(form.value)
      .subscribe(res => {
        this.toastr.success('Insersão Exitosa', 'Registro de Financiamento');
        this.resetForm(form);
      })
  }
}
