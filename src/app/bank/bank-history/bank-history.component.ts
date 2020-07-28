import { Component, OnInit } from '@angular/core';
import { BankHistoryService } from 'src/app/shared/bank-history.service';
import { ParticipantService } from 'src/app/shared/participant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-history',
  templateUrl: './bank-history.component.html',
  styleUrls: ['./bank-history.component.css', './flexboxgrid.css']
})
export class BankHistoryComponent implements OnInit {
 
    constructor(private bankhistoryservice: BankHistoryService,
      private participantservice: ParticipantService,
      private route: ActivatedRoute) {
        
       }
  
    dataRetorno: any = [];
    dataParticipant: any = [];
    identidades:any = [];
    id:string = null;
  
    ngOnInit() {
      this.route.paramMap
        .subscribe(paramMap => {
          let id = +paramMap.get('id');
          this.bankhistoryservice.getHistoryFinanceiro(id)
           .subscribe(
              resp => this.resultHistoryFinanceiro(resp)
            );
        });
    }
  
    resultHistoryFinanceiro(data): any {
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
  
    getOneParticipantFinanceiro(assetOwner){
      this.participantservice.getOneParticipantFinanceiro(assetOwner)
      .subscribe(
        resp => this.resultOneParticipantFinanceiro(resp)
      )}
  
    resultOneParticipantFinanceiro(data):any{
      this.dataParticipant=data;
      this.identidades=data._identities;
      console.log(this.dataParticipant)
      console.log(this.identidades[0].fingerprint)
    }
   
    //  async resultOneParticipant(data){
  
  
  }