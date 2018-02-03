/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-12-28 13:33:42
 * @version $Id$
 */

var arr = [1,2,3,4];

// 1
var sum = 0;
for(var k in arr){
    sum += arr[k];
}
// console.log(sum);

// 2
var sum1 = arr.reduce((a, b) => a + b);
// console.log(sum1);

// 3
// console.log(eval(arr.join("+")));

var str = "aabbcc";
var count = str.split("").reduce((a, b) => {
    if(!a[b]){
        a[b] = 0;
    }
    a[b]++;
    return a;
}, {});

// var count = str.split("").reduce((a, b) => (
//     a[b]++ || (a[b]=1),a
// ), {});
// console.log(count);

var num = 123450;
function convert(num){
    var arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var temp = num.toString().split("");
    return temp.reduce((a, b) => (
        a + arr[b]
    ), "");
}
// console.log(convert(num));



var ar = [1,2,3,4,5,6];

function foo(arr, len){
    var temp = [];
    var index = 0;
    while(arr[index]){
        temp.push(arr.slice(index, index+=len));
    }
    return temp;
}

function chunk(array, size){
    if(!Array.isArray(array)){
        return [];
    }
    size = size || 1;
    var index = 0,
        resIndex = 0,
        length = array === null ? 0 : array.length,
        resLen = Math.ceil(length / ( size|0));
        result = Array(resLen);
    while(index < resLen){
        result[index++] = array.slice(resIndex, resIndex+=size);
    }
    return result;
}
console.log(chunk(ar,2));


var json1 = {
    name: "张三",
    age: 22,
    tel: 110
};


var json2 = {
    name: "张三..",
    age: 22,
    job: "web",
    address: "四川",
    tel: 00
}


function concat(arr){
    return arr.reduce((a, b) =>{
        a.warnInfo = [];
        for(var k in b){
            if(a[k] != b[k]){
                a.warnInfo.push(k);
            }
            a[k] = b[k];
        }
        return a;
    }, {});
}
/*
let objAll = Object.assign({}, json1, json2);
function checkObj(objAll,objList) {
    objAll.warnInfo=[];
    //获取所有属性
    let keys= Object.keys(objAll);
    for (let i= 0 ;i<objList.length;i++){
        for (let j= 0 ;j<keys.length;j++){
        //如果_keys[j]这个属性，在objList[i]和_objAll里面都存在，而且这两个值是不一样的，那么就是异常数据，需要记录！
            if (objList[i][keys[j]] !== undefined && objAll[keys[j]] !== objList[i][keys[j]]) {
                objAll.warnInfo.push(keys[j]);
            }
        }
    }
    return objAll;
}*/


function matrix(num){
    var arr = [];
    var row = [];
    var col = [];
    var arrow = [];
    for(let i=0;i<num;i++){
        if(i%2 === 1){
            row[i] = Math.pow(i+1,2);
        }else{
            if(i === 0){
                row[i] = 1;
            }else{
                row[i] = row[i-1] + 1;
            }
        }
    }

    for(let i=0;i<num;i++){
        console.log(i)
        if(i%2 === 0){
            col[i] = Math.pow(i+1,2);
        }else{
            col[i] = col[i-1] + 1;
        }
    }

    for(let i=0;i<num;i++){
        if(i==0){
            arrow[i] = 1;
        }else{
            arrow[i] = arrow[i-1]+2*i;
        }
    }

    for(let i=0;i<num;i++){
        // 第一列 第一行 对角线填充到数组
        arr[i] = row[i];
        arr[i*num] = col[i];
        arr[i*(num+1)] = arrow[i];
        for(let j=1;j<i;j++){
            if(i%2 == 1){
                // 填充左下角
                arr[i*num+j] = col[i] + j;
                // 填充右上角
                arr[j*num+i] = row[i] - j;
            }else{
                // 填充左下角
                arr[i*num+j] = col[i] - j;
                // 填充右上角
                arr[j*num+i] = row[i] + j;
            }
        }
    }
    return arr;
}

console.log(chunk(matrix(5), 5));