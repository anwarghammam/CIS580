import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Router } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';
declare var $:any;

                          
@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})


export class ConstraintsComponent implements OnInit {


   power=false  
   fileToUpload =null;
   containers=[]
   nodes=[]
   constraints=[]
   nodes_max_power_consumption=[]
   containers_power_consumption=[]
   new_nodes_max_power_consumption=[]
   new_containers_power_consumption=[]
   new_constraints=[]
   check1=[]
    resp=[]
    

  constructor(private api: ApiService,private router: Router) { 
    
  }

  ngOnInit(): void {
    this.get_constraints()
  }

  poweron(){
    if (this.power==false){
      this.power=true
      this.nodes.forEach(element => {
        this.nodes_max_power_consumption.push(element['max_power_consumption'])
        
      });
      this.containers.forEach(element => {
       this.containers_power_consumption.push(element['power_consumption']) 
     }) ;
    }
    else{
      this.power=false
      this.nodes_max_power_consumption=[]
      this.containers_power_consumption=[]

  }}




  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.fileToUpload=fileReader.result
      this.fileToUpload=JSON.parse(this.fileToUpload)
      console.log(this.fileToUpload['containers'])
      this.fileToUpload['containers'].forEach(con=> {
        console.log(con['placements'])
        this.new_constraints.push(con['placements'])
        this.new_containers_power_consumption.push(con['power_consumption'])
       

        
      });
      this.fileToUpload['nodes'].forEach(node=> {
       
        this.new_nodes_max_power_consumption.push(node['max_power_consumption'])
       

        
      });
      console.log(this.new_constraints)
    }
    fileReader.readAsText(this.fileToUpload);
}


  checkboxChanged(i,j) {
    console.log(i)
    console.log(j)
    if (this.check1[j][i]==false){
      this.check1[j][i]=true
    }
    else {
      this.check1[j][i]=false
    }
   
  }
  

  save(){
   
    if (this.fileToUpload ==null){

    
    for (var i = 0; i < this.containers.length; i++){
      let con1=[]
     for (var j = 0; j < this.nodes.length;j++){
       if (this.check1[i][j]==true){
         con1.push(j)
       }

      
     }
     this.new_constraints.push(con1)
     


  }
console.log("new constraints  ",this.new_constraints)
for (var j = 0; j < this.new_constraints.length;j++){
  this.resp['containers'][j]['placements']=this.new_constraints[j]
  this.resp['containers'][j]['power_consumption']=this.containers_power_consumption[j]

}
for (var j = 0; j < this.nodes_max_power_consumption.length;j++){
 
  this.resp['nodes'][j]['max_power_consumption']=this.nodes_max_power_consumption[j]

}}
else{


  for (var j = 0; j < this.new_constraints.length;j++){
    this.resp['containers'][j]['placements']=this.new_constraints[j]
    this.resp['containers'][j]['power_consumption']=this.new_containers_power_consumption[j]
  
  }
  for (var j = 0; j < this.nodes_max_power_consumption.length;j++){
   
    this.resp['nodes'][j]['max_power_consumption']=this.new_nodes_max_power_consumption[j]
  
  }

  

}


console.log(this.resp)

this.api.update_constraints(this.resp)
      .subscribe(
        resp => {
         console.log(resp)
        },
        
  )
  const type = ['','info','success','warning','danger'];
        
            var color = Math.floor((Math.random() * 4) + 1);
            $.notify({
               
                message: "saving new constraints..."
            },{
                type: type[color],
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'center' ,
                }
            });
  window.location.reload();
   


}



  get_constraints(){
    this.api.get_constraints()
    .subscribe(
      resp => {
        console.log(resp)    
            this.resp=resp.body
         console.log(resp)
         this.containers=resp.body['containers']
         this.nodes=resp.body["nodes"]
         
         console.log(this.containers)
    console.log(this.nodes)

         

       for (var i = 0; i < this.containers.length; i++){
       
         let node=[]
         
        for (var j = 0; j < this.nodes.length;j++){
        
          node.push(false)
        }

      
          let placements=this.containers[i]['placements']
          if (placements!=[]){
            for (var p = 0; p < placements.length; p++){
              console.log(p)
              console.log(placements[p])
              node[placements[p]]=true
              
            }
          }
        
         this.check1.push(node)
        }
      
   

     

       
        
        });
        console.log(this.constraints)
        console.log(this.check1)
        console.log(this.containers_power_consumption)
     console.log(this.nodes_max_power_consumption)
  }

 
  


}
