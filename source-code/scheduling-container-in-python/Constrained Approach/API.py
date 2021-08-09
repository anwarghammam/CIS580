#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  8 09:50:11 2021

@author: anwar
"""

from flask import request
from flask import Flask, jsonify
import json
import requests 
import subprocess
from launchAlgo import transform
from flask_restful import  Api
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
from instance.Instance import Instance
from Problem.Instance_from_Json import createInstance



instance=Instance()

 
@app.route('/getjson/', methods=['GET'])
def getjson():
    f = open(r"instanceExamples/data.json")

    data = json.load(f)
    response = app.response_class(
        response=json.dumps(data),
        mimetype='application/json'
    )
    return response

@app.route('/getenergy', methods=['GET'])
def getcsv():
    f = open(r"./energy.json")

    data = json.load(f)
    response = app.response_class(
        response=json.dumps(data),
        mimetype='application/json'
    )
    return response


@app.route('/update/', methods=['POST'])
def events():
    

    content = request.get_data()
    c=json.loads(content)
    print(c)
    with open(r"instanceExamples/data.json", 'w') as f:
        json.dump(c, f)
    return 'JSON posted'

@app.route('/getweights/', methods=['POST'])
def weights():
    

    content = request.get_data()
    c=json.loads(content)
    print(c)
    with open(r"./instanceExamples/data.json", "r") as file:
        
        data= json.load(file)
        data['objectives']=c
                        
    with open(r"./instanceExamples/data.json", "w") as file:
        json.dump(data, file)
    return json.dumps(c)



@app.route('/default/', methods=['GET'])
def get():
    cmd = ('ssh root@manager docker stack deploy --compose-file initial-docker-compose.yml p').split()

    p = subprocess.Popen(cmd,stdout = subprocess.PIPE)
    output, errors = p.communicate()
       
    print(output)
    print(errors)
    result=jsonify("done")
       
    return (result)

@app.route('/getcpu/', methods=['GET'])
def get_cpu_per_container():
    Instance=createInstance(instance)
    for node in Instance.nodes:
      
        r = requests.get('http://192.168.99.100:9090/api/v1/query?query=sum(irate(container_cpu_usage_seconds_total%7Bcontainer_label_com_docker_swarm_node_id%3D~"'+str(node.cluster_id)+'"%2C%20id%3D~"%2Fdocker%2F.*"%7D%5B5m%5D))%20by%20(name)%20*%20100%20&g0.tab=1')
        
        for metric in json.loads(r.text)['data']['result']:
            
            name=(metric['metric']['name'])
            
            with open(r"./instanceExamples/data.json", "r") as file:
                data= json.load(file)
            for con in data['containers']:
                if (con['name'] in name):
                    
                    con['cpu_usage']=float(metric['value'][1])
                        
            with open(r"./instanceExamples/data.json", "w") as file:
                
                json.dump(data, file)

        
        
    return (jsonify('done'))

@app.route('/getmem/', methods=['GET'])
def get_mem_per_container():
    Instance=createInstance(instance)
    for node in Instance.nodes:
       
        r = requests.get('http://192.168.99.100:9090/api/v1/query?query=avg_over_time(container_memory_usage_bytes%7Bcontainer_label_com_docker_swarm_node_id%3D~"'+str(node.cluster_id)+'"%2C%20id%3D~"%2Fdocker%2F.*"%7D%5B5m%5D)%2F1024%2F1024&g0.tab=1')
       
      
        for metric in json.loads(r.text)['data']['result']:
            
            name=(metric['metric']['name'])
            with open(r"./instanceExamples/data.json", "r") as file:
                data= json.load(file)
            for con in data['containers']:
                if (con['name'] in name):
                    
                    con['mem_usage']=float(metric['value'][1])
                        
            with open(r"./instanceExamples/data.json", "w") as file:
                
                json.dump(data, file)

        
        
    return (jsonify('done'))


@app.route('/getMaxmem/', methods=['GET'])
def get_Maxmem_penode():
    Instance=createInstance(instance)
    for node in Instance.nodes:
        print(node.cluster_id)
        r = requests.get('http://192.168.99.100:9090/api/v1/query?query=sum(node_memory_MemTotal_bytes%20*%20on(instance)%20group_left(node_name)%20node_meta%7Bnode_id%3D~"'+str(node.cluster_id)+'"%7D)%2F1000%2F1000&g0.tab=1')
       
        print(json.loads(r.text)['data']['result'][0]['value'][1])
       
        with open(r"./instanceExamples/data.json", "r") as file:
            data= json.load(file)
            for con in data['nodes']:
                
                if (con['name'] == node.name):
                    
                    con['Maxmem']=float(json.loads(r.text)['data']['result'][0]['value'][1])
                        
            with open(r"./instanceExamples/data.json", "w") as file:
                
                json.dump(data, file)

        
        
    return (jsonify('done'))



@app.route('/newapproach/', methods=['GET'])

def new_approach():
    
   
    Instance=createInstance(instance)
    time=transform(Instance)
    y = {"containers":len(Instance.containers),
     "exectime": round(time, 2)
   
    }
    with open(r"./instanceExamples/exec.json", "r") as file:
        data= json.load(file)
        data["times"].append(y)
           
                        
    with open(r"./instanceExamples/exec.json", "w") as file:
        json.dump(data, file)

    cmd = ('docker-machine ssh default docker stack deploy --compose-file updated-docker-compose.yml p ').split()

    p = subprocess.Popen(cmd)
    output, errors = p.communicate() 
  
       
    # print(output)
    # print(errors)
#        ssh.connect(hostname='ec2-54-87-55-164.compute-1.amazonaws.com', username='ubuntu',pkey=privkey)
#        #ssh.connect("ubuntu@ec2-54-87-55-164.compute-1.amazonaws.com",)
#        stdin, stdout, stderr=ssh.exec_command('rmdir test')
#        print (stdout.read())
#        print(stderr.read())
       

       
    result=jsonify(time)
       
    return (result)  
@app.route('/getexectime/', methods=['GET'])

def gettimes():
    f = open(r"./instanceExamples/exec.json", "r")

    data = json.load(f)
    response = app.response_class(
        response=json.dumps(data),
        mimetype='application/json'
    )
    return response   

if __name__ == '__main__':
     app.run(port='5002')       