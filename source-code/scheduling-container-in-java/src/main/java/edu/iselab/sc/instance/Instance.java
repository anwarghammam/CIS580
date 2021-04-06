package edu.iselab.sc.instance;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class Instance {
    
    protected String name;
    
    protected List<Node> nodes = new ArrayList<>();
    
    protected List<Container> containers = new ArrayList<>();
    
    protected List<Integer> currentState = new ArrayList<>();
    
    public Container findContainerById(Integer id) {

        for (Container container : containers) {

            if (container.getId() == id) {
                return container;
            }
        }

        return null;
    }
    
    public Node findNodeById(Integer id) {

        for (Node node : nodes) {

            if (node.getId() == id) {
                return node;
            }
        }

        return null;
    }
    
    @JsonIgnore
    public List<int[]> getDependencyEdges() {

        List<int[]> edges = new ArrayList<>();

        for (Container container : containers) {
            edges.addAll(container.getDependencyEdges());
        }

        return edges;
    }
    
    public boolean isValidPlacement(int containerId, int nodeId) {
        return findContainerById(containerId).isValidPlacement(nodeId);
    }
}
