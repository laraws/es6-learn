/**
 * const声明一个只读的常量。一旦声明，常量的值就不能改变。
 * @type {number}
 */
const PI = 3.1415;
console.log(PI); // 3.1415
// PI = 3;
// // TypeError: Assignment to constant variable.


/**
 * const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 */
// const foo;


/**
 * const的作用域与let命令相同：只在声明所在的块级作用域内有效。
 */
if (true) {
    const MAX = 5;
}

// MAX // Uncaught ReferenceError: MAX is not defined

/**
 * const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
 */
if (true) {
    // console.log(MAX); // ReferenceError
    const MAX = 5;
}

/**
 * const声明的常量，也与let一样不可重复声明。
 * @type {string}
 */
var message = "Hello!";
let age = 25;

// 以下两行都会报错
// const message = "Goodbye!";
// const age = 30;


/**
 * 对于复合类型的数据（主要是对象和数组），变量指向的内存地址，
 * 保存的只是一个指向实际数据的指针，
 * const只能保证这个指针是固定的（即总是指向另一个固定的地址），
 * 至于它指向的数据结构是不是可变的，就完全不能控制了。
 * 因此，将一个对象声明为常量必须非常小心。
 * @type {{}}
 */
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// // 将 foo 指向另一个对象，就会报错
// foo = {}; // TypeError: "foo" is read-only

//另一个例子
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
// a = ['Dave'];    // 报错
