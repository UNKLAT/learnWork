<template>
  <div>
    <code>

    </code>
  </div>
</template>

<script>
export default {
  name: 'JsPrototype',
  data () {

  },
  method: {

    /**
     * 使用原型的方法一
     * 直接使用对象字面量赋值
     */
    usePrototypeMethodOne () {
      let Calculator = function (decimalDigits, tax) {
        this.decimalDigits = decimalDigits
        this.tax = tax
      }

      Calculator.prototype = {
        add: function (x, y) {
          return x + y
        },

        subtract: function (x, y) {
          return x - y
        },
      }
    },

    /**
     * 使用原型的方法二
     * 使用function立即执行返回对象
     * 以达到public/private的效果
     * 
     * 如下：privateAdd没有通过return暴露，只能在内部使用
     * 通过外部引用 Calculator.privateAdd 只会得到 undefined 的结果
     * 
     * module模式的应用
     */
    usePrototypeMethodTwo () {
      let Calculator = function (decimalDigits, tax) {
        this.decimalDigits = decimalDigits
        this.tax = tax
      }

      Calculator.prototype = function () {

        let privateAdd = function (x, y) {
          return x + y + 10
        }

        let add = function (x, y) {
          console.log(privateAdd(x, y))
          return x + y
        }

        let subtract = function (x, y) {
          return x - y
        }



        return {
          add: add,
          subtract: subtract,
        }
        
      } ()
    },
    
    /**
     * 原型链，
     * js中每个对象都存在[[prototype]]，[[prototype]]中也有一个[[prototype]]，以此上溯
     * 直到Object的[[prototype]]的[[prototype]]，其值是null，
     * 而这个关联就是我所理解的原型链
     * 在查找一个对象的属性的时候后，js会先查找当前对象是否存在, 如果有，直接访问
     * 否则，向其原型对象中查找；同样，若原型对象中没有，再向原型对象的原型对象继续
     * 查找，直到Object
     * 
     * hasOwnProperty是Object.prototype的一个方法，他能判断一个对象是否包含自定义属性而不是原型链上的属性，
     * js 中唯一一个处理属性但是不查找原型链的函数
     * 
     * 注：一般定义的对象中只有[[prototype]], 使用的时候 __<内部属性名>__ 下划线来代替双括号
     *    现在 [[prototype]] 在使用中，会用 __proto__ 代替
     *    函数对象中才有 prototype，js中Array，Objcet这样的类型对象，实质是函数对象，所以具有 prototype
     */
    prototypeLink () {
      function Foo() {
          this.value = 42;
      }
      Foo.prototype = {
          method: function() {}
      };

      function Bar() {}

      // 设置Bar的prototype属性为Foo的实例对象
      Bar.prototype = new Foo();
      Bar.prototype.foo = 'Hello World';

      // 修正Bar.prototype.constructor为Bar本身
      Bar.prototype.constructor = Bar;

      let test = new Bar() // 创建Bar的一个新实例

      console.log(test, test.hasOwnProperty('value') )
        // // 原型链
        // test [Bar的实例]
        //     Bar.prototype [Foo的实例] 
        //         { foo: 'Hello World' }
        //         Foo.prototype
        //             {method: ...};
        //             Object.prototype
        //                 {toString: ... /* etc. */};
    }


  },
}
</script>