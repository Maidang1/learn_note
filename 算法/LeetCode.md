# LeetCode

## 4-寻找两个正序数组的中位数

+ 描述

>给定两个大小为 m 和 n 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的中位数。时间复杂度O(log (m+n))

+ 解答(每次去掉可以舍弃的数， 直到一个数组为空或者K值变为`1`就可以了)

```javascript
function findMedianSortedArrays(nums1, nums2){
  var length1 = nums1.length, length2 = nums2.length;
  var totalLength = length1 + length2;
  if (totalLength % 2 == 1) {
    var midIndex = Math.floor(totalLength / 2);
    var median = getKthElement(nums1, nums2, midIndex + 1);
    return median;
  } else {
    var midIndex1 = Math.floor(totalLength / 2 - 1), midIndex2 = Math.floor(totalLength / 2);
    var median = (getKthElement(nums1, nums2, midIndex1 + 1) + getKthElement(nums1, nums2, midIndex2 + 1)) / 2.0;
    return median;
  }
}

function getKthElement(nums1, nums2, k) {
  var length1 = nums1.length, length2 = nums2.length;
  var index1 = 0, index2 = 0;
  var kthElement = 0;

  while (true) {
    // 边界情况
    if (index1 === length1) {
      return nums2[index2 + k - 1];
    }
    if (index2 === length2) {
      return nums1[index1 + k - 1];
    }
    if (k === 1) {
      return Math.min(nums1[index1], nums2[index2]);
    }

    // 正常情况
    var half = Math.floor(k / 2);
    var newIndex1 = Math.min(index1 + half, length1) - 1;
    var newIndex2 = Math.min(index2 + half, length2) - 1;
    var pivot1 = nums1[newIndex1], pivot2 = nums2[newIndex2];
    if (pivot1 <= pivot2) {
      k -= (newIndex1 - index1 + 1);
      index1 = newIndex1 + 1;
    } else {
      k -= (newIndex2 - index2 + 1);
      index2 = newIndex2 + 1;
    }
  }
}
```



## 5. 最长回文子串

+ 描述

  > 给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000

+ 解答(简单的动态规划)

```javascript

/*
	s[i+1][j-1] && s[i] === s[j] ===> s[i][j]
*/

var longestPalindrome = function (s) {
  var n = s.length;
  var dp = new Array(n).fill(false);
  var ans = ''
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(false);
  }

  for (let len = 0; len < n; len++) {
    for (let i = 0; i + len < n; i++) {
      let j = i + len;
      if (len === 0) {
        dp[i][j] = true;
      }
      else if (len === 1) {
        dp[i][j] = (s.charAt(i) === s.charAt(j));
      }
      else {
        dp[i][j] = (dp[i + 1][j - 1] && s[i] === s[j]);
      }

      if (dp[i][j] && ans.length < (len + 1)) {
        ans = s.substring(i, i + len + 1)
      }
    }
  }
  return ans;

};

```

