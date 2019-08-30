/**
 * Promise 4
 * @authors Your Name (you@example.org)
 * @date    2018-10-08 16:04:12
 * @version $Id$
 */

function doSomething() {
    return new Promise((resolve, reject) => {
        resolve(10);
    });
}

function doSomethingElse() {
    return new Promise((resolve, reject) => {
        resolve(20);
    });
}

function result(val) {
    console.log(val)
}

// #1
// .then()的result回调接收 doSomethingElse的resolve(20) 输出20
doSomething().then(function () {
    return doSomethingElse();
}).then(result);

// #2
// .then() 的参数是一个函数返回值为return undefined 被用作.then的result回调接受的参数
doSomething().then(function () {
    doSomethingElse();
    // return;
}).then(result);

// #3
// doSomethingElse是函数的引用 doSomethingElse()是函数的执行的结果返回 按照 Promise 的设计，当 .then() 的参数不是函数的时候，这一步会被忽略不计 10
doSomething().then(doSomethingElse()).then(result);

// #4
// doSomethingElse是函数并且resolve(20) 传递给result回调函数的参数20
doSomething().then(doSomethingElse).then(result);