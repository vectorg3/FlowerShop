import { Component, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  showMenu: boolean = true;
  isLoggedIn: boolean = false;
  constructor (private auth: AuthService, private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.showMenu = currentRoute?.data?.['showMenu']??true;
      }
    });
  }
  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  collapsed = false;
  navData = navbarData;
  screenWidth = 0;
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  ngDoCheck(){
    this.isLoggedIn = this.auth.isAuth();
  }
}
