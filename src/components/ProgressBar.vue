<template>
  <div class="progress-wrapper">
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>

    <p>{{ current }} / {{ max }} bodova ({{ percentage }}%)</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 100
  }
})

const percentage = computed(() => {
  const value = Math.round((props.current / props.max) * 100)
  return value > 100 ? 100 : value
})
</script>

<style scoped>
.progress-wrapper {
  margin: 16px 0;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

p {
  margin-top: 6px;
  font-size: 14px;
}
</style>
