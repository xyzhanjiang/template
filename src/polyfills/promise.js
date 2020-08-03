// promise 对应的三种状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  // 接收一个 function 参数
  // new Promise((resolve, reject) => {})
  constructor(executor) {
    // 初始化状态为 PENDING
    this.state = PENDING
    this.queue = []

    doResolve(this, executor)
  }

  then(onFulfilled, onRejected) {
    const promise = new MyPromise(() => {})
    handle(this, { promise, onFulfilled, onRejected })

    // then 方法支持链式操作
    // 但是 then 返回的是一个新的 promise
    // 并不是当前 promise
    // 因此在这里 new 了一个新的 promise
    return promise
  }
}

function fulfill(promise, value) {
  promise.state = FULFILLED
  promise.value = value
  finale(promise)
}

function reject(promise, value) {
  promise.state = REJECTED
  promise.value = value
  finale(promise)
}

function finale(promise) {
  const length = promise.queue.length
  for (let i = 0; i < length; i++) {
    handle(promise, promise.queue[i])
  }
}

function doResolve(promise, executor) {
  // 标记 promise.state 已经发生改变
  // 状态改变后就不可再变了
  let called = false

  function wrapFulfill(value) {
    if (called) return
    called = true
    fulfill(promise, value)
  }

  function wrapReject(value) {
    if (called) return
    called = true
    reject(promise, value)
  }

  // 传入的 function 如果执行出错，捕获错误并 reject promise
  // new Promise((resolve, reject) => {
  //   foo()
  // }).catch((err) => {
  //   console.log(err)
  // })
  try {
    executor(wrapFulfill, wrapReject)
  } catch (err) {
    wrapReject(err)
  }
}

function handle(promise, handler) {
  while (promise.value instanceof MyPromise) {
    promise = promise.value
  }
  // 状态为 PENDING 的时候将回调函数加入队列
  // 否则就执行
  if (promise.state === PENDING) {
    promise.queue.push(handler)
  } else {
    handleResolved(promise, handler)
  }
}

function handleResolved(promise, handler) {
  const cb = promise.state === FULFILLED ? handler.onFulfilled : handler.onRejected
  try {
    const value = cb(promise.value)
    fulfill(handler.promise, value)
  } catch (err) {
    reject(handler.promise, err)
  }
}

// To be continued

export default MyPromise
