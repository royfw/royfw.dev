---
title: 'Kubernetes — Lens 監控'
description: 'Lens 監控 node-exporter 設定與自訂 disk 監控路徑'
date: 2023-07-12
lastUpdated: 2023-07-12
sidebar:
  order: 2
---

# [k8s] tool Lens 監控

Lens可以透過`lens-metrics`這namespace中的`node-exporter`可以監控每個Node的資源使用，例如: CPU、Memory、Disk
[![lens-node-expoter.png](https://books.royfuwei.com/uploads/images/gallery/2021-12/scaled-1680-/image-1640935055101.png)](https://books.royfuwei.com/uploads/images/gallery/2021-12/image-1640935055101.png)
`node-export`是以DaemonSet方式存在k8s中，default設定檔如下，可以看出預設的disk監控目錄為`/`這個路徑
``` yaml
    spec:
      volumes:
        - name: proc
          hostPath:
            path: /proc
            type: ''
        - name: sys
          hostPath:
            path: /sys
            type: ''
        - name: root
          hostPath:
            path: /
            type: ''
```

但如意安裝會另外分割出`/data`來提供給pvc儲存，所以只能監控到Host OS底下`/`的路徑，無法監控資料儲存的`/data`變化，所以需要修`lens-metrics`這namesapce下的`node-export`
```yaml
    spec:
      volumes:
        - name: proc
          hostPath:
            path: /proc
            type: ''
        - name: sys
          hostPath:
            path: /sys
            type: ''
        - name: root
          hostPath:
            path: /data  <---修改成pvc所儲放的位置
            type: ''
```
