/**
 * 求值策略（赋值策略）
 * 1.严格的，参数在进入程序之前是经过计算的
 * 2.非严格的，参数的计算是根据计算的要求才去计算
 * 
 * js是使用严格的参数传递策略
 * 以下策略不是全部都用在es中，所以使用伪码
 */

/**
 * 按值传递，参数的值是调用者传递对象值的拷贝
 * 即是函数内部的改变不会影响到外部对象的值
 * 但是在传递复杂对象的时候内存损耗过大，容易
 * 带来很大的性能问题
 */

/**
 * 按引用传递，传递不是值的拷贝而是对象的隐式引用
 * 在函数内部的改变会影响对象在函数外部的值，这时候
 * 参数化等同于外部对象的一个别名
 * 该策略可以更有效地传递复杂对象，但是容易更变变量
 * 导致变量污染
 */

/**
 * 按共享传递（按对象传递或按对象共享传递）
 * 在es中参数传递起到关键作用
 * 特点： 函数接收的是对象对于引用的拷贝，该引用拷贝和形参以及其值相关联
 * 不能称为引用传递，因为函数接收的参数不是直接的对象别名，而是该引用地址的拷贝
 * 最重要的区别是：函数内部的参数重新赋值不会影响外部对象，但是因为该参数是一个
 * 地址拷贝，所以外面访问和里面访问的都是同一个对象，改变该参数对象的属性值会
 * 影响外部对象
 * 
 * 
procedure foo(barArg, isFullChange):
 
  if isFullChange:
    barArg = {z: 1, q: 2}
    exit
  end
 
  barArg.x = 100
  barArg.y = 200
 
end

//还是使用这个对象结构
bar = {
  x: 10,
  y: 20
}
 
// 按贡献传递会影响对象 
foo(bar)
 
// 对象的属性被修改了
print(bar) // {x: 100, y: 200}
 
// 重新赋值没有起作用
foo(bar, true)
 
// 依然是上面的值
print(bar) // {x: 100, y: 200}

 */

let outside = {
  a: 10,
  b: 10,
}

function foo (inside) {
  inside = {
    a: 100,
    b: 20,
  }

  console.log(inside, 'inside')
}

function bar (inside) {
  inside.a = 60
  inside.b = 50
  console.log(inside, 'inside')
}

// // 测试从内部对参数对象赋值
// foo(outside)
// console.log(outside, 'outside')
// // {a: 100, b: 20} inside
// // {a: 10, b: 10} outside

// // 测试从内部修改参数对象属性
// bar(outside)

// console.log(outside, 'outside')
// // {a: 60, b: 50} inside
// // {a: 60, b: 50} outside

// 以上es中是按共享传递的，但在js开发人员中一般认为是按值传递，因为地址值是特殊值也是值的一种
// 按引用传递，传递的是对象结构，实际上只有一个地址值，两个变量都指向同一对象

// 按共享传递，有传递的是两个地址值，但是都是指向同一对象
/**
 * 个人理解为都是传地址，只是实现机制不一样。
 * 如果只是传同一个地址，即是引用，修改和赋值都是在这个地址中，地址不会改变
 * 如果传递的是地址的复制值，即是按共享传递，修改是在该地址中，但是赋值就会修改地址
 * 而js中就是按照共享方式实现的，所以在js中是无法验证按引用传递的所有特性
 */


//  实现如下语法的功能：var a = (5).plus(3).minus(6); //2
Number.prototype.plus = function (num) {

  return Number(this.valueOf() + num)
}

Number.prototype.minus = function (num) {
  
  return Number(this.valueOf() - num)
}

let a = (5).plus(3).minus(6)
console.log(a, 'plus-minus')

// 实现如下语法的功能：var a = add(2)(3)(4); //9

// function add() {
//   let args = [...arguments];
//   console.log(args)
//   function _add() {
//     args = args.concat([...arguments]);
//     return _add;
//   }
//   _add.toString = function() {
//     return args.reduce((pre, cur) => {
//       return pre + cur;
//     })
//   }
//   return _add;
// }
// let x = add(1)(2)(3)
// 上面这种方式要通过隐式调用toString才可以得到结果，否则返回就是一个函数
// 在console.log() 中打印是函数，通过alert输入的是toString的返回结果
