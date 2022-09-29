/**
 * 里氏替换原则
 * 派生类型必须可以替换它的基类型
 * 
 * 本质不是仅指继承，而是行为兼容性，包括继承在内
 * 个人理解： a 类型是基类型，b 类型是派生类型
 * 那么 b 类型必须可以使用a类型的任何方法和属性而不出现
 * 任何问题，而b类型 可以通过任何方法得到，不局限于继承
 */

// ---------------
/**
 * 在面向对象编程里，继承提供了一个机制让子类和共享基类的代码，
 * 在基类型里封装通用的数据和行为，用基类型来声明更详细的子类型，
 * 为了应用里氏替换原则，继承子类型需要在语义上等价于基类型里的期望行为。
 * 
 * 例子如下
 */
// 基类型 Vehicle
function Vehicle (my) {
  let my = my || {}
  my.speed = 0
  my.running = false

  this.speed = function () {
    return my.speed
  }

  this.start = function() {
    my.running = true;
  }

  this.stop = function() {
      my.running = false;
  }
  this.accelerate = function() {
      my.speed++;
  }

  this.decelerate = function() {
      my.speed--;
  }

  this.state = function() {
    if (!my.running) {
        return "parked";
    }
    else if (my.running && my.speed) {
        return "moving";
    }
    else if (my.running) {
        return "idle";
    }
  }
}

// 派生类型 FastVehicle
function FastVehicle(my) {
  var my = my || {};

  var that = new Vehicle(my);
  that.accelerate = function() {
      my.speed += 3;
  };
  return that;
}

// 使用FastVehicle创建实例vehicle
// 运行manuver，会发现抛出的异常是
// “The vehicle is still moving!”，
// 这是因为写这段代码的作者一直认为
// 加速（accelerate）和减速（decelerate）的数字是一样的。
// 但FastVehicle的代码和Vehicle的代码并不是完全能够替换掉的。
// 因此，FastVehicle违反了里氏替换原则
let vehicle = new FastVehicle({})
var maneuver = function(vehicle) {
  write(vehicle.state());
  vehicle.start();
  write(vehicle.state());
  vehicle.accelerate();
  write(vehicle.state());
  write(vehicle.speed());
  vehicle.decelerate();
  write(vehicle.speed());
  if (vehicle.state() != "idle") {
      throw "The vehicle is still moving!";
  }
  vehicle.stop();
  write(vehicle.state());
};


/**
 * 如何避免以上问题（减少LSP妨碍）
 * 1、使用自动测和契约设计
 * 2、尽量不用继承，在js中与继承相关的问题
 * 是耦合，当使用继承的时候，继承子类型和基
 * 类型就耦合了，基类型改变会影响继承子类型
 * 在，建议使用对象组合
 */

// ---------------

// 矩形例子
// 考虑我们有一个程序用到下面这样的一个矩形对象:

var rectangle = {
    length: 0,
    width: 0
};
// 过后，程序有需要一个正方形，由于正方形就是一个长(length)和宽(width)都一样的特殊矩形，
// 所以我们觉得创建一个正方形代替矩形。
// 我们添加了length和width属性来匹配矩形的声明，
// 但我们觉得使用属性的getters/setters一般我们可以让length和width保存同步，确保声明的是一个正方形：

var square = {};
(function() {
    var length = 0, width = 0;
    // 注意defineProperty方式是262-5版的新特性
    Object.defineProperty(square, "length", {
        get: function() { return length; },
        set: function(value) { length = width = value; }
    });
    Object.defineProperty(square, "width", {
        get: function() { return width; },
        set: function(value) { length = width = value; }
    });
})();
// 不幸的是，当我们使用正方形代替矩形执行代码的时候发现了问题，其中一个计算矩形面积的方法如下：

var g = function(rectangle) {
    rectangle.length = 3;
    rectangle.width = 4;
    write(rectangle.length);
    write(rectangle.width);
    write(rectangle.length * rectangle.width);
};

g(rectangle)
g(square)
// 该方法在调用的时候，结果是16，而不是期望的12，我们的正方形square对象违反了LSP原则，
// square的长度和宽度属性暗示着并不是和矩形100%兼容，
// 但我们并不总是这样明确的暗示。解决这个问题，
// 我们可以重新设计一个shape对象来实现程序，依据多边形的概念，
// 我们声明rectangle和square，relevant。
// 不管怎么说，我们的目的是要说里氏替换原则并不只是继承，
// 而是任何方法（其中的行为可以另外的行为）。

// 来源：https://www.cnblogs.com/TomXu/archive/2012/01/10/2310244.html