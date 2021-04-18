import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'media-1_album', class: '' },
    { path: '/info', title: 'General info', icon:'education_atom', class: '' },
    { path: '/alerts', title: 'alerts',  icon:'ui-1_bell-53', class: '' },
    { path: '/visualize', title: 'visualize',  icon:'ui-1_bell-53', class: '' },
    { path: '/constraints', title: 'constraints',  icon:'ui-1_bell-53', class: '' },
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
 
}
