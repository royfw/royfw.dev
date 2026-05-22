---
title: 'IoC & Dependency Injection Container'
description: 'InversifyJS、typedi、tsyringe 等 DI Container 比較筆記'
date: 2023-07-24
lastUpdated: 2023-07-26
sidebar:
  order: 2
---

# [Note] IoC & Dependency Injection Container

紀錄一些自己有用到的 npm packages

## npm packages

以時間來說 **InversifyJS** 、 **typedi** 的建立時間比較早， **tsyringe** 比較晚期出現。

- [InversifyJS](https://github.com/inversify/InversifyJS)
    - 功能比較複雜
    - 最新版本截止於 2021/10
    - 不支援 **auto injection** ，需要事先配置注入。
- [typedi](https://github.com/typestack/typedi)
    - 功能簡易
    - 最新版本截止於 2021/01
    - 支援 **auto injection**。
    - 服務起來會檢查注入的正確性。
    - 服務注入順序不易確認，容易起服務報錯。
    - **Class** 可以透過 **Property** 注入服務，但會造成 **Class** 中的服務不是透過 **constructor** 注入服務的問題。
- [tsyringe](https://github.com/microsoft/tsyringe)
    - 功能簡易
    - 支援 **auto injection**。
    - (目前使用上)服務起來不會檢查注入的正確性。
    - 支援裝飾器定義要注入的服務。
