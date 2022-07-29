// import Validator from "./validator";
let Validator = require('./validator')

let validate = new Validator()

let testData = {
  a: 12,
  b: '小明',
  c: '村口小学',
}

validate.add(testData.a, 'isNotEmpty', '参数不能为空')
validate.add(null, 'isNotEmpty', '参数不能为空')
validate.add({}, 'isNotEmpty', '参数不能为空')
validate.add(new Object(), 'isNotEmpty', '参数不能为空')


validate.validate()