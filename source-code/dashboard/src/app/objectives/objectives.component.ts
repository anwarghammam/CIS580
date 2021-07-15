import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  constructor(private api: ApiService) { }
  check=[false,false,false,false,false,false,false,false,false]
 
  objectives=[{0:0},
  {1:0},
  {2:0},
  {3:0},
  {4:0},
  {5:0},
  {6:0},
  {7:0},
  {8:0}
  
            ]
  ngOnInit(): void {
    
  }
  onSave(i){
    if (this.check[i]==true){
      this.check[i]=false
     if(i==8){
       this.objectives[8][8]=0
     }
    }
   else{
    this.check[i]=true
    if(i==8){
      this.objectives[8][8]=1
    }
   
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
    if (this.check[8]==false){
      weights.push(this.objectives[8])
    }
    console.log(weights)
    this.api.weights(weights)
      .subscribe(
        resp => {
         console.log(resp)
        },
        
  )
  }
}
