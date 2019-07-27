
class Base {
    sayHello() {
        console.log('Hello')
    }

    sayHey = () => {
        console.log('Hey')
    }

    // babel编译之后为
    // constructor() {
    //     this.sayHey = () => {
    //         console.log('Hey')
    //     }
    // }
}

class A extends Base {
    constructor() {
        super()
        this.name = 'xxx'
    }

    sayHey() {
        console.log('hey', this.name)
    }
}

new A().sayHello()  // Hello
new A().sayHey()    // Hey

const base = new Base()
console.log('sayHey' in base)
console.log(base.hasOwnProperty('sayHey'))

const a = new A()
console.log('sayHey' in a)              // true
console.log(a.hasOwnProperty('sayHey')) // true 说明sayHey是从Base继承的属性 而非原型链上的方法 对象 方法调用优先级自有属性方法高于原型中的属性方法

class B {
    sayHey() {
        // ...
    }
}

const b = new B()
console.log('sayHey' in b)              // true
console.log(b.hasOwnProperty('sayHey')) // false