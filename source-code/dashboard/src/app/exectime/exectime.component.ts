import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-exectime',
  templateUrl: './exectime.component.html',
  styleUrls: ['./exectime.component.css']
})
export class ExectimeComponent implements OnInit {
  times=[]
  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.exectime()
    .subscribe(
      resp => {
          
         this.times=resp.body.times
         console.log(this.times)
      
        });
      /**  window.location.reload() */
      }
   


  }


