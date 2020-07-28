import { Component, OnInit } from '@angular/core';
import { BankFinancesService } from 'src/app/shared/bank-finances.service';
import { Financeiro } from 'src/app/shared/finances.model';
import { CarDetailsService } from 'src/app/shared/car-details.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bank-finances',
  templateUrl: './bank-finances.component.html',
  styleUrls: ['./bank-finances.component.css', './flexboxgrid.css']
})
export class BankFinancesComponent implements OnInit {

  constructor(private service: BankFinancesService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
    this.dataHoje = datePipe.transform(this.date, 'dd/MM/yyyy');
  }
  date = new Date();
  dataHoje: string;
  calculo: any;
  ngOnInit() {
    this.service.refreshList();
  }
  populateForm(finances: Financeiro) {
    this.service.formData = Object.assign({}, finances);
  }
  calculoFinanciamento(finances): void {
    let valor = finances._valor;
    //let multas = data._multas;
    let datahojedate: any = this.toDate(this.dataHoje);
    let datafimdate: any = this.toDate(finances._datafim);
    let diff = 0;
    let dias = 1000 * 60 * 60 * 24;
    diff = datahojedate - datafimdate;
    let calculodias = Math.floor(diff / dias);
    let impostos = Math.abs(calculodias) * (valor * 0.01);
    let total = valor + impostos; 
    return total
    //+ multas;
    //this.calculo = total;
  }

  toDate(dateStr) {
    let parts = dateStr.split("/");
    let dateDate = new Date(parts[2], parts[1] - 1, parts[0]);
    return (dateDate);
  }

  realizarPagamento(finances) {
    var pago: any = {}
    pago._id = finances["_id"]
    pago._assetOwner = "pedro"
    this.service.updateFinanceiroPagoValor(pago)
      .subscribe(
        resp => this.resultPago(resp),
        error => this.errorPago(error)
      )
      this.service.refreshList();
  }
  errorPago(error) {
    this.toastr.error("Atenção!", "Registro nao encontrado!");
  }

  resultPago(data) {
    this.toastr.success("Sucesso!", "Pago realizado!");
  }
  // adicionar notificacoes ja importe o carservicedetail
}
