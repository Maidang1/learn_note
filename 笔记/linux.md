## 变量知识

> ${xx # xx} 开头 最短 删除
>
> ${xx ## xx } 开头 最长 删除
>
> ${xx % xx} 尾部 最短 删除
>
> ${xx %% xx } 尾部 最长 删除
>
> ${xx / xx /  x} 第一个旧字符串替换
>
> ${xx // xx /  x} 全部旧字符串替换

###### 例1

```bash
var="i love you Do you love me"
echo ${var#*ov}
# e you Do you love me
echo ${var##*ov}
# e me
echo ${var%ov*}
# i love you Do you l
echo ${var%%ov*}
# i l

echo ${var/l/L}
# i Love you Do you love me
echo ${var//l/L}
# i Love you Do you Love me
```

