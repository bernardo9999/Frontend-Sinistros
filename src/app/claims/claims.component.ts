import { Component, OnInit } from '@angular/core';
import { ClaimsService } from 'src/app/shared/claims.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css', '../layout/layout.component.css']
})

export class ClaimsComponent implements OnInit {


  date = new Date();
  dataHoje: string;
  veiculo = {};
  dataRetorno = {};
  dataUpdate = {}

  constructor(
    private sinistroService: ClaimsService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
    this.dataHoje = datePipe.transform(this.date, 'dd/MM/yyyy');
    this.veiculo["dataocorrencia"] = this.dataHoje;
    this.dataUpdate["datasinistro"] = this.dataHoje;
  }

  ngOnInit() {
  }

// ### continuar com declaracao de form
  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.resetForm();

  //   this.sinistroService.formData = {
  //     id: null,
  //     sinistro: '',
  //     ocorrencia: '',
  //     descricao: '',
  //     datasinistro : '',
  //   }
//  }
  postSinistro() {
    this.dataUpdate["id"] = this.veiculo["id"];
    this.dataUpdate["assetOwner"] = "maria";
    this.sinistroService.postSinistro(this.veiculo)
       .subscribe(
        resp => this.resultSinistro(resp),
        error => this.errorSinistro(error)
      );
  }

  postDataSinistro() {
    this.dataUpdate["id"] = this.veiculo["id"];
    this.dataUpdate["assetOwner"] = "maria";
    this.sinistroService.postDataSinistro(this.dataUpdate)
      .subscribe(
        resp => this.resultDataSinistro(resp),
        error => this.errorDataSinistro(error)
      );
  }


  errorSinistro(error) {
    this.toastr.error("Atenção!", "Veículo não encontrado!");
  }

  resultSinistro(data) {
    this.dataRetorno = data;
    this.toastr.success("Sucesso!", "Sinistro adicionado!");
  }

  errorDataSinistro(error) {
    this.toastr.warning("Atenção!", " Pedido recusado");
  }

  resultDataSinistro(data) {
    this.dataRetorno = data;
    this.toastr.info("Informação", "Pedido de Pagamento submetido!");
  }

  newClaim() {
    this.veiculo = {}
    this.dataRetorno = {}
  }

}
