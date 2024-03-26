import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CaseDetail } from 'src/dto/case-detail.dto';

@Injectable({
  providedIn: 'root',
})
export class ObserverDTOService {
    menuItemTitle: Subject<string> = new Subject<string>()
    closeSidenav: Subject<boolean> = new Subject<boolean>();
    rightbarCaseDetail: Subject<CaseDetail> = new Subject<CaseDetail>();
}