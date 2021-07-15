#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jul 12 10:33:31 2021

@author: asus
"""



# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 13:50:38 2021

@author: anwar
"""
import math
class EvalCpuConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_cpu_consumption=[0 for i in range(len(Instance.nodes))]
        #print(solution.variables)
        #print(total_power_consumption)
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
               
                total_cpu_consumption[var]=total_cpu_consumption[var]+Instance.find_container_by_id(i).cpu_usage
      
        average =sum(total_cpu_consumption)/ len(total_cpu_consumption)
        total=0
        for cpu_per_node in total_cpu_consumption:
            
            total+=(cpu_per_node-average)*(cpu_per_node-average)
    
        return(math.sqrt(total/len(total_cpu_consumption)) )      
        
            
    
    
    