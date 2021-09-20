<template>
  <div class="row">
    <div class="container">
      <form @submit="handleSubmit">
        <div class="form-control">
          <label for="url-input">
            Your URL:
          </label>

          <div class="row">
            <input v-model="input" type="text" class="url-input" />
            <input type="submit" class="submit-btn" value="Shorten" />
          </div>
        </div>
      </form>
      <div class="row">
        <ShortenedUrl v-if="resultUrlExists" :url="result"></ShortenedUrl>
        <h1 v-if="isError" class="error">
          There was an error shortening your URL
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CreateShortenedUrlCommand, UrlInterface } from "../types";
import { defineComponent } from "vue";
import ShortenedUrl from "./ShortenedUrl.vue";

export default defineComponent({
  name: "UrlInput",
  components: { ShortenedUrl },
  data() {
    return {
      input: "" as string,
      result: {} as UrlInterface,
      isError: false as boolean,
    };
  },
  created() {},
  methods: {
    async createShortenedUrl(actualUrlString: string) {
      const createShortenedUrlCommand = {
        actualUrl: actualUrlString,
      } as CreateShortenedUrlCommand;
      const request = await fetch("/api/urls", {
        method: "POST",
        body: JSON.stringify(createShortenedUrlCommand),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        this.result = await request.json();
        this.isError = false;
      } else {
        this.isError = true;
        console.log(request.body);
        console.log(this.isError);
      }
    },
    async handleSubmit(event: Event) {
      event.preventDefault();
      if (this.input != null && this.input.length > 0) {
        console.log(`input is: ${this.input}`);
        await this.createShortenedUrl(this.input);
        this.input = "";
      }
    },
  },
  computed: {
    resultUrlExists(): boolean {
      return (
        this.result.shortenedUrl != null && this.result.shortenedUrl.length > 0
      );
    },
  },
});
</script>

<style scope>
label {
  font-size: 1.5rem;
  margin: 0.5em 0;
  align-self: flex-start;
}
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.form-control {
  display: flex;
  flex-direction: column;
  align-content: center;
}

input {
  font-weight: 500;
  border: 1px solid #e5e5e5;
  padding: 16px 12px;
  height: auto;
  border-radius: 10px;
}

input:focus {
  outline: 2px solid #056e3f;
}

.url-input {
  width: 30vw;
  font-size: 16px;
  color: #056e3f;
}

.submit-btn {
  margin-left: 0.5rem;
}

.error {
  color: red;
  font-weight: bold;
  font-size: 1.75rem;
}
</style>
