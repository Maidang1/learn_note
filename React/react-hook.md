## useState

### 每次渲染都是一个独立的闭包

- 每次渲染都会有自己的 props 和 state
- 每次渲染后会有自己的时间处理函数

```javascript
function Counter() {
  let [num, setNum] = useState(0);
  function alertNum() {
    setTimeout(() => {
      alert(num);
    }, 3000);
  }
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => setNum}></button>
      <button onClick={alertNum}>alert</button>
    </div>
  );
}
```

```javascript
function Counter() {
  let [num, setNum] = useState(0);
  function lazy(){
    setTimeout((
      // 有差别
 -     setNum(num + 1);
 -     setNum(num => num + 1);
    )=>{}, 3000)
  }
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => setNum}></button>
      <button onClick={lazy}>lazy</button>
    </div>
  );
}
```

惰性初始化

```javascript
function Counter(props) {
  let [counter, setCounter] = useState(function () {
    return { num: props.num };
  });
  return (
    <div>
      <p>{counter.num}</p>
      <button onClick={() => setCounter}></button>
    </div>
  );
}
```

## efect

每次我们重新渲染 都会生成新的 effect 替换之前的 effect 属于渲染结果的一部分 effect 属于特定的渲染
