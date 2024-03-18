import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObserverDTOService {
    menuItemTitle: Subject<string> = new Subject<string>()
}