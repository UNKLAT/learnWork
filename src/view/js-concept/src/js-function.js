/**
 * 函数有三种类型
 * 1. 函数声明
 * 2. 函数表达式
 * 3. 函数构造器创建的函数
 */

/**
 * 函数声明（FD）
 * 1.有一个特定声明
 * 2.在源码中的位置：程序级、其他函数体中
 * 3.进入上下文阶段创建
 * 4.影响变量对象
 * 注：不可以在表达式中使用函数声明
 */
function foo1() {
  /**
   * 待执行代码
   */
}


/**
 * 函数表达式（FE）
 * 1.在源码中须出现在表达式的位置
 * 2.有可选的名称
 * 3.不会影响变量对象
 * 4.在代码执行阶段创建
 * 区分FD与FE：FE总是处在表达式的位置
 * 例如：(function foo()), [function foo()]
 * 
 */

// FE只能在代码执行阶段创建而且不存在于变量对象中
// FE在定义阶段之前不可用（因为它是在代码执行阶段创建）
 
// console.log(foo); // "foo" 未定义
 
// (function foo() {});
 
// // 定义阶段之后也不可用，因为他不在变量对象VO中
 
// console.log(foo);  // "foo" 未定义


/**
 * 因为FE不会存在于变量对象，所以在使用过程中要通过变量名来访问，
 * 又因为此特性，可以利用它创建闭包封装私有数据和隐藏辅助实体
 * 
 * 函数表达式存在命名的时候，既不可以通过名称在声明前调用,也不
 * 可以在声明之后调用它，仅可以在FE递归调用通过名称调用自身
 * 
 * 原因：当解释器在代码执行阶段遇到命名的FE时，在FE创建之前，
 * 它创建了辅助的特定对象，并添加到当前作用域链的最前端。然后
 * 它创建了FE，此时（正如我们在第四章 作用域链知道的那样）
 * 函数获取了[[Scope]] 属性——创建这个函数上下文的作用域链）。
 * 此后，FE的名称添加到特定对象上作为唯一的属性；这个属性的值是
 * 引用到FE上。最后一步是从父作用域链中移除那个特定的对象
 */

/**
 * 通过函数构造器创建的函数
 * 这种函数的[[Scope]]属性仅包含全局对象
 */

 var x = 10;
 
 function foo() {
  
   var x = 20;
   var y = 30;
  
   var bar = new Function('alert(x); alert(y);');
  
   bar(); // 10, "y" 未定义
  
 }

/** 
 * 
 // 函数创建的算法伪代码（与联合对象相关的步骤除外）
 F = new NativeObject();
 
// 属性[[Class]]是"Function"
F.[[Class]] = "Function"
 
// 函数对象的原型是Function的原型
F.[[Prototype]] = Function.prototype
 
// 医用到函数自身
// 调用表达式F的时候激活[[Call]]
// 并且创建新的执行上下文
F.[[Call]] = <reference to function>
 
// 在对象的普通构造器里编译
// [[Construct]] 通过new关键字激活
// 并且给新对象分配内存
// 然后调用F.[[Call]]初始化作为this传递的新创建的对象
F.[[Construct]] = internalConstructor
 
// 当前执行上下文的作用域链
// 例如，创建F的上下文
F.[[Scope]] = activeContext.Scope
// 如果函数通过new Function(...)来创建，
// 那么
F.[[Scope]] = globalContext.Scope
 
// 传入参数的个数
F.length = countParameters
 
// F对象创建的原型
__objectPrototype = new Object();
__objectPrototype.constructor = F // {DontEnum}, 在循环里不可枚举x
F.prototype = __objectPrototype
 
return F

*/