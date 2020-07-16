#### 题目：

在未排序的数组中找到第`k`个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素

```javascript
输入: [4,5,1,6,2,7,3,8] 和 k = 4
输出: 5
```

###### 解法

- （一）全局排序，取第 k 个数

```javascript
let findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a).slice(0, k);
  return nums[k - 1];
};
```

- （二）局部排序，冒泡

可以使用冒泡排序，每次将最大的数在最右边冒泡出来，只冒泡 k 次即可

```javascript
let findKthLargest = function (nums, k) {
  bubbleSort(nums, k);
  return nums[nums.length - k];

  let bubbleSort = function (arr, k) {
    for (let i = 0; i < k; i++) {
      let flag = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          flag = true;
        }
      }
      if (!flag) break;
    }
  };
};
```

- （三）构造前 k 个最大元素小顶堆，取堆顶

```javascript
```

- （四） 优化，快速选择算法

```javascript
let findKthLargest = function (nums, k) {
  return quickSelect(nums, nums.length - k);
};
let quickSelect = (arr, k) => {
  return quick(arr, 0, arr.length - 1, k);
};

let quick = (arr, left, right, k) => {
  let index;
  if (left < right) {
    index = partition(arr, left, right);
    if (k === index) {
      return arr[index];
    } else if (k < index) {
      return quick(arr, left, index - 1, k);
    } else {
      return quick(arr, index + 1, right, k);
    }
  }
  return arr[left];
};
let partition = (arr, left, right) => {
  // 取中间项为基准
  var datum = arr[Math.floor(Math.random() * (right - left + 1)) + left],
    i = left,
    j = right;
  // 开始调整
  while (i < j) {
    // 左指针右移
    while (arr[i] < datum) {
      i++;
    }

    // 右指针左移
    while (arr[j] > datum) {
      j--;
    }

    // 交换
    if (i < j) swap(arr, i, j);

    // 当数组中存在重复数据时，即都为datum，但位置不同
    // 继续递增i，防止死循环
    if (arr[i] === arr[j] && i !== j) {
      i++;
    }
  }
  return i;
};

// 交换
let swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
```
