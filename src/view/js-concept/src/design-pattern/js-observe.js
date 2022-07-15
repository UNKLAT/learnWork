/**
 * 观察者模式（发布订阅模式 Publish/Subscribe）
 * 定义一种一对多的关系，多个观察者同时监听某一对象
 * 当该对象变化就会通知所有观察者，这是观察者可以更新自己
 * 在js中通过回调实现
 * 
 * 好处：
 * 1.支持简单的广播通信，自动通知所有已经订阅过的对象
 * 2.页面载入后目标对象很容易与观察者存在动态关联，增加灵活性
 * 3.目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用
 */

/**
 * 版本一
 * 定义pubsub对象，其中包含订阅、退订和发布三个方法
 */
 var pubsub = {};
 (function (q) {
 
     var topics = {}, // 回调函数存放的数组
         subUid = -1;
     // 发布方法
     q.publish = function (topic, args) {
 
         if (!topics[topic]) {
             return false;
         }
 
         setTimeout(function () {
             var subscribers = topics[topic],
                 len = subscribers ? subscribers.length : 0;
 
             while (len--) {
                 subscribers[len].func(topic, args);
             }
         }, 0);
 
         return true;
 
     };
     //订阅方法
     q.subscribe = function (topic, func) {
 
         if (!topics[topic]) {
             topics[topic] = [];
         }
 
         var token = (++subUid).toString();
         topics[topic].push({
             token: token,
             func: func
         });
         return token;
     };
     //退订方法
     q.unsubscribe = function (token) {
         for (var m in topics) {
             if (topics[m]) {
                 for (var i = 0, j = topics[m].length; i < j; i++) {
                     if (topics[m][i].token === token) {
                         topics[m].splice(i, 1);
                         return token;
                     }
                 }
             }
         }
         return false;
     };
 } (pubsub));

//来，订阅一个
pubsub.subscribe('example1', function (topics, data) {
  console.log(topics + ": " + data);
});

//发布通知
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', ['test', 'a', 'b', 'c']);
pubsub.publish('example1', [{ 'color': 'blue' }, { 'text': 'hello'}]);

// 版本三
// 如果想让多个对象都具有观察者发布订阅的功能，我们可以定义一个通用的函数，然后将该函数的功能应用到需要观察者功能的对象上，代码如下：

//通用代码
var observer = {
    //订阅
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    //退订
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },
    //发布
    publish: function (what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    // 将对象o具有观察者功能
    make: function (o) { 
        for (var i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
};
// 然后订阅2个对象blogger和user，使用observer.make方法将这2个对象具有观察者功能，代码如下：

var blogger = {
    recommend: function (id) {
        var msg = 'dudu 推荐了的帖子:' + id;
        this.publish(msg);
    }
};

var user = {
    vote: function (id) {
        var msg = '有人投票了!ID=' + id;
        this.publish(msg);
    }
};

observer.make(blogger);
observer.make(user);
// 使用方法就比较简单了，订阅不同的回调函数，以便可以注册到不同的观察者对象里（也可以同时注册到多个观察者对象里）：

var tom = {
    read: function (what) {
        console.log('Tom看到了如下信息：' + what)
    }
};

var mm = {
    show: function (what) {
        console.log('mm看到了如下信息：' + what)
    }
};
// 订阅
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123); //调用发布

//退订
blogger.removeSubscriber(mm.show);
blogger.recommend(456); //调用发布

//另外一个对象的订阅
user.addSubscriber(mm.show);
user.vote(789); //调用发布
//  观察者的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。
//  总的来说，观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。