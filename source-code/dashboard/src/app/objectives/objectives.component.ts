import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  constructor(private api: ApiService) { }
  check=[false,false,false,false,false,false]
 
  objectives=[{'Number Of selected nodes':0},
  {'average containers per node':0},
  {'Priorities':0},
  {'Cohesion':0},
  {'Average Power Consumption':0},
  {'Number Of Changes':0}
  
            ]
  ngOnInit(): void {
    
  }
  onSave(i){
    if (this.check[i]==true){
      this.check[i]=false
    }
   else{
    this.check[i]=true
   }
    console.log(this.check)
  }

  savechanges(){
    let i=0
    let weights=[]
    this.check.forEach(element => {
      
      if (element!=false){
        weights.push(this.objectives[i])
      }
      i=i+1
    });
    console.log(weights)
    this.api.weights(weights)
      .subscribe(
        resp => {
         console.log(resp)
        },
        
  )
  }
}
