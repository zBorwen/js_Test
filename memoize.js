/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-03-14 14:03:13
 * @version $Id$
 * 来自js蝴蝶书中的代码  学习记忆函数
 */


var index_ = 0;
function fibonacci(n){
    console.log("index:"+ (++index_));
    return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);
}

/**
 * 0--> 1次
 * 1--> 1次
 * 2--> 3次 = 1 + 1 + 1
 * 3--> 5次 = 1 + 3 + 1
 * 4--> 9次 = 1+ 5 + 3
 * 5--> 15次= 1+ 9 + 5
 */
for(var i=0;i<=5;i++){
    // console.log(fibonacci(4));
}

/*
    修改成为有缓存数据的
        1. 可以缓存一个对象
        2. 可以缓存一个数组
        3. 利用闭包存储
 */
var index = 0;
var cach_fibonacci = function(){
    var cach = {0: 0, 1: 1};
    var fib = function(n){
        console.log("index:" + (++index));  // 29 次
        var result = cach[n];
        if(typeof result != 'number'){
            result = fib(n-1) + fib(n-2);
            cach[n] = result;
        }
        return result;
    }
    return fib;
}();

// 0 1 1(2次) 2(3次) 3(3次) 4(3次) 5(3次)
for(var i=0;i<=5;i++){
    // console.log(cach_fibonacci(i));
}

// 重新整合一个函数让这个形式变得更一般一点
var memoizer = function(base, callBack){
    var shell = function(n){
        var result = base[n];
        if(typeof result != 'number'){
            result = callBack(shell, n);
            base[n] = result;
        }
        return result;
    }
    return shell;
}

for(var i=0;i<=5;i++){
    var s = memoizer([0,1], function(shell, n){
        return shell(n-1) + shell(n-2)
    })
    // console.log(s(i))
}


// js权威指南记忆函数
function memoize(f) {
    var cache = {};
    return function(){
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            console.log('cache');
            return cache[key];
        }
        else {
            return cache[key] = f.apply(this, arguments)
        }
    }
}

var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memoize(add)
memoizedAdd(1, 2, 3)  // 6
memoizedAdd(1, 2, 3); // cache 6
// 点有不理解的 key开始加了这么一个参数长度 arguments.length 方向是为了防止 传入错误的参数比如 memoizedAdd('1,2,3') 类似这种也会得到正确的答案
