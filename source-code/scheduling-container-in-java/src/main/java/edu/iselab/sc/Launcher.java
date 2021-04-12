package edu.iselab.sc;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.Callable;

import org.uma.jmetal.algorithm.Algorithm;
import org.uma.jmetal.algorithm.multiobjective.nsgaii.NSGAIIBuilder;
import org.uma.jmetal.algorithm.multiobjective.nsgaiii.NSGAIIIBuilder;
import org.uma.jmetal.example.AlgorithmRunner;
import org.uma.jmetal.operator.crossover.impl.IntegerSBXCrossover;
import org.uma.jmetal.operator.mutation.impl.IntegerPolynomialMutation;
import org.uma.jmetal.operator.selection.impl.BinaryTournamentSelection;
import org.uma.jmetal.solution.integersolution.IntegerSolution;

import edu.iselab.sc.constant.AlgorithmName;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.ContainerSchedulingProblem;
import edu.iselab.sc.util.AlgorithmUtils;
import edu.iselab.sc.util.FileUtils;
import edu.iselab.sc.util.GraphvizUtils;
import edu.iselab.sc.util.InstanceUtils;
import edu.iselab.sc.util.ParetoFrontUtils;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;

@Command(
    name = "launcher", 
    footer = "Copyright(c) 2021 ISELab Dearborn"
)
public class Launcher implements Callable<Integer> {
    
    @Option(names = { "-i", "--input" }, description = "the input file")
    protected Path input = Paths.get("src/main/resources/instances/instance-5n50c.json");
    
    @Option(names = { "-a", "--alg" }, description = "algorithm name")
    public AlgorithmName algorithmName = AlgorithmName.NSGA_III;
    
    @Option(names = { "-p", "--pop" }, description = "population size")
    public int populationSize = 100;

    @Option(names = { "-it", "--it" }, description = "max iterations")
    public int iterations = 100;
    
    @Option(names = { "-o", "--output" }, description = "the output folder")
    protected Path output = FileUtils.getCurrentDirectory().resolve("output");

    public static void main(String[] args) {

        int exitCode = new CommandLine( new Launcher())
            .setCaseInsensitiveEnumValuesAllowed(true)
            .execute(args);
           
       System.exit(exitCode);
    }

    @Override
    public Integer call() throws Exception {
        
        System.out.println("Running");
        
        FileUtils.createIfNotExists(output);
        
        Instance instance = InstanceUtils.read(input);
        
        ContainerSchedulingProblem problem = new ContainerSchedulingProblem(instance);
        
        Algorithm<List<IntegerSolution>> algorithm = AlgorithmUtils.getAlgorithm(problem, algorithmName, populationSize, iterations);
        
        new AlgorithmRunner.Executor(algorithm).execute();
        
        String key = String.format("%s-%s-%s", algorithm.getName(), populationSize, iterations);
        
        ParetoFrontUtils.writeFUN(output, algorithm.getResult(), problem.getInstance(), key);
        
        System.out.println("Done");
        
        return 0;
    }
}
