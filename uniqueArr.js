/**
 *  看了很多的资料学习去重
 *  数组去重复个人觉得方式很多但是要抓住特性去解决问题
 *  去重复还要兼顾效率 复杂程度是一个很好的学习体验
 */

var arr = [1,1,2,'1','2','2','a','A'];
/*
    // 没有兼容问题
    function unique(arr){
        for(var i=0;i<arr.length;i++){
            for(var j=arr.length-1;j>=0;j--){
                if(i != j && arr[i] === arr[j]){
                    arr.splice(i,1);
                }
            }
        }
        return arr;
    }
    console.log(unique(arr));
*/


/*
    // 没有兼容问题
    function unique(arr){
        var res = [];
        for(var i=0;i<arr.length;i++){
            for(var j=0;j<res.length;j++){
                // === 区别 1 与 '1'
                if(arr[i] === res[j]){
                    // 相同就跳出
                    break;
                }
            }
            // arr[i]是唯一的 循环结束 j = res.length
            // i=0 res[1]
            // i=1 j=0 arr[1] === res[0] break if(0 === 1) 不成立
            // i=2 arr[2]=2 没有相同的 内存循环结束j=1 if(1 === 1) 成立放入res
            if(j == res.length){
                res.push(arr[i]);
            }
        }
        return res;
    }
    console.log(unique(arr));
*/


/*
    // indexOf  兼容问题
    function unique(arr){
        var newArr = [];
        for(var i=0;i<arr.length;i++){
            if(newArr.indexOf(arr[i]) == -1){
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    console.log(unique(arr));
*/

/*
    // 排序之后去重 查看相邻的是否相等  排序之后的效率肯定比indexOf直接找效率高
    function unique(arr){
        var res = [];
        var sortArr = arr.sort();
        // 中间值
        var temp = null;
        for(var i=0,len = sortArr.length;i<len;i++){
            // 第一个不用直接放入或者相邻的不相同
            if(!i || temp !== sortArr[i]){
                res.push(sortArr[i]);
            };

            // i=0 null !== 1 res[1] temp = 1
            // i=1 1 == 1 false temp = 1
            // i=2 1 !== 2 res[1,2] temp = 2
            // i=3 2 !== '1' res[1,2,'1'] temp = '1'
            // 保存上一个值
            temp = sortArr[i];
        };
        return res;
    };
    console.log(unique(arr))
*/


/**
 * [unique description]     为排序使用indexof 排序了使用sort之后的操作
 * @param  {[type]}  arr    [description]
 * @param  {Boolean} isSort 是否排序
 */
/*
    // 现在写一个unique函数 判断数组是否是一个有序的数组
    var arr1 = [1,1,'1',2,2,'2'];
    function unique(arr,isSort){
        isSort = isSort || false;
        var res = [];
        var temp = null;

        for(var i=0;i<arr.length;i++){
            if(isSort){
                if(!i || temp !== arr[i]){
                    res.push(arr[i]);
                }
                temp = arr[i];
            }else{
                if(res.indexOf(arr[i]) == -1){
                    res.push(arr[i]);
                }
            }
        };
        return res;
    };

    console.log(unique(arr1))
*/

/*
    // filter 方法
    var arr1 = [1,1,'1',2,2,'2'];
    function unique(arr,isSort){
        isSort = isSort || false;
        if(!isSort){
            return arr.filter(function(item,index,array){

                //检索当前的索引是不是唯一
                return array.indexOf(item) === index;

                //反过来思考 查看是否重复 返回-1的留下
                // return array.indexOf(item,index+1) == -1;
            });
        }else{
            // 排序之后去重
            return arr.sort().filter(function(item,index,array){
                // 排除第一个
                return !index || item !== array[index-1];
            });
        }
    }
    console.log(unique(arr1,true));
*/

/*
    // 通过对象的hasOwnProperty方法 判断是否存在自有属性
    function unique(arr){
        var obj = {};
        return arr.filter(function(item,index,array){
            // 如果存在item这个属性 返回false 不存在就添加item属性为true 并返回这项 但是这个方法不能判断 1 与 '1' (json特性这两个一样的)
            // return obj.hasOwnProperty(item) ? false : (obj[item] = true);

            // 解决方式 让key值不相同
            // return obj.hasOwnProperty(item+1) ? false : (obj[item+1] = true);
            return obj.hasOwnProperty(typeof item+item) ? false : (obj[typeof item+item] = true)
        });
    }
    console.log(unique(arr));
 */


/*
    // ES6 Set 去重
    function unique(arr){
        // return Array.from(new Set(arr));  //转换为数组
        return [...new Set(arr)];
    }

    // 简化写法
    var unique = (arr) =>([...new Set(arr)]);
    console.log(unique(arr))

 */


/*

    思考题
    var arr = [1,1,'1','a','A']
    目前1与'1' 已经解决了 字母大小写的问题 一样的应该也要去掉保留大写或者小写怎么办?保留前边写的功能 写一个unique函数
    设想一下 我们需要实现的功能
    function unique(arr,isSort,ignore){

    }


    这个实现方式通过先把所有的转成小写在去重 没什么问题 但是还是需要在多遍历一次 能不能在原有的去重过程中把这个问题解决?
    function unique(arr,isSort){
        for(var i=0;i<arr.length;i++){
            if(typeof arr[i] == 'string'){
                arr[i] = arr[i].toLowerCase();
            }
        }
        // 最终输出的数组
        var res = [];
        // 临时存储变量
        var temp;
        for(var i=0,len = arr.length;i < len;i++){
            if(isSort){
                if(!i || temp === arr[i]){
                    res.push(arr[i]);
                }
            }else{
                if(res.indexOf(arr[i]) == -1){
                    res.push(arr[i]);
                };
            }
        };
        return res;
    };
    console.log(unique(arr,false));
*/

function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }
    }
    // console.log(seen)
    return iteratee?seen:res;
}
// (index=== length-1)&&(lastIndex = oDiv, toggle = true);

console.log(unique(arr, false, function(item){
    return typeof item == 'string' ? item.toUpperCase() : item
}));


//jQuery中$.unique es6中的set
/*
alert($.unique(arr))
alert(arr)
*/


// 放入重复的元素
function duplicates(arr) {
    /*
    var res = [];
    arr.forEach(function(elem){
        if(arr.indexOf(elem) !=arr.lastIndexOf(elem) && res.indexOf(elem) == -1){
            res.push(elem);
        }
    });

    return res;
    */

    // arr = [1,1,2,3,3,4,4,5]
    // return arr.sort().filter(function(item,index,array){
    //     return array[index] === array[index + 1] && array[index] !== array[index - 1]
    // });

    // return arr.filter(function(item,index,array){
    //     return array.indexOf(item,index+1) === -1;
    // });

}
console.log(duplicates(arr1));