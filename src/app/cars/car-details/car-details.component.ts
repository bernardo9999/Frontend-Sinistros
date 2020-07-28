import { Component, OnInit, } from '@angular/core';
import { CarDetailsService } from 'src/app/shared/car-details.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css', '../../layout/layout.component.css']
})
export class CarDetailsComponent implements OnInit {

  constructor(private service: CarDetailsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.dataHoje = datePipe.transform(this.date, 'dd/MM/yyyy');
  }

  dataRetorno = {};
  date = new Date();
  dataHoje: string;
  calculo: any;
  sinistros: [];
  pago: {};
  valor: number;
  datafim : string;
  multas: number;

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        let id = +paramMap.get('id');
        this.service.getOneFinanceiro(id)
        .subscribe(
          resp => this.resultOneFinanceiro(resp)
        );
        this.service.getOneCar(id)
          .subscribe(
            resp => this.resultOneCar(resp)
          );
          this.service.getOneMultas(id)
        .subscribe(
          resp => this.resultOneMultas(resp)
        );
      });
    ;
  }

  resultOneCar(data): void {
    let pos = data._sinistros.length;
    for (let n = 0; n < pos; n++) {
      this.sinistros = data._sinistros[n];
    }
    this.dataRetorno = data;
  }

  resultOneFinanceiro(data): void {
    this.valor = data._valor;
    this.datafim = data._datafim;
    let datahojedate: any = this.toDate(this.dataHoje);
    let datafimdate: any = this.toDate(this.datafim);
    let diff = 0;
    let dias = 1000 * 60 * 60 * 24;
    diff = datahojedate - datafimdate;
    let calculodias = Math.floor(diff / dias);
    let impostos = Math.abs(calculodias) * (this.valor * 0.01);
    let total = this.valor + impostos;
    this.calculo = total;
  }
  resultOneMultas(data): void {
    this.multas = data._valor
  }

  toDate(dateStr) {
    let parts = dateStr.split("/");
    let dateDate = new Date(parts[2], parts[1] - 1, parts[0]);
    return (dateDate);
  }


  realizarPago() {
    var pago: any = {}
    pago._id = this.dataRetorno["_id"];
    pago._assetOwner = this.dataRetorno["_assetOwner"]
    this.service.updateFinanceiroPagoValor(pago)
      .subscribe(
        resp => this.resultPago(resp),
        error => this.errorPago(error)
      )
  }
  errorPago(error) {
    this.toastr.error("Atenção!", "Registro nao encontrado!");
  }

  resultPago(data) {
    this.toastr.success("Sucesso!", "Pago realizado!");
  }

  realizarPagoMulta() {
    let id = this.dataRetorno["_id"];
    this.service.updateMultasPagoValor(id)
      .subscribe(
        resp => this.resultPagoMulta(resp),
        error => this.errorPagoMulta(error)
      )
  }
  errorPagoMulta(error) {
    this.toastr.error("Atenção!", "Registro nao encontrado!");
  }

  resultPagoMulta(data) {
    this.toastr.success("Sucesso!", "Pago realizado!");
  }
}
  // ---- Notas ----
  // O valor de calculo sera a diferença de dias entre a data de hoje e a do final do contrado.
  // Se ingressamos um contrato anterior a data de hoje, o calculo sera realizado com base na diferença de dias.
   // O valor da diferença sera positiva, pelo que, caso se deseje calcular vencimento, devera ser feito uma função com calculo de dias positivo.