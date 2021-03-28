#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 27 11:04:24 2021

@author: anwar
"""
import ast
def data():
    file1 = open(r"/home/anwar/Desktop/new.txt", 'r')
    Lines = file1.readlines()
    machines=Lines[0]
    machines = ast.literal_eval(Lines[0])
   
    roles=ast.literal_eval(Lines[1])
   
    containers=ast.literal_eval(Lines[2])
   
    images=ast.literal_eval(Lines[3])
 
    initial_state=ast.literal_eval(Lines[4])
   
    constraints=ast.literal_eval(Lines[5])
   
   
    dependencies=ast.literal_eval(Lines[6])
    
   
    return images,containers,roles,initial_state,machines,constraints,dependencies
