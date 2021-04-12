package edu.iselab.sc.instance;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    
    @JsonIgnore
    public List<Integer> getActivedNodes() {
        
        return nodes.stream()
            .filter(e -> e.isActivated())
            .map(e -> e.getId())
            .collect(Collectors.toList());
    }
    
    @JsonIgnore
    public List<Integer> getValidNodes(Integer containerId) {

        Container container = findContainerById(containerId);
        
        List<Integer> validNodes = new ArrayList<>();

        if (container.getPlacements().isEmpty()) {

            for (Node node : nodes) {
                validNodes.add(node.getId());
            }
        } else {
            for (Integer nodeId : container.getPlacements()) {
                validNodes.add(nodeId);
            }
        }
        
        for (Node node : nodes) {
            if (!node.isActivated()) {
                validNodes.remove(node.getId());
            }
        }
        
        return validNodes;
    }
    
    public boolean isValidPlacement(int containerId, int nodeId) {
        return findContainerById(containerId).isValidPlacement(nodeId);
    }
}
