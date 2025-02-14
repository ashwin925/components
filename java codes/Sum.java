import java.io.*;
import java.util.*;

public class Pp{
	public static void main(String[] args){
		Scanner scan = new Scanner(System.in);
	System.out.println("Enter the number 1 : ");
	int n1 = scan.nextInt();
	
	System.out.println("Enter the number 2 : ");
	int n2 = scan.nextInt();

	System.out.println("Enter the number 3 : ");
	int n3 = scan.nextInt();

	if((n1 + n2) == n3){
		System.out.println("True");}
	else{
		System.out.println("False");}
}
}
