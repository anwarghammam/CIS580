import { Routes } from '@angular/router';
import { AlertsComponent } from 'app/alerts/alerts.component';
import { ConstraintsComponent } from 'app/constraints/constraints.component';
import { ExectimeComponent } from 'app/exectime/exectime.component';
import { ObjectivesComponent } from 'app/objectives/objectives.component';
import { VisualizerComponent } from 'app/visualizer/visualizer.component';

import { HomeComponent } from '../../home/home.component';
import { InfoComponent } from '../../info/info.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'info',           component: InfoComponent },
    { path: 'alerts',        component: AlertsComponent },
    { path: 'visualize',        component: VisualizerComponent },
    { path: 'constraints',        component: ConstraintsComponent },
    { path: 'objectives',        component: ObjectivesComponent },
    { path: 'exectime',        component: ExectimeComponent },
   
   
];
