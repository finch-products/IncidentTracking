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
  isOpen: boolean = true;

  constructor(private observerDTO: ObserverDTOService){
    observerDTO.menuItemTitle.subscribe(res=>{
      this.menuTitle = res;
    })
    this.observerDTO.closeSidenav.subscribe(res=>{
      this.isOpen = res;
    })
  }

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.observerDTO.closeSidenav.next(this.isOpen);
  }
}
