package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class JustActivedNodes extends Constraint {

    @Override
    public String getName() {
        return "Just Actived Nodes";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {
        
        List<Integer> activedNodes = instance.getActivedNodes();
        
        int sum = 0;

        for (int i = 0; i < variables.size(); i++) {

            if (!activedNodes.contains(variables.get(i))) {
                sum++;
            }
        }

        return sum;
    }
}
