import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObserverDTOService } from 'src/services/observer-dto.service';

interface MenuItems{
  iconClass: string
  iconText?: string
  text: string
  url: string
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {
  menuItems: MenuItems[] = [
    {
      iconClass: 'material-icons',
      iconText: 'dashboard',
      text: 'Dashboard',
      url: '/dashboard'
    },
    {
      iconClass: 'material-icons',
      iconText: 'insights',
      text: 'Reports',
      url: '/reports'
    },
    {
      iconClass: 'material-icons',
      iconText: 'search',
      text: 'Search',
      url: '/search'
    },
    {
      iconClass: 'fa-solid fa-building-user',
      text: 'Departments',
      url: '/departments'
    },
    {
      iconClass: 'fa-solid fa-user-secret',
      text: 'Investigators',
      url: '/investigators'
    },
    {
      iconClass: 'material-icons',
      iconText: 'groups',
      text: 'Users Management',
      url: '/user-management'
    }
  ]

  constructor(private observerDTO: ObserverDTOService, private router: Router){

  }
  menuClick(item: MenuItems){
    this.observerDTO.menuItemTitle.next(item.text);

  }
}
