<template>
  <div class="container">
    <h2>O aplikaciji</h2>

    <p>
      Ova aplikacija služi za praćenje bodova i obaveza po predmetima na fakultetu.
      Korisnik može dodavati predmete, zadatke i bilježiti ostvarene bodove.
    </p>

    <p>
      Aplikacija je izrađena kao single page aplikacija koristeći Vue 3 razvojni okvir,
      Pinia za upravljanje stanjem i Vue Router za navigaciju između stranica.
    </p>

    <p>
      Podaci se spremaju lokalno u pregledniku pomoću localStorage-a, bez potrebe
      za prijavom korisnika.
    </p>
  </div>
</template>

<script setup>
// Ova stranica nema posebnu logiku
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
}

p {
  line-height: 1.6;
  margin-bottom: 12px;
}
</style>
