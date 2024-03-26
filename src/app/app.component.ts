import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ObserverDTOService } from 'src/services/observer-dto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = '';
  showSidenav: boolean = true;

  showHeader: boolean = true;
  // title: string = '';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public authService: AuthService,
    public observerDTOService: ObserverDTOService
  ) {}

  ngOnInit(): void {
    this.authService.title$.subscribe(title => {
      this.title = title;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.urlAfterRedirects.includes('login');
        console.log(event.urlAfterRedirects);
        console.log(this.showHeader);
      }
    });
    this.observerDTOService.closeSidenav.subscribe(res=>{
      this.showSidenav = res;
    })
  }

  logout() {
    if (localStorage.getItem('role') === 'fcu') {
      localStorage.removeItem('role');
      this.router.navigate(['/login/fcu']);
    } else {
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }
}
