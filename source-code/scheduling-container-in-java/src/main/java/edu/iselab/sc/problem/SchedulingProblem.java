package edu.iselab.sc.problem;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.uma.jmetal.problem.integerproblem.impl.AbstractIntegerProblem;
import org.uma.jmetal.solution.integersolution.IntegerSolution;

import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.objective.AverageNumberOfContainersPerNode;
import edu.iselab.sc.problem.objective.NodesCohesion;
import edu.iselab.sc.problem.objective.NodesCoupling;
import edu.iselab.sc.problem.objective.NumberOfChangesRequired;
import edu.iselab.sc.problem.objective.NumberOfSelectedNodes;
import edu.iselab.sc.problem.objective.Objective;
import lombok.Getter;

public class SchedulingProblem extends AbstractIntegerProblem {

    private static final long serialVersionUID = -2121746431105214038L;

    protected List<Objective> objectives;

    @Getter
    protected Instance instance;

    public SchedulingProblem(Instance instance) {

        checkNotNull(instance, "instance should not be null");
        
        this.instance = instance;
        this.objectives = Arrays.asList(
            new NumberOfSelectedNodes(), 
            new AverageNumberOfContainersPerNode(),
            new NodesCohesion(),
            new NodesCoupling(),
            new NumberOfChangesRequired()
        );
        
        // JMetal's Settings
        setNumberOfVariables(instance.getContainers().size());
        setNumberOfObjectives(objectives.size());
        setName("scheduling-problem");

        List<Integer> lowerBounds = Collections.nCopies(getNumberOfVariables(), 0);
        List<Integer> upperBounds = Collections.nCopies(getNumberOfVariables(), instance.getNodes().size() - 1);

        setVariableBounds(lowerBounds, upperBounds);
    }
    
    public void evaluate(IntegerSolution solution) {

        for (int i = 0; i < objectives.size(); i++) {
            solution.setObjective(i, objectives.get(i).evaluate(instance, solution.getVariables()));
        }
    }
}
