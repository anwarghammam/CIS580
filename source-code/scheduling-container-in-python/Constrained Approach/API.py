#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  8 09:50:11 2021

@author: anwar
"""

from flask import request
from flask import Flask, jsonify
import json
import subprocess
from launchAlgo import transform
from flask_restful import  Api
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/getjson/', methods=['GET'])
def summary():
    f = open(r"instanceExamples/data.json")

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



@app.route('/default/', methods=['GET'])
def get():
    cmd = ('ssh root@manager docker stack deploy --compose-file initial-docker-compose.yml p').split()

    p = subprocess.Popen(cmd,stdout = subprocess.PIPE)
    output, errors = p.communicate()
       
    print(output)
    print(errors)
    result=jsonify("done")
       
    return (result)

@app.route('/newapproach/', methods=['GET'])

def new_approach():
    transform()
    cmd = ('docker-machine ssh manager docker stack deploy --compose-file updated-docker-compose.yml p ').split()

    p = subprocess.Popen(cmd)
    output, errors = p.communicate() 
       
    # print(output)
    # print(errors)
#        ssh.connect(hostname='ec2-54-87-55-164.compute-1.amazonaws.com', username='ubuntu',pkey=privkey)
#        #ssh.connect("ubuntu@ec2-54-87-55-164.compute-1.amazonaws.com",)
#        stdin, stdout, stderr=ssh.exec_command('rmdir test')
#        print (stdout.read())
#        print(stderr.read())
       

       
    result=jsonify("done")
       
    return (result)  



if __name__ == '__main__':
     app.run(port='5002')       