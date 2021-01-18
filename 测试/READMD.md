## Automatic FrontEnd Testing

### part 1: Testing principle

```javascript
function expect(result) {
  return {
    toBe: function(actual){
      if(result !== actual) {
        throw new Error(`Expectations and results do not match, expected-${actual}, result-${result} `)
      }
    }
  }
}

function test(desc, fn) {
  try {
    fn();
    console.log(`${desc} pass the test`)
  } catch(e) {
     console.log(`${desc} not pass the test, ${e}`)
  }
}


test("test add 3 + 7", ()=>{
  expect(add(3, 7)).toBe(10)
})


function add(a, b) {
  return a + b;
}
```

