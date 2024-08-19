import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    const isActive = this.router.isActive(route, true);
    return isActive;
  }
  title = 'website';
}