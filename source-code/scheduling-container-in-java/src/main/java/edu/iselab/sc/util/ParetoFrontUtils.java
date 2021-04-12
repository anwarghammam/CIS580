package edu.iselab.sc.util;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

import java.nio.file.Path;
import java.util.List;

import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.util.fileoutput.SolutionListOutput;

import edu.iselab.sc.instance.Instance;

public class ParetoFrontUtils {

    public static void writeFUN(Path outputFolder, List<IntegerSolution> population, Instance instance, String key) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(population, "population should not be null");
        checkNotNull(instance, "instance should not be null");
        checkNotNull(key, "key should not be null");
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("fun"));
        
        Path file = outputFolder.resolve(instance.getName()).resolve(key + "-fun.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        new SolutionListOutput(population).printObjectivesToFile(file.toString(), " ");
    }
    
    public static void writeVAR(Path outputFolder, List<IntegerSolution> population, Instance instance, String key) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(population, "population should not be null");
        checkNotNull(instance, "instance should not be null");
        checkNotNull(key, "key should not be null");
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("var"));
        
        Path file = outputFolder.resolve(instance.getName()).resolve(key + "-var.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        new SolutionListOutput(population).printVariablesToFile(file.toString(), " ");
    }
    
    public static void writeCON(Path outputFolder, List<IntegerSolution> population, Instance instance, String key) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(population, "population should not be null");
        checkNotNull(instance, "instance should not be null");
        checkNotNull(key, "key should not be null");
        
        outputFolder = FileUtils.createIfNotExists(outputFolder.resolve("con"));
        
        Path file = outputFolder.resolve(instance.getName()).resolve(key + "-con.txt");
                
        FileUtils.createIfNotExists(file.getParent());
        
        StringBuilder builder = new StringBuilder();
        
        for (int i = 0; i < population.size(); i++) {

            IntegerSolution solution = population.get(i);

            for (int j = 0; j < solution.getNumberOfConstraints(); j++) {
                
                builder.append(solution.getConstraint(j));

                if (j + 1 != solution.getNumberOfConstraints()) {
                    builder.append(" ");
                }
            }

            if (i + 1 != population.size()) {
                builder.append("\n");
            }
        }
        
        FileUtils.write(file, builder.toString());
    }
}
