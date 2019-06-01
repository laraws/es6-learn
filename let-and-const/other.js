//ES5 之中，顶层对象的属性与全局变量是等价的。
window.a = 1;
a // 1

a = 2;
window.a // 2

/**
 * ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；
 * 另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
 * 也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
 * 下面代码全局变量a由var命令声明，所以它是顶层对象的属性；
 * 全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
 * @type {number}
 */
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a;// 1
global.a;

let b = 1;
window.b // undefined

//浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
// 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
// Node 里面，顶层对象是global，但其他环境都不支持。


//全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
// 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
// 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。


