/**
 * 作用域链
 * AO（活动对象）
 * VO（变量对象）
 * Scope = AO + [[Scope]]
 * 
 * [[scope]]是所有父变量对象的层级链，处于当前函数上下文之上，
 * 在函数创建时存于其中。注意这重要的一点－－
 * [[scope]]在函数创建时被存储－－静态（不变的），永远永远，
 * 直至函数销毁。即：函数可以永不调用，但[[scope]]属性已经写入
 * 
 * 函数上下文的作用域链在函数调用时创建的，
 * 包含活动对象和这个函数内部的[[scope]]属性
 */

// 例子

let x = 10

function foo () {
  let y = 20

  function bar () {
    let z = 30
    console.log(x + y + z) 
  }

  bar()
}

foo()

/**
 * 全局上下文的变量对象
 * globalContenxt.VO = {
 *  X: 10,
 *  foo: <renference to function>
 * }
 * 
 * 创建 foo 时候，foo的 [[scope]]
 * foo.[[scope]] = {
 *    globalContext.VO
 * }
 * 
 * foo 激活，foo上下文的活动对象是
 * foo.AO = {
 *   y: 20,
 *   bar: <renference to function>
 * }
 * 
 * foo的函数上下文的作用域链
 * foo.Scope = {
 *   foo.AO,
 *   globalContext.VO
 * }
 * 
 * 同理，bar的函数上下文作用链为
 * bar.Scope = {
 *   bar.AO,
 *   foo.AO,
 *   globalContext.VO,
 * }
 * 
 * 
 * 由此可以知道，闭包与[[scope]]直接相关
 * [[scope]]在函数创建时被存储，与函数共存亡
 * 即使上层变量被静态存储在[[scope]]中，可以
 * 说闭包时函数代码和其[[scope]]的结合
 *
 */

/**
 * 作用域链规则有一个例外：
 * 通过函数构造函数创建的函数，的[[scope]]属性总是唯一的全局对象
 * 所以例子中 barFn取不到y，如果没有global.x1，x1也取不到
 * 所以使用函数构造函数创建的函数，只能创建全局为最上层的上下文闭包
 */
  let x1= 10; 
  global.x1 = 10
  function A() { 
    let y = 20; 
    console.log(x1, y, 'A调用');
    function testConstruct (str) {
      eval(str)
      return () => {
        console.log(x1,y, "wrapA()")
      }
    } 
    let wrapA = new testConstruct('console.log(x1,y, "wrapA")')
    let barFn = Function(' console.log(x1, "barFn"); console.log(y, "barFn");');

    wrapA
    wrapA()
    barFn() 
  }; 
  
  A()
  // 10 20 A调用
  // 10 20 wrapA
  // 10 20 wrapA()
  // 10 barFn
