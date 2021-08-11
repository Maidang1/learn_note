## git基础

工作区 暂存区 git目录

工作区修改文件

将你想要下次提交的更改选择性地暂存，这样只会将更改的部分添加到暂存区

提交更新，找到暂存区的文件，将快照永久性存储到 Git 目录



Working Directory					Staging Area								.git (Rrpository)

Stage Fixes ---------------------------> 暂存 ------------------commit -----------> 永久存储



​		<-------------------- Checkout the project --------------------------------------------



### 基础配置

```bash
git config --global user.name "XXXXXX"
git config --global user.email "XXXXXXXXX"
```

### 跟踪一个文件

```bash
git add XXXX
```

### 跳过使用暂存区域

```bash
git commit -a -m 'feat:XXX' # Git 就会自动把所有已经跟踪过的文件暂存起来一并提交
```

### 移除文件

```bash
git rm XXXX
git mv file_form file_to
```

### 撤销操作

```bash
git commit --amend
// 如果本次commit之后 有忘记add的 可以运行之后 合并二者的commit
```

### 取消暂存

```bash
git reset HEAD XXXX
```

### 撤消对文件的修改

```bash
git checkout -- <files>
```

### 查看远程仓库

```ba
git remote -v
```

### 添加远程仓库

```bash
git remote add <shortname> <url>
git remote rename XX XX
git remote remove XXX
```

### tag

```bash
git tag -l "v1*" # 列出标签
git tag -a v1.4 -m 'xxx' 打标签
git show v.14 # 列出信息
git tag v1.4 # 轻量标签
git tag -a v1.2 9fceb02 # 打历史标签
# 默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上
git push origin v1.5
git tag -d v1.4-lw #删除标签
git push origin --delete <tagname> # 删除远程标签
```

### git别名

```bash
git config --global alias.co checkout 
git config --blobal alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

### 分支

```bash
# git 保留的是一系列的快照

# 98ca9							92ec2
# commit size -----------------> tree size ------------->  blob(快照文件)
# tree 92ec2						blob.....
# author
# committer
 

git checkout XXXX # 切换分支 HEAD 分支随着提交操作自动向前移动 
git branch iss53 # 新建分支
git checkout -b # 新建 + 切换
git merge iss53 # 合并分支
git branch -d iss53 # 删除分支
git branch -v # 查看分支

```



