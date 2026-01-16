<template>
    <!-- ako postoji subject prikaži -->
  <div v-if="subject">
    <h2>{{ subject.name }}</h2>

    <h3>Zadaci</h3>
    <!-- renderiraj sve zadatke iz subject objekta -->
    <div v-for="task in subject.tasks" :key="task.id" class="task">
      <span>{{ task.name }} (max {{ task.max }})</span>

      <input
        type="number"
        :value="task.points"
        @input="onPointsChange(task.id, $event.target.value)"
        min="0"
        :max="task.max"
        />

    </div>

    <p><strong>Ukupno bodova:</strong> {{ totalPoints }} / 100</p>
    <ProgressBar :current="totalPoints" :max="100" />

    <!--dodavanje novog zadatka-->
    <h3>Dodaj novi zadatak</h3>

    <div class="add-task">
        <input
            type="text"
            v-model="newTaskName"
            placeholder="Naziv zadatka"
        />

        <input
            type="number"
            v-model.number="newTaskMax"
            placeholder="Max bodova"
            min="1"
            max="100"
        />

        <button @click="addTask">Dodaj</button>
    </div>


    <TodoList
        :todos="subject.todos"
        @add-todo="addTodo"
        />

    <p>
        Završeno: {{ completedTodos }} / {{ subject.todos.length }}
    </p>

  </div>

  <p v-else>Učitavanje...</p>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSubjectsStore } from '../stores/subjectStore'
import ProgressBar from '../components/ProgressBar.vue'
import TodoList from '../components/TodoList.vue'


const route = useRoute()
const store = useSubjectsStore()

//kada se template učita čekaj da store dohvati sve predmete
onMounted(async () => {
  if (store.subjects.length === 0) {
    await store.fetchSubjects()
  }
})
//nađi trenutni predemet prema id-u
const subject = computed(() =>
  store.subjects.find(s => s.id === Number(route.params.id))
)

//izračun total points na svaku promjenu
const totalPoints = computed(() => {
  if (!subject.value) return 0
  return subject.value.tasks.reduce((sum, task) => sum + task.points, 0)
})

//riješeni zadatci
const completedTodos = computed(() => {
  if (!subject.value) return 0
  return subject.value.todos.filter(t => t.done).length
})

//dodavanje to-do zadatka
function addTodo(text) {
  store.addTodo(subject.value.id, text)
}
//spremanje promjene bodova 
function onPointsChange(taskId, value) {
  store.updateTaskPoints(
    subject.value.id,
    taskId,
    Number(value)
  )
}

//dodavanje obveza predmeta
const newTaskName = ref('')
const newTaskMax = ref(0)

async function addTask() {
  if (!newTaskName.value.trim() || newTaskMax.value <= 0) return

  await store.addTask(
    subject.value.id,
    newTaskName.value,
    newTaskMax.value
  )

  newTaskName.value = ''
  newTaskMax.value = 0
}

</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

input {
  width: 60px;
}

.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.add-task input {
  width: 140px;
}

</style>
