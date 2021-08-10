#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 15:56:23 2021

@author: anwar
"""

import json

from instance.Node import Node
from instance.Container import Container
from instance.Instance import Instance


def createInstance(Instance):
    
    f = open(r"instanceExamples/Instance100.json")
   
    data = json.load(f)
    
    for i in data['nodes']:
        
        print(i['max_power_consumption'])
        n=Node(i['id'],i['cluster_id'],i['name'],i['activated'],i['max_power_consumption'],i['Maxmem'])
        print(n.maxPowerconsumption)
        Instance.nodes.append(n)
    for i in data['containers']:
        print(i)
        print(i['cpu_usage'])
        container=Container(i['id'],i['name'],i['image'],i['dependencies'],i['placements'],i['power_consumption'],i['average_power_consumption_per_minute'],i['priority'],i['cpu_usage'],i['mem_usage'])
        print(container.cpu_usage)
     
        Instance.containers.append(container)
    Instance.currentState=data['currentState']    
    Instance.objectives=data['objectives']
    Instance.get_valid_nodes()
    Instance.getImages()
    Instance.get_alldependencies()
    
    
    return Instance

# instance=Instance()
# Instance=createInstance(instance)
# objs=[]
# for ob in Instance.objectives:
#     for key,value in enumerate((ob)):
#         print(ob[value])
#         objs.append(value)
        
        
