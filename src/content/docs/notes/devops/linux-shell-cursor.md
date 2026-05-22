---
title: 'Linux Shell 快捷鍵'
description: 'Shell 指標移動、編輯、搜尋等常用快捷鍵整理'
date: 2023-07-12
lastUpdated: 2023-07-12
sidebar:
  order: 3
---

# [Linux] Shell Cursor

## 移動
### 1. 指標移到最前面
```shell
Ctrl + a
```
(a是第一字母，所以代表最前面)

忘記加sudo不用再手忙腳亂

### 2. 指標移到最後面
```shell
Ctrl + e
```
(e是END，所以代表最後面)

### 3. 指標往前移動一個word
``` shell
Windows/Linux: Ctrl + 方向鍵
Mac: option + 方向鍵
```
Mac下的[iterm2需加入設定](https://www.clairecodes.com/blog/2018-10-15-making-the-alt-key-work-in-iterm2/)

## 編輯
### 1. 刪除指標目前位置的**前一個word**
``` shell
Ctrl + w
```
(w是word，所以代表最後面)

### 2. 刪除指標**目前位置**⇒**開頭**的所有字串
``` shell
Ctrl + u
```

### 3. 刪除指標**目前位置**⇒**結束**的所有字串
``` shell
Ctrl + k
```
(w是word，所以代表最後面)

### 4. 清除整行cmd
``` shell
Ctrl + c
```

### 5. Undo恢復上一個操作
``` shell
Ctrl + -
```


## 搜尋記錄
搜尋之前打過的cmd

1. Ctrl + r
2. 輸入想搜尋的字串

繼續Ctrl + r:  向上搜尋


## 其他
1. 清空螢幕
``` shell
Ctrl + l
```


參考:
[https://blog.xuite.net/altohorn/linux/17259883](https://blog.xuite.net/altohorn/linux/17259883)
