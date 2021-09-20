<template>
  <div class="container">
    <div v-if="isData" class="list">
      <h1 :key="url.id" v-for="url in urls">{{ url.id }}</h1>
    </div>
    <h1 v-if="isError">
      There was an error in retreiveing your URLs.
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { UrlInterface } from "../types";

export default defineComponent({
  name: "UrlsList",
  data() {
    return {
      urls: [] as UrlInterface[],
      isError: false as boolean,
    };
  },
  async created() {
    const request = await fetch("/api/urls");
    if (request.ok) {
      const data = await request.json();
      this.urls = data;
      this.isError = false;
    } else {
      this.isError = true;
    }
  },
  computed: {
    isData(): boolean {
      return this.urls != null && this.urls.length > 0;
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
