#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 22 16:14:50 2021

@author: anwar
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 19 15:12:01 2021

@author: anwar
"""

# -*- coding: utf-8 -*-
"""
Created on Thu Sep  3 12:13:49 2020

@author: User
"""


from abc import ABC
from jmetal.core.problem import IntegerProblem
from jmetal.core.solution import IntegerSolution
import collections
import math
from extract_data import constraints_violated
from data import data

images,containers,roles,initial_state,machines,constraints,dependencies=data()
#images,containers,roles,initial_state,machines=get_data()
#keep_trace1(containers,initial_state,machines)
n_nodes=len(machines)
class MOOC(IntegerProblem,ABC):
    """ Problem MOOC.
    .. note::  The default number of variables is 30.
    .. note:: Continuous problem having a convex Pareto front
    """

    def __init__(self, number_of_variables: int=len(containers)):
        """ :param number_of_variables: Number of decision variables of the problem.
        """
        super(MOOC, self).__init__()
        self.dependencies=dependencies
        self.initial_state=initial_state
        self.number_of_variables = len(containers)
        self.number_of_objectives = 6
        

        self.obj_directions = [self.MINIMIZE,self.MINIMIZE,self.MINIMIZE,self.MINIMIZE,self.MINIMIZE,self.MINIMIZE]
        self.obj_labels = ['nb_nodes','average_nb_containers_per_node','cohesion','coupling','nb_changes','nb_constraints']

        self.lower_bound = self.number_of_variables * [0.0]
        self.upper_bound = self.number_of_variables * [n_nodes]
    def evaluate(self, solution: IntegerSolution) -> IntegerSolution:
        
        nb_nodes= self.eval_number_nodes(solution)
        nb_containers_per_node= self.eval_nb_containers_per_node(solution)
        cohesion,coupling=self.eval_cohesion_coupling(solution)
        nb_changes=self.eval_nb_changes(solution)
        nb_constraints=self.eval_nb_CONSTRAINTS(solution,constraints)
      
        solution.objectives[0] = nb_nodes
        solution.objectives[1] = nb_containers_per_node
        solution.objectives[2]= cohesion
        solution.objectives[3]=coupling
        solution.objectives[4]=nb_changes
        solution.objectives[5]=nb_constraints
       
        
        
        #self.__evaluate_constraints(solution)
        return solution
    
    
     
    def eval_number_nodes(self, solution: IntegerSolution):
        nb_selected_nodes = len(set(solution.variables))

        return (nb_selected_nodes/n_nodes)

    def eval_nb_containers_per_node(self, solution: IntegerSolution):
        
        occurences=[]
        total=0
        for val in collections.Counter(solution.variables).values() :
            
            occurences.append(val/len(solution.variables))
        average =sum(occurences)/ len(occurences)
        for oc in occurences:
            total+=(oc-average)*(oc-average)
            
      
        return(math.sqrt(total/len(occurences)) )  
    def eval_cohesion_coupling(self,solution:IntegerSolution):
        
        intra_dependencies=0
        inter_dependencies=0
        for dep in self.dependencies:
            
            
            if(solution.variables[dep[0]]==solution.variables[dep[1]]):
                
                intra_dependencies=intra_dependencies+1
            else:
                inter_dependencies=inter_dependencies+1
                
        cohesion=1-(intra_dependencies/len(self.dependencies))
        
        coupling=inter_dependencies/len(self.dependencies)
        
        return  cohesion,coupling
    def eval_nb_changes(self ,solution:IntegerSolution)   :
        changes=0
        # initial_set=set(self.initial_state)
        # solution_set=set(solution.variables)
        # for i in initial_set:
        #     if i not in solution_set:
        #         changes+=1
#        for i in solution_set:
#            if i not in initial_set:
#                changes+=1        
        for i in range(len(self.initial_state)):
            if (self.initial_state[i]!=solution.variables[i]):
                changes+=1
        changes=changes/len(solution.variables)        
        return(changes)        
   
    def eval_nb_CONSTRAINTS(self ,solution:IntegerSolution,constraints):
        
        violated=0
        all=0
        for i in range(len(constraints)):
         
    
            if (constraints[i]!='NA'):
                all=all+1
                cons=constraints[i]
                if (type(cons) is int):
                    if(solution.variables[i] != cons):
                    
                        violated=violated+1
                
                else:    
            
                    if(solution.variables[i] not in cons):
                        violated=violated+1
                
                    
        return(violated/all)
       
    def get_name(self):
        return 'MOOC1'    
