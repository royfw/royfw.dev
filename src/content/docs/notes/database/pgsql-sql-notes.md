---
title: 'PgSQL SQL 筆記'
description: 'PostgreSQL 常用 SQL 語法筆記，含 WHERE Boolean、ALTER TABLE 等操作'
date: 2023-07-09
lastUpdated: 2023-07-13
sidebar:
  order: 1
---

# [PgSQL] 紀錄 SQL 相關筆記

記錄一些遇到的筆記


## WHERE: Boolean

### 同時取得 Null, False 資料

`Column` type 為 `bool` 然後又可以是 `Null` 時，想同時搜尋 `False` 、 `Null` 資料。

Bool Column: `ignored`

```sql title="以下方式取得失敗"
select * from foo where ignored != true;
select * from foo where ignored not in (true);
```

```sql title="要用以下方式"
select * from foo where ignored = false or ignored isnull;
```

## Alter Table

### Alter Column set not null, drop not null

```sql
alter table commission.shipping_ignored_items
add column ignored_reason_id int8 NOT null;
-- error

alter table commission.shipping_ignored_items
alter column ignored_reason_id type int8 null;
-- success

alter table commission.shipping_ignored_items
alter column ignored_reason_id drop not null;

alter table commission.forced_order_audits
alter column ignored_reason_id drop not null;

alter table commission.forced_order_audits
alter column ignored_reason_id set not null;
```

### Alter drop column

```sql
alter table commission.shipping_ignored_items
drop column ignored_reason_id;
```

---

## 相關的 cli

### **pg_dump** 匯出 PostgreSQL Data 到 **.sql**

```sh title="pg_dump"
pg_dump -U postgres -h 172.20.1.144 -d clinico_dev -n tt_dbuser1 > dump-clinico_dev-data-tt_dbuser1-202305191749.sql

pg_dump -U postgres -h 172.20.1.144 -d clinico_dev -n public > dump-clinico_dev-data-202305191645.sql
```

### **pg_restore** 匯入資料到 PostgreSQL Data

```sh title="pg_restore"
pg_restore -U postgres -h 172.20.1.144 -d clinico_dev < dump-clinico_dev-202305191624.sql
```
