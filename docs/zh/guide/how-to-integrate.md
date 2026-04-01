# 集成指导

SukiSU 可以集成到 GKI 和 non-GKI 内核中，并且已反向移植到 4.14 版本。

<!-- 应该是 3.4 版本，但 backslashxx 的 syscall manual hook 无法在 SukiSU 中使用-->

有些 OEM 定制可能导致多达 50% 的内核代码超出内核树代码，而非来自上游 Linux 内核或 ACK。因此，non-GKI 内核的定制特性导致了严重的内核碎片化，而且我们缺乏构建它们的通用方法。因此，我们无法提供 non-GKI 内核的启动映像。

前提条件：开源的、可启动的内核。

## Hook 方法

1. **Tracepoint Syscall Redirect Hook:**

   - GKI kernels 的默认 hook 方法
   
<!-- This part refer to [rsuntk/KernelSU](https://github.com/rsuntk/KernelSU). -->

如果您能够构建可启动内核，有两种方法可以将 KernelSU 集成到内核源代码中：

1. 使用 `kprobe` 自动集成
2. 手动集成

KernelSU 使用 kprobe 机制来做内核的相关 hook，如果 _kprobe_ 可以在你编译的内核中正常运行，那么推荐用这个方法来集成。

请参阅此文档 [https://github.com/~](https://github.com/tiann/KernelSU/blob/main/website/docs/guide/how-to-integrate-for-non-gki.md#integrate-with-kprobe)。虽然标题为“适用于 non-GKI”，但仅适用于 GKI。

替换 KernelSU 添加到内核源代码树的步骤的执行命令为：

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
```

## 手动修改内核源代码

适用：

- GKI 内核
- non-GKI 内核

请参考此文档 [https://github.com/~ (non-GKI 内核集成)](https://github.com/tiann/KernelSU/blob/main/website/docs/guide/how-to-integrate-for-non-gki.md#manually-modify-the-kernel-source) 和 [https://github.com/~ (GKI 内核构建)](https://kernelsu.org/zh_CN/guide/how-to-build.html) 进行手动集成。虽然第一个链接的标题是“适用于 non-GKI”，但它也适用于 GKI。两者都可以正常工作。

还有另一种集成方法，但是仍在开发中。

<!-- 这是 backslashxx 的syscall manual hook，但目前无法使用。 -->

将 KernelSU（SukiSU）添加到内核源代码树的步骤的运行命令将被替换为：

### LKM 内核

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
```

### 内置构建内核

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s builtin
```