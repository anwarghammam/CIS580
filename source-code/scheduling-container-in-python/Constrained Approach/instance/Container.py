#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 14:22:33 2021

@author: anwar
"""

class Container:
    def __init__(self,id,name,dependencies,placement,powerConsumption,priority):
        
        self.id=id
        self.name=name
        self.dependencies=dependencies
        self.placement=placement
        self.powerConsumption=powerConsumption
        self.priority=priority
        
        
    def get_dependencies(self):
        edges=[]
        for i in(self.dependencies):
            edges.append((self.id,i))
        return(edges)    
            