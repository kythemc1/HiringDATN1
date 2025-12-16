import { NavigationExtras } from '@angular/router';

export class BreadcrumbItem {
  text: string;
  routerLink?: string;
  navigationExtras?: NavigationExtras;

  constructor(text: string, routerLink?: string, navigationExtras?: NavigationExtras) {
    this.text = text;
    this.routerLink = routerLink;
    this.navigationExtras = navigationExtras;
  }

  isLink(): boolean {
    return !!this.routerLink;
  }
}
