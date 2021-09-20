<template>
  <div class="home">
    <h1>Home</h1>
    <UrlInput></UrlInput>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UrlInput from "../components/UrlInput.vue";

export default defineComponent({
  name: "Home",
  components: { UrlInput },
});
</script>
