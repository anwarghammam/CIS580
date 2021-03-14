import { Routes } from '@angular/router';
import { AlertsComponent } from 'app/alerts/alerts.component';

import { HomeComponent } from '../../home/home.component';
import { InfoComponent } from '../../info/info.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'info',           component: InfoComponent },
    { path: 'alerts',        component: AlertsComponent },
   
   
];
