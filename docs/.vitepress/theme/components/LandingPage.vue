<template>
  <div class="sk-home">
    <section class="sk-hero">
      <div class="sk-hero__bg" aria-hidden="true"></div>

      <div class="sk-hero__copy">
        <a class="sk-badge" :href="hero.badgeHref" target="_blank" rel="noopener">
          <img :src="hero.logo" alt="" width="20" height="20" />
          {{ hero.badge }}
        </a>
        <h1>
          <span>{{ hero.title }}</span>
        </h1>
        <p class="sk-hero__sub">{{ hero.subtitle }}</p>
        <div class="sk-actions">
          <a class="sk-btn sk-btn--primary" :href="hero.primary.href">{{ hero.primary.label }}</a>
          <a class="sk-btn sk-btn--ghost" :href="hero.secondary.href" target="_blank" rel="noopener">
            {{ hero.secondary.label }}
          </a>
        </div>
        <ul class="sk-chips">
          <li v-for="chip in hero.chips" :key="chip">{{ chip }}</li>
        </ul>
      </div>

      <div class="sk-shot">
        <div class="sk-demo" role="img" :aria-label="demo.label">
          <div class="sk-demo__bar">
            <span class="sk-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="sk-demo__file">{{ demo.title }}</span>
            <button type="button" class="sk-replay" @click="play">{{ demo.replay }}</button>
          </div>

          <div class="sk-demo__body" aria-hidden="true">
            <div class="sk-term">
              <div class="sk-cmd">
                <span class="sk-prompt">$</span> {{ cmdShown }}<i v-if="typing" class="sk-caret"></i>
              </div>
              <div
                v-for="(line, i) in demo.log"
                :key="i"
                class="sk-log"
                :class="{ on: step > i, last: i === demo.log.length - 1 }"
              >
                {{ line }}
              </div>
            </div>

            <ul class="sk-tree">
              <li v-for="(row, i) in demo.tree" :key="row.name" class="sk-row" :class="{ hit: step >= row.at }">
                <span class="sk-row__name">{{ row.name }}</span>
                <span class="sk-tag" :class="{ on: step >= row.at }">{{ row.tag }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="sk-section">
      <h2>{{ features.title }}</h2>
      <p class="sk-lead">{{ features.description }}</p>
      <div class="sk-grid">
        <article v-for="feature in features.items" :key="feature.title" class="sk-card">
          <span class="sk-card__icon">
            <IconifyIcon :icon="feature.icon" :width="24" :height="24" aria-hidden="true" />
          </span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.body }}</p>
        </article>
      </div>
    </section>

    <section class="sk-section">
      <h2>{{ community.title }}</h2>
      <div class="sk-community">
        <a
          v-for="item in community.items"
          :key="item.href"
          class="sk-link"
          :href="item.href"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="item.icon" /></svg>
          <span>
            <strong>{{ item.title }}</strong>
            <small>{{ item.body }}</small>
          </span>
        </a>
      </div>

      <div class="sk-banner">
        <div>
          <h3>{{ banner.title }}</h3>
          <p>{{ banner.body }}</p>
        </div>
        <a class="sk-btn sk-btn--primary" :href="hero.primary.href">{{ banner.cta }}</a>
      </div>
    </section>

    <footer class="sk-footer">
      <div class="sk-footer__grid">
        <div class="sk-footer__brand">
          <strong>{{ footer.name }}</strong>
          <p>{{ footer.description }}</p>
        </div>
        <div v-for="group in footer.links" :key="group.title" class="sk-footer__col">
          <h4>{{ group.title }}</h4>
          <a v-for="item in group.items" :key="item.href" :href="item.href">{{ item.label }}</a>
        </div>
      </div>
      <div class="sk-footer__meta">
        <p>{{ footer.copyright }}</p>
        <p>{{ footer.build }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface TreeRow {
  name: string
  tag: string
  /** number of log lines that must be shown before this row is highlighted */
  at: number
}

const props = defineProps<{
  hero: {
    badge: string
    badgeHref: string
    title: string
    subtitle: string
    logo: string
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
    chips: string[]
  }
  demo: {
    label: string
    title: string
    replay: string
    command: string
    log: string[]
    tree: TreeRow[]
  }
  features: {
    title: string
    description: string
    items: { title: string; body: string; icon: string }[]
  }
  community: {
    title: string
    items: { title: string; body: string; href: string; icon: string }[]
  }
  banner: { title: string; body: string; cta: string }
  footer: {
    name: string
    description: string
    links: { title: string; items: { label: string; href: string }[] }[]
    copyright: string
    build: string
  }
}>()

// Typing animation for the demo. Each log line is revealed in turn after the
// command has been typed; with reduced motion everything is shown at once.
const typed = ref(0)
const step = ref(0)
let timers: number[] = []

function clear() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function play() {
  clear()
  const cmd = props.demo.command
  const lines = props.demo.log.length
  typed.value = 0
  step.value = 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = cmd.length
    step.value = lines
    return
  }
  const perChar = 14
  for (let i = 1; i <= cmd.length; i++) {
    timers.push(window.setTimeout(() => (typed.value = i), 600 + i * perChar))
  }
  const base = 600 + cmd.length * perChar + 300
  for (let s = 1; s <= lines; s++) {
    timers.push(window.setTimeout(() => (step.value = s), base + (s - 1) * 420))
  }
}

