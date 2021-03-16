# -*- coding: utf-8 -*-
"""
Created on Sun Aug 30 13:11:51 2020

@author: User
"""

import subprocess
import json

all1={}
import yaml

#NUMBER OF NODES BY CLUSTER 




def get_nodes():
    machines=[]
    #please change this path with the right one for you
    with  open(r"/home/anwar/Desktop/test3.txt",'w') as file :
    
    
        cmd = ('ssh root@manager docker node ls').split()

        p = subprocess.Popen(cmd,stdout=file)
        output, errors = p.communicate()

    #please change this path with the right one for you
    with open(r"/home/anwar/Desktop/test3.txt",'r') as file:
    
    
        for line in file:
    
            line=line.replace("*",'')
          
        
            groupe=line.split()
          
            machines.append(groupe[1])
   
    machines[0]='manager'  
    del machines[1]
    
    
    
    del machines[-1]
    return machines

def get_data():
    machines=get_nodes()
    print()
    print("nodes :")
    print()
    print(machines)
    containers=[]
    initial_state=[]
    images=[]
    for i,machine in enumerate(machines) :
        containers1=[]
        images1=[]
        #please change this path with the right one for you
        with  open(r"/home/anwar/Desktop/test3.txt",'w') as file :
            cmd = ('ssh root@'+str(machine)+' docker ps ').split()

            p = subprocess.Popen(cmd,stdout=file)
            output, errors = p.communicate()
        with open(r"/home/anwar/Desktop/test3.txt",'r') as file:
        
            for line in file:
            
                groupe=line.split()
                
                containers1.append(groupe[-1])
                images1.append(groupe[1])
            
        containers1=containers1[1:] 
        images1=images1[1:]
        # print("avant")
        # print(containers1)
       
        if( 'carlosedp/rpi-cadvisor:latest' in images1):
            del containers1[images1.index('carlosedp/rpi-cadvisor:latest')]
            del images1[images1.index('carlosedp/rpi-cadvisor:latest')]
        if( 'anwargh/grafana:vlast' in images1):
            del containers1[images1.index('anwargh/grafana:vlast')]
            del images1[images1.index('anwargh/grafana:vlast')]
        if( 'jmb12686/node-exporter:latest' in images1):
            del containers1[images1.index('jmb12686/node-exporter:latest')]
            del images1[images1.index('jmb12686/node-exporter:latest')]
        if( 'prom/alertmanager:latest' in images1):
            del containers1[images1.index('prom/alertmanager:latest')]
            del images1[images1.index('prom/alertmanager:latest')]    
            
        if( 'anwargh/prometheus:arch64' in images1):
            del containers1[images1.index('anwargh/prometheus:arch64')]
            del images1[images1.index('anwargh/prometheus:arch64')]      
            
        if( 'anwargh/prometheus:arch32' in images1):
            del containers1[images1.index('anwargh/prometheus:arch32')]
            del images1[images1.index('anwargh/prometheus:arch32')]      
                
     
   
        for container in containers1:
        
            containers.append(container)
            initial_state.append(i)        
        
        for img in images1:
        
            images.append(img)
            
    
    return images,containers,initial_state,machines

images,containers,initial_state,machines=get_data()
print()
print("containers: ")
print()
print(containers)
print()
print("images: ")
print()
print(images)
print()
print()
print()
print("initiial state: ")
print()
print(initial_state)


def keep_trace1(containers,state,machines,file):
    
   
        
    
    with open(r'/home/anwar/Desktop/docker-compose.yml') as file2:
    # The FullLoader parameter handles the conversion from YAML
    # scalar values to Python the dictionary format
        compose = yaml.load(file2,Loader=yaml.FullLoader)
        
    
    for i,con  in enumerate(images) :
        for dict in compose['services']:
            
            
            if str(compose['services'][dict]['image']) in str(con):
                
                name='node.hostname == '+str(machines[state[i]])
                compose['services'][dict].update({'deploy': {'placement': {'constraints':  [ name ]}}})    
                
    
    with open(file,'w') as file1:
        
        yaml.dump(compose,file1)  
        
    cmd = ('scp '+ file+' root@manager: ').split()

    p = subprocess.Popen(cmd)
    output, errors = p.communicate() 
    
    # cmd = ('ssh root@manager docker stack deploy --compose-file docker-compose1.yml p1 ').split()

    # p = subprocess.Popen(cmd)
    # output, errors = p.communicate() 
    
    



def get_dependencies():
    
    all3=[]
    images,containers,initial_state,machines=get_data()
    cmd = ('scp root@manager:docker-compose.yml /home/anwar/Desktop').split()

    p = subprocess.Popen(cmd)
    output, errors = p.communicate() 
    with open(r'/home/anwar/Desktop/docker-compose.yml') as file:
        
    # The FullLoader parameter handles the conversion from YAML
    # scalar values to Python the dictionary format
        compose = yaml.load(file,Loader=yaml.FullLoader)
        # print(containers)
        for dict in compose['services']:
            key=[]
            print(dict)
            
            if((compose['services'][dict].get('depends_on') is not None)):
               
                #image=compose['services'][dict]['image']
                # print(image)
                key=[]
                for k,con in enumerate(containers):
                    
                    if (str(dict) in str(con)) :
                        key.append(k)
                        print(key)
                        
                
                dependencies=compose['services'][dict]['depends_on']
                # print(dependencies)
                images1=[]
                for dep in dependencies:
                    images1.append(compose['services'][dep]['image'])
                # print(images)    
                for dep in images1:
                    
                    for j,con in enumerate(images):
                        
                        for k in key:
                            
                            if (str(dep) in str(con)) and ((k,j) not in all3):
                                all3.append((k,j))
                            
                
               
                            
             
            if((compose['services'][dict].get('links') is not None)):
                image=compose['services'][dict]['image']
                for k,con in enumerate(containers):
                    if (str(image) in str(con)):
                        key=k
                        # print(key)
                        
                
                dependencies=compose['services'][dict]['links']
                images=[]
                for dep in dependencies:
                    images.append(compose['services'][dep]['image'])
                for dep in images:
                    for j,con in enumerate(containers):
                        if (str(dep) in str(con)) and  ((key,j) not in all3):
                            all3.append((key,j))
        print()
        print()                   
        print("dependencies :")
        print()
        print()
        print(all3)    
        return (all3)  


    