# Many-objective Container Scheduling

Many-objective Container Scheduling

[![GitHub Release](https://img.shields.io/github/release/iselab-dearborn/many-objective-container-scheduling.svg)](https://github.com/iselab-dearborn/many-objective-container-scheduling/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/iselab-dearborn/many-objective-container-scheduling.svg)](https://github.com/iselab-dearborn/many-objective-container-scheduling/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/iselab-dearborn/many-objective-container-scheduling.svg)](https://github.com/iselab-dearborn/many-objective-container-scheduling)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

The original paper was published at:

> To be Announced 

## How to Install

This project is built based on basically two technologies described as follows:
* Python
* Angular 

Also, it is based on 3 docker machines so we will be using a VMware to create them , thus please run the following instructions:

## for Ubuntu 

```bash
$ sudo apt-get install virtualbox
$ curl -L https://github.com/docker/machine/releases/download/v0.16.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
chmod +x /tmp/docker-machine && sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

```
## for Windows
If you have not yet installed Docker for Windows, please see this link https://docs.docker.com/docker-for-windows/install/ for an explanation.
To Create machines locally using VirtualBox https://www.virtualbox.org/. This driver requires VirtualBox 5+ to be installed on your host. Using VirtualBox 4.3+ should work but will give you a warning. Older versions will refuse to work. 

Now, you are ready create a docker machine, please run the following command on your cmd:
```
docker-machine create --driver virtualbox "the machine's name" 
```
Please make sure to give the following names to the created machines : "Manager" , "Worker1", "Worker2" since we used them in our code.
<br> </br>
You can verify the creation of the machines by running:
```
$ docker-machine ls
```

At this point, we have to create a swarm where one of the machine is a manager and the two others are workers (or nodes).
First, connect to the manager using <strong> docker-machine ssh "its name" </strong> .
Then, to create the swarm, you have first to get the IP address of your manager using <strong> "ifconfig" </strong> and then run the following command:
```
$ docker swarm init --advertise-addr ip-adress
```
To add workers to this swarm, please run the command provided in the output on each machine you want to add after connecting to it. (In our case we want to add 2 workers)

Next, you can check the swarm members using:
```
$ docker node ls
```

Now we have to install some services for Docker Swarm monitoring (to expose Docker engine and container metrics in our project)

<p> Services :</p> 

* prometheus (metrics database) `http://<swarm-ip>:9090`
* node-exporter (host metrics collector)
* cadvisor (containers metrics collector)
* dockerd-exporter (Docker daemon metrics collector)
* grafana (visualize metrics) `http://<swarm-ip>:3000`
    
## Install
```bash
$ git clone https://github.com/anwarghammam/Monitoring-Docker-Swarm
$ cd Monitoring-Docker-Swarm/
$ docker stack --compose-file docker-compose.yml prom
```
you can check the containers in every machine using: 

```
docker ps
```
## Using an example of a docker project
Now, you will create a docker project on the cluster using the yaml file cbe-app.yml that exists on the Monitoring-Docker-Swarm repository 
```bash

$ cd Monitoring-Docker-Swarm/
$ docker stack deploy --compose-file cbe-app.yml p1
```
<strong> PS: you can always check the services you have on your cluster using: </strong>

```bash

$ docker service ls

```
<strong> Or the containers that are allocated to a specific node using: </strong>

```bash

$ docker ps

```
## FrontEnd
<br>
Before running the app, there are some changes that you have to do since you are using your own docker machines.
<br> </br>
Please go to <strong> src/app/home/chart.js </strong> and replace the variable <strong> url </strong> with "http://your-manager-ip:9090".
 <br> </br>   
Also, go to <strong> src/app/api.service.ts </strong> and replace the variable <strong> url </strong> with "http://your_manager-ip:9090" and the three variables <strong> manager_id, worker1_id  and  worker2_id</strong> with your nodes ids that you can find by running the command <strong> docker node ls </strong> on the manager. 

 <br/><br/>
Now, open a terminal on the dashboard project and run the following command:
```bash

$ npm install
$ ng serve 
```
Please access on your browser http://localhost:4200. If everything is working well, you are going to see the following webpage.

<div align="center">
    <kbd>
        <img src="https://github.com/iselab-dearborn/many-objective-container-scheduling/blob/main/screenshots/dashboard.png"/>
    </kbd>
    <br/><br/>
</div>
<br> </br>

## BackEnd
<br> </br>
Now, you need to run the backend (in the Jmetal repository). Please go to you Anaconda Prompt (Anaconda needs to be installed on your host) and run the <strong> app.py </strong> file using the following command:
<br> </br>
```bash

$ python app.py
```

It will run our Api !
<br></br>
And now everything is ready! you can test the demo in the dashboard.

## Usage

The following steps are just another version on how to install this project in your machine. This is made based on a Windows machine. Other operating systems are supposed to be a bit different.

1. Install Virtualbox and its extension pack 
2. Install Python 
3. Install Docker Desktop
4. Install [Docker Machine](https://docs.docker.com/machine/install-machine/)
5. Please ake sure you have VT-X/AMD-v enabled on your BIOS. This is mandatory. It is possible to face some problems if Hyper-V is enabled on Windows. Then, keep it disabled since it may have some conflict with Virtualbox
6. Creating machines on Virtualbox. Run the following commands:
    * `docker-machine.exe create --virtualbox-no-vtx-check "manager"`
    * `docker-machine.exe create --virtualbox-no-vtx-check "worker1"`
    * `docker-machine.exe create --virtualbox-no-vtx-check "worker2"`
7. You need to know what is the manager's IP
	* `docker-machine.exe ip manager`
8. You need to install Docker Swarm in a "manager" node. So access the manager node
    * `docker-machine.exe ssh "manager"`
9. Install Docker Swarm. Access  
    * `docker swarm init --advertise-addr 192.168.99.100`
10. When Swarm is successfully started, you need to "connect" or "add" nodes to it. Use the command displayed to access each created node and run it. This command looks the following:
    * `docker swarm join --token <TOKE> 192.168.99.100:2377`


## Useful Commands

Deploy a stack on Docker Swarm. You need to use a docker compose file to this end

```console
docker stack deploy --compose-file docker-compose.yml grocery
```

Access a node:

```console
docker-machine.exe ssh "manager"
```
List all nodes

```console
docker node ls
```

Install Docker Swarm

```console
docker swarm init --advertise-addr <Manager's IP>
```

Get the manager’s ip

```console
docker-machine.exe ip manager
```

Create the nodes

```console
docker-machine.exe create --virtualbox-no-vtx-check "manager"
```











## Questions or Suggestions

Feel free to create <a href="https://github.com/iselab-dearborn/many-objective-container-scheduling/issues">issues</a> here as you need

## Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## Authors

* **Anwar Ghammam** - *Initial work*

See also the list of [contributors](https://github.com/iselab-dearborn/many-objective-container-scheduling/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Powered by

<p float="left">
    <img src="https://user-images.githubusercontent.com/114015/77862143-99351b80-71e7-11ea-84b2-62038634f314.png" height="58px"/>
</p>
