package edu.iselab.sc.instance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Node {

    protected Integer id;

    protected String name;

    protected boolean activated;
}
