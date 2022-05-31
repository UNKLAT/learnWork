/**
 * 数据类型
 * 
 * 原始类型：undefined，null，number，string，boolean 
 * Object类型: object
 * es6新增：Symbol
 * 
 * 这些原生值和我们平时用的(Boolean、String、Number、Object)虽然名字上相似，
 * 但不是同一个东西。所以typeof(true)和typeof(Boolean)结果是不一样的，
 * 因为typeof(Boolean)的结果是function，所以函数Boolean、String、Number是有原型的。
 */

/**
 * 字面量
 * let arr = []
 */

/**
 * 关联数组
 * （ruby/perl中）哈希
 * （php中）管理数组
 * （python0中）词典
 * 结构相似，均是使用键-值对来存储对象
 * 一般认为哈希表是不存在原型对象，属性、key和方法是区分开的
 * es中则没有分开，所有对象的属性读写遵循统一规则：检查原型链
 */
// Ruby 例子，以示区别
//  a = {}
//  a.class # Hash
  
//  a.length # 0
  
//  # new "key-value" pair
//  a['length'] = 10;
  
//  # 语义上，用点访问的是属性或方法，而不是key
  
//  a.length # 1
  
//  # 而索引器访问访问的是hash里的key
  
//  a['length'] # 10
  
//  # 就类似于在现有对象上动态声明Hash类
//  # 然后声明新属性或方法
  
//  class Hash
//    def z
//      100
//    end
//  end
  
//  # 新属性可以访问
  
//  a.z # 100
  
//  # 但不是"key"
  
//  a['z'] # nil

/**
 * 对象转换
 * 将对象转换成原始值可以使用valueOf()
 * 当使用函数的构造函数不使用new关键字，
 * 就会将对象转换成原始值，隐式调用了valueOf()
 */

let a1 = new Number(1)
let primitiveA = Number(a) // 隐式调用valueOf
let alsoPrimitiveA = a.valueOf() // 显示调用

console.log(
  typeof a1, // object
  typeof primitiveA, // number
  typeof alsoPrimitiveA, // number
)

// 隐式调用这种方式也会发生在对象参与各种操作中
var a = new Number(1);
var b = new Number(2);
 
alert(a + b); // 3
 
// 甚至
 
var c = {
  x: 10,
  y: 20,
  valueOf: function () {
    return this.x + this.y;
  }
};
 
var d = {
  x: 30,
  y: 40,
  // 和c的valueOf功能一样
  valueOf: c.valueOf
};
 
alert(c + d); // 100
// valueOf的默认值会根据对象类型的改变
// 例如：Objec.prototype.valueOf() 返回 this
// Date.prototype.valueOf() 返回日期时间
// Date.now().valueOf() 返回当前时间的毫秒数

// 对象中还有 toString(), 在一些操作上是自动使用的
var a = {
  valueOf: function () {
    return 100;
  },
  toString: function () {
    return '__test';
  }
};
 
// 这个操作里，toString方法自动调用
alert(a); // "__test"
 
// 但是这里，调用的却是valueOf()方法
alert(a + 10); // 110
 
// 但，一旦valueOf删除以后
// toString又可以自动调用了
delete a.valueOf;
alert(a + 10); // "_test10"


/**
 * 对象创建算法，伪代码
 */

/**
 * 

 F.[[Construct]](initialParameters):
 
 O = new NativeObject();
  
 // 属性[[Class]]被设置为"Object"
 O.[[Class]] = "Object"
  
 // 引用F.prototype的时候获取该对象g
 var __objectPrototype = F.prototype;
  
 // 如果__objectPrototype是对象，就:
 O.[[Prototype]] = __objectPrototype
 // 否则:
 O.[[Prototype]] = Object.prototype;
 // 这里O.[[Prototype]]是Object对象的原型
  
 // 新创建对象初始化的时候应用了F.[[Call]]
 // 将this设置为新创建的对象O
 // 参数和F里的initialParameters是一样的
 R = F.[[Call]](initialParameters); this === O;
 // 这里R是[[Call]]的返回值
 // 在JS里看，像这样:
 // R = F.apply(O, initialParameters);
  
 // 如果R是对象
 return R
 // 否则
 return O

 */

 // 新创建对象的原型是从当前时刻函数的prototype属性获取的
 //（这意味着同一个构造函数创建的两个创建对象的原型可以不同是因为函数的prototype属性也可以不同）

/**
 * constructor属性的值是函数自身的引用
 * 
 * 对象原型的主要规则是：对象的原型是对象的创建的时候创建的，
 * 并且在此之后不能修改为新的对象，如果依然引用到同一个对象，
 * 可以通过构造函数的显式prototype引用，对象创建以后，
 * 只能对原型的属性进行添加或修改
 * 
 * instanceof操作符是基于原型链工作
 * 对象的[[Prototype]]属性和构造函数的prototype属性的值设置的是一样的话，
 * instanceof检查的时候会返回true
 */

/**
 * 
 * 通常使用原型来存储对象的方法、默认状态和共享的对象属性 
 */
 function A(x) {
  this.x = x || 100;
}
 
A.prototype = (function () {
 
  // 初始化上下文
  // 使用额外的对象
 
  var _someSharedVar = 500;
 
  function _someHelper() {
    alert('internal helper: ' + _someSharedVar);
  }
 
  function method1() {
    alert('method1: ' + this.x);
  }
 
  function method2() {
    alert('method2: ' + this.x);
    _someHelper();
  }
 
  // 原型自身
  return {
    constructor: A,
    method1: method1,
    method2: method2
  };
 
})();
 
var a = new A(10);
var b = new A(20);
 
a.method1(); // method1: 10
a.method2(); // method2: 10, internal helper: 500
 
b.method1(); // method1: 20
b.method2(); // method2: 20, internal helper: 500
 
// 2个对象使用的是原型里相同的方法
alert(a.method1 === b.method1); // true
alert(a.method2 === b.method2); // true

/**
 * 原型链标准模式，主要通过中间包装构造函数创建，
 * 利用包装构造函数的链包含需要的原型
 * 在es5中以此创建工具函数Object.create方法
 * 
 * 在es3中实现如下
 */
// Object.create || 
Object.create = function (parent, properties) {
  function F() {}
  F.prototype = parent
  let child = new F()
  // child.superproto = parent.prototype
  for ( k in properties ) {
    child[k] = properties[k].value
  }
  return child
}

/**
 * 更多内容
 * https://www.cnblogs.com/TomXu/archive/2012/02/06/2330609.html
 */