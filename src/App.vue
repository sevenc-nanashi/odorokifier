<script setup lang="ts">
import { computed, onUnmounted, ref, useTemplateRef, watch } from "vue";
import AppIcon from "./AppIcon.vue";
import {
  presets,
  parameters,
  generatePrompt,
  type Preset,
  type ParameterValues,
} from "./generator.ts";

const preset = ref(presets[0]);
const values = ref<ParameterValues>({ ...preset.value.defaultParameters });
const topic = ref("");
const guide = useTemplateRef<HTMLDialogElement>("guide");
const copied = ref(false);
const copyError = ref(false);
let feedbackTimer: ReturnType<typeof setTimeout> | undefined;
let copyRevision = 0;

const promptText = computed(() => generatePrompt(preset.value, values.value, topic.value));
const promptParts = computed(() =>
  promptText.value.split(/(\n\n|^)(?=# )/u).map((part) => {
    const end = part.indexOf("\n");
    return part.startsWith("# ")
      ? { heading: part.slice(0, end), body: part.slice(end) }
      : { heading: "", body: part };
  }),
);

function selectPreset(item: Preset) {
  preset.value = item;
  values.value = { ...item.defaultParameters };
}

function resetCopyFeedback() {
  clearTimeout(feedbackTimer);
  copyRevision++;
  copied.value = false;
  copyError.value = false;
}

watch(promptText, resetCopyFeedback, { flush: "sync" });
onUnmounted(resetCopyFeedback);

async function copyPrompt() {
  resetCopyFeedback();
  const revision = copyRevision;
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(promptText.value);
    if (revision !== copyRevision) return;
    copied.value = true;
    feedbackTimer = setTimeout(resetCopyFeedback, 2700);
  } catch {
    if (revision !== copyRevision) return;
    copyError.value = true;
  }
}

function closeOnBackdrop(event: MouseEvent) {
  const dialog = guide.value;
  if (!dialog) throw new Error("Guide dialog is not mounted");
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    dialog.close();
}
</script>

