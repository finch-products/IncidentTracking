import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CaseStatus } from 'src/dto/case-detail.dto';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges{
  @Input() statusHistory: CaseStatus[] | undefined = [];
  reversedStatusHistory: CaseStatus[] | undefined;

  ngOnInit() {

  }
  ngOnChanges() {
    this.reversedStatusHistory = this.statusHistory?.reverse() || [];
  }
}
