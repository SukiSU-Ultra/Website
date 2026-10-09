# 安装参考

::: details 将会了解 SukiSU-Ultra 安装过程
[[toc]]
:::

::: danger 警告
**Root 您的设备可能会使保修失效，如果操作不当可能会造成永久性损坏。**
请务必在继续之前创建完整备份，阅读文档确保与您的设备兼容，遵循文档参考，准备好恢复计划
:::

## LKM 安装

LKM 模式将 SukiSU-Ultra 作为可加载内核模块 (LKM) 安装。管理器会用与你设备 KMI 匹配的预构建模块修补 boot 镜像，因此无需自行编译内核。**推荐优先使用这种方式。**

### 步骤：

1. **安装管理器**：从 [GitHub Releases](https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases) 下载最新的 `SukiSU_*.apk` 并安装。
2. **开始安装**：在主页点击安装卡片（**点击安装**）。
3. **选择提供 boot 镜像的方式**：
   - **直接安装（推荐）**。
   - **选择文件并修补**：选择一个 boot 镜像。管理器会推荐适用于你设备的分区镜像（`boot`、`init_boot` 或 `vendor_boot`）。若启用**备份为原厂镜像**，请确保所选镜像是原厂镜像。
   - **下载文件并修补**：输入完整 OTA 包或出厂镜像的 URL，管理器会在其中查找 `boot`、`init_boot` 或 `vendor_boot` 分区。
   - **使用本地 LKM 文件**：使用你自己的模块，而不是内置的模块。仅支持 `.ko` 文件。
4. **选择 KMI**：管理器会显示你设备的 KMI（*本设备 KMI 版本*），如被询问请选择匹配的一项。
5. **刷入并重启。**

::: tip 预构建 LKM 镜像
发布版本提供以下 KMI 的预构建模块（均有 aarch64 与 x86_64）：`android12-5.10`、`android13-5.10`、`android13-5.15`、`android14-5.15`、`android14-6.1`、`android15-6.6`、`android16-6.12`、`android17-6.18`。最新列表请见[最新发布](https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases/latest)。
:::

::: warning 越狱模式
在**越狱模式**下，对已锁定 Bootloader 的设备刷写分区会破坏 AVB（Android 验证启动），可能导致设备无法开机。
:::

## 通用 GKI

请**全部**参考 [KernelSU 安装指南](https://kernelsu.org/zh_CN/guide/installation.html)

1. 适用于 GKI 2.0 设备，如小米、红米、三星等（不包括内核修改的制造商，如魅族、一加、真我和 OPPO）
2. 在[更多链接](./links)中查找 GKI 构建。找到设备内核版本，然后下载并使用 TWRP 或内核刷写工具刷入带有 `AnyKernel3` 后缀的
   zip 文件。
3. 无后缀的 `.zip` 档案是未压缩的，`gz` 后缀是特定型号使用的压缩格式。

## 一加设备

使用[更多链接](./links)部分提到的链接，用您的设备信息创建自定义构建，然后刷入带有 AnyKernel3 后缀的 zip 文件。

::: details 展开
- 只需要填写内核版本的前两部分，如 `5.10`、`5.15`、`6.1` 或 `6.6`。
- 请自行搜索处理器代号，通常是不含数字的英文字母。
- 可以从一加开源内核仓库中找到分支和配置文件。
- 第三方 Recovery（推荐 TWRP）

:::

## 开始安装
### 通用 GKI 安装

::: tip
适用于 GKI 2.0 设备，如小米、红米、三星等（不包括内核修改的制造商，如魅族、一加、真我和 OPPO）
:::

#### 步骤：

1. 下载 GKI 构建文件

   从我们的[资源部分](./links)查找 GKI 构建。查找您设备的内核版本并下载带有 `AnyKernel3` 后缀的 `zip` 文件。

2. 通过 Recovery 刷入

   启动到 `TWRP recovery`，选择 **Install**，导航到下载的 `AnyKernel3 zip` 文件，滑动刷入后重启系统

3. [验证安装](#验证)

::: details 文件格式说明
无后缀的 `.zip` 档案是未压缩的，`gz` 后缀是特定型号使用的压缩格式。
:::

### 一加设备安装

1. 获取设备信息

  - 内核版本（前两部分，例如 `5.10`、`5.15`、`6.1`、`6.6`）
  - 处理器代号（通常是不含数字的英文）
  - 来自一加开源内核仓库的分支和配置文件

2. 创建自定义构建

   使用我们[资源部分](./links)中提到的链接，用您的设备信息创建自定义构建。

3. 刷入构建

   下载生成的带有 AnyKernel3 后缀的 zip 文件，启动到 `TWRP recovery`，选择 **Install**，导航到下载的 `AnyKernel3 zip` 文件，滑动刷入后重启系统

::: tip
您只需要填写内核版本的前两部分。自行搜索处理器代号
:::

### 手动内核集成

面向希望将 SukiSU Ultra 集成到自己内核构建中的高级用户

#### 主分支（LKM）

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
```

#### 内置构建分支

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s builtin
```

::: warning 必需的内核配置
为了支持 KPM，添加 `CONFIG_KPM=y`

对于非 GKI 设备，还要添加 `CONFIG_KALLSYMS=y` 和 `CONFIG_KALLSYMS_ALL=y`
:::

## 安装后设置

### 系统更新时保持 Root

> [!IMPORTANT]
> 如何在 OTA 更新后保持 root 访问权限：


#### 步骤：

1. 系统更新后重启前

   - OTA 安装后不要立即重启，将 SukiSU Ultra 安装到第二插槽  
   - 打开 SukiSU Ultra 管理器，在**刷入/修补内核**界面选择 **GKI/non_GKI install**，选择您的 `AnyKernel3` 内核 `zip` 文件，选择与当前运行插槽相对的插槽然后刷入重启。

3. 替代方案：LKM 模式

   使用 [LKM 模式](#lkm-安装)（推荐）在 OTA 后、重启前，选择**安装到未使用的槽位（OTA 后）** 安装到未使用的插槽。

::: warning 警告
**非 GKI 设备注意事项：** 此方法不支持所有非 GKI 设备。对于非 GKI 设备，使用 TWRP 是最安全的方法。
:::

## 验证

安装后，验证一切是否正常工作，
- 打开 SukiSU Ultra 管理器检查 root 工作状态
- 使用 root 权限的应用程序来验证 root 访问是否工作正常
- 在设置 -> 关于手机中检查内核版本

## 需要帮助？

如果在安装过程中遇到问题：

1. 查看我们的[兼容性指南](./compatibility)了解设备要求
2. 访问我们的 [GitHub 仓库](https://github.com/sukisu-ultra/sukisu-ultra)获取支持
3. 加入我们的 [Telegram 社区](https://t.me/sukiksu)获取帮助

::: danger 安全提醒
**始终有备用计划！** 保留您的原始 `boot.img/init_boot.img` 并知道如何在出现问题时恢复设备。
:::
