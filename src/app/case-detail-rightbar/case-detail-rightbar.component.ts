import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseDetail, CaseStatus } from 'src/dto/case-detail.dto';

@Component({
  selector: 'app-case-detail-rightbar',
  templateUrl: './case-detail-rightbar.component.html',
  styleUrls: ['./case-detail-rightbar.component.scss']
})
export class CaseDetailRightbarComponent implements OnChanges {
  @Input() caseDetail!: CaseDetail;
  lastStatusHistory!: CaseStatus | null;
  statusTransition: any = {
    'created': ['in-progress'],
    'in-progress': ['in-progress-with-comment', 'on-hold', 'closed'],
    'in-progress-with-comment': ['in-progress-with-comment', 'on-hold', 'closed'],
    'on-hold': ['in-progress', 'closed'],
    'closed': ['not-applicable']
  }
  currentStatusTransition: any;

  statusHistoryForm!: FormGroup;

  constructor(private fb: FormBuilder){

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.statusHistoryForm = this.fb.group({
      status: ['', Validators.required],
      comment: ['', Validators.required],
    })
    if(this.caseDetail.statusHistory){
      this.lastStatusHistory = this.caseDetail.statusHistory[this.caseDetail.statusHistory.length -1]
    }else{
      this.lastStatusHistory = null;
    }

    this.currentStatusTransition = this.statusTransition[this.lastStatusHistory?.status || 'open'].map((res: string) => {
      return {
        status: res,
        statusText: res.toUpperCase().split('-').join(' ')
      }
    })
  }

}
