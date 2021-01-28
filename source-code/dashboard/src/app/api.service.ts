import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
 url="http://192.168.99.101:9090/"
 manager_id="2obmatsgr0jh0gd7xmbvdhlfl"
 worker1_id="a0rltj1fq6e0hw6f1ukxevhw3"
 worker2_id="kou3p86e5k9xaithdo5rky9w2"
 
  constructor(private http: HttpClient)  { }
    getSmartphone():Observable<HttpResponse<any>>{
      return this.http.get<any>("https://rescheduleapp.herokuapp.com/fct1", { observe: 'response' });
    }
    getSmartphone1():Observable<HttpResponse<any>>{
      return this.http.get<any>("https://rescheduleapp.herokuapp.com/fct", { observe: 'response' });
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
      return   this.http.get<JSON>(this.url+"api/v1/query?query=sum((node_filesystem_free_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D+%2F+node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D)+*+on(instance)+group_left(node_name)+node_meta*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
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
      return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_filesystem_free_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D+%2F+node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker1_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker1_id+"%22%7D)", { observe: 'response' });
     }
     consumed_cpu_worker2():Observable<HttpResponse<JSON>>{
      return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_filesystem_free_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D+%2F+node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker2_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.worker2_id+"%22%7D)", { observe: 'response' });
     }
     consumed_cpu_manager():Observable<HttpResponse<JSON>>{
      return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_filesystem_free_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D+%2F+node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.manager_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+this.manager_id+"%22%7D)", { observe: 'response' });
     }

     
    



     


     

     
    
}
