<template>
  <div class="top-level">
    <div class="input-card">
      <span class="input-label">Formula &#x2697;</span>
      <input v-model="formula" class="input-field" type="text">
    </div>
    <div class="input-card">
      <span class="input-label">Charge &#9889;</span>
      <input v-model="charge" class="input-field" type="text">
      <button @click="$emit('answer-submit', answerPayload); reset()" class="answer-button">Enter</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  data () {
    return {
      formula: "",
      charge: ""
    }
  },
  computed: {
    answerPayload () {
      return {formula:this.formula, charge:this.charge}
    }
  },
  methods: {
    reset() {
     if (this.correct.formula == true && this.correct.charge == true){
       this.formula = this.charge = ""
     }
    }
  },
  props: {
    correct: Object
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .top-level {
    width: 75%;
  }

  .answer-button {
    margin-top: 2vh;
    font-size: 3vh;
    height: 5vh;
    font-family: monospace;
    font-variant: all-small-caps;
    background-color: deepskyblue;
    border-radius: 1vh;
    background-image: linear-gradient(to top, rgb(112 209 255) 16%, rgb(252, 252, 252) 79%);
    border: 1px solid;
  }

  .answer-button:hover {
    opacity: 0.7;
  }

  .input-field {
    height: 5vh;
    border-radius: 1vh;
    border-top-left-radius: 0;
  }

  .input-label {
    text-align: center;
    font-size: 2.25vh;
    width: 14vh;
    background-color: black;
    color: white;
    border: 0.25vh solid deepskyblue;
    border-bottom: 0;
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    padding: 2%;
    font-variant: all-small-caps;
  }

  .input-card {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }

  .input-field {
    height: 5vh;
    font-size: 2.5vh;
    text-align: center;
    font-family: courier;
  }
</style>
