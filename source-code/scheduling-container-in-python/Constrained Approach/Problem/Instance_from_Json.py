#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 15:56:23 2021

@author: anwar
"""

import json

from instance.Node import Node
from instance.Container import Container



def createInstance(Instance):
    
    f = open(r"instanceExamples/data.json")
    data = json.load(f)
    
    for i in data['nodes']:
        
        
        n=Node(i['id'],i['name'],i['activated'],i['max_power_consumption'])
        Instance.nodes.append(n)
    for i in data['containers']:
        container=Container(i['id'],i['name'],i['image'],i['dependencies'],i['placements'],i['power_consumption'],i['priority'])
        Instance.containers.append(container)
    Instance.currentState=data['currentState']    
    Instance.get_valid_nodes()
    Instance.getImages()
    Instance.get_alldependencies()
    
    
    return Instance