<template>
  <header class="masthead">
    <div class="mast-inner">
      <div class="brand">
        <img src="assets/brand.svg" alt="" width="31" height="31" /><span>Odorokifier</span>
      </div>
      <button
        class="help slop-btn slop-btn-ghost"
        id="help"
        type="button"
        @click="guide!.showModal()"
      >
        <AppIcon name="book" />使い方
      </button>
    </div>
  </header>
  <main class="wrap">
    <section class="hero slop-card-beam" aria-labelledby="title">
      <div class="hero-copy">
        <h1 id="title" class="slop-text-gradient">AI驚き屋メーカー</h1>
        <p>口調と「理解の浅さ」を調整して、<wbr />あなただけのAI驚き屋プロンプトをつくろう。</p>
      </div>
      <img class="mascot" src="assets/odoroki-pc.webp" alt="" width="680" height="450" />
    </section>
    <div class="workbench">
      <div class="controls">
        <section class="slop-card panel" aria-labelledby="preset-title">
          <h2 id="preset-title"><AppIcon class="section-icon" name="grid" />口調プリセット</h2>
          <div class="presets" id="presets" role="group" aria-labelledby="preset-title">
            <button
              v-for="item in presets"
              :key="item.id"
              type="button"
              class="preset"
              :data-preset="item.id"
              :aria-pressed="item.id === preset.id"
              @click="selectPreset(item)"
            >
              <span class="preset-symbol" :class="item.color"><AppIcon :name="item.icon" /></span>
              <span class="preset-text"
                ><span class="preset-name">{{ item.name }}</span
                ><span class="preset-desc">{{ item.description }}</span></span
              >
            </button>
          </div>
        </section>
        <section class="slop-card panel adjust" aria-labelledby="parameter-title">
          <h2 id="parameter-title">
            <AppIcon class="section-icon" name="sliders" />パラメーター調整
          </h2>
          <div id="sliders">
            <div v-for="parameter in parameters" :key="parameter.key" class="slider-row">
              <div class="slider-label">
                <label :for="parameter.key"
                  ><AppIcon :name="parameter.icon" />{{ parameter.label }}</label
                >
                <span class="slider-value" :id="'value-' + parameter.key" aria-hidden="true">{{
                  values[parameter.key]
                }}</span>
              </div>
              <input
                :id="parameter.key"
                v-model.number="values[parameter.key]"
                class="range"
                type="range"
                min="0"
                max="100"
                step="5"
                :aria-valuetext="`${values[parameter.key]}、${parameter.low}から${parameter.high}まで`"
              />
              <div class="scale" aria-hidden="true">
                <span>{{ parameter.low }}</span
                ><span>{{ parameter.high }}</span>
              </div>
            </div>
          </div>
          <div class="topic">
            <label for="topic"
              ><AppIcon class="section-icon" name="edit" />投稿テーマ
              <span class="optional">任意</span></label
            >
            <input
              type="text"
              id="topic"
              v-model="topic"
              placeholder="例：AIによるブラウザの自動操作"
              autocomplete="off"
            />
          </div>
        </section>
      </div>
      <section class="slop-card panel preview" aria-labelledby="preview-title">
        <div class="preview-head">
          <h2 id="preview-title">
            <AppIcon class="section-icon" name="terminal" />プロンプトプレビュー
          </h2>
          <span class="live slop-badge slop-badge-emerald" aria-label="自動更新"><i></i>LIVE</span>
        </div>
        <div class="editor slop-terminal">
          <div class="filebar slop-terminal-header">
            <div class="filename"><AppIcon name="file" />prompt.txt</div>
            <span class="filedots" aria-hidden="true"><i></i><i></i><i></i></span>
          </div>
          <div
            id="prompt"
            class="prompt"
            tabindex="0"
            role="region"
            aria-label="生成されたプロンプト"
          >
            <template v-for="(part, index) in promptParts" :key="index"
              ><strong v-if="part.heading">{{ part.heading }}</strong
              >{{ part.body }}</template
            >
          </div>
        </div>
        <div class="count" id="count">
          {{ Array.from(promptText).length.toLocaleString("ja-JP") }} 文字
        </div>
        <button
          type="button"
          id="copy"
          class="copy slop-btn slop-btn-primary"
          :class="{ done: copied }"
          @click="copyPrompt"
        >
          <AppIcon :name="copied ? 'check' : 'copy'" /><span id="copy-label">{{
            copied ? "コピーしました" : "プロンプトをコピー"
          }}</span>
        </button>
        <p class="copy-hint">ChatGPTなどに貼り付けて使えます。</p>
        <p
          class="announce"
          :class="{ error: copyError }"
          id="status"
          role="status"
          aria-live="polite"
        >
          {{
            copyError
              ? "コピーできませんでした。プレビューの文章を選択して手動でコピーしてください。"
              : copied
                ? "プロンプトをコピーしました。"
                : ""
          }}
        </p>
      </section>
    </div>
    <footer>
      <span class="footer-mark">Odorokifier</span
      ><span
        >Source:
        <a href="https://github.com/sevenc-nanashi/odorokifier" target="_blank" rel="noopener"
          >sevenc-nanashi/odorokifier</a
        ></span
      >
    </footer>
  </main>
  <dialog ref="guide" @click="closeOnBackdrop" id="guide" aria-labelledby="guide-title">
    <div class="dialog-head">
      <h2 id="guide-title"><AppIcon class="section-icon" name="book" />使い方</h2>
      <button type="button" id="close-guide" @click="guide!.close()" aria-label="閉じる">
        <AppIcon name="x" />
      </button>
    </div>
    <ol>
      <li>
        <strong>口調プリセットを選ぶ</strong>
        <p>文体を選ぶと、4つのスライダーにその口調の初期値が入ります。</p>
      </li>
      <li>
        <strong>理解の浅さや投稿テーマを調整する</strong>
        <p>
          スライダーはそれぞれ独立しています。各値は3段階の文章指示に変わります。テーマを空欄にすると、架空のAIによる会議メモの要約が題材になります。
        </p>
      </li>
      <li>
        <strong>コピーしてチャットに貼り付ける</strong>
        <p>「プロンプトをコピー」を押し、ChatGPTなどに貼り付けて送信してください。</p>
      </li>
    </ol>
  </dialog>
</template>
