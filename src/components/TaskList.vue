<template>
  <div class="list-container">
    <div class="list-header">
      <h1 class="list-day">Todo List</h1>
      <p class="list-date">{{ date }}</p>
    </div>
    <div class="list-footer">
      <form @submit.prevent>
        <input
          type="text"
          name="newTask"
          placeholder="New task"
          v-model="newTaskTitle"
        />
        <button @click="addTask">Add</button>
      </form>
    </div>

    <div class="list-body">
      <template v-if="tasks.length > 0">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-completion="toggleCompletion"
          @delete-task="deleteTask"
        />
      </template>
      <h1 v-else>No tasks for today :)</h1>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import TaskItem from "./TaskItem.vue";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "asc"));

export default {
  name: "TaskList",
  setup() {
    const dateIn = new Date();
    const date = ref("");
    const newTaskTitle = ref("");
    const tasks = ref([]);

    const toggleCompletion = (id) => {
      const index = tasks.value.findIndex((task) => task.id === id);
      updateDoc(doc(todosCollectionRef, id), {
        isCompleted: !tasks.value[index].isCompleted,
      });
    };

    function deleteTask(id) {
      deleteDoc(doc(todosCollectionRef, id));
    }

    const addTask = () => {
      if (/^\s*$/.test(newTaskTitle.value)) return;
      addDoc(todosCollectionRef, {
        title: newTaskTitle.value,
        isCompleted: false,
        date: Date.now(),
      });
      newTaskTitle.value = "";
    };

    onMounted(() => {
      onSnapshot(todosCollectionQuery, (querySnapshot) => {
        const allTasks = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            title: doc.data().title,
            isCompleted: doc.data().isCompleted,
          };
          allTasks.push(task);
        });
        tasks.value = allTasks;
      });
    });

    const getWeekday = () => {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      date.value = dateIn.toLocaleDateString("en-US", options);
    };

    onMounted(() => {
      getWeekday();
    });

    return {
      date,
      tasks,
      toggleCompletion,
      deleteTask,
      newTaskTitle,
      addTask,
    };
  },
  components: { TaskItem },
};
</script>









<style scoped>
.list-container {
  border: solid black 1px;
  width: 700px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  margin: 75px;
}

.list-day {
  font-size: 45px;
  margin: 5px;
}

.list-date {
  color: gray;
}

.list-header {
  margin-top: 60px;
  margin-bottom: 40px;
}

.list-body {
  text-align: left;
  margin: 50px;
}

.list-footer {
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-footer input {
  display: inline-block;
  width: 80%;
  height: 30px;
  margin: 10px;
  font-size: 20px;
  padding: 10px;
}

.list-footer button {
  width: 60px;
  height: 52px;
  margin: 10px;
  background-color: #23c790;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
}

form {
  width: 100%;
  text-align: left;
}
</style>