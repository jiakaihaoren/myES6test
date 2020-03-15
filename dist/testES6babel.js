'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testClass;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(steps),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(steps1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Symbol */
var testClass = (_testClass = {
  jm: 0
}, _defineProperty(_testClass, Symbol('jk'), 1), _defineProperty(_testClass, Symbol('jm'), 2), _testClass);
// jm Symbol属性无法便利，因此可做私有属性
for (var key in testClass) {
  console.log(key);
}

// Symbol(jk) Symbol(jm) 可用Object.getOwnPropertySymbols便利Symbol属性
/* eslint-disable array-callback-return */
Object.getOwnPropertySymbols(testClass).map(function (sym) {
  console.log(sym);
});

// polyfill 让浏览器支持不支持的方法 from是Array的静态方法 static
Array.from([1, 2, 3]);

// es6 class 只能先定义再使用class TestClass也一样
var TestClass = function () {
  function TestClass(name) {
    _classCallCheck(this, TestClass);

    this.name = name;
  }

  _createClass(TestClass, [{
    key: 'info',
    value: function info() {
      console.log('info方法');
      this.other = 1; // 在这里也能定义属性
    }

    // 静态方法,只能由类调用,不能由实例调用

  }, {
    key: 'git',
    set: function set(value) {
      this.github = value;
    },
    get: function get() {
      return 'https://' + this.github;
    }
  }], [{
    key: 'descriptin',
    value: function descriptin() {
      console.log('descriptin方法');
    }
  }]);

  return TestClass;
}();

var t1 = new TestClass('jk');
t1.info();
console.log(t1.other);
console.log(t1.git); // https://undefined
t1.git = 'www.githun.com';
console.log(t1.git); // https://www.githun.com

// Array构造函数
// eslint-disable-next-line no-array-constructor
console.log(new Array(1, 2, 3)); // [ 1, 2, 3 ]

// Array 内置遍历器
var arr = ['jk', 'jm', 'zzj'];
var arrIterator = arr.entries();
console.log(arrIterator.next()); // { value: [ 0, 'jk' ], done: false }
console.log(arrIterator.next()); // { value: [ 1, 'jm' ], done: false }
console.log(arrIterator.next()); // { value: [ 2, 'zzj' ], done: false }
console.log(arrIterator.next()); // { value: undefined, done: true }

// 自定义Array的myvalues遍历器
// eslint-disable-next-line no-extend-native
Array.prototype.myvalues = function () {
  var i = 0;
  var that = this;
  return {
    next: function next() {
      var done = i >= that.length;
      // eslint-disable-next-line no-plusplus
      var value = that[i++];
      return {
        value: value, done: done
      };
    }
  };
};
var arr1 = ['jk', 'jm', 'zzj'];
var arr1Iterator = arr1.myvalues();
console.log(arr1Iterator.next()); // { value: 'jk', done: false }
console.log(arr1Iterator.next()); // { value: 'jm', done: false }
console.log(arr1Iterator.next()); // { value: 'zzj', done: false }
console.log(arr1Iterator.next()); // { value: undefined, done: true }

// yield实例 https://www.jianshu.com/p/7635227a46bd
var go = /*#__PURE__*/regeneratorRuntime.mark(function go(x) {
  var a, b;
  return regeneratorRuntime.wrap(function go$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('1', x); // 1 10
          _context.next = 3;
          return x;

        case 3:
          a = _context.sent;
          // a=100  next()执行后,只执行了yield表达式,并暂停,没有执行赋值操作
          console.log('3', x); // 3 10

          console.log('4', a); // 4 100

          _context.next = 8;
          return x + 1 + a;

        case 8:
          b = _context.sent;
          return _context.abrupt('return', a + b);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, go, this);
});
// const g = go(10);
// console.log(g.next());// {value:10,done:false}
// console.log(g.next(100));// {value:111,done:false}
// console.log(g.next(1000));// {value:1100,done:true}

// yield函数 执行异步ajax请求
function get(url) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(url);
    }, 1000);
  });
}

function ajax(url) {
  get(url).then(function (res) {
    return ajaxGen.next(res);
  });
  return 'next1';
}

function steps() {
  var res1, res2, res3;
  return regeneratorRuntime.wrap(function steps$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return ajax('1');

        case 2:
          res1 = _context2.sent;

          console.log(res1);
          _context2.next = 6;
          return ajax(res1 + '2');

        case 6:
          res2 = _context2.sent;

          console.log(res2);
          _context2.next = 10;
          return ajax(res2 + '3');

        case 10:
          res3 = _context2.sent;

          console.log(res3);
          return _context2.abrupt('return', res3);

        case 13:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked, this);
}
var ajaxGen = steps();
console.log(ajaxGen.next()); // {value:'next1',done:false}

// 上面写法有问题,一般这样写
function steps1(url) {
  var res1, res2, res3;
  return regeneratorRuntime.wrap(function steps1$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return get(url);

        case 2:
          res1 = _context3.sent;
          _context3.next = 5;
          return get(res1);

        case 5:
          res2 = _context3.sent;
          _context3.next = 8;
          return get(res2);

        case 8:
          res3 = _context3.sent;
          return _context3.abrupt('return', res3);

        case 10:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked2, this);
}

var getGen = steps1('1');
getGen.next().value.then(function (res) {
  return getGen.next(res + '2').value;
}).then(function (res) {
  return getGen.next(res + '3').value;
}).then(function (res) {
  return console.log(res);
}); // 输出123
