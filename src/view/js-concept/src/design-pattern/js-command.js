/**
 * 命令模式
 * 用于将一个请求封装成一个对象，从而可以对不同的请求对于用户进行参数化
 * 也即是将函数的调用，请求和操作封装成一个单一的对象
 */

 $(function () {

  var CarManager = {

      // 请求信息
      requestInfo: function (model, id) {
          return 'The information for ' + model +
      ' with ID ' + id + ' is foobar';
      },

      // 购买汽车
      buyVehicle: function (model, id) {
          return 'You have successfully purchased Item '
      + id + ', a ' + model;
      },

      // 组织view
      arrangeViewing: function (model, id) {
          return 'You have successfully booked a viewing of '
      + model + ' ( ' + id + ' ) ';
      }
  };
})();
// 来看一下上述代码，通过调用函数来简单执行manager的命令，
// 然而在一些情况下，我们并不想直接调用对象内部的方法。
// 这样会增加对象与对象间的依赖。现在我们来扩展一下这个CarManager 
// 使其能够接受任何来自包括model和car ID 的CarManager对象的处理请求。
// 根据命令模式的定义，我们希望实现如下这种功能的调用：

CarManager.execute({ commandType: "buyVehicle", operand1: 'Ford Escort', operand2: '453543' });
// 根据这样的需求，我们可以这样啦实现CarManager.execute方法：

CarManager.execute = function (command) {
  return CarManager[command.request](command.model, command.carID);
};
// 改造以后，调用就简单多了，如下调用都可以实现（当然有些异常细节还是需要再完善一下的）：

CarManager.execute({ request: "arrangeViewing", model: 'Ferrari', carID: '145523' });
CarManager.execute({ request: "requestInfo", model: 'Ford Mondeo', carID: '543434' });
CarManager.execute({ request: "requestInfo", model: 'Ford Escort', carID: '543434' });
CarManager.execute({ request: "buyVehicle", model: 'Ford Escort', carID: '543434' });

// 目前来看，可以使用该模式来封装http请求