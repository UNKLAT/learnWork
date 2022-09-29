/**
 * 单一职责原则
 */

/**
 * 实例：将商品添加到购物车
 * 
 * 对于这一需求，初始思路
 * 1.创建商品类，包含商品的信息和行为
 * 2.创建购物车类，包含添加行为
 * 3.在主程序中实现把商品添加到购物车的逻辑
 */
// --------------------
function Product(id, description) {
  this.getId = function () {
      return id;
  };
  this.getDescription = function () {
      return description;
  };
}

function Cart() {
  let items = [];
  // 把数据放进Cart对象
  this.addItem = function (item) {
      items.push(item);
  };
}

let mainProgram = function () {
  let products = [new Product(1, "Star Wars Lego Ship"),
          new Product(2, "Barbie Doll"),
          new Product(3, "Remote Control Airplane")]

  let cart = new Cart();

  // 把商品放进购物车并在购物车中展示
  function addToCart() {
      let productId = $(this).attr('id');
      let product = $.grep(products, function (x) {
          return x.getId() == productId;
      })[0];
      cart.addItem(product);

      let newItem = $('<li></li>').html(product.getDescription()).attr('id-cart', product.getId()).appendTo("#cart");
      return newItem
  }

  // 展示商品并绑定双击事件触发addToCart
  products.forEach(function (product) {
      let newItem = $('<li></li>').html(product.getDescription())
                                  .attr('id', product.getId())
                                  .dblclick(addToCart)
                                  .appendTo("#products");
      return newItem
  });
}
// --------------------

/**
 * 改进思路
 * 在初始思路中，mainProgram有许多不相干的职责，如下：
 * 首先，有product的集合的声明
 * 其次，有一个将product集合绑定到#product元素的代码，而且还附件了一个添加到购物车的事件处理
 * 第三，有Cart购物车的展示功能
 * 第四，有添加product item到购物车并显示的功能。
 * 
 * 
 * 创建一个Event，用于处理回调handler；
 * 然后创建EventAggregator实现订阅和发布Event功能；
 * ProductRepository 获取展示数据
 * 
 */


function Event(name) {
  var handlers = [];

  this.getName = function () {
      return name;
  };

  this.addHandler = function (handler) {
      handlers.push(handler);
  };

  this.removeHandler = function (handler) {
      for (var i = 0; i < handlers.length; i++) {
          if (handlers[i] == handler) {
              handlers.splice(i, 1);
              break;
          }
      }
  };

  this.fire = function (eventArgs) {
      handlers.forEach(function (h) {
          h(eventArgs);
      });
  };
}

function EventAggregator() {
  var events = [];

  function getEvent(eventName) {
      return $.grep(events, function (event) {
          return event.getName() === eventName;
      })[0];
  }

  this.publish = function (eventName, eventArgs) {
      var event = getEvent(eventName);

      if (!event) {
          event = new Event(eventName);
          events.push(event);
      }
      event.fire(eventArgs);
  };

  this.subscribe = function (eventName, handler) {
      var event = getEvent(eventName);

      if (!event) {
          event = new Event(eventName);
          events.push(event);
      }

      event.addHandler(handler);
  };
}

function Product(id, description) {
  this.getId = function () {
      return id;
  };
  this.getDescription = function () {
      return description;
  };
}

function Cart(eventAggregator) {
  var items = [];

  this.addItem = function (item) {
      items.push(item);
      eventAggregator.publish("itemAdded", item);
  };
}

// 订阅事件，订阅itemAdded来增加一个li元素节点，通过订阅productSelected事件来添加product
function CartController(cart, eventAggregator) {
  eventAggregator.subscribe("itemAdded", function (eventArgs) {
      var newItem = $('<li></li>').html(eventArgs.getDescription()).attr('id-cart', eventArgs.getId()).appendTo("#cart");
  });

  eventAggregator.subscribe("productSelected", function (eventArgs) {
      cart.addItem(eventArgs.product);
  });
}

function ProductRepository() {
  var products = [new Product(1, "Star Wars Lego Ship"),
  new Product(2, "Barbie Doll"),
  new Product(3, "Remote Control Airplane")];

  this.getProducts = function () {
      return products;
  }
}

function ProductController(eventAggregator, productRepository) {
  var products = productRepository.getProducts();

  function onProductSelected() {
      var productId = $(this).attr('id');
      var product = $.grep(products, function (x) {
          return x.getId() == productId;
      })[0];
      eventAggregator.publish("productSelected", {
          product: product
      });
  }

  products.forEach(function (product) {
      var newItem = $('<li></li>').html(product.getDescription())
                          .attr('id', product.getId())
                          .dblclick(onProductSelected)
                          .appendTo("#products");
  });
}

(function () {
  var eventAggregator = new EventAggregator(),
      cart = new Cart(eventAggregator),
      cartController = new CartController(cart, eventAggregator),
      productRepository = new ProductRepository(),
      productController = new ProductController(eventAggregator, productRepository);
})();

// 来源：https://www.cnblogs.com/TomXu/archive/2012/01/06/2305513.html