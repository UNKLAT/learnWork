/**
 * this是由激活上下文代码的调用者来提供的，即调用函数的父上下文(parent context )
 */

 var foo = {x: 10};
 
 var bar = {
   x: 20,
   test: function () {
  
     console.log(this === bar); // true
     console.log(this.x); // 20
  
     // this = foo; // 错误，任何时候不能改变this的值
  
     console.log(this.x, this === foo); // 如果不出错的话，应该是10，而不是20
       console.dir(this)
  
   }
  
 };
  
 // 在进入上下文的时候
 // this被当成bar对象
 // determined as "bar" object; why so - will
 // be discussed below in detail
  
 bar.test(); // true, 20
  
 foo.test = bar.test;
  
 // 不过，这里this依然不会是foo
 // 尽管调用的是相同的function
  
 foo.test(); // false, 10
//  VM332:7 true
//  VM332:8 20
//  VM332:12 20 false
//  VM332:13 Object
//  VM332:7 false
//  VM332:8 10
//  VM332:12 10 true

/**
 * 引用类型
 * 可表示为：
 * 
 *  valueOfReferenceType = {
      base: <base object>, // this的值
      propertyName: <property name> // 变量的真实取值
    }
 * 
 * 
 * 在获取值调用的时候，会先调用内部[[GET]]方法获取值，
 * 暂且将该方法记作GetValue, 方法原理如下伪代码
 */
 // 伪代码
//  function GetValue(value) {
 
//   if (Type(value) != Reference) {
//     return value;
//   }
 
//   var base = GetBase(value);
 
//   if (base === null) {
//     throw new ReferenceError;
//   }
 
//   return base.__Get__(GetPropertyName(value));
 
// }
// 例子
var foo = {
  bar: function () {
    console.log(this);
  }
};
 
foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo
 
(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?

// 第一个例子很明显———明显的引用类型，结果是，this为base对象，即foo。
// 在第二个例子中，组运算符并不适用，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如GetValue。相应的，在组运算的返回中———我们得到仍是一个引用类型。这就是this值为什么再次设为base对象，即foo。
// 第三个例子中，与组运算符不同，赋值运算符调用了GetValue方法。返回的结果是函数对象（但不是引用类型），这意味着this设为null，结果是global对象。
// 第四个和第五个也是一样——逗号运算符和逻辑运算符（OR）调用了GetValue 方法，相应地，我们失去了引用而得到了函数。并再次设为global。
/**
 * 
 * 个人理解为
 * 以第二个输出来看，组运算符(foo.bar) <=> { base: global, propertyName: foo.bar }, 调用[[GET]], 返回的是 foo.bar, 这是引用类型，
 * 此时 foo.bar <=> { base: foo, propertyName: bar }
 * 
 * 三，四和五的来看，就是组运算符里面的是表达式，会返回一个具体的结果，也即是触发[[GET]]，得到了值，记作 wrapValue，
 * 此时组运算符 <=> { base: global, propertyName: wrapValue }
 * 而在例子中 wrapValue 均是一个具体对象 <=> (wrapValue) <=> {  base: global, propertyName: wrapValue }
 * 
 * wrapValue 即是整条表达式的结果，而非指代其中的某个标识符
 * 例如 （foo.bar = foo.bar）中, wrapValue <=> foo.bar = foo.bar, 
 * 
 */

 function foo1() {
  function bar() {
    console.log(this); // global
  }
  bar(); // the same as AO.bar()
}

foo1() // global, 直接在全局中调用，foo1内部this就是global，即使是this在内部函数中
/**
 * 正常情况，this总是指向当前调用对象，
 * 可改变this指向的语法：with，call，apply，bind，（）=> { // this 是 null，会从上层取值 } 
 * 
 * call, 第一参数作为this，后续每一个参数就是调用的参数
 * apply， 第一参数作为this，第二参数是数组，包含调用参数
 * 
 * bind 与 call 一样，但是bind不会立刻执行
 * result = a.bind(obj, x) // 返回一个this指向obj的新的a
 * result = a.call(obj, x) // 返回一个this指向obj的新的a的运行返回值
 */