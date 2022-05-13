/**
 * js 核心
 */

// js 原型和原型链 参见 js-prototype.js

// -------------
// js 构造函数（construct）
/**
 * 构造函数作用：
 * 1.创建对象
 * 2.自动为对象设置原型对象，原型对象存放
 * 在ConstructorFunction.prototype属性中
 */

function Foo (y) {
  this.y = y
}

// 通过原型链的继承，在原型上设置属性x和
// 方法 calculate
Foo.prototype.x = 10
Foo.prototype.calculate = function (z) {
  console.log(this.x + this.y + z)
  return this.x + this.y + z
}

let a = {
  x: 10,
  calculate: function (z) {
    return this.x + this.y + z
  }
}

let b = new Foo(20)
let c = new Foo(30)

b.calculate(30)
c.calculate(40)

// 让我们看看是否使用了预期的属性
 
console.log(
 
  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true
 
  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
 
  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo, // true
 
  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true
 
);
// -------------

/**
 * 执行环境，通常称为 执行上下文堆栈
 * js中代码有三种类型：global，function和eval
 * global上下文可能会覆盖function和eval的实例
 * 函数每次调用，就会进入函数执行上下文
 * eval函数执行就进入eval执行上下文
 * 
 * 一个function上下文可能产生无限上下文，因为函数调用产生新的上下文
 * 一个执行上下文可以激活另一个上下文，用栈实现，又称上下文堆栈
 * 激活其它上下文的某个上下文被称为 调用者(caller) 。被激活的上下文被称为被调用者(callee)
 * 
 * 执行上下文必定具有以下3个属性
 * 1.变量对象(variable object)，在具体实现中，这只是一个抽象概念。
 *   这是内部机制的一个实现
 *   是与执行上下文相关的数据作用域(scope of data)，与上下文关联的特殊对象，
 *   用于存储被定义在上下文中的 变量(variables) 和 函数声明(function declarations) 。
 *   例如：浏览器中全局对象 window
 * 2.this指针
 * 3.作用域链
 *  是一个对象列表(list of objects)，用以检索上下文代码中出现的 标识符(identifiers)
 *  作用域链的原理和原型链很类似，如果这个变量在自己的作用域中没有，那么它会寻找父级的，直到最顶层
 *  
 * 例如：
 *  { 
 *    let x = 10
 *    function scopeList() {
 *      // 根据作用域链，在这里可以直接使用x
 *      let z = x + 5
 *      return z 
 *    }
 *  }
 */

/**
 * 活动对象：
 * 当函数被调用者激活，这个特殊的活动对象(activation object) 就被创建了。
 * 它包含普通参数(formal parameters) 与特殊参数(arguments)对象(具有索引属性的参数映射表)。
 * 活动对象在函数上下文中作为变量对象使用
 * 
 * 
 */
//  在代码执行过程中，如果使用with或者catch语句就会改变作用域链。
// 而这些对象都是一些简单对象，他们也会有原型链。这样的话，作用域链会从两个维度来搜寻。
//  1.首先在原本的作用域链
//  2.每一个链接点的作用域的链（如果这个链接点是有prototype的话）

 Object.prototype.x = 10;
 
 var w = 20;
 var y = 30;
  
 // 在SpiderMonkey全局对象里
 // 例如，全局上下文的变量对象是从"Object.prototype"继承到的
 // 所以我们可以得到“没有声明的全局变量”
  
//  console.log(x); // 10
  
 (function foo() {
  
   // "foo" 是局部变量
   var w = 40;
   var x = 100;
  
   // "x" 可以从"Object.prototype"得到，注意值是10哦
   // 因为{z: 50}是从它那里继承的
  
   with ({z: 50}) {
     console.log(w, x, y , z); // 40, 10, 30, 50
   }
  
   // 在"with"对象从作用域链删除之后
   // x又可以从foo的上下文中得到了，注意这次值又回到了100哦
   // "w" 也是局部变量
   console.log(x, w); // 100, 40
  
   // 在浏览器里
   // 我们可以通过如下语句来得到全局的w值
  //  console.log(window.w); // 20
  
 })();

