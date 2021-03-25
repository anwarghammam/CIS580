#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Mar 21 12:15:24 2021

@author: anwar
"""

from typing import TypeVar, List
from numpy.linalg import LinAlgError
from jmetal.core.solution import IntegerSolution
from extract_data import get_data,get_constraints,constraints_violated
import numpy as np
from jmetal.algorithm.multiobjective.nsgaii import NSGAII
from jmetal.config import store
from jmetal.core.operator import Mutation, Crossover, Selection
from jmetal.core.problem import Problem
from jmetal.operator import BinaryTournamentSelection
from jmetal.util.comparator import Comparator, MultiComparator
from jmetal.util.density_estimator import CrowdingDistance
from jmetal.util.evaluator import Evaluator
from jmetal.util.generator import Generator
from jmetal.util.ranking import FastNonDominatedRanking
from jmetal.util.termination_criterion import TerminationCriterion

S = TypeVar('S')
R = TypeVar('R')


images,containers,roles,initial_state,machines=get_data()
class NSGAIII(NSGAII):

    def __init__(self,
                 reference_directions,
                 problem: Problem,
                 mutation: Mutation,
                 crossover: Crossover,
                 population_size: int = None,
                 selection: Selection = BinaryTournamentSelection(
                     MultiComparator([FastNonDominatedRanking.get_comparator(),
                                      CrowdingDistance.get_comparator()])),
                 termination_criterion: TerminationCriterion = store.default_termination_criteria,
                 population_generator: Generator = store.default_generator,
                 population_evaluator: Evaluator = store.default_evaluator,
                 dominance_comparator: Comparator = store.default_comparator):
        self.reference_directions = reference_directions.compute()

        if not population_size:
            population_size = len(self.reference_directions)
        if self.reference_directions.shape[1] != problem.number_of_objectives:
            raise Exception('Dimensionality of reference points must be equal to the number of objectives')

        super(NSGAIII, self).__init__(
            problem=problem,
            population_size=population_size,
            offspring_population_size=population_size,
            mutation=mutation,
            crossover=crossover,
            selection=selection,
            termination_criterion=termination_criterion,
            population_evaluator=population_evaluator,
            population_generator=population_generator,
            dominance_comparator=dominance_comparator
        )

        self.extreme_points = None
        self.ideal_point = np.full(self.problem.number_of_objectives, np.inf)
        self.worst_point = np.full(self.problem.number_of_objectives, -np.inf)
        
    def create_initial_solutions(self) -> List[S]:
        # solultions=[self.population_generator.new(self.problem)
        #         for _ in range(self.population_size)]
        
        # for sol in solultions:
        #     print(sol.variables)
        # return(solultions)
        solutions=[]
        
        while (len(solutions)!=self.population_size):
            sol=self.population_generator.new(self.problem)
        
            if (constraints_violated(sol,get_constraints(machines,roles,images))==False):
               
                solutions.append(sol)
       
       
        return(solutions) 
  
       
    def reproduction(self, mating_population: List[S]) -> List[S]:
        number_of_parents_to_combine = self.crossover_operator.get_number_of_parents()

        if len(mating_population) % number_of_parents_to_combine != 0:
            raise Exception('Wrong number of parents')

        offspring_population = []
        for i in range(0, self.offspring_population_size, number_of_parents_to_combine):
            parents = []
            for j in range(number_of_parents_to_combine):
                parents.append(mating_population[i + j])

            offspring = self.crossover_operator.execute(parents)
            
            for solution in offspring:
                self.mutation_operator.execute(solution)
                # here i will add constraints
                if(constraints_violated(solution,get_constraints(machines,roles,images))==False):
                
                    offspring_population.append(solution)
                if len(offspring_population) >= self.offspring_population_size:
                    break

        return offspring_population            
    
    def replacement(self, population: List[S], offspring_population: List[S]) -> List[S]:
       
        
        F = np.array([s.objectives for s in population])

        # find or usually update the new ideal point - from feasible solutions
        # note that we are assuming minimization here!
        self.ideal_point = np.min(np.vstack((self.ideal_point, F)), axis=0)
        self.worst_point = np.max(np.vstack((self.worst_point, F)), axis=0)

        # calculate the fronts of the population
        ranking = FastNonDominatedRanking(self.dominance_comparator)
        ranking.compute_ranking(population + offspring_population, k=self.population_size)

        fronts, non_dominated = ranking.ranked_sublists, ranking.get_subfront(0)

        # find the extreme points for normalization
        self.extreme_points = get_extreme_points(F=np.array([s.objectives for s in non_dominated]),
                                                 n_objs=self.problem.number_of_objectives,
                                                 ideal_point=self.ideal_point,
                                                 extreme_points=self.extreme_points)

        # find the intercepts for normalization and do backup if gaussian elimination fails
        worst_of_population = np.max(F, axis=0)
        worst_of_front = np.max(np.array([s.objectives for s in non_dominated]), axis=0)

        nadir_point = get_nadir_point(extreme_points=self.extreme_points,
                                      ideal_point=self.ideal_point,
                                      worst_point=self.worst_point,
                                      worst_of_population=worst_of_population,
                                      worst_of_front=worst_of_front)

        #  consider only the population until we come to the splitting front
        pop = np.concatenate(ranking.ranked_sublists)
        F = np.array([s.objectives for s in pop])

        # update the front indices for the current population
        counter = 0
        for i in range(len(fronts)):
            for j in range(len(fronts[i])):
                fronts[i][j] = counter
                counter += 1
        last_front = np.array(fronts[-1])

        # associate individuals to niches
        niche_of_individuals, dist_to_niche = associate_to_niches(F=F,
                                                                  niches=self.reference_directions,
                                                                  ideal_point=self.ideal_point,
                                                                  nadir_point=nadir_point)

        # if we need to select individuals to survive
        if len(pop) > self.population_size:
            # if there is only one front
            if len(fronts) == 1:
                until_last_front = np.array([], dtype=np.int)
                niche_count = np.zeros(len(self.reference_directions), dtype=np.int)
                n_remaining = self.population_size
            # if some individuals already survived
            else:
                until_last_front = np.concatenate(fronts[:-1])
                niche_count = compute_niche_count(len(self.reference_directions),
                                                  niche_of_individuals[until_last_front])
                n_remaining = self.population_size - len(until_last_front)

            S_idx = niching(pop=pop[last_front],
                            n_remaining=n_remaining,
                            niche_count=niche_count,
                            niche_of_individuals=niche_of_individuals[last_front],
                            dist_to_niche=dist_to_niche[last_front])

            survivors_idx = np.concatenate((until_last_front, last_front[S_idx].tolist()))
            pop = pop[survivors_idx]

        return list(pop)

    def get_result(self):
        """ Return only non dominated solutions."""
        ranking = FastNonDominatedRanking(self.dominance_comparator)
        ranking.compute_ranking(self.solutions, k=self.population_size)

        return ranking.get_subfront(0)

    def get_name(self) -> str:
        return 'NSGAIII'
def get_extreme_points(F, n_objs, ideal_point, extreme_points=None):
    """ Calculate the Achievement Scalarization Function which is used for the extreme point decomposition. """
    asf = np.eye(n_objs)
    asf[asf == 0] = 1e6

    # add the old extreme points to never loose them for normalization
    _F = F
    if extreme_points is not None:
        _F = np.concatenate([extreme_points, _F], axis=0)

    # use __F because we substitute small values to be 0
    __F = _F - ideal_point
    __F[__F < 1e-3] = 0

    # update the extreme points for the normalization having the highest asf value each
    F_asf = np.max(__F * asf[:, None, :], axis=2)
    idx = np.argmin(F_asf, axis=1)
    extreme_points = _F[idx, :]

    return extreme_points


def get_nadir_point(extreme_points, ideal_point, worst_point, worst_of_front, worst_of_population):
    """ Calculate the axis intersects for a set of individuals and its extremes (construct hyperplane). """
    try:
        # find the intercepts using gaussian elimination
        M = extreme_points - ideal_point
        b = np.ones(extreme_points.shape[1])
        plane = np.linalg.solve(M, b)
        intercepts = 1 / plane

        nadir_point = ideal_point + intercepts

        if not np.allclose(np.dot(M, plane), b) or np.any(intercepts <= 1e-6) or np.any(nadir_point > worst_point):
            raise LinAlgError()
    except LinAlgError:
        nadir_point = worst_of_front

    b = nadir_point - ideal_point <= 1e-6
    nadir_point[b] = worst_of_population[b]

    return nadir_point


def niching(pop: List[S], n_remaining: int, niche_count, niche_of_individuals, dist_to_niche):
    survivors = []

    # boolean array of elements that are considered for each iteration
    mask = np.full(len(pop), True)

    while len(survivors) < n_remaining:
        # number of individuals to select in this iteration
        n_select = n_remaining - len(survivors)

        # all niches where new individuals can be assigned to and the corresponding niche count
        next_niches_list = np.unique(niche_of_individuals[mask])
        next_niche_count = niche_count[next_niches_list]

        # the minimum niche count
        min_niche_count = next_niche_count.min()

        # all niches with the minimum niche count (truncate if randomly select more niches than remaining individuals)
        next_niches = next_niches_list[np.where(next_niche_count == min_niche_count)[0]]
        next_niches = next_niches[np.random.permutation(len(next_niches))[:n_select]]

        for next_niche in next_niches:
            # indices of individuals that are considered and assign to next_niche
            next_ind = np.where(np.logical_and(niche_of_individuals == next_niche, mask))[0]

            # shuffle to break random_search tie (equal perp. dist) or select randomly
            np.random.shuffle(next_ind)

            if niche_count[next_niche] == 0:
                next_ind = next_ind[np.argmin(dist_to_niche[next_ind])]
                is_closest = True
            else:
                # already randomized through shuffling
                next_ind = next_ind[0]
                is_closest = False

            # add the selected individual to the survivors
            mask[next_ind] = False
            pop[next_ind].attributes['is_closest'] = is_closest
            survivors.append(int(next_ind))

            # increase the corresponding niche count
            niche_count[next_niche] += 1

    return survivors


def associate_to_niches(F, niches, ideal_point, nadir_point, utopian_epsilon: float = 0.0):
    """ Associate each solution to a reference point. """
    utopian_point = ideal_point - utopian_epsilon

    denom = nadir_point - utopian_point
    denom[denom == 0] = 1e-12

    # normalize by ideal point and intercepts
    N = (F - utopian_point) / denom

    def compute_perpendicular_distance(N, ref_dirs):
        u = np.tile(ref_dirs, (len(N), 1))
        v = np.repeat(N, len(ref_dirs), axis=0)

        norm_u = np.linalg.norm(u, axis=1)

        scalar_proj = np.sum(v * u, axis=1) / norm_u
        proj = scalar_proj[:, None] * u / norm_u[:, None]
        val = np.linalg.norm(proj - v, axis=1)
        matrix = np.reshape(val, (len(N), len(ref_dirs)))

        return matrix

    dist_matrix = compute_perpendicular_distance(N, niches)

    niche_of_individuals = np.argmin(dist_matrix, axis=1)
    dist_to_niche = dist_matrix[np.arange(F.shape[0]), niche_of_individuals]

    return niche_of_individuals, dist_to_niche


def compute_niche_count(n_niches: int, niche_of_individuals):
    niche_count = np.zeros(n_niches, dtype=np.int)
    index, count = np.unique(niche_of_individuals, return_counts=True)
    niche_count[index] = count

    return niche_count