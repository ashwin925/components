import java.util.*;

public class SwapWithoutTemp {
    public static void main(String[] args) {
        int a = 5, b = 10;
        
        System.out.println("Before Swap:");
        System.out.println("a = " + a + ", b = " + b);
        
        // Swapping without using a temporary variable
        a = a + b; // a = 15
        b = a - b; // b = 5
        a = a - b; // a = 10
        
        System.out.println("After Swap:");
        System.out.println("a = " + a + ", b = " + b);
    }
}
		 