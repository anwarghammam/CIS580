import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  info=[]
  nodes_ids=[]
  containers=[]
  data1=[]
  nodes_names=[]
  colors=['blue','yellow']
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.nb_info()
  }


  nb_info(){
    this.api.nb_info()
    .subscribe(
      resp => {
        console.log(resp)
        this.info=resp.body['data']['result']
        
       for (var val of this.info){
         
        this.nodes_ids.push(val['metric']['node_id'])
        this.nodes_names.push(val['metric']['node_name'])
        this.data1.push([val['metric']['node_name'],val['metric']['node_id'],val['metric']['instance']])
      }
        this.get_containers()
        });
       
      console.log(this.nodes_names)
     
  }


  get_containers(){
         
         
    this.nodes_ids.forEach(val=>{
     let containers_per_node=[]
  
     this.api.containers_per_node(String(val))
     .subscribe(
       resp => {
          
          resp.body['data'].result.forEach(element => {
          containers_per_node.push(element['metric']['container_label_com_docker_swarm_service_name'])
            
          });

        
         })
         this.containers.push(containers_per_node)
        ;})
        console.log(this.containers)
      console.log(this.containers)
        
   }}
