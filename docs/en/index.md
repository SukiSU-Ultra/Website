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
  badge: 'The ultimate Android root solution',
  title: 'SukiSU-Ultra',
  subtitle: 'Powerful kernel-level root access with uncompromising security',
  description: 'Experience the next generation of Android root management.',
  logo: '/logo.svg',
  primary: { label: 'Get Started', href: '/guide/installation' },
  secondary: { label: 'View on GitHub', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
  metrics: [
    { label: 'Active users', value: '200K+' },
    { label: 'Supported devices', value: '500+' },
    { label: 'GitHub stars', value: '3K+' },
    { label: 'Community members', value: '6K+' }
  ]
}

const features = {
  title: 'Why choose SukiSU-Ultra',
  description: 'Built from the ground up with security, performance, and reliability at its core.',
  items: [
    {
      title: 'Non-GKI kernel support',
      body: 'Non-GKI/Pre-GKI kernel support from 4.x - 5.4 with LTS mode (3.x is experimental)',
      icon: 'arcticons:kernelsu',
      accent: 'teal'
    },
    {
      title: 'Based On Magic Mount',
      body: "Based on Magisk's Magic mount thanks to 5ec1cff",
      icon: 'solar:zip-file-outline',
      accent: 'blue'
    },
    {
      title: 'Support for KPM kernel modules',
      body: 'KPM modules support ported from Apatch',
      icon: 'solar:download-bold',
      accent: 'indigo'
    },
    {
      title: 'Design it in your way',
      body: 'Extensive customisation options available such as custom background,managing some susfs features without susfsforksu module,adjusting DPI etc.',
      icon: 'tabler:brush',
      accent: 'cyan'
    },
    {
      title: 'WebUI X',
      body: 'Next generation of webui implemenation by MMRL supported',
      icon: 'arcticons:mmrl',
      accent: 'sky'
    },
    {
      title: 'Frequent updates',
      body: 'SukiSU-Ultra is being constantly maintained and updated by our contributors',
      icon: 'solar:smartphone-update-bold-duotone',
      accent: 'violet'
    }
  ]
}

const steps = {
  title: 'Ready in minutes',
  description: "Three simple steps to unlock your device's full potential.",
  tag: 'Installation',
  commands: [
    'adb reboot recovery',
    'adb sideload kernel.zip',
    '# Flash the kernel zip in recovery mode'
  ],
  success: 'Installation complete! Reboot and enjoy.',
  primary: { label: 'Read full documentation' },
  secondary: { label: 'Download latest release', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases' }
}

const footer = {
  name: 'SukiSU-Ultra',
  description: 'Next-generation root solution for Android devices. Built with modern architecture, enhanced security, and blazing-fast performance.',
  links: [
    {
      title: 'Resources',
      items: [
        { label: 'Documentation', href: '/guide/' },
        { label: 'GitHub Repository', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra' },
        { label: 'Downloads', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases' },
        { label: 'Report Issues', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/issues' }
      ]
    },
    {
      title: 'Community',
      items: [
        { label: 'Telegram Channel', href: 'https://t.me/sukiksu' },
        { label: 'Discussions', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/discussions' },
        { label: 'Contributing', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/main/CONTRIBUTING.md' },
        { label: 'License', href: 'https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/main/LICENSE' }
      ]
    }
  ],
  copyright: '© 2025 Saksham. All rights reserved.',
  build: 'Built with ♥ using VitePress'
}
</script>

<LandingPage
  :hero="hero"
  :features="features"
  :steps="steps"
  :footer="footer"
/>