<template>
  <section class="landing-hero">
    <div class="hero-background" aria-hidden="true">
      <div class="glow glow-one"></div>
      <div class="glow glow-two"></div>
      <div class="grid"></div>
    </div>
    <div class="hero-container">
      <div class="hero-copy">
        <p v-if="kicker" class="kicker">{{ kicker }}</p>
        <h1 class="title">
          <span>{{ title }}</span>
          <span v-if="highlight" class="highlight">{{ highlight }}</span>
        </h1>
        <p v-if="description" class="description">{{ description }}</p>
        <div v-if="badges.length" class="badge-strip">
          <span v-for="badge in badges" :key="badge" class="badge">{{ badge }}</span>
        </div>
        <div class="cta-row">
          <a v-if="primary" :href="primary.href" class="cta primary">
            {{ primary.label }}
          </a>
          <a v-if="secondary" :href="secondary.href" class="cta secondary">
            {{ secondary.label }}
          </a>
        </div>
        <dl v-if="metrics.length" class="metric-grid">
          <div v-for="metric in metrics" :key="metric.label" class="metric-card">
            <dt class="metric-value">{{ metric.value }}</dt>
            <dd class="metric-label">{{ metric.label }}</dd>
          </div>
        </dl>
      </div>
      <div class="hero-panel">
        <div v-if="panelTitle" class="panel-title">{{ panelTitle }}</div>
        <pre v-if="code.length" class="code-block">
          <code>
            <span v-for="(line, index) in code" :key="index">
              <span class="line-index">{{ (index + 1).toString().padStart(2, '0') }}</span>
              <span class="line-content" v-html="colorize(line)"></span>
            </span>
          </code>
        </pre>
        <div v-if="callouts.length" class="callout-list">
          <div v-for="callout in callouts" :key="callout.title" class="callout-card">
            <h3>{{ callout.title }}</h3>
            <p>{{ callout.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    kicker?: string
    title: string
    highlight?: string
    description?: string
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
    metrics?: { label: string; value: string }[]
    badges?: string[]
    code?: string[]
    panelTitle?: string
    callouts?: { title: string; body: string }[]
  }>(),
  {
    metrics: () => [],
    badges: () => [],
    code: () => [],
    callouts: () => []
  }
)

const highlightWords = [
  'bun',
  'install',
  'sukisu',
  'ultra',
  'android',
  'kernel',
  'flash',
  'deploy'
]

const colorize = (line: string) => {
  if (!line) return ''
  const pattern = new RegExp(`\\b(${highlightWords.join('|')})\\b`, 'gi')
  return line.replace(pattern, match => `<span class="token">${match}</span>`)
}
</script>

<style scoped>
.landing-hero {
  position: relative;
  padding: 6rem 1.5rem 5rem;
  overflow: hidden;
  color: var(--vp-c-text-1);
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.15), transparent 55%),
    radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.18), transparent 60%),
    var(--vp-c-bg-soft);
}

@media (min-width: 768px) {
  .landing-hero {
    padding: 7rem 2rem 6rem;
  }
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  filter: blur(120px);
  opacity: 0.8;
  transform: translate3d(0, 0, 0);
}

.glow-one {
  width: 40rem;
  height: 40rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.55), rgba(168, 85, 247, 0.35));
  top: -18rem;
  right: -12rem;
}

.glow-two {
  width: 32rem;
  height: 32rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.45), rgba(59, 130, 246, 0.4));
  bottom: -16rem;
  left: -10rem;
}

.grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.55), transparent 70%);
}

.hero-container {
  position: relative;
  display: grid;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  align-items: start;
}

@media (min-width: 960px) {
  .hero-container {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 4rem;
  }
}

.hero-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1;
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(37, 99, 235, 0.12);
  color: var(--vp-c-brand-1);
  width: fit-content;
  font-weight: 600;
}

.title {
  font-size: clamp(2.8rem, 4vw, 3.8rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.highlight {
  display: block;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.description {
  font-size: 1.1rem;
  max-width: 46ch;
  color: var(--vp-c-text-2);
}

.badge-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  background: rgba(15, 118, 110, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.32);
  color: rgb(20, 184, 166);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  border-radius: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.cta.primary {
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  color: white;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.25);
}

.cta.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.35);
}

.cta.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-1);
  border: 1px solid rgba(148, 163, 184, 0.35);
  backdrop-filter: blur(12px);
}

.cta.secondary:hover {
  transform: translateY(-1px);
  border-color: rgba(148, 163, 184, 0.6);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric-card {
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.14);
  backdrop-filter: blur(6px);
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.metric-label {
  margin-top: 0.2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.hero-panel {
  position: relative;
  border-radius: 1.75rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.08), rgba(14, 116, 144, 0.16));
  padding: 2rem;
  box-shadow: 0 40px 80px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(22px);
  overflow: hidden;
}

.panel-title {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.9);
  margin-bottom: 1rem;
}

.code-block {
  margin: 0;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: rgba(15, 23, 42, 0.9);
  color: rgba(226, 232, 240, 0.9);
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  max-height: 260px;
  overflow: auto;
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.15);
}

.code-block code {
  display: grid;
  gap: 0.4rem;
}

.line-index {
  display: inline-block;
  width: 2ch;
  margin-right: 1rem;
  color: rgba(148, 163, 184, 0.55);
}

.line-content {
  white-space: pre-wrap;
}

.token {
  color: #38bdf8;
}

.callout-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.callout-card {
  border-radius: 1rem;
  padding: 1rem 1.2rem;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: rgba(226, 232, 240, 0.92);
}

.callout-card h3 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
}

.callout-card p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(203, 213, 225, 0.9);
}

@media (max-width: 959px) {
  .hero-panel {
    order: -1;
    max-width: 520px;
  }
}

.dark .landing-hero {
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.22), transparent 55%),
    radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.28), transparent 60%),
    rgba(2, 6, 23, 0.9);
}

.dark .cta.secondary {
  background: rgba(30, 41, 59, 0.6);
  color: rgba(226, 232, 240, 0.92);
  border-color: rgba(71, 85, 105, 0.6);
}

.dark .metric-card {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(51, 65, 85, 0.35);
}

.dark .callout-card {
  background: rgba(30, 41, 59, 0.68);
  border-color: rgba(71, 85, 105, 0.45);
}
</style>
