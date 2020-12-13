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

This project is built based on basically three technologies described as follows:
* Python
* Angular 
Also, this project is based on 3 docker machines so we will be using a VMware to create them , thus please install VMware Workstation on your machine first.

To create a docker machine, please run the following command on your cmd:
```
docker-machine create "the machine's name" 
```
You can verify the creation of the machines by running 
```
docker-machine ls"
```

At this point, we have to create a swarn where one of the machine is a manager and the two others are workers (or nodes)
After choosing the manager, connect to it using <p> docker-machine ssh "its name" <p>
Then, to create the swarm, you have first to get the IP address of your manager using "ifconfig" and then run the following command 
```
docker swarm init --advertise-addr ip-adress
```
To add workers to this swarm, run the command provided in the output on each machine you want to add after connecting to it. (In our case we want to add 2 workers)

Next, you can check the swarm members using 
```
docker node ls
```

## Usage

TODO

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
