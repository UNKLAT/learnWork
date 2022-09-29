/**
 * 代理模式(Proxy)
 * 为其他对象提供一种代理以控制对这个对象的访问
 */

//  假如dudu要送酸奶小妹玫瑰花，却不知道她的联系方式或者不好意思，
//  想委托大叔去送这些玫瑰，那大叔就是个代理

// 先声明美女对象
var girl = function (name) {
  this.name = name;
};

// 这是dudu
var dudu = function (girl) {
  this.girl = girl;
  this.sendGift = function (gift) {
      alert("Hi " + girl.name + ", dudu送你一个礼物：" + gift);
  }
};

// 大叔是代理
var proxyTom = function (girl) {
  this.girl = girl;
  this.sendGift = function (gift) {
      (new dudu(girl)).sendGift(gift); // 替dudu送花咯
  }
};
// 调用方式就非常简单了：

var proxy = new proxyTom(new girl("酸奶小妹"));
proxy.sendGift("999朵玫瑰");

// 1.远程代理，也就是为了一个对象在不同的地址空间提供局部代表，这样可以隐藏一个对象存在于不同地址空间的事实，就像web service里的代理类一样。
// 2.虚拟代理，根据需要创建开销很大的对象，通过它来存放实例化需要很长时间的真实对象，比如浏览器的渲染的时候先显示问题，而图片可以慢慢显示（就是通过虚拟代理代替了真实的图片，此时虚拟代理保存了真实图片的路径和尺寸。
// 3.安全代理，用来控制真实对象访问时的权限，一般用于对象应该有不同的访问权限。
// 4.智能指引，只当调用真实的对象时，代理处理另外一些事情。例如C#里的垃圾回收，使用对象的时候会有引用次数，如果对象没有引用了，GC就可以回收它了