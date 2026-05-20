---
title: zsh 切換 Claude Code model
description: 一個 alias 就能換 alias。
sidebar:
  order: 1
---

懶得每次手動 export,直接做成 alias:

```bash
alias cct='ANTHROPIC_MODEL=qwen3.6-27b-code-think CLAUDE_CODE_MAX_OUTPUT_TOKENS=24576 claude'
```

`CLAUDE_CODE_MAX_OUTPUT_TOKENS` 一定要跟著一起換,不然 client / server 兩邊 cap 對不上。
