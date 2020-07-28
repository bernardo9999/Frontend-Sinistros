import { Component, OnInit, } from '@angular/core';
import { CarDetailsService } from 'src/app/shared/car-details.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        let id = +paramMap.get('id');
        this.service.getOneCar(id)
          .subscribe(
            resp => this.resultOneCar(resp)
          );

      });
    ;
  }
  resultOneCar(data): void {
    let valor = data._valor;
    let multas = data._multas;
    let datahojedate: any = this.toDate(this.dataHoje);
    let datafimdate: any = this.toDate(data._datafim);
    let diff = 0;
    let dias = 1000 * 60 * 60 * 24;
    diff = datahojedate - datafimdate;
    let calculodias = Math.floor(diff / dias);
    let impostos = Math.abs(calculodias) * (valor * 0.01);
    let total = valor + impostos + multas;
    this.calculo = total;
    let pos = data._sinistros.length;
    for (let n = 0; n < pos; n++) {
      this.sinistros = data._sinistros[n];
    }
    this.dataRetorno = data;
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
}
  // ---- Notas ----
  // O valor de calculo sera a diferença de dias entre a data de hoje e a do final do contrado.
  // Se ingressamos um contrato anterior a data de hoje, o calculo sera realizado com base na diferença de dias.
   // O valor da diferença sera positiva, pelo que, caso se deseje calcular vencimento, devera ser feito uma função com calculo de dias positivo.