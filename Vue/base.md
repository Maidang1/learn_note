**常用 API**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="container">{{name}}</div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
      let vm = new Vue({
        el: '#container',
        data() {
          return { name: 'zhufeng' };
        },
      });
      // vm.$el 真实的DOM

      // Vue 不会再本轮执行的时候更新视图  是在下一个时间还礼执行的代码
      // promise.then mutationobserver

      // 等待数据更新之后 下一个事件环更新
      // vm.$watch('name', function(){})

      vm.name = 'jw';
      // 数据更新有一个队列 将watch的callback 放到队列中
      // nextTick的回调往后叠加
      vm.$nextTick(() => {});

      /*
        vm.$data
        vm.$options;
        vm.$set Object.defineProperty
        vm.$delete
      */
    </script>
  </body>
</html>
```

**指令**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">{{ name }} {{ 1+1 }} {{ [1,2,3] }} {{ {name: '123'} }}</div>

    <!-- Vue 会默认采用复用的机制 会复用代码 -->
    <template v-if="isSHow">
      <span></span>
      <input type="text" key="1" />
    </template>
    <template v-else>
      <span></span>
      <input type="text" key="2" />
    </template>

    <input type="text" @input="fn($event)" />
  </body>

  <script>
    /*
    指令就是为了来操作DOM封装的
    v-once 只会渲染一次
    v-if 操作DOM是否显示
    v-show 操作DOM是否隐藏 template 不能和v-show连用
    v-bind 动态绑定 简写 :id="name"
    v-html innerHTML 一般是后端返回的数据
    v-for 循环数据 数组 对象
    v-key
    v-model 双向数据绑定
    */
  </script>

  <script>
    /*
    v-key的作用
    区分元素
    使用唯一的key

    <template v-for="(fruit, index) in arr">
      <li :key="`name_${index}`">{{ fruit.name }}<li>
      <li :key="`color_${index}`">{{ fruit.color }}<li>
    </template>
    */
  </script>
</html>
```

**自定义指令**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- Vue 双向数据绑定 用户可以改变视图 表单 input select radio checkbox  -->
  </body>

  <script src="./node_modules/vue/dist/vue.js"></script>
  <script>
    // 修饰符
    v - model.trim;
    v - model.number;
  </script>

  <script>
    // 自定义指令
    // 全局指令
    // el表示指令的元素
    // bindings表示绑定的属性
    // vnode .context 上下文属性 可以找到this
    Vue.directive('focus', {
      inserted(el, bindings, vnode) {
        // 指令元素插入到页面的时候执行
        if (bindings.modifiers.color) {
          el.style.background = bindings.value;
        }
      },
      bind(el, bindings, vnode) {
        // 方法默认在绑定的时候执行和更新的时候执行（只有指令依赖的数据改变）
      },
      update(el, bindings, vnode) {
        // 方法默认在绑定的时候执行和更新的时候执行（只有指令依赖的数据改变）
      },
    });

    // 实例指令
    let vm = new Vue({
      el: '#app',
      directives: {
        clickOutside: {
          bind(el, bindings, vnode) {
            el.fn = (e) => {
              if (el.contains(e.target)) {
                vnode.context['focus']();
              } else {
                vnode.context['blur']();
              }
            };
            document.addEventListener('click', el.fn);
          },
          unbind(el) {
            // 事件绑定 必须解绑
            document.removeEventListener('click', el.fn);
          },
        },
      },
    });
  </script>
</html>
```

**computed and watch**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script src="./node_modules/vue/dist/vue.js"></script>
  <script>
    // computed 根据其他的值来计算
    // watch 监控某个值的变化

    let vm = new Vue({
      el: '#app',
      data: {
        return() {
          name: zf;
        },
      },
      watch: {
        name: {
          handler(newValue) {
            console.log(newVaue);
          },
          immediate: true, // 立即执行
          deep: true,
          lazy: true,
        },
      },
      computed: {
        checkAll: {
          get() {},
          set() {},
        },
      },
    });
    // computer 可以缓存
    let ditry = true;
    function initComputed(key, handler) {
      let value;
      Object.defineProperty(vm, key, {
        get() {
          if (ditry) {
            value = handler();
            ditry = false;
          }
          return value;
        },
      });
    }
  </script>
</html>
```

**Vue 动画**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
      // vue中的动画 v-if v-show v-for 路由切换
    </script>

    <script>
      /*
        Enter

      opacity: 0  -----------------------> opacity:1
      v-enter -----    v-enter-active -----v-enter-to

      leave
       opacity: 1  -----------------------> opacity:0
      v-leave -----    v-leave-active -----v-leave-to
      */

      /*
        before-enter
        before-leave
        enter
        leave
        after-enter
        after-leave

        enter(el,done) {

        }
      */
    </script>
  </body>
