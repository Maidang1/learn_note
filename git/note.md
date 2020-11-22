#  git学习笔记



## git

+ 分布式
+ 版本控制
+ 软件



## 版本控制

```bash
git int # 初始化
git status # 检查文件状态
git add <filename> # 添加需要被git管理的文件
git commit -m 'description' # 提交了信息到存储库
git log # 日志信息
# 注：需要配置个人的信息 
	# git config --global user.email "your@email"
	# git config --global user.name "yourname"
```



## 三个区域

| 工作区 |  暂存区  | 版本控制区 |
| :----: | :------: | :--------: |
|        | 缓冲作用 |            |

![image-20201011210924200](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201011210924200.png)



## 回滚

+ 向前回滚

```bash
git log
get reset --hard <版本号> # commit的那个hash值
```

+ 向后回滚

```bash
git reflog
get reset --hard <版本号> 
```



![image-20201011212946271](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201011212946271.png)





## 分支

主分支名称 （master）

```bash
git branch # 主分支 master
git branch bug # 创建新的分支
git checkout bug
git checkout master # 切换分支
git merge bug # 合并分支
git branch -d bug # 删除分支
```



![image-20201011220057152](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201011220057152.png)



```bash
git remote add <name> <address>
git push -u <name> <分支名>
```

```bash
git clone <address>
git checkout <分支名>
git pull <name> <分支名>
```



## rebase

整合提交记录



## beyond compare(快速解决合并冲突)





## 团队协作



```bash
git tag -a v2 -m 'description'
git push origin --tags
```



