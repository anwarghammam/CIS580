package edu.iselab.sc.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public abstract class Objective {

    public abstract String getName();

    public abstract double evaluate(Instance instance, List<Integer> variables);
}
