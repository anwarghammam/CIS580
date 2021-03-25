# -*- coding: utf-8 -*-
"""
Created on Thu Sep  3 11:45:07 2020

@author: User
"""

from jmetal.algorithm.multiobjective.nsgaiii import UniformReferenceDirectionFactory
from NSGAIII1 import NSGAIII
from jmetal.operator.crossover import IntegerSBXCrossover
from jmetal.operator.mutation import IntegerPolynomialMutation
from Containers_problem import MOOC
#from problem2 import MOOC1
from jmetal.util.termination_criterion import StoppingByEvaluations
from jmetal.util.solution import get_non_dominated_solutions, print_function_values_to_file,print_variables_to_file,print_function_values_to_screen,print_variables_to_screen
from jmetal.lab.visualization import Plot
from jmetal.core.quality_indicator import QualityIndicator,FitnessValue,HyperVolume,InvertedGenerationalDistance
#from jmetal.util.observer import BasicAlgorithmObserver
from jmetal.util.observer import  ProgressBarObserver
import numpy as np
from extract_data import get_data,get_constraints,constraints_violated
import subprocess
solutions=[]
problem = MOOC()
#problem2=MOOC1()
all2=np.zeros([1,5])
all3=[]
images,containers,roles,initial_state,machines=get_data()
max_evaluations=2200
algorithm1= NSGAIII(
    problem=problem,
    population_size=200,
    #offspring_population_size=400,
    reference_directions=UniformReferenceDirectionFactory(5,n_points=35),
    mutation=IntegerPolynomialMutation(probability=1 / problem.number_of_variables, distribution_index=20),
    crossover=IntegerSBXCrossover(probability=0.9, distribution_index=20),
    termination_criterion=StoppingByEvaluations(max_evaluations=max_evaluations)
)

progress_bar = ProgressBarObserver(max=max_evaluations)
algorithm1.observable.register(progress_bar)    
print("NSGAiii")
def transform():
    
    algorithm1.run()
       
    front = get_non_dominated_solutions(algorithm1.get_result())
    violated=0
    for sol in front:
        if(constraints_violated(sol,get_constraints(machines,roles,images))==True):
                violated+=1
        print("violated solutions are equal to ", violated/len(front) ,"%  for ", len(front))    
# save to files
        # front_sol1=[]
        # resultat=[]
        # for solution in front:
        #     res=0
        #     res=solution.objectives[0]*0.2+solution.objectives[1]*0.2+solution.objectives[2]*0.2+solution.objectives[3]*0.2+solution.objectives[4]*0.2
        #     resultat.append(res)
    
        #     front_sol1.append(solution.objectives)
        # best_sol=resultat.index(min(resultat))  
        # all3.append(front[best_sol])    
       
        # all2[i]=front[best_sol].objectives
    
    print_function_values_to_file(front,r"/home/anwar/Desktop/NSGAIII/approach1/function_values"+str(max_evaluations)+".txt")
    print_variables_to_file(front, r"/home/anwar/Desktop/NSGAIII/approach1/variables"+str(max_evaluations)+".txt")
    print("functions value of the front :")
    print()
    print()
        #print_function_values_to_screen(front)
    print()
    print("variables value of the front:")
    print()
    print()
        #print_variables_to_screen(front)


#    plot_front = Plot(title='Pareto front approximation', axis_labels=['nb_nodes','max_containers/node','cohesion','coupling','changes'])
#    plot_front.plot(front, label='NSGAIII-MOOC', filename=r"C:\Users\User\Desktop\MOOC\NSGAIII\MOOC", format='png')
    
   
    # for i in all3:
    #     print(i.variables)
    #     print("objectives")
    # 
        
    # state=all3[0].variables
    # candidate_functions=all3[0].objectives
    # print("candidate solution : ")
    # print()
    
    # print(state)
    # print(candidate_functions)

    # images,containers,initial_state,machines=get_data()
    
    # keep_trace1(containers,initial_state,machines,r'/home/anwar/Desktop/docker-compose.yml')
    # keep_trace1(containers,state,machines,r'/home/anwar/Desktop/docker-compose1.yml')
    
    
    return front
#-----------------------------------------------------------------------------------------------------------------------------------------------

transform()