onMounted(play)
onBeforeUnmount(clear)

const cmdShown = computed(() => props.demo.command.slice(0, typed.value))
const typing = computed(() => typed.value < props.demo.command.length)
</script>

<style scoped>
.sk-home {
  --sk-term: #0f1216;
  --sk-term-2: #151a20;
  --sk-term-line: rgba(255, 255, 255, 0.07);
  --sk-term-text: #e6edf3;
  --sk-term-dim: #8b95a1;
  --sk-ok: #8fe0b0;
  --sk-accent: var(--vp-c-brand-1);
  --sk-glow: color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  color: var(--vp-c-text-1);
}

/* ---- Hero ---- */
.sk-hero {
  position: relative;
  overflow: hidden;
  padding: 88px 24px 56px;
}

.sk-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 50% -8%, var(--sk-glow), transparent 70%),
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px) 0 0 / 56px 56px,
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px) 0 0 / 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%);
  opacity: 0.9;
}

.sk-hero__copy {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  animation: sk-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.sk-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px 5px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg) 70%, transparent);
  backdrop-filter: blur(6px);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none !important;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.sk-badge:hover {
  border-color: var(--sk-accent);
  color: var(--vp-c-text-1);
}

.sk-hero h1 {
  margin: 28px 0 0;
  font-size: clamp(2.6rem, 6.4vw, 4.75rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(
    180deg,
    var(--vp-c-text-1) 30%,
    color-mix(in srgb, var(--vp-c-text-1) 62%, var(--vp-c-bg))
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sk-hero__sub {
  max-width: 34em;
  text-wrap: balance;
  margin: 24px auto 0;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.sk-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
}

.sk-btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none !important;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.sk-btn--primary {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text) !important;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 6px 20px -8px var(--sk-glow);
}

.sk-btn--primary:hover {
  background: var(--vp-button-brand-hover-bg);
}

.sk-btn--ghost {
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 70%, transparent);
  color: var(--vp-c-text-1) !important;
}

.sk-btn--ghost:hover {
  border-color: var(--vp-c-text-2);
}

.sk-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.sk-chips li {
  margin: 0;
  padding: 3px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

/* ---- Demo window ---- */
.sk-shot {
  position: relative;
  max-width: 960px;
  margin: 56px auto 0;
  padding: 1px;
  border-radius: 17px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--sk-accent) 55%, transparent),
    color-mix(in srgb, var(--sk-accent) 5%, transparent) 40%,
    var(--vp-c-divider)
  );
  box-shadow: 0 40px 80px -40px rgba(10, 14, 20, 0.45), 0 0 120px -40px var(--sk-glow);
  animation: sk-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both;
}

.sk-demo {
  border-radius: 16px;
  background: var(--sk-term);
  overflow: hidden;
  color: var(--sk-term-text);
  font-family: ui-monospace, 'Fira Code', 'Cascadia Code', 'SF Mono', Consolas, monospace;
  font-size: 0.8125rem;
}

.sk-demo__bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 10px 14px;
  background: var(--sk-term-2);
  border-bottom: 1px solid var(--sk-term-line);
}

.sk-dots {
  display: flex;
  gap: 6px;
}

.sk-dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.sk-demo__file {
  color: var(--sk-term-dim);
}

