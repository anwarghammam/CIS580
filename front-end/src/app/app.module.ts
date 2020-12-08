import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgChartjsModule } from 'ng-chartjs';
@NgModule({
  imports: [
  
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    SidebarModule,
    AppRoutingModule,
    NgChartjsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }