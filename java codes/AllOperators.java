import java.util.*;

public class Array{
	public static void main(String[] args){
		int[] array = {1,3,5,7,8};
		int sum = 0;
	
		for(int i = 0; i< 5; i++){
			sum += array[i];
		}
		System.out.println("The sum of the array is : " + sum);
}
}			
