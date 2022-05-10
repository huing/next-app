/* Number.EPSILON
 Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。
EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16，或者 2^-52。
*/

/* polyfill
if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
}
*/

const x = 0.2;
const y = 0.3;
const z = 0.1;
equal = Math.abs(x - y + z) < Number.EPSILON; // true
console.log(Math.abs(x + z - y) < Number.EPSILON);
console.log(equal);

// 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等? 三种方法
// 转为整数（大数）运算
// 使用 Number.EPSILON 误差范围
// 转成字符串，对字符串做加法运算
