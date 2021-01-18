## Promises/A+

```javascript
const PENDING = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFullfillCallbacks = [];
    this.onRejectCallbacks = [];

    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
    // Class methods are hung on the prototype and cannot be shared, so they cannot be defined outside

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULLFILLED;
        this.value = value;
        // subscribe
        this.onFullfillCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // Publish
        this.onRejectCallbacks.forEach((fn) => fn());
      }
    };
    // x simple value or a promsie
    const then = (onFullfilled, onRejected) => {
      // The parameter is optional in order to implement the penetration of then()

      //
      onFullfilled =
        typeof onFullfilled === 'function' ? onFullfilled : (value) => value;
      onRejected =
        typeof onRejected === 'function'
          ? onRejected
          : (reson) => {
              throw reason;
            };
      let promise2 = new MyPromise((resolve, reject) => {
        if (this.status === FULLFILLED) {
          // Use macro tasks to delay execution it can get the value fo promise it is wonderful
          setTimeout(() => {
            try {
              let x = onFullfilled(this.value);
              // x is possibel a promise so it should be called recursionly
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        }
        if (this.status === REJECTED) {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        }
        if (this.status === PENDING) {
          // 发布
          this.onFullfillCallbacks.push(() => {
            let x = onFullfilled(this.value);
          });
          this.onRejectCallbacks.push(() => {
            let x = onRejected(this.reason);
          });
        }
      });

      return promise2;
    };
  }
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
//every a then() will return a new promise

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle .....'));
  }
  let called = false;
  // only run one time, the others will be ignored
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        //promise
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // it is possible return a primise
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```
