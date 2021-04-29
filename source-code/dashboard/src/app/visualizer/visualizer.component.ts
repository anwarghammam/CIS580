import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  info=[]
  nodes_info=[]
  nodes_all=[]
  containers_all=[]
  resp
  total_power_per_node=[]
  containers_info=[]
  nodes_ids=[]
  containers=[]
  data1=[]
  color
  nodes_names=[]
  nodes_power_consumption=[]
  containers_priorities=[]
  containers_power_consumption=[]
  priorities=[]
  colors=['blue','yellow','red','pink','green','gray','white']
 

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.color = [Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1),Math.floor((Math.random() * 6) + 1)]
    this.get_constraints()
    this.nb_info()
  
    
  }


  nb_info(){
    this.api.nb_info()
    .subscribe(
      resp => {
       
        this.info=resp.body['data']['result']
        
       for (var val of this.info){
         
        this.nodes_ids.push(val['metric']['node_id'])
        this.nodes_names.push(val['metric']['node_name'])
        this.data1.push([val['metric']['node_name'],val['metric']['node_id'],val['metric']['instance']])
      }
        this.get_containers()
        });
       
      this.api.all_current_data=this.data1
     
     
  }


  get_containers(){
    this.get_constraints()
    
    this.data1.forEach(val=>{
     let containers_per_node=[]
     let power_per_node=[]
      let priorities_per_node=[]
     this.api.containers_per_node(String(val[1]))
     .subscribe(
       resp => {
         
          resp.body['data'].result.forEach(element => {
          containers_per_node.push(element['metric']['container_label_com_docker_swarm_service_name'].toString())
          
            
          });
          
          val.push(containers_per_node)
            
          

         
          this.containers_info.forEach(element => {
          
          
           let index=containers_per_node.indexOf(element['name'])
          
            if (index> -1){
              
            power_per_node[index]=(element['power_consumption'])
            priorities_per_node[index]=(element['priority'])
            }
           
            
          });
        
        
          let sum=0
        
          power_per_node.forEach(element => {
            
            sum=sum+parseInt(element)
 
            
          });
          val.push(sum)
         
       
          this.total_power_per_node.push(sum)
         })
        
        
        
       
         this.containers_power_consumption.push(power_per_node)
         this.containers_priorities.push(priorities_per_node)
        ;}
        
        
        )
      
       

      
       
   }
  
  
  
  
   get_constraints(){
    this.api.get_constraints()
    .subscribe(
      resp => {
        
            this.resp=resp.body
        
         this.containers_info=resp.body['containers']
         this.nodes_info=resp.body["nodes"]
         
       
           
       this.nodes_info.forEach(element => {
        let index=this.nodes_names.indexOf(element['name'])
         if (index> -1){
           this.nodes_power_consumption[index]=(element['max_power_consumption'])
         }
         
       });

       
       





    
        
        });
        
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }
