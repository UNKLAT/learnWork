let VueTest = function () {
  console.log('VueTest')
}

VueTest.prototype.shareObj = {
  name: 'tony'
}

let A = new VueTest()
let B = new VueTest()

console.log(A.shareObj.name, '初始')

VueTest.prototype.shareObj = {
  name: 'koni'
}

console.log(A.shareObj.name, '整个引用改变')

VueTest.prototype.shareObj.name = 'kkk'

console.log(A.shareObj.name, '引用内部属性改变')

B.shareObj.name = 'bjkl'

console.log(A.shareObj.name, '另外实例修改引用内部属性')




