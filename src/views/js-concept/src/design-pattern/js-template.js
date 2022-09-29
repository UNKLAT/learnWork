/**
 * 模板方法
 * 定义一个操作中的算法骨架，将一些步骤延迟到子类中
 * 这样子类可以在不改变整个算法框架而重定义算法中的某些步骤
 * 具体体现是面向对象编程编程语言里的抽象类（以及其中的抽象方法），
 * 以及继承该抽象类（和抽象方法）的子类
 */

/**
 * 例如：冲咖啡和泡茶，都有烧开水（boilWater）、冲泡（brew）、倒在杯子里（pourOnCup），
 * 加小料（addCondiments）
 * 每种饮料冲泡的方法以及所加的小料不一样，所以我们可以利用模板方法实现这个主要步骤
 */

// 首先定义抽象步骤
var CaffeineBeverage = function () {

};
CaffeineBeverage.prototype.prepareRecipe = function () {
    this.boilWater();
    this.brew();
    this.pourOnCup();
    if (this.customerWantsCondiments()) {
        // 如果可以想加小料，就加上
 this.addCondiments();
    }
};
CaffeineBeverage.prototype.boilWater = function () {
    console.log("将水烧开!");
};
CaffeineBeverage.prototype.pourOnCup = function () {
    console.log("将饮料到再杯子里!");
};
CaffeineBeverage.prototype.brew = function () {
    throw new Error("该方法必须重写!");
};
CaffeineBeverage.prototype.addCondiments = function () {
    throw new Error("该方法必须重写!");
};
// 默认加上小料
CaffeineBeverage.prototype.customerWantsCondiments = function () {
    return true;
};


// 冲咖啡
var Coffee = function () {
  CaffeineBeverage.apply(this);
};
Coffee.prototype = new CaffeineBeverage();
Coffee.prototype.brew = function () {
  console.log("从咖啡机想咖啡倒进去!");
};
Coffee.prototype.addCondiments = function () {
  console.log("添加糖和牛奶");
};
Coffee.prototype.customerWantsCondiments = function () {
  return confirm("你想添加糖和牛奶吗？");
};

//冲茶叶
var Tea = function () {
  CaffeineBeverage.apply(this);
};
Tea.prototype = new CaffeineBeverage();
Tea.prototype.brew = function () {
  console.log("泡茶叶!");
};
Tea.prototype.addCondiments = function () {
  console.log("添加柠檬!");
};
Tea.prototype.customerWantsCondiments = function () {
  return confirm("你想添加柠檬嘛？");
};

// 模板方法应用于下列情况：

// 1.一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现
// 2.各子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复，不同之处分离为新的操作，
// 最后，用一个钓鱼这些新操作的模板方法来替换这些不同的代码
// 3.控制子类扩展，模板方法只在特定点调用“hook”操作，这样就允许在这些点进行扩展