---
layout: page
title: "Team"
sidebar: false
outline: false
aside: false
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

const coreMembers = [
  {
    avatar: 'https://github.com/shirkneko.png',
    name: 'Shirk Neko',
    title: 'Founder & Lead Developer',
    desc: 'Creator of SukiSU-Ultra',
    links: [
      { icon: 'github', link: 'https://github.com/shirkneko' },
      { icon: 'telegram', link: 'https://t.me/shirkneko'}
    ]
  },
  {
    avatar: 'https://github.com/slituix.png',
    name: 'TypeFlu',
    title: 'Core Member',
    links: [
      { icon: 'github', link: 'https://github.com/slituix' },
      { icon: 'x', link: 'https://x.com/typeflu'},
      { icon: 'telegram', link: 'https://t.me/typeflu'}
    ]
  },
  {
    avatar: 'https://github.com/MiRinChan.png',
    name: 'bbB猫 北凛琪',
    title: 'Head Designer',
    links: [
      { icon: 'github', link: 'https://github.com/mirinchan' },
      { icon: 'telegram', link: 'https://t.me/bbbneko'}
    ]
  },
  {
    avatar: 'https://github.com/OukaroMF.png',
    name: 'OukaroMF',
    title: 'Junior Designer',
    links: [
      { icon: 'github', link: 'https://github.com/oukaromf' },
      { icon: 'telegram', link: 'https://t.me/mfnotmtf'}
    ]
  },
  {
    avatar: 'https://github.com/tools-cx-app.png',
    name: 'Hutao',
    title: 'Rust Code Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/tools-cx-app' },
      { icon: 'telegram', link: 'https://t.me/localhost_hutao'}
    ]
  },
  {
    avatar: 'https://github.com/udochina.png',
    name: 'Liankong',
    title: 'KPM Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/udochina' }
    ]
  },
  {
    avatar: 'https://github.com/xiaomichael.png',
    name: '小 小w',
    title: 'Kernel Manager',
    links: [
      { icon: 'github', link: 'https://github.com/xiaomichael' },
      { icon: 'telegram', link: 'https://t.me/xiaoxiao1221w'}
    ]
  },
  {
    avatar: 'https://github.com/HSSkyBoy.png',
    name: 'NkBe',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/HSSkyBoy' },
      { icon: 'telegram', link: 'https://t.me/HSSkyBoy'}
    ]
  },
  {
    avatar: 'https://github.com/luyanci.png',
    name: 'Luyanci',
    title: 'Bot Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/luyanci' },
      { icon: 'telegram', link: 'https://t.me/luyancib'}
    ]
  },
  
  
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Meet Our Team
    </template>
    <template #lead>
      A passionate team of developers, designers, and maintainers dedicated to building the next generation of Android root management.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
</VPTeamPage>

<style scoped>
:deep(.VPTeamPage) {
  padding-top: 32px;
  padding-bottom: 96px;
}

:deep(.VPTeamPageTitle) {
  margin-bottom: 48px;
}

:deep(.VPTeamPageTitle .title) {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

:deep(.VPTeamPageTitle .lead) {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 680px;
  margin: 0 auto;
}

:deep(.VPTeamMembers.medium .container) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1152px;
  margin: 0 auto;
}

:deep(.VPTeamMembers .VPTeamMembersItem) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 32px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

:deep(.VPTeamMembers .VPTeamMembersItem::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

:deep(.VPTeamMembers .VPTeamMembersItem:hover) {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand-1);
}

:deep(.VPTeamMembers .VPTeamMembersItem:hover::before) {
  opacity: 1;
}

:deep(.VPTeamMembers .profile) {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

:deep(.VPTeamMembers .avatar) {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 3px solid var(--vp-c-brand-1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.VPTeamMembers .VPTeamMembersItem:hover .avatar) {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

:deep(.VPTeamMembers .name) {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

:deep(.VPTeamMembers .title) {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}

:deep(.VPTeamMembers .desc) {
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

:deep(.VPTeamMembers .links) {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
}

:deep(.VPTeamMembers .link) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

:deep(.VPTeamMembers .link:hover) {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

:deep(.VPTeamMembers .link svg) {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  :deep(.VPTeamPage) {
    padding-top: 48px;
    padding-bottom: 64px;
  }

  :deep(.VPTeamPageTitle .title) {
    font-size: 36px;
  }

  :deep(.VPTeamPageTitle .lead) {
    font-size: 18px;
  }

  :deep(.VPTeamMembers.medium .container) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  :deep(.VPTeamMembers .VPTeamMembersItem) {
    padding: 24px 20px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.VPTeamMembers.medium .container) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
