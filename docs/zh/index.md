---
layout: page
title: "SukiSU-Ultra"
pageClass: landing-page
sidebar: false
outline: false
aside: false
---

<script setup lang="ts">
const hero = {
  badge: '终极 Android Root 方案',
  badgeHref: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases',
  title: 'SukiSU-Ultra',
  subtitle: '面向 Android 的内核级 Root 权限管理，安全与灵活兼得。',
  logo: '/logo.svg',
  primary: { label: '开始使用', href: '/zh/guide/installation' },
  secondary: { label: '访问 GitHub', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
  chips: ['支持 GKI 与非 GKI 内核', 'KPM 内核模块', 'SUSFS 管理', '开源']
}

const demo = {
  label: '将 SukiSU-Ultra 加入内核源码树的演示',
  title: '内核源码',
  replay: '重播',
  command: 'curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main',
  log: [
    '[+] Setting up KernelSU...',
    '[+] Repository cloned.',
    '[-] Stashed current changes.',
    '[+] Repository updated.',
    '[-] Checked out main.',
    '[+] Symlink created.',
    '[+] Modified Makefile.',
    '[+] Modified Kconfig.',
    '[+] Done.'
  ],
  tree: [
    { name: 'KernelSU/', tag: '已克隆', at: 2 },
    { name: 'drivers/kernelsu', tag: '已链接', at: 6 },
    { name: 'drivers/Makefile', tag: '已修改', at: 7 },
    { name: 'drivers/Kconfig', tag: '已修改', at: 8 }
  ]
}

const features = {
  title: '为什么选择 SukiSU-Ultra',
  description: '安全、性能与可靠性，全都围绕内核级 Root 打造',
  items: [
    {
      title: '非 GKI 内核支持',
      body: '支持 4.x-5.4 的非 GKI / 预 GKI 内核并提供 LTS 模式 (3.x 为实验性)',
      icon: 'arcticons:kernelsu'
    },
    {
      title: '基于 Magic Mount',
      body: '得益于 5ec1cff，继承 Magisk 的 Magic Mount 机制',
      icon: 'solar:zip-file-outline'
    },
    {
      title: '支持 KPM 内核模块',
      body: '移植自 APatch 的 KPM 模块支持',
      icon: 'solar:download-bold'
    },
    {
      title: '随心定制',
      body: '可自定义背景，管理部分 SUSFS 功能（无需 susfsforksu 模块），并可调整 DPI 等细节',
      icon: 'tabler:brush'
    },
    {
      title: 'WebUI X',
      body: '由 MMRL 提供的新一代 WebUI 实现',
      icon: 'arcticons:mmrl'
    },
    {
      title: '频繁更新',
      body: '活跃维护，贡献者持续带来改进与修复',
      icon: 'solar:smartphone-update-bold-duotone'
    }
  ]
}

const community = {
  title: '社区与支持',
  items: [
    {
      title: 'GitHub',
      body: '源码、问题反馈与版本发布',
      href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra',
      icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.63-.33 2.47-.33c.84 0 1.68.11 2.47.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z'
    },
    {
      title: 'Telegram',
      body: '更新动态、讨论与测试版',
      href: 'https://t.me/sukiksu',
      icon: 'm20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701l-.332 4.949c.485 0 .7-.223.971-.486l2.333-2.268l4.852 3.584c.895.493 1.538.239 1.761-.827l3.18-14.99c.326-1.307-.5-1.902-1.355-1.517Z'
    }
  ]
}

const banner = {
  title: '准备好了吗？',
  body: '跟随安装指南，在你的设备上运行 SukiSU-Ultra。',
  cta: '查看安装指南'
}

const footer = {
  name: 'SukiSU-Ultra',
  description: '面向 Android 设备的下一代 Root 方案：现代架构、安全强化、出色性能',
  links: [
    {
      title: '资源',
      items: [
        { label: '文档', href: '/zh/guide/' },
        { label: 'GitHub 仓库', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
        { label: '下载', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases' },
        { label: '问题反馈', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/issues' }
      ]
    },
    {
      title: '社区',
      items: [
        { label: 'Telegram 频道', href: 'https://t.me/sukiksu' },
        { label: 'GitHub 讨论区', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/discussions' },
        { label: '参与贡献', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/main/CONTRIBUTING.md' },
        { label: '许可协议', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/main/LICENSE' }
      ]
    }
  ],
  copyright: '© 2025-2026 Saksham. 保留所有权利。',
  build: '使用 VitePress 构建'
}
</script>

<LandingPage
  :hero="hero"
  :demo="demo"
  :features="features"
  :community="community"
  :banner="banner"
  :footer="footer"
/>