/**
 * （1）let x = 5
 * （2）let x = 8
 * 不注释（1），输出结果是5 wrap
 * 不注释（2）,注释（1）, 输出结果是8 wrap
 * 注释（2）,注释（1）, 输出结果是10 wrap
 * 注释Object.prototype.x = 10 和 （1）、（2）会提示x is not defined
 * 
 * 作用域链与原型链区别：
 * 在函数的原型中设置或者修改属性，是影响以该函数为原型创建的对象实例
 * 即是 function A() {}; let a = new A(); A.prototype = add() {}
 * 那么现在 A.prototype上确实存在 add，而用A.add 得到是undefined，
 * 但是 a.add 是存在的，即是A.prototype.add。
 * 查看A，A.prototype = add 确实改变了 prototype ， A.prototype上确实存在 add
 * 但是 [[Prototype]] 中是没有变化的，但是使用__proto__，如A.__proto__.y = 100
 * 那么直接使用 A.y 能得到 100。原型链，是对象属性取值的手段
 * 而作用域链，是变量获取值的逻辑，针对是一个变量，而非属性，对于变量应当是在其运行
 * 环境中取值，也就与原型链没有关系，在当前作用域没有，就往上层作用域。
 * 但是为什么可以取到在无定义x的时候，能取到Object.prototype.x值
 * 全局上下文的变量对象是从"Object.prototype"继承到的，所以我们可以得到“没有声明的全局变量”
 *
 */

// let x = 8
function testScopeProto () {
  let x = 5
  function wrap () {
    console.log(x, 'wrap')
  }
  wrap.prototype.x = function () { console.log('prototype') }
  console.dir(wrap)
  console.log(this)
  wrap()
}

testScopeProto.prototype.x = function () { console.log('prototype 100') }
testScopeProto.__proto__.y = 100
let testA = new testScopeProto(); 
testA.__proto__.add = 90
console.log(testA.x(), 'lllll', testA.add, testScopeProto.__proto__ === testScopeProto.prototype, testScopeProto.y)
console.log(testScopeProto.x)
//  ƒ wrap()
//  testScopeProto {}
//  5 'wrap'
//  prototype 100
//  undefined 'lllll' 90 false 100
//  undefined
//  undefined



/**
 * 闭包：
 * 内部函数返回到外部后，当函数被激活时，上下文的作用域链表现为激活对象与[[Scope]]属性的组合
 * 作用域链 = 活动对象 + [[Scope]]
 * 
 * 函数在被创建时保存外部作用域，是因为这个 被保存的作用域链(saved scope chain) 将会在未来的函数调用中用于变量查找
 * 这种方式称为静态作用域
 * 在ECMAScript中使用静态作用域是闭包的强制性要求
 * 闭包是一系列代码块（在ECMAScript中是函数），并且静态保存所有父级的作用域。通过这些保存的作用域来搜寻到函数中的自由变量
 */

// 全局变量 "x"
var x = 10;
 
// 全局function
function foo() {
  console.log(x);
}
 
(function (funArg) {
 
  // 局部变量 "x"
  var x = 20;
 
  // 这不会有歧义
  // 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x",
  // 并不是caller作用域的"x"
 
  funArg(); // 10, 而不是20
 
})(foo); // 将foo作为一个"funarg"传递下去


/**
 * this
 * this是执行上下文环境的一个属性，而不是某个变量对象的属性
 * 可以称为上下文对象[context object](激活执行上下文的上下文)
 * this是会根据不同的函数调用而成为不同的值，但是不能给this赋值
 * this不是变量。
 */



// 来源：https://www.cnblogs.com/TomXu/archive/2012/01/12/2308594.html

