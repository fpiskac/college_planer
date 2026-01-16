import { defineStore } from 'pinia'

const STORAGE_KEY = 'subjects' //ključ za localsotrage

export const useSubjectsStore = defineStore('subjects', {
  state: () => ({
    subjects: []
  }),

  actions: {
    async fetchSubjects() { //glavna akcija za učitavanje
      return new Promise((resolve) => { //simulacija API poziva bazi s malim delayom
        setTimeout(() => {
          const data = localStorage.getItem(STORAGE_KEY)
          //ako ima podataka u localStorage postavi ih u subjects, ako nema hardkodiraj
          if (data) {
            this.subjects = JSON.parse(data)
          } else {
            this.subjects = [
              {
                id: 1,
                name: 'Matematika',
                tasks: [
                  { id: 1, name: 'Kolokvij 1', max: 30, points: 20 },
                  { id: 2, name: 'Kolokvij 2', max: 30, points: 0 },
                  { id: 3, name: 'Zadaće', max: 40, points: 10 }
                ],
                todos: []
              }
            ]
            this.saveSubjects()
          }

          resolve()
        }, 500)
      })
    },
    //metoda za spremanje predmeta u localSotrage
    saveSubjects() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.subjects))
    },

    //dodavanje zadatka u todo listu
    addTodo(subjectId, text) {
      //nađi za koji predmet je namijenjen zadatak
      const subject = this.subjects.find(s => s.id === subjectId) 
      if (!subject) return
      //pushaj u todo listu predmeta
      subject.todos.push({
        id: Date.now(),
        text,
        done: false
      })

      this.saveSubjects()
    },
    //ažuriranje bodova po zadatku
    updateTaskPoints(subjectId, taskId, points) {
      const subject = this.subjects.find(s => s.id === subjectId)
      if (!subject) return

      const task = subject.tasks.find(t => t.id === taskId)
      if (!task) return

      task.points = points
      this.saveSubjects()
    },
    //dodavanje predmeta
    addSubject(name) {
    this.subjects.push({
      id: Date.now(),
      name,
      tasks: [],
      todos: []
    })

    this.saveSubjects()
  },
  //dodavanje zadatka
    async addTask(subjectId, name, max) {
      return new Promise(resolve => {
        setTimeout(() => {
          const subject = this.subjects.find(s => s.id === subjectId)
          if (!subject) return

          subject.tasks.push({
            id: Date.now(),
            name,
            max,
            points: 0
          })

          this.saveSubjects()
          resolve()
        }, 300)
      })
    }
  }
})
