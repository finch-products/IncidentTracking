import { Component, Input } from '@angular/core';
import { CaseDetail } from 'src/dto/case-detail.dto';

@Component({
  selector: 'app-case-detail-rightbar',
  templateUrl: './case-detail-rightbar.component.html',
  styleUrls: ['./case-detail-rightbar.component.scss']
})
export class CaseDetailRightbarComponent {
  @Input() caseDetail!: CaseDetail;
}
