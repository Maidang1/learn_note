# mongodb(JSON模型)

## 基本操作

+ 插入

```bash
db.fruit.insertOne({name: 'apple'})
db.fruit.insertMany({name:'apple'}, {name: 'pear'})
```

+ 查询

```bash
db.movies.find({"year": 2000})
db.movies.find({"year":1989, "title":"Batman"})
db.movies.find({$and: [{"title":"batman"}, {"category":"action"}]})
db.movies.find({$or: [{"title":"batman"}, {"category":"action"}]})
db.movies.find({"year": /^B/})
```



> 比较操作
>
> a = 1 {a:1}
>
> a <> 1 {a: {$ne: 1}}
>
> a > 1 {a: {$gt: 1}}
>
> a >= 1 {a: {$gte: 1}}
>
> a < 1 {a : {$lt : 1}}
>
> a <= 1 {a: {$lte: 1 }}
>
> a = 1 AND b = 1 {a : 1, b: 1} or {$and, [{a:1}, {b:1}]}
>
> a is NULL {a: {$exists: false}}
>
> a IN (1,2,3) {a: {$in:[1,2,3]}}  // $nin



```bash
db.getCollection('movies').find({
	"fileming_locations"； {
		$elemMatch: {"city": "Rome", "Country":"USA"}
	}
})
```



```bash
db.fruit.remove({a:1})
db.fruit.remove({})
db.fruit.remove({a:{$lt: 5}})
db,fruit.remove() # error
```



```bash
db.fruit.updateOne({name: "apple"}, {$set: {from :"china"}})
```



> $push: 增加一个对象到数组底部
>
> $pushAll
>
> $pop
>
> $pull
>
> $pullAll
>
> $addToSet



```bash
db.fruit.drop() # 删除表
```





## 聚合操作

> 聚合管道 一个流程
>
> $match where
>
> $project AS
>
> $sort ORDER BY
>
> $group GROUP BY
>
> $skip/$limit skip/limit
>
> $lookup left outer join



```bash
select firstnaem as '名'，lastnae as '姓' form users where gender = '男' skip 100 limit 20
db.users.aggregate([$match:{gender :'男'}])
```

