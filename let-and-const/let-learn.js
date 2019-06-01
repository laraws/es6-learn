/**
 * let 的作用域在代码块
 */
for (let i = 0; i < 10; i++) {
     console.log('let '+i+'\n');
 }


/**
 * 变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
 * 每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。
 * 也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。
 * 如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。
 * @type {Array}
 */
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i+'\n');
    };
}
// for (let i = 0; i < 10; i++) {
//      a[i] = function () {
//          console.log(i);
//      }
//  }
 a[6]();


/**
 * 代码正确运行，输出了 3 次abc。
 * 这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
 */
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i+'\n');
}

/**
 * var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。
 * let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
 */
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
// let bar = 2;

/**
 * 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
 * ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
 * 凡是在声明之前就使用这些变量，就会报错。
 * 在代码块内，使用let命令声明变量之前，该变量都是不可用的。
 * 这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
 * @type {number}
 */
var tmp = 123;

// if (true) {
//     tmp = 'abc'; // ReferenceError
//     let tmp;
// }


/**
 * 在let命令声明变量tmp之前，都属于变量tmp的“死区”。
 */
if (true) {
    // // TDZ开始
    // tmp = 'abc'; // ReferenceError
    // console.log(tmp); // ReferenceError
    //
    // let tmp; // TDZ结束
    // console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

/**
 * 上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。
 * @param x
 * @param y
 * @returns {number[]}
 */
// function bar(x = y, y = 2) {
//     return [x, y];
// }

// bar(); // 报错


/**
 * let不允许在相同作用域内，重复声明同一个变量。
 */
// 报错
// function func() {
//     // let a = 10;
//     // var a = 1;
// }
//
// // 报错
// function func() {
//     // let a = 10;
//     // let a = 1;
// }


/**
 * 不能在函数内部重新声明参数。
**/

// function func(arg) {
//     let arg;
// }
// func() // 报错

// function func(arg) {
//     {
//         let arg;
//     }
// }
// func() // 不报错

/**
 * ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
 *
 *
 * 代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。
 * 但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
 * @type {Date}
 */
var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}

f(); // undefined

/**
 * es5问题
 *
 * 用来计数的循环变量泄露为全局变量。
 * @type {string}
 */
var s = 'hello';

for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}

console.log(i); // 5


/**
 * let实际上为 JavaScript 新增了块级作用域。
 * 上面的函数有两个代码块，都声明了变量n，运行后输出 5。
 * 这表示外层代码块不受内层代码块的影响。
 * 如果两次都使用var定义变量n，最后输出的值才是 10。
 */
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5
}

/**
 *ES6 允许块级作用域的任意嵌套。
 * 内层作用域可以定义外层作用域的同名变量。
 */
{{{{
    {let insane = 'Hello World'}
    // console.log(insane); // 报错
}}}};

{{{{
    let insane = 'Hello World';
    {let insane = 'Hello World'}
}}}};


/**
 * 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
 */
//
// // IIFE 写法
// (function () {
//     var tmp = ...;
// ...
// }());
//
// // 块级作用域写法
// {
//     let tmp = ...;
// ...
// }


/**
 * ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
 * ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
 */
// function f() { console.log('I am outside!'); }
//
// (function () {
//     if (false) {
//         // 重复声明一次函数f
//         function f() { console.log('I am inside!'); }
//     }
//
//     f();
// }());


/**
 * ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
 */

// 第一种写法，报错
// if (true) let x = 1;

// // 第二种写法，不报错
// if (true) {
//     let x = 1;
// }


/**
* 严格模式下，函数只能声明在当前作用域的顶层。
**/
//
// // 不报错
// 'use strict';
// if (true) {
//     function f() {}
// }
//
// // 报错
// 'use strict';
// if (true)
//     function f() {}
