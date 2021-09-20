<template>
  <div class="container">
    <form @submit="handleSubmit">
      <div class="form-control">
        <label for="url-input">
          Your URL:
        </label>
        <input type="text" class="url-input" />
        <input type="submit" class="submit-btn" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "UrlInput",
  components: {},
  data() {},
  created() {},
  methods: {
    handleSubmit(event: Event) {
      event.preventDefault();
      console.log("submitting input");
    },
  },
};
</script>

<style scope>
label {
  font-size: 1.5rem;
  margin: 0.5em 0;
  align-self: flex-start;
}
.container {
  display: flex;
  justify-content: center;
}
.form-control {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.url-input {
  border-radius: 10px;
  height: 5vh;
  width: 60vw;
}
.submit-btn {
                
}
</style>
