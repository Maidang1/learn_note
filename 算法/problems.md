# leetCode 学习笔记

## 01 两数之和

+ JavaScript版

```javascript
var twoSum = function(nums, target) {
  var res = new Map();
  for(let i=0; i< nums.length;i++) {
    if(res.has(target - nums[i])) {
      return [i, res[target-nums[i]]]
    }
    else {
      res.set(nums[i], i)
    }
  }
  return []
}
```

+ c++版

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
      unordered_map<int,int> map;
      for (int i = 0; i < nums.size(); ++i) {
            auto it = map.find(target - nums[i]);
            if (it != map.end()) {
                return {it->second, i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};
```

> **知识补充 **  ： unordered_map 是一种容器 就是内部没有自动排序的map 对容器的操作需要同迭代器来实现  因为本题不需要对容器进行排序 所以用 unordered_map 比较合适
>
> 里面的it是一个迭代器 it-> first 指向的是 "key" it->second 指向的是 “value”
>
> map.find() 返回一个迭代器对象 如果没找到 结果等于 "end()"

## 02两数相加

+ c++版

```c++
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
      ListNode * res = new ListNode(0);
      ListNode * result = res;
      bool isOverflow = false; // 用来判断进位

      while(l1!= NULL || l2!= NULL) {
        int sum = (l1? l1->val:0) + (l2? l2->val : 0) + (isOverflow? 1:0);
        ListNode* tem = new ListNode(sum % 10);
        isOverflow = (sum / 10) > 0;
        res->next = tem;
        res = res->next;
        l1 = l1? l1->next : NULL;
        l2 = l2? l2->next : NULL; 
      }

      if(isOverflow) {
        res->next = new ListNode(1);
      }

      return result->next;
    }
};
```



## 03 无重复字符最长子串

+ c++

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
      int rk= -1, ans= 0;
      unordered_set<char> occ;
      int n = s.size();
      for(int i=0;i<n;i++) {
        if(i!=0) {
          occ.erase(s[i-1]);
        }
        while(rk+1 <n && !occ.count(s[rk +1])) {
          occ.insert(s[rk+1]);
          rk ++;
        }
        ans = max(ans, rk -i + 1);
      }
      retun ans;

    }
};
```

注： 滑动窗口

