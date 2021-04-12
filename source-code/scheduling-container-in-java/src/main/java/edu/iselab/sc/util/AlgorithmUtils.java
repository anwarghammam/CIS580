package edu.iselab.sc.util;

import java.util.List;

import org.uma.jmetal.algorithm.Algorithm;
import org.uma.jmetal.algorithm.multiobjective.nsgaii.NSGAIIBuilder;
import org.uma.jmetal.algorithm.multiobjective.nsgaiii.NSGAIIIBuilder;
import org.uma.jmetal.operator.crossover.impl.IntegerSBXCrossover;
import org.uma.jmetal.operator.mutation.impl.IntegerPolynomialMutation;
import org.uma.jmetal.operator.selection.impl.BinaryTournamentSelection;
import org.uma.jmetal.solution.integersolution.IntegerSolution;

import edu.iselab.sc.constant.AlgorithmName;
import edu.iselab.sc.problem.ContainerSchedulingProblem;

public class AlgorithmUtils {

    public static double crossoserProbability = 0.9;
    
    public static double mutationProbability = 0.005;
    
    public static Algorithm<List<IntegerSolution>> getAlgorithm(ContainerSchedulingProblem problem, AlgorithmName algorithmName, int populationSize, int iterations) {

        if (algorithmName == AlgorithmName.NSGA_II) {
            return getNSGAII(problem, populationSize, iterations);
        }

        if (algorithmName == AlgorithmName.NSGA_III) {
            return getNSGAIII(problem, populationSize, iterations);
        }

        return null;
    }
    
    public static Algorithm<List<IntegerSolution>> getNSGAII(ContainerSchedulingProblem problem, int populationSize, int iterations) {

        return new NSGAIIBuilder<IntegerSolution>(
            problem, 
            new IntegerSBXCrossover(crossoserProbability, 20.0), 
            new IntegerPolynomialMutation(mutationProbability, 20.0), 
            populationSize
        )
        .setSelectionOperator(new BinaryTournamentSelection<IntegerSolution>())
        .setMaxEvaluations(populationSize * iterations)
        .build() ;
    }
    
    public static Algorithm<List<IntegerSolution>> getNSGAIII(ContainerSchedulingProblem problem, int populationSize, int iterations) {
        
        return new NSGAIIIBuilder<>(problem)
            .setCrossoverOperator(new IntegerSBXCrossover(crossoserProbability, 20.0))
            .setMutationOperator(new IntegerPolynomialMutation(mutationProbability, 20.0))
            .setSelectionOperator(new BinaryTournamentSelection<IntegerSolution>())
            .setMaxIterations(iterations)
            .setNumberOfDivisions(5)
            .build();
    }

    

    
}
