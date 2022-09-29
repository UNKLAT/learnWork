/**
 * 装饰者模式
 * 提供比继承更有弹性的替代方案
 * 用于包装同接口的对象，允许向方法添加行为，还可以将方法设置为原始对象调用
 * 装饰者通过重载来添加新功能
 */

// 例子1
function ConcreteClass() {
  this.performTask = function () {
      this.preTask();
      console.log('doing something');
      this.postTask();
  };
}

function AbstractDecorator(decorated) {
  this.performTask = function () {
      decorated.performTask();
  };
}

function ConcreteDecoratorClass(decorated) {
  this.base = AbstractDecorator;
  this.base(decorated);

  decorated.preTask = function () {
      console.log('pre-calling..');
  };

  decorated.postTask = function () {
      console.log('post-calling..');
  };

}

var concrete = new ConcreteClass();
var decorator1 = new ConcreteDecoratorClass(concrete);
var decorator2 = new ConcreteDecoratorClass(decorator1);
decorator1.performTask();
decorator2.performTask();
// 


// 例子2, 更适合

 var tree = {};
 tree.decorate = function () {
     console.log('Make sure the tree won\'t fall');
 };
 
 tree.getDecorator = function (deco) {
     tree[deco].prototype = this;
     return new tree[deco];
 };
 
 tree.RedBalls = function () {
     this.decorate = function () {
         this.RedBalls.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
         console.log('Put on some red balls'); // 第8步 再输出 red
         // 将这2步作为RedBalls的decorate方法
     }
 };
 
 tree.BlueBalls = function () {
     this.decorate = function () {
         this.BlueBalls.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
         console.log('Add blue balls'); // 第2步 再输出blue
         // 将这2步作为BlueBalls的decorate方法
     }
 };
 
 tree.Angel = function () {
     this.decorate = function () {
         this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueBalls了）的decorate方法
         console.log('An angel on the top'); // 第5步 再输出angel
         // 将这2步作为Angel的decorate方法
     }
 };
 
 tree = tree.getDecorator('BlueBalls'); // 第3步：将BlueBalls对象赋给tree，这时候父原型里的getDecorator依然可用
 tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
 tree = tree.getDecorator('RedBalls'); // 第9步：将RedBalls对象赋给tree
 
 tree.decorate(); // 第10步：执行RedBalls对象的decorate方法

 /**
  * 把每个要装饰的功能放在单独的函数里，然后用该函数包装所要装饰的已有函数对象，
  * 因此，当需要执行特殊行为的时候，调用代码就可以根据需要有选择地、
  * 按顺序地使用装饰功能来包装对象。优点是把类（函数）的核心职责和装饰功能区分开了。
  * 
  * 实际即是在装饰者混合装饰者本身的方法a和被装饰的类中的同名方法a

  */ 
function toBeDecorated() {
  this.a = function () {
    console.log('我是toBeDecorated，我需要装饰')
  }
}

function decorator(toBeDecorated) {
  this.a = function () {
    toBeDecorated.a()
    console.log('我是decorator，我帮你装饰了')
  }
}
let toDc = new toBeDecorated()
let dc = new decorator(toDc)
dc.a()