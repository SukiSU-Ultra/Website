<template>
  <section class="landing-features">
    <div class="inner">
      <header class="section-head">
        <p v-if="kicker" class="eyebrow">{{ kicker }}</p>
        <h2 class="section-title">
          {{ title }}
          <span v-if="highlight" class="title-highlight">{{ highlight }}</span>
        </h2>
        <p v-if="description" class="section-lead">{{ description }}</p>
      </header>
      <div class="feature-grid">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <div class="icon-ring">
            <svg viewBox="0 0 64 64" aria-hidden="true" class="icon">
              <defs>
                <linearGradient id="featureGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="var(--vp-c-brand-2)" />
                  <stop offset="100%" stop-color="var(--vp-c-brand-3)" />
                </linearGradient>
              </defs>
              <rect x="6" y="6" width="52" height="52" rx="12" fill="url(#featureGradient)" opacity="0.18" />
              <path :d="feature.icon" fill="none" stroke="url(#featureGradient)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-body">{{ feature.body }}</p>
          <ul v-if="feature.points?.length" class="feature-points">
            <li v-for="point in feature.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FeaturePoint {
  title: string
  body: string
  points?: string[]
  icon: string
}

withDefaults(
  defineProps<{
    kicker?: string
    title: string
    highlight?: string
    description?: string
    features: FeaturePoint[]
  }>(),
  {
    features: () => []
  }
)
</script>

<style scoped>
.landing-features {
  position: relative;
  padding: 4.5rem 1.5rem 5.5rem;
  background: var(--vp-c-bg);
}

.dark .landing-features {
  background: rgba(2, 6, 23, 0.92);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.section-head {
  display: grid;
  gap: 1rem;
  justify-items: start;
}

.eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-2);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
}

.section-title {
  font-size: clamp(2.2rem, 3vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.title-highlight {
  display: block;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-lead {
  font-size: 1.1rem;
  max-width: 60ch;
  color: var(--vp-c-text-2);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 1.8rem;
  background: linear-gradient(160deg, rgba(148, 163, 184, 0.08), rgba(37, 99, 235, 0.08));
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
  backdrop-filter: blur(8px);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 58px rgba(15, 23, 42, 0.14);
  border-color: rgba(59, 130, 246, 0.45);
}

.icon-ring {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.4);
  display: grid;
  place-items: center;
  margin-bottom: 1.4rem;
}

.icon {
  width: 36px;
  height: 36px;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.8rem;
  color: var(--vp-c-text-1);
}

.feature-body {
  margin: 0 0 1rem;
  font-size: 0.98rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.feature-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.feature-points li {
  padding-left: 1.4rem;
  position: relative;
}

.feature-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
}

.dark .feature-card {
  background: linear-gradient(160deg, rgba(30, 41, 59, 0.62), rgba(37, 99, 235, 0.18));
  border-color: rgba(71, 85, 105, 0.55);
}

.dark .feature-card:hover {
  border-color: rgba(96, 165, 250, 0.6);
  box-shadow: 0 32px 60px rgba(2, 6, 23, 0.4);
}

.dark .icon-ring {
  background: rgba(37, 99, 235, 0.24);
  border-color: rgba(96, 165, 250, 0.5);
}
</style>
