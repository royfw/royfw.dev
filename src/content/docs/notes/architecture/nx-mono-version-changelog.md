---
title: 'Nx Mono Version & CHANGELOG'
description: 'Nx monorepo 使用 standard-version 管理版本和 CHANGELOG.md'
date: 2023-07-13
lastUpdated: 2023-07-13
sidebar:
  order: 2
---

# [Nx] Nx Mono Version and CHANGELOG.md

在 Nx Monorepo 使用 [standard-version](https://github.com/conventional-changelog/standard-version) ，動態產生 **CHANGELOG.md**，但如果想用 Nx 同時開發不同的 **packages**，有不同的 version 、 CHANGELOG.md ...等個別 **packages** 資訊，就需要一些設定。

## 在 root package.json 設定

```json title="package.json"
{
  "name": "rfjs",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "test": "",
    "prepare": "husky install",
    "version": "npx conventional-changelog -p angular -i CHANGELOG_VERSION.md -s && git add CHANGELOG_VERSION.md",
    "release": "standard-version"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "^17.6.5",
    "@commitlint/config-conventional": "^17.6.5",
    "@commitlint/cz-commitlint": "^17.5.0",
    "@nx/eslint-plugin": "16.4.0-beta.8",
    "@nx/jest": "16.4.0-beta.8",
    "@nx/js": "16.4.0-beta.8",
    "@nx/linter": "16.4.0-beta.8",
    "@nx/node": "^16.4.0-beta.8",
    "commitizen": "^4.3.0",
    "conventional-changelog-angular": "^6.0.0",
    "conventional-changelog-cli": "^3.0.0",
    "standard-version": "^9.5.0",
    ...
  },
  ...
}
```

使用 Nx 執行 **release** ， Root **package.json** 版本號升上去，產生 **CHANGELOG.md**。

```sh
npx nx run rfjs:release
```

## 在 packages/${project} package.json 設定


```json
{
  "name": "@rfjs/utils",
  "version": "0.0.1",
  "type": "commonjs",
  "scripts": {
    "release": "standard-version"
  }
}
```
並配置 `./packages/${project}/.versionrc` ，才會在目錄底下產生個別的 **CHANGELOG.md**

```json title=".versionrc"
{
  "path": ".",
  "tag-prefix": "@rfjs/utils-v",
  "releaseCommitMessageFormat": "chore(release): @rfjs/utils v{{currentTag}}"
}
```


---


## Reference
- [standard-version#configuration](https://github.com/conventional-changelog/standard-version#configuration)
- [Usage in monorepo nx workspace](https://github.com/conventional-changelog/standard-version/issues/445)
- [How can I filter by scope?](https://github.com/conventional-changelog/standard-version/issues/768)
