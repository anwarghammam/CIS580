package edu.iselab.sc.util;

import static com.google.common.base.Preconditions.checkArgument;

import java.nio.file.Path;
import java.util.List;

import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.util.fileoutput.SolutionListOutput;

import edu.iselab.sc.Launcher.Params;
import edu.iselab.sc.instance.Instance;
import lombok.AllArgsConstructor;
import lombok.Data;

public class ParetoFrontUtils {
    
    @Data
    @AllArgsConstructor
    public static class ParetoFront {
        
        protected Instance instance;

        protected Params params;

        protected List<IntegerSolution> solutions;
    }

    public static void writeFUN(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        
        String key = String.format("%s-%s-%s", paretoFront.getParams().getAlgorithmName(), paretoFront.getParams().getPopulationSize(), paretoFront.getParams().getIterations());
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("objectives"));
        
        Path file = outputFolder.resolve(paretoFront.getInstance().getName()).resolve(key + "-fun.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        new SolutionListOutput(paretoFront.getSolutions()).printObjectivesToFile(file.toString(), " ");
    }
    
    public static void writeVAR(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        
        String key = String.format("%s-%s-%s", paretoFront.getParams().getAlgorithmName(), paretoFront.getParams().getPopulationSize(), paretoFront.getParams().getIterations());
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("variables"));
        
        Path file = outputFolder.resolve(paretoFront.getInstance().getName()).resolve(key + "-var.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        new SolutionListOutput(paretoFront.getSolutions()).printVariablesToFile(file.toString(), " ");
    }
    
    public static void writeCON(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        
        String key = String.format("%s-%s-%s", paretoFront.getParams().getAlgorithmName(), paretoFront.getParams().getPopulationSize(), paretoFront.getParams().getIterations());
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("constraints"));
        
        Path file = outputFolder.resolve(paretoFront.getInstance().getName()).resolve(key + "-con.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        StringBuilder builder = new StringBuilder();
        
        for (int i = 0; i < paretoFront.getSolutions().size(); i++) {

            IntegerSolution solution = paretoFront.getSolutions().get(i);

            for (int j = 0; j < solution.getNumberOfConstraints(); j++) {
                
                builder.append(solution.getConstraint(j));

                if (j + 1 != solution.getNumberOfConstraints()) {
                    builder.append(" ");
                }
            }

            if (i + 1 != paretoFront.getSolutions().size()) {
                builder.append("\n");
            }
        }
        
        FileUtils.write(file, builder.toString());
    }
}
