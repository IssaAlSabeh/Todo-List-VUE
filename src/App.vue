<template>
  <div class="app-container">
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
export default {
  name: "App",
  components: {
    TaskList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  /* margin-top: 60px; */
  background-color: #23c790;
}

.app-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  overflow: scroll;
  /* padding-top: 100px; */
}
</style>
