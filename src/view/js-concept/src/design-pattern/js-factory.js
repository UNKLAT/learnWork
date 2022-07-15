/**
 * 工厂模式
 * 创建对象时候无需指定创建对象的具体类
 * 定义一个用于创建对象的接口
 * 子类中重写接口方法来指定子类的自己的对象类型
 * 
 * 创建对象的流程赋值的时候，比如依赖于很多设置文件等。
 * 并且，你会经常在程序里看到工厂方法，用于让子类类定义需要创建的对象类型
 * 工厂类不做实现
 * 子类进行实现
 * 调用工厂类的时候传递参数，从而实现在调用统一，实例也能个性化
 */

//  假如我们想在网页面里插入一些元素，而这些元素类型不固定，可能是图片，也有可能是连接，甚至可能是文本，
// 根据工厂模式的定义，我们需要定义工厂类和相应的子类，我们先来定义子类的具体实现（也就是子函数）：

 var page = page || {};
 page.dom = page.dom || {};
 //子函数1：处理文本
 page.dom.Text = function () {
     this.insert = function (where) {
         var txt = document.createTextNode(this.url);
         where.appendChild(txt);
     };
 };
 
 //子函数2：处理链接
 page.dom.Link = function () {
     this.insert = function (where) {
         var link = document.createElement('a');
         link.href = this.url;
         link.appendChild(document.createTextNode(this.url));
         where.appendChild(link);
     };
 };
 
 //子函数3：处理图片
 page.dom.Image = function () {
     this.insert = function (where) {
         var im = document.createElement('img');
         im.src = this.url;
         where.appendChild(im);
     };
 };
//  那么我们如何定义工厂处理函数呢？其实很简单：
 
 page.dom.factory = function (type) {
     return new page.dom[type];
 }

//  以下几种情景下工厂模式特别有用：

//  1.对象的构建十分复杂
//  2.需要依赖具体环境创建不同实例
//  3.处理大量具有相同属性的小对象