package edu.iselab.sc.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class InvalidPlacements extends Constraint {

    @Override
    public String getName() {
        return "Invalid Placements";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {
        
        int sum = 0;

        for (int i = 0; i < variables.size(); i++) {

            if (!instance.isValidPlacement(i, variables.get(i))) {
                sum++;
            }
        }

        return sum;
    }
}
