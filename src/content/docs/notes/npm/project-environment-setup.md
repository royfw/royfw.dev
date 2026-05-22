---
title: '專案環境基本設定'
description: 'pre-commit hook、commitlint、husky、dotenv-flow 等開發環境設定'
date: 2023-07-24
lastUpdated: 2023-07-24
sidebar:
  order: 4
---

# [Note] Setting Started Project Environment

開發上環境基本設定

## pre commit

對 `git commit` 規範的工具，規範產生正規的 commit message 。

- [conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)
    - [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
    ```sh
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
    npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
    ```
- [conventional-changelog/conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
    ```json
    "devDependencies": {
        "conventional-changelog-angular": "^5.0.13",
        "conventional-changelog-cli": "^2.2.2",
    ```
- [typicode/husky](https://github.com/typicode/husky)
    ```sh
    npx husky-init && npm install
    ```
- [commitizen/cz-cli](https://github.com/commitizen/cz-cli)
    - install dev package
        ```sh
        npm install commitizen --save-dev
        npm install @commitlint/cz-commitlint --save-dev
        ```
    - `package.json`
        ```json
        "config": {
            "commitizen": {
            "path": "@commitlint/cz-commitlint"
            }
        }
        ```
    - add hook
        ```sh
        npx husky add .husky/prepare-commit-msg 'exec < /dev/tty && node_modules/.bin/cz --hook || true'
        ```

## npm version & gen changelog

依據 commit message 異動 package 版號以及產生異動文件。

- [standard-version](https://github.com/conventional-changelog/standard-version)


## dotenv-flow

- [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow)
    可以使用不同的 `.env*`，像是 `.env.development`, `.env.production`, `.env.local`
