import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare var all: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    
    all() ;

    
  
  }
  

}
    


