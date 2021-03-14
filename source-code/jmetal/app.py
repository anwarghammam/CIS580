# -*- coding: utf-8 -*-
"""
Created on Wed Sep 30 19:58:26 2020

@author: User
"""
from flask import Flask, jsonify
from flask_restful import Resource, Api
import subprocess
from NSGAIII import transform
app = Flask(__name__)
api = Api(app)

class default_scheduler(Resource):
    def get(self):
        
        cmd = ('ssh root@manager docker stack deploy --compose-file docker-compose_initial.yml p1').split()

        p = subprocess.Popen(cmd,stdout = subprocess.PIPE)
        output, errors = p.communicate()
       
        print(output)
        print(errors)
        result=jsonify("done")
       
        return (result)
class new_approach(Resource):
    def get(self):
        transform()
        cmd = ('ssh root@manager docker stack deploy --compose-file docker-compose1.yml p1 ').split()

        p = subprocess.Popen(cmd)
        output, errors = p.communicate() 
       
        print(output)
        print(errors)
#        ssh.connect(hostname='ec2-54-87-55-164.compute-1.amazonaws.com', username='ubuntu',pkey=privkey)
#        #ssh.connect("ubuntu@ec2-54-87-55-164.compute-1.amazonaws.com",)
#        stdin, stdout, stderr=ssh.exec_command('rmdir test')
#        print (stdout.read())
#        print(stderr.read())
       

       
        result=jsonify("done")
       
        return (result)    
    
    
        
        
api.add_resource(default_scheduler, '/default') # Route_1
api.add_resource(new_approach, '/new')

#
#
if __name__ == '__main__':
     app.run(port='5002')        