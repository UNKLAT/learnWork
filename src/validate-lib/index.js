import Validator from "./validator";
// let Validator = require('./validator')


let validate = new Validator()

let testData = {
  a: 12,
  b: '小明',
  c: '村口小学',
}

// validate.add(testData.a, 'isNotEmpty', '参数不能为空')
// validate.add(null, 'isNotEmpty', '参数不能为空')
// validate.add({}, 'isNotEmpty', '参数不能为空')
// validate.add(new Object(), 'isNotEmpty', '参数不能为空')
let rules = [
  {
    key: 'a',
    validateRule: 'isNotEmpty',
    errorMessage: 'a参数不能为空',
  },
  {
    key: 'b',
    validateRule: 'isNotEmpty',
    errorMessage: 'b参数不能为空',
  },
  {
    key: 'c',
    validateRule: 'isNotEmpty',
    errorMessage: 'c参数不能为空',
  },
]

/**
 * 通过该函数使得校验规则可以配置式实现规则配置
 * @param {*} validateDataSet 
 * @param {*} rules 
 */
function setValidate(validateDataSet, rules) {
  rules.forEach(rule => {
    validate.add(validateDataSet[rule.key], rule.validateRule, rule.errorMessage)
  });
}

setValidate(testData, rules)


validate.validate()
export default {
  setValidate
}