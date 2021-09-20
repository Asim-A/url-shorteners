<template>
  <div>
    <UrlList></UrlList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UrlList from "../components/UrlsList.vue";

export default defineComponent({
  name: "Urls",
  components: { UrlList },
});
</script>
