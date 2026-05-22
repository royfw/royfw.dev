---
title: 'Nx Library Publish'
description: 'Nx monorepo library publish 相關筆記與問題紀錄'
date: 2023-07-11
lastUpdated: 2023-07-13
sidebar:
  order: 1
---

# [Nx] Nx run library Publish

這邊先紀錄一些使用 monorepo [Nx](https://nx.dev/) 的相關筆記。


## 使用 **--publishable=true** 預設的進行 **publish**

用 `@nx/js`, `@nx/node` cli 建立 publish library，並使用`project.json` 跑 `publish`。

```sh title="nx generate publish library shell"
npx nx generate @nx/js:library --publishable=true ....
npx nx generate @nx/node:library --publishable=true ....
```

```json title="project.json"
{
  "name": "utils",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/utils/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/utils",
        "tsConfig": "packages/utils/tsconfig.lib.json",
        "packageJson": "packages/utils/package.json",
        "main": "packages/utils/src/index.ts",
        "assets": ["packages/utils/*.md"],
        "srcRootForCompilationRoot": "dist"
      }
    },
    "publish": {
      "command": "node tools/scripts/publish.mjs utils {args.ver} {args.tag}",
      "dependsOn": ["build"]
    },
    ...
}
```

---

## 目前有遇到一些問題

### 1. local VsCode 直接用 Nx console 跑 publish 會出現錯誤

```sh title="npx nx run utils:publish 出現的錯誤"
No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got undefined.
Warning: run-commands command "node tools/scripts/publish.mjs utils undefined undefined" exited with non-zero status code

 ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 >  NX   Ran target publish for project utils and 1 task(s) they depend on (1s)

    ✖    1/2 failed
    ✔    1/2 succeeded [0 read from cache]

   View structured, searchable error logs at https://nx.app/runs/w1nEBREg1


 *  The terminal process "/usr/bin/zsh '-c', 'npx nx run utils:publish'" terminated with exit code: 1.
 *  Terminal will be reused for tasks, press any key to close it.
```

> 會出現此問題的原因
>
> 是因為沒有帶參數 `args.ver`, `args.tag`
```json
{
   ...
    "publish": {
      "command": "node tools/scripts/publish.mjs utils {args.ver} {args.tag}",
      "dependsOn": ["build"]
    },
  ...
}
```

> ### 解決方法
```sh title="args 帶 ver, tag"
nx run utils:publish --args=--ver=0.0.1
```

### 2. 帶 **--args=--ver=..** 沒有異動 **package.json** version

在 `./tools/scripts/publish.mjs` 中，會拿`--args=--ver`異動現有的`package.json` version，可是在指令執行後， version 卻沒有被異動。

```mjs title="./tools/scripts/publish.mjs"
...
// Executing publish script: node path/to/publish.mjs {name} --version {version} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, version, tag = 'next'] = process.argv;

// A simple SemVer validation to validate the version
const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
invariant(
  version && validVersion.test(version),
  `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`
);
...
// Updating the version in "package.json" before publishing
try {
  const json = JSON.parse(readFileSync(`package.json`).toString());
  json.version = version;
  writeFileSync(`package.json`, JSON.stringify(json, null, 2));
} catch (e) {
  console.error(`Error reading package.json file from library build output.`);
}

// Execute "npm publish" to publish
execSync(`npm publish --access public --tag ${tag}`);
```
> 會出現此問題的原因
>
> 是因為異動的 `package.json` 並非是開發的 `./packages/${project}/package.json`，而是`./dist/packages/${project}/package.json` 的 version。

---

## 之後 **npm publish** 的方式

### 1. 使用 [ngx-deploy-npm](https://github.com/bikecoders/ngx-deploy-npm) 進行 **npm publish**

```json title="project.json"
{
  "name": "utils",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/utils/src",
  "projectType": "library",
  "targets": {
    ...
    "deploy": {
      "executor": "ngx-deploy-npm:deploy",
      "options": {
        "tag": "alpha",
        "registry": "https://npm.royfuwei.com/",
        "access": "public"
      },
      "dependsOn": ["build"]
    }
  ...
}
```


### 2. 使用 CI/CD 流程來 **npm publish**

使用像是 [GitHub Action](https://docs.github.com/actions)、[GitLab CI/CD](https://docs.gitlab.com/ee/ci/) 來 **npm publish**。

---

:::info
會遇到幾個問題，可能是我剛用`nx`，還沒有到很熟，而且一些 CI/CD 流程也還沒建置起來。
:::

---


## Reference
- [Publishable and Buildable Nx Libraries](https://nx.dev/more-concepts/buildable-and-publishable-libraries)
- [Publishing your first library with NX on NPM](https://medium.com/@thomas.laforge/publishing-your-first-library-with-nx-on-npm-1366bac887f0)
- [使用一个命令(Angular 和 Nx)将库发布到 NPM](https://devpress.csdn.net/cicd/62ed97cac6770329307f2910.html)
