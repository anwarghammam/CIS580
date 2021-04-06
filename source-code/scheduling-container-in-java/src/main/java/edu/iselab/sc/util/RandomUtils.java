package edu.iselab.sc.util;

import org.uma.jmetal.util.pseudorandom.impl.JavaRandomGenerator;

public class RandomUtils {

    private static final JavaRandomGenerator random = new JavaRandomGenerator();

    public static int nextInt(int lowerBound, int upperBound) {
        return random.nextInt(lowerBound, upperBound);
    }

    public static double nextDouble() {
        return random.nextDouble();
    }
}
