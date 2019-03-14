### new操作符的原理

#### new操作符的实现原理就4条
1. 新建一个对象O,将O的``__proto__``属性指向构造函数的原型属性``prototype``
2. 绑定构造函数的执行上下文到O上，并执行构造函数得到返回值S
3. 如果S是一个对象，new 操作符返回的就是这个S对象
4. 如果S不是一个对象，new 操作符返回的就是O
  
下面我们来构造一个new操作符，并演示一下new操作符

```
  function myNew(func){
    let O = Object.create(func.prototype);
    let S = func.call(O);
    return  typeof S === 'object' ? S : O;
  }
  function Person(){
    this.name = 'xx'
  }
  let o1 = new Person;
  let o2 = myNew(Person);
  console.log(o1);
  console.log(o2);
  //Person {name: "xx"}
  //Person {name: "xx"}
  o1.__proto__ === o2.__proto__;//true
  o2.__proto__ === Person.prototype;//true

```
可以看到o1和o2的属性是一样的

下面我们再看看构造函数返回一个对象是什么情况
```
  function Person2(){
    this.name = 'yy';
    return {
      test:'ttt'
    }
  }

  let o3 = new Person2();
  let o4 = myNew(Person2);
  console.log(o3);
  console.log(o4);
  //{test: "ttt"}
  //{test: "ttt"}
  o3.__proto__ === o4.__proto__;//true
  o3.__proto__ === Person2.prototype;//false
  o3.__proto__ === Object.prototype;//true
```

可以看到o3和o4都是构造函数返回的那个对象，与我们前面的描述是一致的。

关于new操作符相关的知识点，我理解的差不多就这么多了, 欢迎大家在评论区补充。
