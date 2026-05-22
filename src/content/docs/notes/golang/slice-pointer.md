---
title: 'Go — 陣列指標與指標陣列'
description: 'Go 語言中 * 與陣列、型別的結合方式，區分陣列指標和指標陣列'
date: 2023-07-12
lastUpdated: 2023-07-12
sidebar:
  order: 1
---

# [Basic] 陣列指標與指標陣列

注意`*`與誰結合。

如p *[5]string，`*`與陣列結合說明是陣列層級的指標。

```go
a:=[...]string{"1","2","3","4","5"}
var p *[5]string = &a
```

如p [5]*string，`*`與string結合，說明這個陣列都是string型別的指標，是指標陣列。

```go
var p2 [5]*string
i,j:= "6","7"
p2[0] = &i
p2[1] = &j
...
```
