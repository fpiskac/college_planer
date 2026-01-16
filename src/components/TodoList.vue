<template>
  <div>
    <h3>TODO lista</h3>

    <div class="todo-input">
      <input
        type="text"
        v-model="text"
        placeholder="Novi zadatak..."
      />
      <button @click="submitTodo">Dodaj</button>
    </div>

    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ done: todo.done }"
      >
        <input
          type="checkbox"
          v-model="todo.done"
        />
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { todos } = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-todo'])

const text = ref('')

function submitTodo() {
  if (!text.value.trim()) return

  emit('add-todo', text.value)
  text.value = ''
}
</script>

<style scoped>
.todo-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
