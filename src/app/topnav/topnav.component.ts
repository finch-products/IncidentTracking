import { Component } from '@angular/core';
import { ObserverDTOService } from 'src/services/observer-dto.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  name: string = "Bikrant"
  menuTitle: string = 'Dashboard'

  constructor(private observerDTO: ObserverDTOService){
    observerDTO.menuItemTitle.subscribe(res=>{
      this.menuTitle = res;
    })
  }
}
