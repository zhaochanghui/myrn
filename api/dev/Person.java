public class Person{

}



//接口Ball
public  interface Ball {
    //创建抽象方法play()：void
    void play();
}



//创建类BallTest
public class BallTest {
    // 创建成员内部类Inner_m

    class Inner_m implements Ball{
        public void play(){
            System.out.println("成员内部类:");
            System.out.println("打篮球");
        }
    }

    // 创建方法内部类
    public void info(){
           class Inner_f implements Ball{
               public void play(){
                   System.out.println("************");
                   System.out.println("方法内部类");
                   System.out.println("打乒乓球");

               }
           }

           new Inner_m().play();
    }

    // 定义一个方法void playBall(Ball ball)，调用play()方法

}


//测试类
public class Test {

    public static void main(String[] args) {
        //完成成员内部类内部测试
        new BallTest().new Inner_m().play();
        //完成方法内部类测试
        BallTest b= new BallTest();
        b.info();
        //完成匿名内部类测试
        Ball b1 = new Ball() {
            @java.lang.Override
            public void play() {
                System.out.println("********************");
                System.out.println("匿名内部类");
                System.out.println("打排球");
            }
        }

        b1.play();
    }

}
