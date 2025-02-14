import java.util.*;
class A extends Runnable{
    public void run(){
        try{
        Thread.sleep(10);
        }catch(InterruptedException e){
            e.printStackTrace();
            }
            for(int i=0;i<10;i++)
        System.out.println( "hi hello...");
}}}
public class Main{
public static void main(String[] args) {
    Runnable obj = new A();

	Thread th = new Thread(obj);
	th.start();
	System.out.println(th.isAlive());
    	System.out.println(th.getId());
	System.out.println(th.getName());
	th.getPriority();
}
}