package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.instance.Node;

public class SatisfyMaxPowerConsumption extends Constraint {

    @Override
    public String getName() {
        return "Satisfy Max Power Consumption";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        long[] sumPowerConsumption = new long[instance.getNodes().size()];

        for (int i = 0; i < variables.size(); i++) {
            sumPowerConsumption[variables.get(i)] += instance.findContainerById(i).getPowerConsumption();
        }

        int invalids = 0;

        for (int i = 0; i < sumPowerConsumption.length; i++) {

            Node node = instance.findNodeById(i);

            if (sumPowerConsumption[i] > node.getMaxPowerConsumption()) {
                invalids++;
            }
        }

        return invalids;
    }
}
