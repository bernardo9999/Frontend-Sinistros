import { Component, OnInit, } from '@angular/core';
import { CarDetailsService } from 'src/app/shared/car-details.service';
import { ParticipantService } from 'src/app/shared/participant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-history',
  templateUrl: './car-history.component.html',
  styleUrls: ['./car-history.component.css', '../../layout/layout.component.css']
})
export class CarHistoryComponent implements OnInit {

  constructor(private cardetailsservice: CarDetailsService,
    private participantservice: ParticipantService,
    private route: ActivatedRoute) { }

  dataRetorno: any = [];
  dataParticipant: any = [];
  identidades: any = [];

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        let id = +paramMap.get('id');
        this.cardetailsservice.getHistoryCar(id)
          .subscribe(
            resp => this.resultHistoryCar(resp)
          );
      });
  }

  resultHistoryCar(data): any {
    this.dataRetorno = data;
    console.log(this.dataRetorno)
    let pos = this.dataRetorno.length;
    for (let n = 0; n < pos; n++) {
      let datetimestamp = new Date(this.toDate(this.dataRetorno[n].timestamp.low));
      let datetx = {}
      datetx = datetimestamp.toLocaleString()
      this.dataRetorno[n]['datetx'] = datetx;
    }
  }
  toDate(timestamp) {
    const milliseconds = (timestamp) * 1000;
    return new Date(milliseconds);
  }

  getOneParticipant(assetOwner) {
    this.participantservice.getOneParticipant(assetOwner)
      .subscribe(
        resp => this.resultOneParticipant(resp)

      )
  }

  resultOneParticipant(data): any {
    this.dataParticipant = data;
    this.identidades = data._identities;
    console.log(this.dataParticipant)
    console.log(this.identidades[0].fingerprint)
  }

}




