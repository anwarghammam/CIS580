import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as ChartAnnotation from "chartjs-plugin-annotation";

import {forkJoin} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})


export class InfoComponent implements OnInit {
  


	@ViewChild('googlechart')
	googlechart: GoogleChartsModule;
  chartanno=ChartAnnotation
  chart1 = {
		title: 'Total memory',
		type: 'Gauge',
		data:[ ["memory",78
      
     
		
		]],
		options: {
			width: 400,
      height: 150,
      greenFrom: 0,
			greenTo: 75,
			redFrom: 90,
			redTo: 100,
			yellowFrom: 75,
			yellowTo: 90,
      minorTicks: 5,
      majorTicks: ['0%', '100%']
			
     
    }}
    chart2 = {
      title: 'Total disk',
      type: 'Gauge',
      data:[ [
        'disk',78,
       
      
      ]],
      options: {
        width: 400,
        height: 150,
        
        greenFrom: 0,
        greenTo: 75,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
       
       
        
       
      }}
      chart3 = {
        title: 'services',
        type: 'Gauge',
        data:[ [
          'services',10,
          
        
        ]],
        options: {
          width: 400,
          height: 150,
         
          blueFrom: 0,
          blueTo: 100,
          
          minorTicks: 5
          
         
        }}
       
  public node  =0
  public services
  public available_mem
  public available_disk
  public con_manager2
  public con_worker2
  public con_worker1
  public info_worker1
  public info_worker2
  public info_manager2
  public total_memory
  public total_disque
  public data1
  public consumed_mem_w1
  public consumed_mem_w2
  public consumed_mem_m
  public consumed_cpu_w1
  public consumed_cpu_w2
  public consumed_cpu_m
  public data3
public pieChartData=[6,4,4]
  infos:JSON[]
  public data = [
    ['manager', 45.0],
    ['worker1', 26.8],
    ['worker2', 12.8],
   
 ];


  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.number_node()
  this.consumed_mem()
  this.nb_con_manager2()
  this.nb_con_worker1()
  this.nb_total_dis() /* */
  
