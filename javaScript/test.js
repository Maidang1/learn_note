let obj = {
  name: "OBJ",
};

function fn(...args) {
  console.log(this, args);
}

document.body.onclick = fn; // =>this BODY

document.body.onclick = function (ev) {
  // ev事件对象 函数触发的时候 会把信息传给函数
};

document.body.onclick = fn.bind(obj, 100, 200);

document.body.onclick = function (ev) {
  fn.call(obj, 100, 200, ev);
};

(function () {
  function myBInd(context = window, ...outArg) {
    let fn = this;
    return function (...innerArg) {
      fn.call(context, ...outArg.concat(innerArg));
    };
  }

  Function.prototype.myBInd = myBInd;
})();
