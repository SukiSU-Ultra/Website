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
   subtitle: '内核级 Root 权限，安全与性能兼顾',
   description: '面向现代设备打造的下一代 Root 管理。更快、更安全、更可靠。',
   logo: '/logo.svg',
   primary: { label: '开始使用', href: '/zh/guide/installation' },
   secondary: { label: '访问 GitHub', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
   metrics: [
      { label: '活跃用户', value: '10K+' },
      { label: '支持设备', value: '500+' },
      { label: 'GitHub Star', value: '3K+' },
      { label: '社区成员', value: '5K+' }
   ]
}

const features = {
   title: '为什么选择 SukiSU-Ultra',
   description: '从安全、性能到可靠性，全栈为内核级 Root 打造。',
   items: [
      {
         title: '企业级安全',
         body: '内置 SELinux、签名模块与实时防护，让 Root 设备同样安全。',
         icon: 'M3 11h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V11Zm4 0V7a5 5 0 0 1 10 0v4',
         accent: 'teal'
      },
      {
         title: '稳定可靠',
         body: '数千小时测试验证，99.9% 在线率，崩溃自动恢复。',
         icon: 'M12 3 3 7v6c0 5 3.5 7.5 7.34 8.95a1 1 0 0 0 .66 0C15.5 20.5 19 18 19 13V7l-7-4Z',
         accent: 'blue'
      },
      {
         title: '极致性能',
         body: '冷启动开销极低，耗电轻，实时追踪不拖慢系统。',
         icon: 'M3 14h9l-1 8 10-12h-9l1-8-10 12Z',
         accent: 'indigo'
      },
      {
         title: '广泛兼容',
         body: '覆盖 500+ 设备，兼容 GKI / 非 GKI / 老旧内核。',
         icon: 'M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 16h.01',
         accent: 'cyan'
      },
      {
         title: '开发者优先',
         body: '完备的策略 API、文档与模块系统，满足深度自定义。',
         icon: 'M18 16l4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16',
         accent: 'sky'
      },
      {
         title: '活跃社区',
         body: '数千开发者与高级用户共享模块、技巧与支援。',
         icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m18-12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm2 12v-2a4 4 0 0 0-3-3.87',
         accent: 'violet'
      }
   ]
}

const steps = {
   title: '三步完成部署',
   description: '几分钟内释放设备潜能。',
   tag: '安装流程',
   commands: [
      'adb reboot recovery',
      'adb sideload sukisu-ultra.zip',
      '# 在 Recovery 中刷入补丁包'
   ],
   success: '安装完成，重启即可体验。',
   primary: { label: '阅读完整文档' },
   secondary: { label: '下载最新版本', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases' }
}

const footer = {
   name: 'SukiSU-Ultra',
   description: '面向 Android 设备的下一代 Root 方案：现代架构、安全强化、极速响应。',
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
   build: '使用 VitePress 打造'
}
</script>

<LandingPage
   :hero="hero"
   :features="features"
   :steps="steps"
   :footer="footer"
/>