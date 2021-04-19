#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:47:51 2021

@author: anwar
"""

class Priority():
    
    
    def evaluate(self,Instance,solution):  
        
        total_priorities=0
        
        for i,con in enumerate(solution.variables):
            
            
            if (con!=-1):
                total_priorities=total_priorities+Instance.find_container_by_id(i).priority
                
        return (total_priorities/len(solution.variables))
