import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiMapModule} from '@ngui/map';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from '../../home/home.component';
import { InfoComponent } from '../../info/info.component';
import { GoogleChartsModule } from 'angular-google-charts';
@NgModule({
  imports: [
    GoogleChartsModule ,
    ChartsModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
   
    HomeComponent,
    InfoComponent,
    
  ]
})

export class AdminLayoutModule {}
