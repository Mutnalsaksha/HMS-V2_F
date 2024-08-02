import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    const isActive = this.router.isActive(route, true);
    // console.log(`Route: ${route}, isActive: ${isActive}`);
    return isActive;
  }

}
