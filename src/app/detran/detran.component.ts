import { Component, OnInit } from '@angular/core';
import { Multas } from 'src/app/shared/multas.model';
import { DetranService } from 'src/app/shared/detran.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detran',
  templateUrl: './detran.component.html',
  styleUrls: ['./detran.component.css','./flexboxgrid.css'	]
})
export class DetranComponent implements OnInit {

  constructor(private service: DetranService,
    private toastr: ToastrService ) {}

  ngOnInit() {
    this.service.refreshList();
  }
  realizarPagamento(multas) {
    let id = multas["_id"]
    this.service.updateMultasPagoValor(id)
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
 
}
