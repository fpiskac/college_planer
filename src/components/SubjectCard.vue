<template>
  <div class="card" @click="openSubject">
    <h3>{{ subject.name }}</h3>
    <p>Bodovi: {{ subject.currentPoints }} / 100</p>
  </div>
</template>

<script setup>
//što očekujemo od roditeljske komponente    
const props = defineProps({
  subject: {
    type: Object,
    required: true
  }
})
//definiramo events koje komponenta može slati(emitirati) roditelju
const emit = defineEmits(['open'])

function openSubject() {
  emit('open', props.subject.id)
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.card:hover {
  background-color: #f5f5f5;
}
</style>
