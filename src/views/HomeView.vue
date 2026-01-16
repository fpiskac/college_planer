<template>
  <!--prikaz predemta, bodova i mogućnost dodavanja novih-->
  <div>
    <h2>Moji predmeti</h2>
    <p v-if="loading">Učitavanje predmeta...</p>

    <SubjectCard
      v-for="subject in subjectsWithPoints"
      :key="subject.id"
      :subject="subject"
      @open="openSubject"
    />

    <p v-if="!loading && subjectsWithPoints.length === 0">
      Nema dodanih predmeta.
    </p>
  </div>
  <h3>Dodaj novi predmet</h3>

 <div class="add-subject">
    <input
        type="text"
        v-model="newSubjectName"
        placeholder="Naziv predmeta"
    />
    <button @click="addSubject">Dodaj</button>
</div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSubjectsStore } from '../stores/subjectStore'
import SubjectCard from '../components/SubjectCard.vue'

const store = useSubjectsStore()
const router = useRouter()

const loading = ref(false)

//kada se template učita, pričekaj s daljnjim izvršavanjem dok store ne dođe do svih podataka"
onMounted(async () => {
  loading.value = true
  await store.fetchSubjects()
  loading.value = false
})

//computed metoda koja na svaku promjenu bodova zbraja i mijenja current points
const subjectsWithPoints = computed(() => {
  return store.subjects.map(subject => {
    const currentPoints = subject.tasks.reduce(
      (sum, task) => sum + task.points,
      0
    )

    return {
      ...subject,
      currentPoints
    }
  })
})
//odlazak na stranicu pojedinog predemeta preko rutera
function openSubject(subjectId) {
  router.push(`/subject/${subjectId}`)
}

//dodavanje novog predmeta
const newSubjectName = ref('')

function addSubject() {
  if (!newSubjectName.value.trim()) return

  store.addSubject(newSubjectName.value)
  newSubjectName.value = ''
}

</script>

<style scoped>
h2 {
  margin-bottom: 16px;
}
.add-subject {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

</style>
