<template>
  <div id="app">
    <div class="container">
      <h1 class="app-label">Table UI</h1>
      <TopBar />
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";
import TopBar from "./components/TopBar.vue";

export default {
  name: "App",
  components: {
    Table,
    TopBar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap");
@import "/scss/colors";
@media (max-width: 1208px) {
  .app-label{
    text-align: center;
  }
  .container{
    width: 100%;
  }
}
body {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: $black;
}

h1 {
  font-size: 37px;
}

.app-label {
  color: $blueDark1;
  margin-top: 32px;
}

.container{
  width: 1200px;
  margin: 0 auto;
}
</style>
