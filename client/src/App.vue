<script setup>
import { reactive } from "vue";

const state = reactive({
  argonautes: [],
  listMessage: "",
  errorName: 0,
  input: "",
});

// fonction pour recuperer la liste des argonautes
async function getArgonautes() {
  try {
    const response = await fetch("http://localhost/api/argonaute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dbArgonautes = await response.json();

    if (dbArgonautes) {
      if (Array.isArray(dbArgonautes)) {
        state.argonautes = dbArgonautes;
      } else {
        state.argonautes = [dbArgonautes];
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// fonction pour ajouter a la liste un argonaute
async function addArgonautes() {
  try {
    // si la requete ne contient pas de nom
    if (state.input.toLowerCase() === "") {
      state.errorName = 1;
    } else {
      state.errorName = 0;
      const response = await fetch("http://localhost/api/argonaute", {
        method: "POST",
        body: JSON.stringify({ name: state.input.toLowerCase() }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dbArgonautes = await response.json();

      // si le nom saisie est deja sur la liste
      if (dbArgonautes.message) {
        state.listMessage = dbArgonautes.message;
      } else {
        state.argonautes.push(dbArgonautes);
        state.input = "";
        state.listMessage = "";
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// appelle de la fonction pour recuperer la liste des argonautes
getArgonautes();
</script>

<template>
  <div class="app-container">
    <!-- Header section -->
    <header>
      <h1>
        <img
          src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
          alt="Wild Code School logo"
        />
        Les Argonautes
      </h1>
    </header>

    <!-- Main section -->
    <main>
      <!-- New member form -->
      <h2>Ajouter un(e) Argonaute</h2>
      <form class="new-member-form" @submit.prevent="addArgonautes">
        <label for="name">Nom de l&apos;Argonaute</label>
        <input
          v-model="state.input"
          id="name"
          name="name"
          type="text"
          placeholder="Charalampos"
        />
        <button type="submit">Envoyer</button>

        <!-- message d'erreur -->
        <p v-if="state.errorName" class="error">
          Ce champ ne doit pas etre vide
        </p>
      </form>

      <!-- Member list -->
      <h2>Membres de l'équipage</h2>

      <p v-if="state.argonautes.length === 0">
        Aucun menbre sur la liste pour le moment
      </p>

      <section class="menber-list">
        <div
          class="menber-item"
          v-for="argonaute in state.argonautes"
          :key="argonaute._id"
        >
          {{ argonaute.name }}
        </div>
      </section>

      <!-- message d'erreur -->
      <p class="error">{{ state.listMessage }}</p>
    </main>

    <footer>
      <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
    </footer>
  </div>
</template>

<style></style>
