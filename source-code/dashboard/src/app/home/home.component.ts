import { Component, OnChanges, OnInit, SimpleChanges, ╔Á╔ÁNgOnChangesFeature } from '@angular/core';
import { ApiService } from '../api.service';

declare var all: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  containers_energy
  
  constructor(private api: ApiService) {
    
   }
  

  ngOnInit() {
    let url=""
    this.api.all_current_data.forEach(node => {
    url=url+String(node[1])+'||'

})
    all(this.containers_energy,this.api.all_current_data,url) 
      }
    
  
    
    
  
  }
  


    


