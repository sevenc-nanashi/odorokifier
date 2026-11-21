<script setup lang="ts">
defineProps({ name: { type: String, required: true } });
const shapes: Record<string, string> = {
  book: '<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
  sliders:
    '<path d="M3 6h4m4 0h10M3 18h9m4 0h5M3 12h11m4 0h3"/><circle cx="9" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="14" cy="18" r="2"/>',
  bolt: '<path d="m13.5 2-10 12h7l-1 8 11-13h-7l1-7Z" fill="currentColor" fill-opacity=".12"/>',
  news: '<path d="M3 6h4m-4 4h4m-4 4h4M8 4h12v15l-2 2-2-2-2 2-2-2-2 2-2-2V4Z"/><path d="M11 8h6m-6 4h6m-6 4h3"/>',
  glasses:
    '<path d="m3 13 1.5-5.5c.4-1.3 1-2 2.5-2m14 7.5-1.5-5.5c-.4-1.3-1-2-2.5-2M9.5 13c1.4-1.2 3.6-1.2 5 0"/><rect x="2" y="11" width="8" height="7" rx="2.8"/><rect x="14" y="11" width="8" height="7" rx="2.8"/>',
  briefcase:
    '<rect x="2.5" y="7" width="19" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c5 2 13 2 18 0m-10 1h2v3h-2z"/>',
  terminal:
    '<rect x="2.5" y="4" width="19" height="16" rx="2.2"/><path d="m6.5 9 3.5 3-3.5 3m6 0h4.5"/>',
  file: '<path d="M6 2.5h8l4.5 4.8V21H6zM14 3v5h4.5M9 12h6m-6 4h6"/>',
  edit: '<path d="m5 15-2 6 6-2 12-12-4-4L5 15Zm0 0 4 4m5-13 4 4"/>',
  brain:
    '<path d="M12 5a3 3 0 0 0-5.5-1A3.4 3.4 0 0 0 3 8.8a4 4 0 0 0 0 6.2A3.6 3.6 0 0 0 7 20a2.8 2.8 0 0 0 5-1.5V5Zm0 0a3 3 0 0 1 5.5-1A3.4 3.4 0 0 1 21 8.8a4 4 0 0 1 0 6.2 3.6 3.6 0 0 1-4 5 2.8 2.8 0 0 1-5-1.5M5.5 9c1.7 0 2.5 1 2.5 2.5m8.5 3c0-1 1-2 2-2"/>',
  activity: '<path d="M2 13h4l3-9 5 16 3-9 2 2h3"/>',
  flag: '<path d="M5 21V3m0 1c6-4 8 4 15 0v10c-7 4-9-4-15 0"/>',
  megaphone: '<path d="M3 10h4l11-5v14L7 14H3v-4Zm4 4 2 6h3l-2-5m11-5 1-1m-1 5 1 1"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14a4 4 0 0 0 8 0M8 9h.01M16 9h.01"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  x: '<path d="m5 5 14 14M19 5 5 19"/>',
};
</script>

<template>
  <span :data-icon="name"
    ><svg
      class="icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-html="shapes[name]"
    ></svg
  ></span>
</template>
