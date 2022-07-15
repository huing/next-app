/** 数据类型判断 */
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
// '[object Date]'
typeOf(new Date());
// '[object Number]'
typeOf(1);

/**原型链继承 */
