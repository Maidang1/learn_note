# DOM

## 我们可以使用导航（navigation）属性访问其直接的邻居

所有的节点

![image-20201127231233764](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201127231233764.png)

html = **document.documentElement**

body= **document.body**

head= **document.head**

### ele.childNodes 不是一个数组， 是一个集合 一个类数组

+ 可以用for ... of遍历
+ Array.from()  生成真的数组



只考虑元素节点



![image-20201127231807972](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201127231807972.png)



## getElementsBy*  && querySelectorAll

+ `querySelectorAll` 返回的是一个 **静态的** 集合。就像元素的固定数组
+ `"getElementsBy*"` 方法都会返回一个 **实时的（live）** 集合。这样的集合始终反映的是文档的当前状态，并且在文档发生更改时会“自动更新

![image-20201127232924425](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201127232924425.png)

+ `elem.matches(css)` 用于检查 `elem` 与给定的 CSS 选择器是否匹配

+ `elem.closest(css)` 用于查找与给定 CSS 选择器相匹配的最近的祖先。`elem` 本身也会被检查。
+ 如果 `elemB` 在 `elemA` 内（`elemA` 的后代）或者 `elemA==elemB`，`elemA.contains(elemB)` 将返回 true。

## 节点属性：type，tag 和 content

![image-20201127233252895](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201127233252895.png)