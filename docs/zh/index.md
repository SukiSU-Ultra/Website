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
  title: 'SukiSU-Ultra',
  subtitle: '强大的内核级 Root 权限，安全性毫不让步',
  description: '体验新一代的 Android Root 管理',
  logo: '/logo.svg',
  primary: { label: '开始使用', href: '/zh/guide/installation' },
  secondary: { label: '访问 GitHub', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
  metrics: [
    { label: '活跃用户', value: '200K+' },
    { label: '支持设备', value: '500+' },
    { label: 'GitHub Star', value: '3K+' },
    { label: '社区成员', value: '6K+' }
  ]
}

const features = {
  title: '为什么选择 SukiSU-Ultra',
  description: '安全、性能与可靠性，全都围绕内核级 Root 打造',
  items: [
    {
      title: '非 GKI 内核支持',
      body: '支持 4.x-5.4 的非 GKI / 预 GKI 内核并提供 LTS 模式 (3.x 为实验性)',
      icon: 'arcticons:kernelsu',
      accent: 'teal'
    },
    {
      title: '基于 Magic Mount',
      body: '得益于 5ec1cff，继承 Magisk 的 Magic Mount 机制',
      icon: 'solar:zip-file-outline',
      accent: 'blue'
    },
    {
      title: '支持 KPM 内核模块',
      body: '移植自 Apatch 的 KPM 模块支持',
      icon: 'solar:download-bold',
      accent: 'indigo'
    },
    {
      title: '随心定制',
      body: '可自定义背景，管理部分 susfs 功能，并可调整 DPI 等细节',
      icon: 'tabler:brush',
      accent: 'cyan'
    },
    {
      title: 'WebUI X',
      body: '由 MMRL 提供的新一代 WebUI 实现',
      icon: 'arcticons:mmrl',
      accent: 'sky'
    },
    {
      title: '频繁更新',
      body: '活跃维护，贡献者持续带来改进与修复',
      icon: 'solar:smartphone-update-bold-duotone',
      accent: 'violet'
    }
  ]
}

const steps = {
  title: '三步准备就绪',
  description: '几分钟内释放设备的全部潜力: ',
  tag: '安装流程',
  commands: [
    'adb reboot recovery',
    'adb sideload kernel.zip',
    '# 在 recovery 模式中刷入内核压缩包'
  ],
  success: '安装完成！重启即可体验',
  primary: { label: '阅读完整文档' },
  secondary: { label: '下载最新版本', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases' }
}

const footer = {
  name: 'SukiSU-Ultra',
  description: '面向 Android 设备的下一代 Root 方案：现代架构、安全强化、极速性能',
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
  copyright: '© 2025 Saksham. 保留所有权利。',
  build: '使用 VitePress 构建'
}
</script>

<LandingPage
  :hero="hero"
  :features="features"
  :steps="steps"
  :footer="footer"
/>
