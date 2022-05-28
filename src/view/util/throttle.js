

/**
 * 节流函数
 * 当事件高频触发的时候，每隔delay毫秒，才会调用一次处理函数
 * @param {*} fn 事件处理函数
 * @param {*} delay 隔间时间 
 */
function throttle(fn, delay) {
  let preTime = Date.now()
  let index = 0
  return function () {
    let now = Date.now()
    if (now - preTime > delay) {
      fn.apply(this, arguments)
      preTime = now
      index ++ 
    }
    
    return index
  }
}

let foo = throttle((a,b)=>{ console.log(a, b, 'throttle') }, 100)

let time = 0
let index = 0
let throttleTest = setInterval(() => {
  
  time += 10
  index = foo(1, 2)
  if (index === 10) {
    console.log(index, time)
    clearInterval(throttleTest)
  }
}, 10)
// 1, 2, 'throttle'