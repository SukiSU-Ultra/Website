<template>
  <section class="landing-showcase">
    <div class="showcase-shell">
      <header class="showcase-head">
        <p v-if="kicker" class="eyebrow">{{ kicker }}</p>
        <h2 class="showcase-title">{{ title }}</h2>
        <p v-if="description" class="showcase-lead">{{ description }}</p>
      </header>
      <div class="showcase-grid">
        <div class="tab-column" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="tab-button"
            :class="{ active: tab.value === current }"
            @click="current = tab.value"
            :aria-selected="tab.value === current"
            role="tab"
          >
            <span class="tab-label">{{ tab.label }}</span>
            <span class="tab-sub" v-if="tab.meta">{{ tab.meta }}</span>
          </button>
        </div>
        <div class="panel-column" role="tabpanel">
          <transition name="fade-slide" mode="out-in">
            <article
              v-if="activeTab"
              :key="activeTab.value"
              class="panel-card"
            >
              <h3 class="panel-title">{{ activeTab.headline }}</h3>
              <p class="panel-body" v-if="activeTab.body">{{ activeTab.body }}</p>
              <ul v-if="activeTab.points?.length" class="panel-points">
                <li v-for="point in activeTab.points" :key="point">{{ point }}</li>
              </ul>
              <pre v-if="activeTab.code?.length" class="panel-code">
                <code>
                  <span v-for="(line, index) in activeTab.code" :key="index">
                    <span class="code-index">{{ (index + 1).toString().padStart(2, '0') }}</span>
                    <span class="code-line">{{ line }}</span>
                  </span>
                </code>
              </pre>
            </article>
          </transition>
        </div>
      </div>
      <footer v-if="footnote" class="showcase-foot">{{ footnote }}</footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface ShowcaseTab {
  value: string
  label: string
  meta?: string
  headline: string
  body?: string
  points?: string[]
  code?: string[]
}

const props = withDefaults(
  defineProps<{
    kicker?: string
    title: string
    description?: string
    tabs: ShowcaseTab[]
    footnote?: string
    initial?: string
  }>(),
  { tabs: () => [] }
)

const current = ref(props.initial || (props.tabs[0]?.value ?? ''))

watch(
  () => props.initial,
  value => {
    if (value) current.value = value
  }
)

const activeTab = computed(() => props.tabs.find(tab => tab.value === current.value))
</script>

<style scoped>
.landing-showcase {
  position: relative;
  padding: 5rem 1.5rem 5.5rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), transparent 45%);
}

.dark .landing-showcase {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.68), rgba(2, 6, 23, 0.9) 55%);
}

.showcase-shell {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 2rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 3rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.12);
}

.dark .showcase-shell {
  background: rgba(15, 23, 42, 0.72);
  border-color: rgba(71, 85, 105, 0.45);
  box-shadow: 0 40px 90px rgba(2, 6, 23, 0.48);
}

.showcase-head {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;
  max-width: 60ch;
}

.eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-2);
}

.showcase-title {
  font-size: clamp(2rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--vp-c-text-1);
}

.showcase-lead {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
}

.showcase-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 860px) {
  .showcase-grid {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 2rem;
  }
}

.tab-column {
  display: grid;
  gap: 0.75rem;
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
  cursor: pointer;
}

.tab-button.active {
  border-color: rgba(37, 99, 235, 0.55);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(37, 99, 235, 0.1));
  transform: translateX(4px);
}

.tab-button:hover {
  border-color: rgba(37, 99, 235, 0.45);
}

.tab-label {
  font-size: 1rem;
}

.tab-sub {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.dark .tab-button {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(71, 85, 105, 0.45);
  color: rgba(226, 232, 240, 0.92);
}

.dark .tab-button.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(14, 116, 144, 0.24));
  border-color: rgba(96, 165, 250, 0.55);
}

.panel-column {
  position: relative;
}

.panel-card {
  border-radius: 1.5rem;
  padding: 1.8rem;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
}

.dark .panel-card {
  background: rgba(15, 23, 42, 0.68);
  border-color: rgba(71, 85, 105, 0.5);
}

.panel-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-1);
}

.panel-body {
  margin: 0 0 1.1rem;
  font-size: 0.98rem;
  color: var(--vp-c-text-2);
}

.panel-points {
  list-style: none;
  padding: 0;
  margin: 0 0 1.4rem;
  display: grid;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.panel-points li {
  padding-left: 1.4rem;
  position: relative;
}

.panel-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45rem;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
}

.panel-code {
  margin: 0;
  padding: 1.2rem 1.4rem;
  border-radius: 1.1rem;
  background: rgba(15, 23, 42, 0.9);
  color: rgba(226, 232, 240, 0.9);
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow: auto;
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.2);
}

.panel-code code {
  display: grid;
  gap: 0.35rem;
}

.code-index {
  display: inline-block;
  width: 2ch;
  margin-right: 1rem;
  color: rgba(148, 163, 184, 0.5);
}

.code-line {
  white-space: pre-wrap;
}

.showcase-foot {
  margin-top: 2.2rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
