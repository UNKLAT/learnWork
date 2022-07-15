/**
 * 原型模式（prototype）
 * 原型实例指向创建对象的种类，并且通过拷贝这些原型来创建新对象
 */

/**
 * 在js中，通过 Object.create 来实现
 * Object.create 有两个参数，第一个参数是创建的新对象的原型对象
 * 第二个参数是创建的新对象的额外的参数设置
 */

 var vehicle = {
  getModel: function () {
      console.log('车辆的模具是：' + this.model);
  }
};

var car = Object.create(vehicle, {
  'id': {
      value: MY_GLOBAL.nextId(),
      enumerable: true // 默认writable:false, configurable:false
},
  'model': {
      value: '福特',
      enumerable: true
  }
});

// 不使用 Object.create 实现

var vehiclePrototype = {
  init: function (carModel) {
      this.model = carModel;
  },
  getModel: function () {
      console.log('车辆模具是：' + this.model);
  }
};


function vehicle(model) {
  function F() { };
  F.prototype = vehiclePrototype;

  var f = new F();

  f.init(model);
  return f;
}

var car = vehicle('福特Escort');
car.getModel();