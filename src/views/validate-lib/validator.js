/**
 * 校验器类
 */
// import validateCategery from "./validate-categery";
const validateCategery = require('./validate-categery')

class Validator {
  constructor() {
    this.checkList = []
  }

  add(validateDate, validateType, errorMessage) {
    this.checkList.push({
      validateDate, validateType, errorMessage
    })
  }

  validate() {
    console.log(this.checkList[0], 'checkList')
    
    this.checkList.forEach((validateObj) => {
      validateCategery[validateObj.validateType](validateObj.validateDate, validateObj.errorMessage)
    })
  }
}

// export default Validator
module.exports = Validator