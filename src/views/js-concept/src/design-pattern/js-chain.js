/**
 * 职责链模式
 * 使多个对象都有机会处理请求，避免请求的发送者和接受者之间的耦合关系
 * 将对象连成一条链，沿着这条链传递该请求，直到有一个对象处理该请求
 */

 var NO_TOPIC = -1;
 var Topic;
 
 function Handler(s, t) {
     this.successor = s || null;
     this.topic = t || 0;
 }
 
 Handler.prototype = {
     handle: function () {
         if (this.successor) {
             this.successor.handle()
         }
     },
     has: function () {
         return this.topic != NO_TOPIC;
     }
 };


 var app = new Handler({
  handle: function () {
      console.log('app handle');
  }
}, 3);

var dialog = new Handler(app, 1);
dialog.handle = function () {
  console.log('dialog before ...')
  // 这里做具体的处理操作
  Handler.prototype.handle.call(this); //继续往上走
  console.log('dialog after ...')
};

var button = new Handler(dialog, 2);
button.handle = function () {
  // Handler.prototype.handle.call(this); // 先进行处理 dialog，接下去在处理自身逻辑

  console.log('button before ...')
  // 这里做具体的处理操作
  // Handler.prototype.handle.call(this);  // 先处理自身逻辑，再处理 dialog
  console.log('button after ...')
};

button.handle();

/**
 * buttun 对象解析
 * buttun => {
 *  successor: dialog,
 *  topic: 2
 *  prototype: {
 *    //.... // 其他代码
 *    handle(),
 *    has()
 *  }
 * }
 * 
 * 当 button.handle 定义的时候，button对象就多一个handle属性
 * 在 button.handle() 时候，this就是button，这这时候在内部
 *  Handler.prototype.handle.call(this)，在 Handler.prototype.handle 内部
 * 的this就是button，那其中 this.successor 即是 dialog
 */

// 职责链模式经常和组合模式一起使用，这样一个构件的父构件可以作为其继任者。

// 同时，DOM里的事件冒泡机制也和此好像有点类似，比如点击一个按钮以后，
// 如果不阻止冒泡，其click事件将一直向父元素冒泡，利用这个机制也可以
// 处理很多相关的问题