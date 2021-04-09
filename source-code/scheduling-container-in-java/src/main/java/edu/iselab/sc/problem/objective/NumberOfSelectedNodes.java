package edu.iselab.sc.problem.objective;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.iselab.sc.instance.Instance;

public class NumberOfSelectedNodes extends Objective {

    @Override
    public String getName() {
        return "NOS";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        Set<Integer> distincts = new HashSet<>(variables);

        return (double) distincts.size() / (double) instance.getNodes().size();
    }
}
