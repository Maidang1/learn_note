## Bubble Sort

```javascript
function bubbleSort(arr) {
  if(!Arrray.isArray(arr) || arr.length === 1) return arr;
  let lastIndex = arr.length;
  
  for(let i=0; i< arr.length;i++) {
    let flag = true;
    for(let j=0; j< arr.length - 1 - i;j++) {
      if(arr[j] > arr[j+1]) {
        flag = false;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
    if(flag === true) {
      break; // 优化排序
    }
  }
  return arr;
}
```

> 最好时间复杂度O(n) 最坏时间复杂度O(n^2) 空间复杂度 O(1)



## Select Sort

```javascript
function SelectSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for(let j = i+1; j < arr.length; j++) {
      if(arr[j] < arr[i]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]]  = [arr[minIndex], arr[i]]
  }
  return arr;
}

```

> 最好最坏都是O(n^2) 空间复杂度O(1)



## Insert Sort

```javascript
function insertSort(arr) {
  let len = arr.length;
  if (!Array.isArray(arr) || len <= 1) return arr;
  for (let i = 0; i < len; i++) {
    let temp = arr[i];
    let j = i;
    while (j - 1 >= 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
```

> 最坏时间复杂度O(n^2)  做最好时间复杂度O(n) 空间复杂度 O(1)



## Hill Sort

> 将整个序列程不同的子序列 进行直接插入排序 当增量为`1`的时候，意味着最后一次的排序已经完成了，排序就结束了

```javascript
function hillSort(arr) {
  let len = arr.length;
  if (!Array.isArray(arr) || len <= 1) return arr;
  for (let gap = parseInt(len >> 1); gap >= 1; gap = parseInt(gap >> 1)) {
    for (let i = gap; i < len; i++) {
      let j = i;
      let temp = arr[i];
      while (j - gap >= 0 && arr[j - gap] > arr[j]) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}
```

> 平均时间复杂度O(nlogn) 最坏O(n^2) 空间复杂度 O(1) 



## Merge Sort

```javascript
function mergeSort(arr) {
  let len = arr.length;
  if(!Array.isArray(arr) || len === 0) return;
  if(len === 1) return arr;
  let mid = parseInt(len >> 1),
      leftArr = arr.slice(0, mid),
      rightArr = arr.slice(mid, len);
  return merge(leftArr, rightArr);
}

function merge(leftArr, rightArr) {
  let result = [],
      leftLen = leftArr.length,
      rightLen = rightArr.length,
      il = 0,
      ir = 0;
  
  while(i1 < leftLen && ir < rightLen) {
    if(leftArr[il] < rightLen[ir]) {
      result.push(leftArr[il++])
    } else {
      result.push(rightLen[ir++])
    }
  }
  while(il < leftLen) {
    result.push(leftArr[il++])
  }
  while(ir < rightLen) {
    result.push(rightArr[ir++])
  }
  return result
}
```

> 平均和最快时间复杂度为O(nlogn) 空间 O(1)



+ 快排
+ 堆排序
+ 基数排序

> 每个语言内部的排序是不一样的 JS在length > 10的时候是快排 否则为插入排序

