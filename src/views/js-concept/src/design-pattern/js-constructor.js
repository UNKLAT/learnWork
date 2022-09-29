/**
 * 构造函数模式
 * 通过new关键字调用
 * 在构造函数内部使用this关键字引用新创建的对象
 */

 function Car(model, year, miles) {
  // 强制使用new，这样即式没有使用new调用，在内部也会自动用new调用创建
  if (!(this instanceof Car)) {
    return new Car(model, year, miles);
  }
  this.model = model;
  this.year = year;
  this.miles = miles;
}

/*
  注意：这里我们使用了Object.prototype.方法名，而不是Object.prototype
  主要是用来避免重写定义原型prototype对象
  在原型上定义，避免在构造函数内定义而导致每次创建对象的时候都重新定义了，
  如果有大批量的实例的话，就会节约很多内存。
*/
Car.prototype.output= function () {
  return this.model + "走了" + this.miles + "公里";
};

var tom = new Car("大叔", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);

console.log(tom.output());
console.log(dudu.output());