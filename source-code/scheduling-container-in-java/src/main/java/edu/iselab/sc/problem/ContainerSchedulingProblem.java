package edu.iselab.sc.problem;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.uma.jmetal.problem.integerproblem.impl.AbstractIntegerProblem;
import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.solution.integersolution.impl.DefaultIntegerSolution;

import edu.iselab.sc.instance.Container;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.constraint.Constraint;
import edu.iselab.sc.problem.constraint.InvalidPlacements;
import edu.iselab.sc.problem.objective.AverageNumberOfContainersPerNode;
import edu.iselab.sc.problem.objective.NodesCohesion;
import edu.iselab.sc.problem.objective.NodesCoupling;
import edu.iselab.sc.problem.objective.NumberOfChangesRequired;
import edu.iselab.sc.problem.objective.NumberOfSelectedNodes;
import edu.iselab.sc.problem.objective.Objective;
import lombok.Getter;

public class ContainerSchedulingProblem extends AbstractIntegerProblem {

    private static final long serialVersionUID = 3276083658332850716L;
    
    @Getter
    protected Instance instance;
    
    protected List<Objective> objectives;

    protected List<Constraint> constraints;
    
    public ContainerSchedulingProblem(Instance instance) {
        
        checkNotNull(instance, "instance should not be null");

        this.instance = instance;
        this.constraints = Arrays.asList(
            new InvalidPlacements()
        );
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
        setNumberOfConstraints(constraints.size());
        setName(ContainerSchedulingProblem.class.getSimpleName());
        
        List<Integer> lowerBounds = new ArrayList<>();
        List<Integer> upperBounds = new ArrayList<>();

        for (Container container : instance.getContainers()) {

            List<Integer> placements = container.getPlacements();

            if (placements.isEmpty()) {
                lowerBounds.add(0);
                upperBounds.add(instance.getNodes().size() - 1);
            } else {

                int min = Integer.MAX_VALUE;
                int max = Integer.MIN_VALUE;

                for (Integer placement : placements) {
                    min = Math.min(min, placement);
                    max = Math.max(max, placement);
                }

                lowerBounds.add(min);
                upperBounds.add(max);
            }
        }

        setVariableBounds(lowerBounds, upperBounds);
    }
    
    public void evaluate(IntegerSolution solution) {
        
        for (int i = 0; i < objectives.size(); i++) {
            solution.setObjective(i, objectives.get(i).evaluate(instance, solution.getVariables()));
        }

        for (int i = 0; i < constraints.size(); i++) {
            solution.setConstraint(i, constraints.get(i).evaluate(instance, solution.getVariables()));
        }

        int totalConstraints = 0;

        for (int i = 0; i < constraints.size(); i++) {
            totalConstraints += solution.getConstraint(i);
        }

        if (totalConstraints != 0) {

            for (int i = 0; i < objectives.size(); i++) {
                solution.setObjective(i, Integer.MAX_VALUE);
            }
        }
    }
    
    @Override
    public IntegerSolution createSolution() {
        return new DefaultIntegerSolution(getVariableBounds(), getNumberOfObjectives(), getNumberOfConstraints());
    }
}
