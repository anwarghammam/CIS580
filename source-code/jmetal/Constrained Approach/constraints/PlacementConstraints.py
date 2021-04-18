#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 21:31:45 2021

@author: anwar
"""

class PlacementConstraints():
    
    
    
    def evaluate(self,instance,solution):
        
        invalid=0
        for i in range(len(instance.constraints)):
    
            if (instance.constraints[i]!='NA'):
                
                cons=instance.constraints[i]
                if (type(cons) is int):
                    if(solution.variables[i] != cons):
                        invalid=invalid+1
                        
                    
                else:    
            
                    if(solution.variables[i] not in cons):
                        invalid=invalid+1
                        
                
                        
        return(invalid)
    
    
        