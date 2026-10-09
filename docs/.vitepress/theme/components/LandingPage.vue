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
        <div class="sk-panel">
          <h2 class="sk-panel__title">{{ overview.title }}</h2>
          <div class="sk-cols">
            <div v-for="col in overview.columns" :key="col.heading" class="sk-col">
              <h3>{{ col.heading }}</h3>
              <ul>
                <li v-for="row in col.rows" :key="row.name">
                  <span class="sk-item__name">
                    {{ row.name }}
                    <small v-if="row.note">{{ row.note }}</small>
                  </span>
                  <span class="sk-level" :data-level="row.level">{{ row.label }}</span>
                </li>
              </ul>
            </div>
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
interface OverviewRow {
  name: string
  note?: string
  label: string
  /** full | basic | partial | manual | experimental */
  level: string
}

defineProps<{
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
  overview: {
    title: string
    columns: { heading: string; rows: OverviewRow[] }[]
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

</script>

<style scoped>
.sk-home {
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

/* ---- Compatibility overview ---- */
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

.sk-panel {
  padding: 28px 32px 32px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.sk-panel__title {
  margin: 0 0 20px;
  padding: 0;
  border: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.sk-cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.sk-col h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 700;
}

.sk-col ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sk-col li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 12px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.sk-item__name {
  min-width: 0;
  font-size: 0.9375rem;
}

.sk-item__name small {
  display: block;
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.sk-level {
  flex-shrink: 0;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.sk-level[data-level='full'] {
  border-color: color-mix(in srgb, var(--sk-accent) 50%, transparent);
  background: var(--vp-c-brand-soft);
  color: var(--sk-accent);
}

.sk-level[data-level='basic'],
.sk-level[data-level='manual'] {
  color: var(--vp-c-text-1);
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

  .sk-cols {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .sk-panel {
    padding: 22px 20px 24px;
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
  .sk-shot {
    animation: none;
  }

  .sk-card,
  .sk-link {
    transition: none !important;
  }
}
</style>
