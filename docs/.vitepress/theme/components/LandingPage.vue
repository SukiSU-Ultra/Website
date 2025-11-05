<template>
  <div class="landing-shell">
    <main>
      <section class="landing-hero">
        <div class="landing-hero__glow"></div>
        <div class="landing-hero__content">
          <div class="landing-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
            <span>{{ hero.badge }}</span>
          </div>
          <img :src="hero.logo" :alt="hero.title" class="landing-hero__logo" width="240" height="240" />
          <h1>
            <span>{{ hero.title }}</span>
          </h1>
          <p class="landing-hero__subtitle">{{ hero.subtitle }}</p>
          <p class="landing-hero__description">{{ hero.description }}</p>
          <div class="landing-hero__actions">
            <a
              class="landing-btn primary"
              :href="hero.primary.href"
            >
              {{ hero.primary.label }}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              class="landing-btn secondary"
              :href="hero.secondary.href"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18c-4.5 2-5-2-7-2"/><path d="M15 22v-4a4.77 4.77 0 0 0-1-3.5c3 0 6-2.05 6-5.5a5.62 5.62 0 0 0-1-3.5c.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a11.54 11.54 0 0 0-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.62 5.62 0 0 0 4 9c0 3.45 3 5.5 6 5.5a4.77 4.77 0 0 0-1 3.5v4"/></svg>
              {{ hero.secondary.label }}
            </a>
          </div>
          <div class="landing-hero__metrics">
            <div v-for="metric in hero.metrics" :key="metric.label">
              <span class="value">{{ metric.value }}</span>
              <span class="label">{{ metric.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="hasFeatures"
        class="landing-section landing-features"
      >
        <div class="section-head">
          <h2>{{ features.title }}</h2>
          <p>{{ features.description }}</p>
        </div>
        <div class="section-grid">
          <article
            v-for="feature in features.items"
            :key="feature.title"
            class="feature-card"
            :data-accent="feature.accent"
          >
            <span class="icon" :class="feature.accent">
              <svg
                v-if="typeof feature.icon === 'string' && isPathIcon(feature.icon)"
                viewBox="0 0 24 24"
                aria-hidden="true"
                v-html="toPath(feature.icon)"
              />
              <span
                v-else-if="typeof feature.icon === 'string' && isMarkupIcon(feature.icon)"
                v-html="feature.icon"
                aria-hidden="true"
                class="icon-inline"
              />
              <IconifyIcon
                v-else-if="typeof feature.icon === 'string'"
                :icon="feature.icon"
                :width="26"
                :height="26"
                aria-hidden="true"
                class="iconify-node"
              />
              <span
                v-else
                v-html="feature.icon"
                aria-hidden="true"
                class="icon-inline"
              />
            </span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.body }}</p>
          </article>
        </div>
      </section>

      <section class="landing-section landing-steps">
        <div class="section-head">
          <h2>{{ steps.title }}</h2>
          <p>{{ steps.description }}</p>
        </div>
        <div class="steps-card">
          <header>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 17 6-5-6-5"/><path d="M12 19h8"/></svg>
            <span>{{ steps.tag }}</span>
          </header>
          <div class="terminal">
            <div v-for="line in steps.commands" :key="line" class="terminal-line">
              <span :class="line.startsWith('#') ? 'hash' : 'prompt'">
                {{ line.startsWith('#') ? '#' : '$' }}
              </span>
              <code :class="line.startsWith('#') ? 'comment' : ''">
                {{ line.startsWith('#') ? line.substring(1).trim() : line }}
              </code>
            </div>
            <div class="terminal-hint">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              <span>{{ steps.success }}</span>
            </div>
          </div>
          <div class="steps-actions">
            <a class="landing-btn primary" :href="hero.primary.href">
              {{ steps.primary.label }}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a class="landing-btn secondary" :href="steps.secondary.href" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="M7 12l5 5 5-5"/><path d="M5 21h14"/></svg>
              {{ steps.secondary.label }}
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="landing-footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>{{ footer.name }}</h3>
          <p>{{ footer.description }}</p>
          <div class="footer-socials">
            <a
              v-for="social in footer.socials"
              :key="social.href"
              :href="social.href"
              target="_blank"
              rel="noopener"
            >
              <svg v-if="social.icon === 'github'" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a5.7 5.7 0 0 0-1-3.5c.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a11.4 11.4 0 0 0-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4"/>
                <path d="M9 18c-4.5 2-5-2-7-2"/>
              </svg>
              <svg v-else-if="social.icon === 'telegram'" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.04 15.7 19.15 5.6a.6.6 0 0 0-.6-1L4.7 9.6a.6.6 0 0 0 .1 1.17l5.1 1.2a.6.6 0 0 1 .44.44l1.2 5.1a.6.6 0 0 0 1.17.1Z" />
              </svg>
            </a>
          </div>
        </div>
        <div v-for="group in footer.links" :key="group.title" class="footer-links">
          <h4>{{ group.title }}</h4>
          <a v-for="item in group.items" :key="item.href" :href="item.href" target="_blank" rel="noopener">
            {{ item.label }}
          </a>
        </div>
      </div>
      <div class="footer-meta">
        <p>{{ footer.copyright }}</p>
        <p>{{ footer.build }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    logo: string
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
    metrics: { label: string; value: string }[]
  }
  features: {
    title: string
    description: string
    items: {
      title: string
      body: string
      icon: string
      accent: string
    }[]
  }
  steps: {
    title: string
    description: string
    tag: string
    commands: string[]
    success: string
    primary: { label: string }
    secondary: { label: string; href: string }
  }
  footer: {
    name: string
    description: string
    socials: { icon: 'github' | 'telegram'; href: string }[]
    links: { title: string; items: { label: string; href: string }[] }[]
    copyright: string
    build: string
  }
}>()

const hasFeatures = computed(() => Boolean(props.features?.items?.length))

const isMarkupIcon = (icon: string) => icon.trim().startsWith('<')
const isIconifyIcon = (icon: string) => icon.includes(':')
const isPathIcon = (icon: string) => !isMarkupIcon(icon) && !isIconifyIcon(icon)
const toPath = (icon: string) => `<path d="${icon.trim()}" />`
</script>