</html>
```

**生命周期**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
      let vm = new Vue({
        beforeCreate() {
          // 拿不到数据
        },
        created() {
          // 组件实例实现了数据劫持， 方法 计算属性挂到了实例上面 不能获取真实DOM元素
        },
        render() {},
        // 判断el 或者 vm.$mount() 看看挂载 template
        beforeMount() {
          // 调用之前 会调用render方法
        },
        Mounted() {
          // 挂载完毕
        },
        // Vue的更新是组件级别的
        // 组件化的好处 复用 维护 减少不必要的渲染

        beforeUpdate() {},
        updated() {},
        beforeDestory() {},
        destory() {},
      });
    </script>
  </body>
</html>
```

## 组件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
      let vm = new Vue({
        el: '#app',
      });
      // 全局组件
      // 局部组件
      // 组件特点 每个组件都是不相关 独立的 单向数据流
      Vue.component('my', {
        template: `<div>my组件</div>`,
        // html不支持自定义闭合标签
        // 不要和原生组件一样
        // html标签没有大写
      });

      let component = {
        // props: ['my'], // this,my
        props: {
          my: {
            type: Number,
            required: true,
            default: 100, // 对象写函数返回形式
          },
        },
        template: `<div>{{my}}</div>`,
      };

      // 组件使用： 导入 注册 使用
    </script>
  </body>
</html>
```

## 组件通信

**main.js**

```javascript
import Vue from 'vue';
import App from './App.vue';

/**
 * 组件通信
 * props emit
 * $parent $children
 * $attrs $listeners
 * provide inject 和 context(比较混乱 不会再业务代码中使用)
 * ref 获取DOM实例上的数据和方法
 * eventbus 混乱 触发的时机
 */

// 派发事件
Vue.prototype.$dispatch = function (eventName, value) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, value);
    parent = parent.$parent;
  }
};

Vue.prototype.$broadcast = function (eventName) {
  let children = this.$children;
  function borad(children) {
    children.forEach((child) => {
      child.$emit(eventName, value);
      if (child.$children) {
        borad(child.$children);
      }
    });
  }
  borad(children);
};

// 时间总线
Vue.prototype.$bus = new Vue();
// Vue.prototype.$bus = function () {
//   return new Vue();
// };
// mian.js 入口文件
// App.vue 根组件
new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

**parent.vue**

```javascript
<template>
  <div>
    <span>parent</span>
    <!-- son1.$on('change', change)  -->
    son1:<son1 :mny="money" @change="change"></son1><br />
    <son2
      :count="count"
      @update:count="(newValue) => (count = newValue)"
    ></son2>
    <!-- // 写法固定 -->
    <son2 :count.sync="count"></son2>

    <son2 :value="count" @input="(newValue) => (count = newValue)"></son2>
    <son2 v-model="count"></son2>
    <!-- native就是给组件的最外层元素绑定事件 -->
    <son-2 @click.native="show"></son-2>
  </div>
</template>

<script>
import son1 from './son1.vue';
import son2 from './son2';
import Son2 from './son2.vue';
export default {
  components: {
    son1,
    son2,
    Son2,
  },
  methods: {
    change(newValue) {
      this.money = newValue;
    },
  },
  data() {
    return { money: 100, count: 1 };
  },
};
</script>
```

**App.vue**

```javascript
<template>
  <div>
    <Parent></Parent>
    <!-- <button @click="broadcast">触发所有的eat方法</button> -->
  </div>
</template>

<script>
import Parent from './parent.vue';
export default {
  components: {
    Parent,
  },
  methods: {
    broadcast() {
      this.$broadcast('eat');
    },
  },
};
</script>

<style></style>
```

**son1.vue**

```javascript
<template>
  <div>
    <div>{{ mny }}</div>
    <!--
        <button @click="changeMoney">修改金额</button> 绑定了.bind($event)
        <button @click="changeMoney()">修改金额</button> 没有参数
     -->
    <button @click="changeMoney">修改金额</button>
    <div>{{ newMoney }}</div>
    <button @click="changeLocalMoney">修改金额1</button>
    <Grandson :mny="mny"></Grandson>
  </div>
</template>

<script>
import Grandson from './grandson';

export default {
  components: { Grandson },
  data() {
    return { newMoney: this.mny };
  },
  props: {
    mny: {
      type: Number,
    },
  },
  methods: {
    changeMoney() {
      this.$emit('change', 200);
    },
    changeLocalMoney() {
      this.newMoney = 3000;
    },
  },
};
</script>

<style></style>
```

**son2.vue**

```javascript
<template>
  <div>
    <div>son2: count: {{ count }}</div>
    <button @click="changeCount">改变index</button>
    <!-- 所有的属性集合 -->
    {{ $attrs }}
    <!-- 将属性全部向下传递 -->
    <Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
  </div>
</template>

<script>
import Grandson from './grandson';
export default {
  props: {
    value: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  components: {
    Grandson,
  },
  methods: {
    changeCount() {
      this.$emit('update:count', 3000);
      this.$emit('input', 300);
    },
  },
};
</script>

<style></style>
```



**递归组件**

> 需要给当前需要递归的组件， 提供一个name属性， 并且可以再当前组件内部调用自己

