import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
 url="http://192.168.179.68:9090/"
 manager_id="etux4zcqyftiy7af95b10ujdz"
 worker1_id="nipzxzgh951depdmgujlysrun"
 worker2_id="3s37cf8tgz163z58o7qsi9umg"
 
 constructor(private http: HttpClient)  { }
 default():Observable<HttpResponse<any>>{
   return this.http.get<any>("http://localhost:5002/default", { observe: 'response' });
 }
 newapproach():Observable<HttpResponse<any>>{
   return this.http.get<any>("http://localhost:5002/new", { observe: 'response' });
 }
 getnb_nodes()
 {
  return   this.http.get<JSON>(this.url+"api/v1/query?query=count(node_meta)", { observe: 'response' })
  
 }                                                                                                                         
 getnb_services():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(count(container_tasks_state%7Bcontainer_label_com_docker_swarm_service_name%3D~%22.%2B%22%7D)+by+(container_label_com_docker_swarm_service_name))", { observe: 'response' });
  }
  
  get_available_mem():Observable<HttpResponse<JSON>>{
   return  this.http.get<JSON>(this.url+"api/v1/query?query=sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }
  get_available_disk():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])%20%20*%20on(instance)%20group_left(node_name)%20node_meta*%20100))", { observe: 'response' });
  }

  nb_con_worker2():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(container_last_seen%7Bcontainer_label_com_docker_swarm_node_id%3D~%22"+this.worker2_id+"%22%7D)", { observe: 'response' });
  }

  nb_con_manager2():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(container_last_seen%7Bcontainer_label_com_docker_swarm_node_id%3D~%22"+this.manager_id+"%22%7D)", { observe: 'response' });
  }

  nb_con_worker1():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(container_last_seen%7Bcontainer_label_com_docker_swarm_node_id%3D~%22"+this.worker1_id+"%22%7D)", { observe: 'response' });
  }

  nb_info():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_meta)+by+(node_id,+node_name,+instance)", { observe: 'response' });
  }
  nb_totalmem():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_memory_MemTotal_bytes%2F100000000*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }
  nb_total_disk():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D%2F100000000*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }

 consumed_mem_worker1():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker1_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker1_id+"%22%7D)", { observe: 'response' });
  }

  consumed_mem_worker2():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker2_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker2_id+"%22%7D)", { observe: 'response' });
  }

  consumed_mem_manager():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.manager_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.manager_id+"%22%7D)", { observe: 'response' });
  }

  consumed_cpu_worker1():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])*%20on(instance)%20group_left(node_name)%20node_meta{node_id=%22"+this.worker1_id+"%22}%20*%20100)%20by%20(node_name))", { observe: 'response' });
  }
  consumed_cpu_worker2():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])*%20on(instance)%20group_left(node_name)%20node_meta{node_id=%22"+this.worker2_id+"%22}%20*%20100)%20by%20(node_name))", { observe: 'response' });
  }
  consumed_cpu_manager():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])*%20on(instance)%20group_left(node_name)%20node_meta{node_id=%22"+this.manager_id+"%22}%20*%20100)%20by%20(node_name))", { observe: 'response' });
  }
  alerts():Observable<HttpResponse<JSON>>{
    return   this.http.get<JSON>(this.url+"api/v1/alerts", { observe: 'response' });
   }
}


  
 



  


  

  
 
