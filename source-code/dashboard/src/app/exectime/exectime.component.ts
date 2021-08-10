import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/api.service';
import { GoogleChartsModule } from 'angular-google-charts';


@Component({
  selector: 'app-exectime',
  templateUrl: './exectime.component.html',
  styleUrls: ['./exectime.component.css']
})
export class ExectimeComponent implements OnInit {
  times=[]
  data=[]
  constructor(private api: ApiService) { }
  @ViewChild('googlechart')
	googlechart: GoogleChartsModule;
  ngOnInit(): void {

    this.api.exectime()
    .subscribe(
      resp => {
          
         this.times=resp.body.times
         console.log(this.times)
         this.times.forEach(element => {
           let exectime=[]
           exectime.push(element["containers"])
           exectime.push(element["exectime"])
           this.data.push(exectime)

         });
      
        });
      /**  window.location.reload() */
      }
   


  
      chartData = {
        type: 'LineChart',
        data:this.data,
     columnNames: ["Number Of Containers","Execution Time per number of containers"],
     options: {
     hAxis: {
           title: 'Number Of Containers'
        },
        vAxis:{
           title: 'Execution Time (seconds)'
        },
     },
     width: 1000,
     height: 400
    };
     

    
  }
 