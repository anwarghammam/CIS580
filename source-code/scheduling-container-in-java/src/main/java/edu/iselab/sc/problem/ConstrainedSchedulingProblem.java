package edu.iselab.sc.problem;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.solution.integersolution.impl.DefaultIntegerSolution;

import edu.iselab.sc.instance.Container;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.constraint.Constraint;
import edu.iselab.sc.problem.constraint.InvalidPlacements;

public class ConstrainedSchedulingProblem extends SchedulingProblem {

    private static final long serialVersionUID = 3276083658332850716L;

    protected List<Constraint> constraints;
    
    public ConstrainedSchedulingProblem(Instance instance) {
        super(instance);

        constraints = Arrays.asList(
            new InvalidPlacements()
        );

        // JMetal's Settings
        setNumberOfConstraints(constraints.size());
        setName("constrained-scheduling-problem");
        
        List<Integer> lowerBounds = new ArrayList<>(instance.getContainers().size());
        List<Integer> upperBounds = new ArrayList<>(instance.getContainers().size());

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
        super.evaluate(solution);

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
