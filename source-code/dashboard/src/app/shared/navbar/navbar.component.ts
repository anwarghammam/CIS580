import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { HttpHeaders} from '@angular/common/http';
import { ApiService } from '../../api.service';
declare var $:any;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 
    'Accept': 'application/json','Access-Control-Allow-Origin':'*',
})
};
@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private api: ApiService,) {
      this.location = location;
          this.sidebarVisible = false;
         
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
  
    showNotification1(from, align){
            const type = ['','info','success','warning','danger'];
        
            var color = Math.floor((Math.random() * 4) + 1);
            $.notify({
               
                message: "back to the default scheduler ! please wait"
            },{
                type: type[color],
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            });
            this.api.default()
            .subscribe(
              resp => {
                  console.log("default"+ resp);
              
                });
                /** window.location.reload() **/
              }
        
        showNotification2(from, align) {

        
            const type = ['','info','success','warning','danger'];
        
            var color = Math.floor((Math.random() * 4) + 1);
            $.notify({
               
                message: "w'r moving to our approach ! please wait"
            },{
                type: type[color],
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            });
            
                this.api.newapproach()
                  .subscribe(
                    resp => {
                        console.log(resp);
                        
                        const msg=("Execution time is equal to ".concat(Number(resp.body[0]).toFixed(2).toString())).concat(" Seconds");
                        var color = Math.floor((Math.random() * 4) + 1);
                        $.notify({
                           
                            message: msg
                        },{
                            type: type[color],
                            timer: 1000,
                            placement: {
                                from: from,
                                align: align
                            }
                        });
                    
                      });
                    /**  window.location.reload() */
                    }
                 
                   
        
        
      
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
