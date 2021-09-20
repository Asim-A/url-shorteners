<template>
  <div class="container">
    <p>{{ url.shortenedUrl }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UrlInterface } from "../types/index";

export default defineComponent({
  name: "ShortenedUrl",
  props: {
    url: { type: Object as PropType<UrlInterface> },
  },
});
</script>

<style scoped></style>
