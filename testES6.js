/* Symbol */
const testClass = {
  jm: 0,
  [Symbol('jk')]: 1,
  [Symbol('jm')]: 2,
};
// jm Symbol属性无法便利，因此可做私有属性
for (const key in testClass) {
  console.log(key);
}

// Symbol(jk) Symbol(jm) 可用Object.getOwnPropertySymbols便利Symbol属性
/* eslint-disable array-callback-return */
Object.getOwnPropertySymbols(testClass).map((sym) => {
  console.log(sym);
});

// polyfill 让浏览器支持不支持的方法 from是Array的静态方法 static
Array.from([1, 2, 3]);

// es6 class 只能先定义再使用class TestClass也一样
const TestClass = class {
  constructor(name) {
    this.name = name;
  }

  info() {
    console.log('info方法');
    this.other = 1;// 在这里也能定义属性
  }

  // 静态方法,只能由类调用,不能由实例调用
  static descriptin() {
    console.log('descriptin方法');
  }

  set git(value) {
    this.github = value;
  }

  get git() {
    return `https://${this.github}`;
  }
};

const t1 = new TestClass('jk');
t1.info();
console.log(t1.other);
console.log(t1.git);// https://undefined
t1.git = 'www.githun.com';
console.log(t1.git);// https://www.githun.com

// Array构造函数
// eslint-disable-next-line no-array-constructor
console.log(new Array(1, 2, 3));// [ 1, 2, 3 ]

// Array 内置遍历器
const arr = ['jk', 'jm', 'zzj'];
const arrIterator = arr.entries();
console.log(arrIterator.next());// { value: [ 0, 'jk' ], done: false }
console.log(arrIterator.next());// { value: [ 1, 'jm' ], done: false }
console.log(arrIterator.next());// { value: [ 2, 'zzj' ], done: false }
console.log(arrIterator.next());// { value: undefined, done: true }

// 自定义Array的myvalues遍历器
// eslint-disable-next-line no-extend-native
Array.prototype.myvalues = function () {
  let i = 0;
  const that = this;
  return {
    next() {
      const done = i >= that.length;
      // eslint-disable-next-line no-plusplus
      const value = that[i++];
      return {
        value, done,
      };
    },
  };
};
const arr1 = ['jk', 'jm', 'zzj'];
const arr1Iterator = arr1.myvalues();
console.log(arr1Iterator.next());// { value: 'jk', done: false }
console.log(arr1Iterator.next());// { value: 'jm', done: false }
console.log(arr1Iterator.next());// { value: 'zzj', done: false }
console.log(arr1Iterator.next());// { value: undefined, done: true }

// yield实例 https://www.jianshu.com/p/7635227a46bd
const go = function* (x) {
  console.log('1', x);// 1 10
  const a = yield x;// a=100  next()执行后,只执行了yield表达式,并暂停,没有执行赋值操作
  console.log('3', x);// 3 10

  console.log('4', a);// 4 100

  const b = yield (x + 1) + a;// yield如果没有(),后面的算式全是表达式,因此这里的()其实是多余的

  return a + b;
};
// const g = go(10);
// console.log(g.next());// {value:10,done:false}
// console.log(g.next(100));// {value:111,done:false}
// console.log(g.next(1000));// {value:1100,done:true}

// yield函数 执行异步ajax请求
function get(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}

function ajax(url) {
  // eslint-disable-next-line no-use-before-define
  get(url).then((res) => ajaxGen.next(res));
  return 'next1';
}

function* steps() {
  const res1 = yield ajax('1');
  console.log(res1);
  const res2 = yield ajax(`${res1}2`);
  console.log(res2);
  const res3 = yield ajax(`${res2}3`);
  console.log(res3);
  return res3;
}
const ajaxGen = steps();
console.log(ajaxGen.next());// {value:'next1',done:false}

// 上面写法有问题,一般这样写
function* steps1(url) {
  const res1 = yield get(url);
  const res2 = yield get(res1);
  const res3 = yield get(res2);
  return res3;
}

const getGen = steps1('1');
getGen.next().value
  .then((res) => getGen.next(`${res}2`).value)
  .then((res) => getGen.next(`${res}3`).value)
  .then((res) => console.log(res));// 输出123

// Proxy代理自定义属性的操作 重写对象默认的方法
const Person = { name: 'jk', age: 25 };
const personProxy = new Proxy(Person, {
  get(target, key) {
    return target[key].toUpperCase();
  },
  set(target, key, value) {
    if (typeof value === 'string') {
      // eslint-disable-next-line no-param-reassign
      target[key] = value.trim();
    }
  },
});
personProxy.name = ' hahah ';
console.log(personProxy.name);

// Proxy代理电话号码的格式

const phoneNumberHandler = {
  set(target, key, value) {
    // eslint-disable-next-line no-param-reassign
    target[key] = value.match(/\d/g).join('');// 找出所有数字
  },
  get(target, key) {
    return target[key].replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');// 格式化为我们想要的格式
  },
};
const phoneNumber = new Proxy({}, phoneNumberHandler);
phoneNumber.home = '13124532265';
phoneNumber.work = '131 245322 66';
console.log(phoneNumber);
console.log(phoneNumber.home, phoneNumber.work);
