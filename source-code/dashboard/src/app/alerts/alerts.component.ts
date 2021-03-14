import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';





@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
  
})
export class AlertsComponent implements OnInit {

 open: any[]=[]
  alerts_colors: any[]=[];
  prom_alerts:[];
  public isCollapsed = false;

  constructor(private api: ApiService) {
    
  }

details(i){
    this.open[i]=true
    
}
     
details1(i){
  this.open[i]=false
  
}
  get_alerts(){
    this.api.alerts().subscribe(
      resp => {
        console.log("alerts")
        console.log(resp)
        this.prom_alerts=(resp.body['data']['alerts']);
       
        for (var val of this.prom_alerts) {
          this.open.push(false)
          if(val['labels']['alertname']== "node_cpu_usage"){
            this.alerts_colors.push('danger')
          } // prints values: 10, 20, 30, 40
          else {
            this.alerts_colors.push('info')
          }
        }
        console.log(this.alerts_colors)

        console.log("w1 "+this.prom_alerts)
         })}



  

  

  ngOnInit(): void {
    this.get_alerts()
   
  }

}