/**
 * 策略模式
 * 定义算法家族，分别封装起来，让他们之间可以互相替换
 * 算法变化不会影响使用算法的用户
 */

let validator = {
  // 所有可以验证规则处理类存放的地方
  type: {},

  // 验证类型所对应的错误消息
  message: {},

  // 当前需要使用的验证类型
  config: {},

  // 暴露的公开验证方法
  // 传入的参数是 key => value 对
  validate: function (data) {
    let i, msg, type, checker, result_ok
    // 清除所有的错误信息
    this.message = {}

    for (i in data) {
      if (data.hasOwnProperty) {
        type = this.config[i] // 根据key查询是否有存在的规则

        checker = this.types[type]; // 获取验证规则的验证类

        if (!type) {
            continue; // 如果验证规则不存在，则不处理
        }
        if (!checker) { // 如果验证规则类不存在，抛出异常
            throw {
                name: "ValidationError",
                message: "No handler to validate type " + type
            };
        }

        result_ok = checker.validate(data[i]); // 使用查到到的单个验证类进行验证
        if (!result_ok) {
            msg = "Invalid value for *" + i + "*, " + checker.instructions;
            this.messages.push(msg);
        }
      }
    }

    return this.hasErrors();
  },

  // helper
  hasErrors: function () {
      return this.messages.length !== 0;
  }
}

// 验证给定的值是否不为空
validator.types.isNonEmpty = {
  validate: function (value) {
      return value !== "";
  },
  instructions: "传入的值不能为空"
};

// 验证给定的值是否是数字
validator.types.isNumber = {
  validate: function (value) {
      return !isNaN(value);
  },
  instructions: "传入的值只能是合法的数字，例如：1, 3.14 or 2010"
};

// 验证给定的值是否只是字母或数字
validator.types.isAlphaNum = {
  validate: function (value) {
      return !/[^a-z0-9]/i.test(value);
  },
  instructions: "传入的值只能保护字母和数字，不能包含特殊字符"
};

var data = {
  first_name: "Tom",
  last_name: "Xu",
  age: "unknown",
  username: "TomXu"
};

validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
};
// 最后，获取验证结果的代码就简单了：

validator.validate(data);

if (validator.hasErrors()) {
  console.log(validator.messages.join("\n"));
}

// 策略模式定义了一系列算法，从概念上来说，
// 所有的这些算法都是做相同的事情，只是实现不同，
// 他可以以相同的方式调用所有的方法，
// 减少了各种算法类与使用算法类之间的耦合。
// 在分析过程中需要在不同时间应用不同的业务规则，
// 就可以考虑是要策略模式来处理各种变化