---
title: 'Kubernetes — Lens 工具'
description: 'Lens 工具安裝筆記與 Kubernetes 基本概念'
date: 2023-07-12
lastUpdated: 2023-07-12
sidebar:
  order: 1
---

# [k8s] tool Lens

[Lens](https://k8slens.dev/)相關筆記

## 環境
* Windows 20H2
* Lens 4.2.4
* Docker 20.10.6
* Kubernetes 1.19.7

## 安裝

### Windows
``scoop install lens``

### Manjaro
``pamac install lens``

# Kubernetes(K8S) 基本概念

Master-Slave 架構。

簡單將作業系統+App抽象為一隻程式。Image 是 Container 的模板，類似於 Class。執行時稱為 Container，類似於 Instance。Container 跟 Container之間用網路通訊，可以想像為作業系統的網路參數........，可在一個 Pod 抽象一層網路層(localhost...........。當然有些程式是執行很久，不會停的那種，如 Web Server；有些是算完就回傳結果的，在 K8S 都有不同的類型來處理。有些程式要求較快的 CPU 或較多的記憶體，或限制程式能用多少 CPU 或記憶體。這裡比較特別的是，原生 Container(Docker)就有該功能，而K8S又抽象出 Pod 來對多個 Container 共用或限制資源。

K8S 就是負責管理那一堆的程式的工具。來達到以下效果:

* 自動部署
* Scalabilty 可擴展性

多台實體電腦執行程式。

* 負載均衡:

自動判斷當下有能力做事的電腦來處理前端的要求。不必自己設定 IP 或 DNS 來做。

* Automated rollouts and rollbacks:

部署新版本的程式當掉，自動回舊版本的程式。部署新版本時，是漸進式停下部分舊版程式再替換成新版。以上兩點功能會組合可達到盡量避免服務不中斷的效果。

* Self-healing

* Designed for extensibility


---
Cluster 抽象結構:
1. 一個 MasterNode 對多個 WorkerNode。

	2. 一個 WorkerNode 對多個 Pod's Replica。

		3. 一個 Pod 對多個 Container。


---

* 一個 Cluster 對一個 MasterNode 與多個 WorkerNode
* 一個 Node(Master 或 Worker) 對一個實體主機
* 一個 Container 對一個 Image
* 一個 Image 對一個 作業系統+App


---

Cluster 範例結構:

* MasterNode
	* WorkerNode1
    	* P1R1 (Pod-1 Replica-1)
        	* P1R1C1 (Pod-1 Replica-1 Container-1)
            * P1R1C2
            * P1R1C3
        * P2R1
            * P2R1C1
            * P2R1C2
        * P3R1
        	* P3R1C1
    * WorkerNode2
    	* P1R2
        	* P1R2C1
            * P1R2C2
            * P1R2C3
    * WorkerNode3
    	* P1R3
        	* P1R3C1
            * P1R3C2
            * P1R3C3
        * P2R2
            * P2R2C1
            * P2R2C2

網路層範例結構:
* Ingress
	* Service1
    	* P1R1
        * P1R2
        * P1R3
    * Service2
    	* P2R1
        * P2R2
    * Service3
    	* P3R1

## MasterNode
* API Server

    實際操控 k8s 的接口。

* Scheduler

    資源調度器。會找到適合的 Worker 來執行服務。

 * Controller Manager

   	監測 Worker 狀態。例如若發現有 Pod 的 Replica 掛掉，則通知 Scheduler 找一個 Worker 重新執行；例如整個 Worker 掛掉(整台電腦當機)，通知 Scheduler 把所有當掉的 Pod 的 Replica 在別的可用 Worker 執行。

* etcd


## WorkerNode
* Kubelet

    跟 MasterNode 通訊用的程式，並會回報自身狀況，也接收 MasterNode 的安排的任務(depoly, update, stop.....)。

* Kube-Proxy

    Node 之間通訊的網路層....

* Logging Layer


## Pod

* Container(多個)
* Volume(多個)

 * Deployment(Stateless)、Stateful
 	* ReplicaSet
		* Pod


# 參考資料

1. [Kubernetes Documentation](https://kubernetes.io/docs/home/)
2. [Kubernetes in 5 mins](https://www.youtube.com/watch?v=PH-2FfFD2PU)
3. [Stateless vs Stateful Containers: What's the Difference and Why Does It Matter?](https://www.contino.io/insights/stateless-vs-stateful-containers-whats-the-difference-and-why-does-it-matter)