.sk-replay {
  justify-self: end;
  padding: 2px 10px;
  border: 1px solid var(--sk-term-line);
  border-radius: 6px;
  background: transparent;
  color: var(--sk-term-dim);
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.sk-replay:hover {
  color: var(--sk-term-text);
  border-color: rgba(255, 255, 255, 0.2);
}

.sk-demo__body {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
}

.sk-term {
  padding: 20px;
  min-height: 19em;
  line-height: 1.75;
  border-right: 1px solid var(--sk-term-line);
}

.sk-cmd {
  overflow-wrap: anywhere;
  color: #fff;
}

.sk-prompt {
  color: var(--sk-accent);
}

.sk-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--sk-accent);
  animation: sk-blink 1s steps(1) infinite;
}

.sk-log {
  visibility: hidden;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s 0.25s;
  color: var(--sk-term-dim);
}

.sk-log.on {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.sk-log.last {
  color: var(--sk-ok);
}

.sk-tree {
  list-style: none;
  margin: 0;
  padding: 16px;
}

.sk-row {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--sk-term-dim);
  transition: color 0.3s ease, background-color 0.3s ease;
}

.sk-row + .sk-row {
  margin-top: 2px;
}

.sk-row.hit {
  color: var(--sk-term-text);
  background: rgba(255, 255, 255, 0.05);
}

.sk-row__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sk-tag {
  flex-shrink: 0;
  padding: 1px 7px;
  border: 1px solid color-mix(in srgb, var(--sk-accent) 45%, transparent);
  border-radius: 5px;
  font-size: 0.6875rem;
  color: var(--sk-accent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.sk-tag.on {
  opacity: 1;
}

/* ---- Sections ---- */
.sk-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 72px 24px 0;
}

.sk-section h2 {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.sk-lead {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
}

.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 28px;
}

.sk-card {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.sk-card:hover {
  border-color: var(--sk-accent);
  background: var(--vp-c-brand-soft);
}

.sk-card__icon {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  color: var(--sk-accent);
}

.sk-card h3 {
  margin: 16px 0 0;
  font-size: 1.0625rem;
  font-weight: 700;
}

.sk-card p {
  margin: 8px 0 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* ---- Community ---- */
.sk-community {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.sk-link {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.sk-link:hover {
  border-color: var(--sk-accent);
  background: var(--vp-c-brand-soft);
}

.sk-link svg {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  fill: currentColor;
}

.sk-link strong {
  display: block;
}

.sk-link small {
  display: block;
  margin-top: 2px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* ---- Closing banner ---- */
.sk-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
  padding: 36px 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background:
    radial-gradient(120% 160% at 0% 0%, var(--vp-c-brand-soft), transparent 60%),
    var(--vp-c-bg-soft);
}

.sk-banner h3 {
  margin: 0;
  font-size: 1.625rem;
  font-weight: 800;
}

.sk-banner p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}

.sk-banner .sk-btn {
  flex-shrink: 0;
}

/* ---- Footer ---- */
.sk-footer {
  max-width: 1152px;
  margin: 72px auto 0;
  padding: 40px 24px 48px;
  border-top: 1px solid var(--vp-c-divider);
}

.sk-footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.sk-footer__brand strong {
  font-size: 1.125rem;
}

.sk-footer__brand p {
  max-width: 28em;
  margin: 8px 0 0;
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

.sk-footer__col h4 {
  margin: 0 0 10px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.sk-footer__col a {
  display: block;
  padding: 3px 0;
  font-size: 0.9375rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.sk-footer__col a:hover {
  color: var(--sk-accent);
}

.sk-footer__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 32px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.sk-footer__meta p {
  margin: 0;
}

/* ---- Motion / a11y ---- */
@keyframes sk-blink {
  50% {
    opacity: 0;
  }
}

@keyframes sk-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

.sk-btn:focus-visible,
.sk-badge:focus-visible,
.sk-replay:focus-visible,
.sk-link:focus-visible {
  outline: 2px solid var(--sk-accent);
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .sk-hero {
    padding: 48px 16px 40px;
  }

  .sk-shot {
    margin-top: 40px;
  }

  .sk-demo__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .sk-term {
    min-height: 14em;
    border-right: 0;
    border-bottom: 1px solid var(--sk-term-line);
  }

  .sk-section {
    padding: 48px 16px 0;
  }

  .sk-community,
  .sk-footer__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .sk-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
  }

  .sk-footer {
    padding: 32px 16px 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk-hero__copy,
  .sk-shot,
  .sk-caret {
    animation: none;
  }

  .sk-log,
  .sk-row,
  .sk-tag,
  .sk-card,
  .sk-link {
    transition: none !important;
  }
}
</style>
