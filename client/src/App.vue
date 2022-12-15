<script setup>
import {ref, reactive} from 'vue'

// valeur du formulaire
const input = ref("")
const error = ref("")

// list des argonautes
// const argonautes = reactive([])

const state = reactive({
  argonautes: []
})


// fonction qui recupere la liste des argonautes
async function getArgonautes() {
  try {
    const response = await fetch('http://localhost/api/argonaute',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    const dbArgonautes = await response.json()
    
    if (dbArgonautes) {
      if (Array.isArray(dbArgonautes)) {
        state.argonautes = dbArgonautes
      } else {
        state.argonautes = [dbArgonautes]
      }
    }

  } catch(e) {
    console.log(e);;
  }
}

async function addArgonautes() {
  try {
    const response = await fetch('http://localhost/api/argonaute',
    {
      method: 'POST',
      body: JSON.stringify({name: input.value}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )

    const dbArgonautes = await response.json()
    state.argonautes.push(dbArgonautes)
    input.value = ""
  } catch(e) {
    console.log(e);
  }
}

getArgonautes()


</script>

<template>
<!-- Header section -->
<header>
  <h1>
    <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
    Les Argonautes
  </h1>
</header>

<!-- Main section -->
<main>
  
  <!-- New member form -->
  <h2>Ajouter un(e) Argonaute</h2>
  <form class="new-member-form" @submit.prevent="addArgonautes">
    <label for="name">Nom de l&apos;Argonaute</label>
    <input v-model="input" id="name" name="name" type="text" placeholder="Charalampos" />
    <button type="submit">Envoyer</button>
  </form>
  
  <!-- Member list -->
  <h2>Membres de l'équipage</h2>
  <section class="menber-list">
    <div class="menber-item" v-for="argonaute in state.argonautes" :key="argonaute._id">{{argonaute.name}}</div>
  </section>
</main>

<footer>
  <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
</footer>
</template>

<style>
</style>