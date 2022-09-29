/**
 * 策略模式下
 * 校验函数的集合对象
 */
const validateCategery = {

  'isNotEmpty': (validateData, errorMessage) => {
    console.log(validateData, errorMessage)
    let emptyArr = [
      '',
      null,
      undefined,
    ]
    
    if (emptyArr.includes(validateData)) {
      console.error(errorMessage)
    }

    if (typeof validateData === 'object' && validateData !== null) {
      if (Object.keys(validateData).length === 0) {
        console.error(errorMessage)
      }
    }
  },
}

// export default validateCategery
module.exports = validateCategery