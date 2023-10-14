<template>
  <div class="item-container">
    <span class="material-symbols-outlined" @click="deleteTask"> delete </span>
    <div :class="[isDone, 'item']" @click="toggleCompletion">
      {{ task.title }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "TaskItem",
  props: ["task"],
  setup(props, context) {
    const done = computed(() => {
      return props.task.isCompleted;
    });

    const toggleCompletion = () => {
      context.emit("toggle-completion", props.task.id);
    };

    const deleteTask = () => {
      context.emit("delete-task", props.task.id);
    };

    const isDone = computed(() => (done.value ? "done" : "not-done"));

    return {
      toggleCompletion,
      isDone,
      deleteTask,
    };
  },
};
</script>

<style scoped>
.item {
  padding: 20px 60px;
  line-height: 20px;
  font-size: 20px;
  display: inline-block;
  cursor: pointer;
}
.done {
  color: green;
  text-decoration: line-through;
}

.not-done {
  color: #4d4d4d;
  text-decoration: none;
}

.material-symbols-outlined {
  float: right;
  cursor: pointer;
  color: red;
}

.item-container {
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 9px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding-left: 50px;
  margin-bottom: 20px;
}
</style>
