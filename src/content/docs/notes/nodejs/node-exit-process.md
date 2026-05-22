---
title: 'Node.js 程序退出方式'
description: 'Node.js process.exit()、exitCode、SIGTERM 等優雅退出方式'
date: 2023-07-12
lastUpdated: 2023-07-12
sidebar:
  order: 1
---

# [Node] 如何正確的從Nodejs程序退出

一般來說我們如果將程式運行在console上，只要用`ctrl + c` 之類的強制中斷方式就能讓程式中止，但如果我們想要在程式運行到一半時，偵測到某些例外狀況就離開程式，可以怎麼做呢？

nodejs核心模組提供了`process.exit()`的方法可以讓程式強制中止，但使用了這個功能之後，我們尚未完成的callback、尚未回應的request、甚至尚未寫到`stderr、stdout` 過程，都會被強制中斷，這樣並非是一個完美的退出方式，因此我們會介紹在nodejs環境下怎麼優雅的退出程式。

先來談談`process.exit(number)`這個方法，其實參數是可以帶入一個整數值的，預設為0，代表正常的退出程式，常見的Exit Code代表意義如下：

- `1` **Uncaught Fatal Exception**：代表未被捕捉到的例外，並且未被`domain`或`uncaughtExceptio event handler` 處理到的例外狀況。
- `2` ： 未被使用， Bash為了防止內部濫用而保留。
- `3` **Internal JavaScript Parse Error** ： Nodejs內部的Javascript語法解析錯誤，只有在開發Nodejs本身的時候出現。
- `4` **Internal JavaScript Evaluation Failure** ：Nodejs內部的返回函數值失敗，只有在開發Nodejs本身的時候出現。
- `5` **Fatal Error** ：在V8引擎的錯誤，一般來說會以`FATALERROR`輸出到`stderr`。
- `6` **Non-function Internal Exception Handler**：發生一個內部異常，但異常處理函數被設置成非函數或者不能被調用。
- `7` **Internal Exception Handler Run-Time Failure**：不能捕捉的異常，在處理這個異常的時候，函數本身拋出一個錯誤，例如：`uncaughtException`。
- `9` **Invalid Argument**：未填上必要的參數。
- `10` **Internal JavaScript Run-Time Failure**： 一般來說只有在開發Nodejs本身會出現，這是在運行Nodejs內部Javascript所拋出的錯誤。
- `12` **Invalid Debug Argument**：  --inspect選項已經配置，但選擇的port無效或不可用。
- `13` **Unfinished Top-Level Awa**i。
- `>128` **Signal Exits**：如果Nodejs收到`SIGKILL`、`SIGHUP`，那麼退出代碼就會是128加上訊號的value值，例如`SIGKILL`的value為9，那麼錯誤碼就會是`128+9 = 137` ，請參考這裡： [https://man7.org/linux/man-pages/man7/signal.7.html](https://man7.org/linux/man-pages/man7/signal.7.html)

我們也可以設定`process.exitCode`的屬性值：

```jsx
process.exitCode = 1
```

這種方式不會讓我們直接離開，而是當程式執行完畢在離開時指定返回的離開代碼。

但很多時候，我們會啟動一個http server常駐於背景，監聽http request並處理回應，如下：

```jsx
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.listen(3000, () => console.log('Server ready'))
```

我們可以看到上述的程式並不會執行完成就離開程式，假設我們使用了process.exit()時，任何當前待處理或正在處理的請求都將被強制中斷，這並非是一個好方法。

在這種情況之下，我們需要發送一個中斷的訊號，而且要掛一個handler來處理這個訊號：

```jsx
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hi!')
})

const server = app.listen(3000, () => console.log('Server ready'))

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
```

- `SIGKILL`： 代表程式強制中止的訊號，就如直接呼叫`process.exit()`。
- `SIGTERM`： 這個訊號代表訊號較安全的中止方式，會由`upstart` 或 `supervisord` ...等遠程管理者發出。

我們可以從程式內部發送此訊號：

```jsx
process.kill(process.pid, 'SIGTERM')
```
