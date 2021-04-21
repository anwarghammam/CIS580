#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 14:39:07 2021

@author: anwar
"""

class Instance():
    
    def __init__(self):
        
        self.nodes=[]
        self.containers=[]
        self.currentState=[]
        self.constraints=[]
        self.dependencies=[]
    def find_container_by_id(self,id):
        for con in self.containers:
            if (con.id ==id):
                return (con)
                
    def find_node_by_id(self,id):
        for n in self.nodes:
            if (n.id ==id):
                
               return (n)   
    
    def get_alldependencies(self):
        all_edges=[]
        for con in self.containers:
            con_dependencies=con.get_dependencies()
            for dep in con_dependencies:
                all_edges.append(dep)
        self.dependencies=all_edges
        return all_edges    
    
    def active_nodes(self):
        active_nodes=[]
        for n in self.nodes:
            if (str(n.activated)=="True") :
                active_nodes.append(n.id)
                
        return active_nodes        
    def get_valid_nodes(self):
        valid_nodes=[]
        active_nodes=self.active_nodes()
        for c in self.containers:
            valid_nodes_per_container=[]
            
            constraints_per_container=[]
            if (c.placement!=[]):
                constraints_per_container=c.placement
                valid_nodes_per_container= list(set(active_nodes) & set(constraints_per_container))
                valid_nodes_per_container.append(-1)
                valid_nodes.append(valid_nodes_per_container)
                
            
            else :
                
               
                for active_node in active_nodes:
                    
                    
                    valid_nodes_per_container.append(active_node)
                valid_nodes_per_container.append(-1)
                valid_nodes.append(valid_nodes_per_container)
        self.constraints=valid_nodes        
        return valid_nodes
    
    
    def print_info(self,name):
        if name=="nodes":
            for i,n  in enumerate(self.nodes):
                print("node " + str(i)+" "+ n.name)
                
        if name=="containers":
            for i,n  in enumerate(self.containers):
                print("containers " + str(i)+" "+ n.name)  
        if name=="currentstate":
            print("current state : " + str(self.currentState)) 
        if name=="constraints":
            print("constraints : " + str(self.constraints))   
        if name=="dependencies":
            print("dependencies : " + str(self.dependencies))     
                
   