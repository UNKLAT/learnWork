/**
 * 单例模式
 * 一般单例保证一个类只有一个实例，实现方法是先判断实例是否存在，
 * 是，则返回；否，则创建再返回
 * 
 * 在js中单例作为一个命名空间的提供者，从全局命名空间里提供一个唯一
 * 的访问点来访问该对象
 * 
 * 
 */

/**
 * 1.js中最简单实现单例的方式就是通过对象字面量
 */

let simpleSingle = {
  a: 10,
  b: 20,
  method: function () {
    console.log('hello simpleSingle')
  }
}

/**
 * 2.若果要扩展对象，添加私有成员和方法，可以时候闭包封装，通过return来暴露
 */

let createSingle = function () {
  let primiryProp = 50
  function primiryMethod () {
    console.log('hello 私有方法')
  }

  return {
    publicMethod: function () {
      console.log('通过公有方法访问私有方法')
      primiryMethod()
    },

    publicVar: '公有变量'
  }
}

let single = createSingle()
single.publicMethod()
console.log(single.publicVar)
console.log(single.primiryMethod)
console.log(single.primiryProp)

// 通过公有方法访问私有方法
// hello 私有方法
// 公有变量
// undefined
// undefined

/**
 * 针对2来优化
 * 只有在使用的时候才初始化，以节约资源，所以我们可以另外构造函数来初始化
 */

let Singleton = (function () {
  let instance
  function init () {
    return {
      publicMethod: function () {
        console.log('single public method')
      },
  
      publicVar: 'test single'
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init()
      }

      return instance
    }
  }
})();

Singleton.getInstance().publicMethod()
// single public methods

// 单例用在什么样的场景比较好呢？
// 单例一般是用在系统间各种模式的通信协调上，
// 下面的代码是一个单例的最佳实践
let SingletonTester = (function () {

  //参数：传递给单例的一个参数集合
  function Singleton(args) {

      //设置args变量为接收的参数或者为空（如果没有提供的话）
      let args = args || {};
      //设置name参数
      this.name = 'SingletonTester';
      //设置pointX的值
      this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
      //设置pointY的值
      this.pointY = args.pointY || 10;

  }

  //实例容器
  let instance;

  let _static = {
      name: 'SingletonTester',

      //获取实例的方法
      //返回Singleton的实例
      getInstance: function (args) {
          if (instance === undefined) {
              instance = new Singleton(args);
          }
          return instance;
      }
  };
  return _static;
})();

let singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX); // 输出 5 