
/**
 * 防抖函数，
 * 触发事件后，delay毫秒后才进行处理，如果在delay时间内
 * 再次触发则重新计时
 * @param {*} fn 事件处理函数
 * @param {*} delay 延时毫秒
 * @returns {Function} 经过防抖处理的函数
 */
function debounce(fn, delay) {
  let timeout = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      console.log(arguments, 'arguments')
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 该函数的实际逻辑是通过设置延时定时器，当定时器的时间到达delay
 * 定时器回调中调用fn，即达成了 事件触发，延迟delay进行处理。
 * 而每次触发，检测timeout，若存在，则清除tiemout，实际上若timeout
 * 存在即是上一次触发到当前触发的耗时没有超过delay，直接清除，也把上一次事件处理清除了。
 * 然后定义一个新的timeout就绑定了当前的事件处理，delay毫秒后就会调用fn
 */

let foo = debounce((a, b)=>{ console.log(a, b,'fn run') }, 100)

foo(1,2)