  this.nb_con_worker2() 
  this.nb_info()   
  this.nb_services() /* */
  this.nb_total_mem()  /* */
  this.get_available_mem()
  this.get_available_disk()
  
        }
    
    
  
   
        consumed_mem(){
          this.api.consumed_mem_worker1().subscribe(
            resp => {
              console.log("anwar")
              console.log(resp)
                this.consumed_mem_w1=parseFloat(resp.body['data']['result']['0']['value']['1']);
                console.log("w1 "+this.consumed_mem_w1)
                this.data3 = [
                  ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                  ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                  ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                 
               ];
          
              });
              this.api.consumed_mem_worker2().subscribe(
                resp => {
                  console.log("anwar")
                  console.log(resp)
                    this.consumed_mem_w2=parseFloat(resp.body['data']['result']['0']['value']['1']);
                    console.log("w1 "+this.consumed_mem_w2)
                    this.data3 = [
                      ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                      ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                      ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                     
                   ];
                  });
                  this.api.consumed_mem_manager().subscribe(
                    resp => {
                      console.log("anwar")
                      console.log(resp)
                        this.consumed_mem_m=parseFloat(resp.body['data']['result']['0']['value']['1']);
                        console.log("w1 "+this.consumed_mem_m)
                        this.data3 = [
                          ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                          ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                          ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                         
                       ];
                  
                      });
                      this.api.consumed_cpu_manager().subscribe(
                        resp => {
                          console.log("anwar")
                          console.log(resp)
                            this.consumed_cpu_m=parseFloat(resp.body['data']['result']['0']['value']['1']);
                            console.log("cpu m "+this.consumed_cpu_m)
                            this.data3 = [
                              ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                              ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                              ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                             
                           ];
                      
                          });
                          this.api.consumed_cpu_worker1().subscribe(
                            resp => {
                              console.log("anwar")
                              console.log(resp)
                                this.consumed_cpu_w1=parseFloat(resp.body['data']['result']['0']['value']['1']);
                                console.log("cpu "+this.consumed_cpu_w1)
                                this.data3 = [
                                  ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                                  ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                                  ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                                 
                               ];
                          
                              });
                              this.api.consumed_cpu_worker2().subscribe(
                                resp => {
                                  console.log("anwar******")
                                  console.log(resp)
                                    this.consumed_cpu_w2=parseFloat(resp.body['data']['result']['0']['value']['1']);
                                    console.log("w2 ***** "+this.consumed_cpu_w2)
                                    this.data3 = [
                                      ["worker1    (cpu,mem)",this.consumed_cpu_w1, this.consumed_mem_w1],
                                      ["manager(cpu,mem)",this.consumed_cpu_m,this.consumed_mem_m],
                                      ["worker2(cpu,mem)",this.consumed_cpu_w2, this.consumed_mem_w2],
                                     
                                   ];
                              
                                  });
            
        }
  
  
    
  number_node(){
    this.api.getnb_nodes().subscribe(
      resp => {
        console.log("anwar")
        console.log(resp)
          this.node=resp.body['data']['result']['0']['value']['1'];
         console.log("inside fonction  "+this.node)
		
        });
      
  }
  nb_services(){
    this.api.getnb_services()
      .subscribe(
        resp => {
         
            this.services=parseFloat(resp.body['data']['result']['0']['value']['1']);
            console.log("services "+this.services)
            this.chart3.data= [['nb services',this.services]]
        
          });

  }
  get_available_mem(){
    this.api.get_available_mem()
    .subscribe(
      resp => {
        console.log("anwar")
          this.available_mem=100-parseFloat(resp.body['data']['result']['0']['value']['1']);
      console.log("available mem "+this.available_mem)
      this.chart1.data= [['consumed Memory',this.available_mem]]
        });
     
  }
  get_available_disk(){
    this.api.get_available_disk()
    .subscribe(
      resp => {
        console.log("anwar")
          this.available_disk=100-parseFloat(resp.body['data']['result']['0']['value']['1']);
          console.log("available dek "+this.available_disk)
          this.chart2.data= [['consumed disk',this.available_disk]]
        });

  }
  nb_con_worker2(){
    this.api.nb_con_worker2()
    .subscribe(
      resp => {
        console.log("anwar")
        console.log(resp)
          this.con_worker2=resp.body['data']['result']['0']['value']['1'];
          console.log("con worker2  "+this.con_worker2)
          this.data = [
            ['manager', this.con_manager2],
            ['worker1',this.con_worker1],
            ['worker2',this.con_worker2],
           
         ];
         this.pieChartData=[this.con_manager2,this.con_worker1,this.con_worker2]
        });

  }
  public nb_con_manager2() {
  
    let result
     this.api.nb_con_manager2()
    .subscribe(
      resp => {
        console.log(resp)
       result=(parseInt(resp.body['data']['result']['0']['value']['1']));
       this.con_manager2=result
       console.log("con manager "+this.con_manager2)
       this.data = [
        ['manager', this.con_manager2],
        ['worker1',this.con_worker1],
        ['worker2',this.con_worker2],
       
     ];
     this.pieChartData=[this.con_manager2,this.con_worker1,this.con_worker2]
        });
       
    
    
  }
  nb_con_worker1(){
    this.api.nb_con_worker1()
    .subscribe(
      resp => {
        console.log(resp)
         this.con_worker1=resp.body['data']['result']['0']['value']['1'];
         console.log("con worker1 "+this.con_worker1)
         this.data = [
          ['manager', this.con_manager2],
          ['worker1',this.con_worker1],
          ['worker2',this.con_worker2],
         
       ];
       this.pieChartData=[this.con_manager2,this.con_worker1,this.con_worker2]
        });

  }
  nb_info(){
    this.api.nb_info()
    .subscribe(
      resp => {
        console.log(resp)
        this.info_worker2=resp.body['data']['result']['0']['metric'];
        this.info_manager2=resp.body['data']['result']['1']['metric'];
        this.info_worker1=resp.body['data']['result']['2']['metric'];
        console.log("info worker2 "+this.info_worker2['instance'])
        this.data1 = [
          [this.info_manager2['node_name'],this.info_manager2['node_id'],this.info_manager2['instance']],
          [this.info_worker1['node_name'],this.info_worker1['node_id'],this.info_worker1['instance']],
          [this.info_worker2['node_name'],this.info_worker2['node_id'],this.info_worker2['instance']],
          
       ];
        });

  }
  nb_total_mem(){
    this.api.nb_totalmem()
    .subscribe(
      resp => {
        console.log("anwar")
         this.total_memory=parseFloat((resp.body['data']['result']['0']['value']['1']));
         console.log("totzl mem"+this.total_memory)
        
         
        
        });

  }
  
  nb_total_dis(){
    this.api.nb_total_disk()
    .subscribe(
      resp => {
        console.log("chouf")
        console.log(resp)
         this.total_disque=parseFloat(resp.body['data']['result']['0']['value']['1']);
         console.log("totzl disque"+this.total_disque)
       
        });

  }
  
  public pieChartOptions: ChartOptions = {
    title: {
      text: 'number of containers per node',
      display: true
    },
    responsive: true,
  };
  public pieChartLabels: Label[] = ["manager","worker1","worker2"];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  
  public pieChartPlugins = [];



  /* etheni */
  title = 'number of containers per node';
   type = 'PieChart';
   
   columnNames = ['Browser', 'Percentage'];
   options = {    
   };
   width = 400;
   height = 400;




   /*table*/
   title1 = "cluster members";
   type1 = 'Table';
   
   columnNames1=["node_name", "node_id","instance"];
   options1 = { 
     alternatingRowStyle:true,
     showRowNumber:true  
   };
   
   width1 = 400;
   height1 = 200;



   /* bars*/
   title3 = '% resources consumption per node';
   type3= 'ComboChart';

   columnNames3 = ['%','c','me'];
   options3 = {   
      hAxis: {
         title: 'node'
      },
      vAxis:{
         title: '% of consumption'
      },
      seriesType: 'bars',
      annotation: {
        "annotations": [{
                "type": "box",
                
                "yScaleID": "y-axis-0",
                "yMin": 30,
                "yMax": 55,
               
                "borderWidth": 1,
                "backgroundColor": "rgba(200,60,60,0.25)",
                "borderColor": "rgba(200,60,60,0.25)"
            },
        ]
    }
   };
   width3 = 550;
   height3 = 200;





   
}



