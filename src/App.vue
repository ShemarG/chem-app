<template>
  <div id="app">
    <div class="title-container">
      <span id="title">Polyatomic Ions Memory Test</span>
    </div>
    <div class="body-container">
      <div class="question-container">
        <span>{{this.currentIon.name}}</span>
      </div>
      <div class="answer-container">
        <Answer @answer-submit="checkAnswer" :correct="this.answerValidity"></Answer>
      </div>
      <div class="scoreboard-container">
        <span class="scoreboard-content">Your Score: <span class="scoreboard-value">{{this.score}}</span></span>
        <span class="scoreboard-content">Current Streak: <span class="scoreboard-value">{{this.streak}}</span></span>
        <span @animationend="resetAnimation" ref="messageSpan" class="scoreboard-content">{{ generateMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Ions from './data/ion-data.json'
import Answer from '@components/answer.vue'

export default {
  name: 'App',
  data() {
    return {
      boosts: ["GOOD JOB!", "CORRECT!", "KEEP IT UP!", "AWESOME!", "THAT'S RIGHT!", "SWEET!", "NICE!", "WELL DONE!"],
      currentIon: {},
      answerValidity: {formula: null, charge: null},
      score: 0,
      streak: 0,
      randomNumber: 0,
      scoreboardMessageClasslist: ["scoreboard-content"]
    }
  },
  mounted() {
    this.generateQuestion()
  },
  computed: {
    generateMessage () {
      if (this.answerValidity.formula == null) { return "Study for that final!"}
      if (this.answerValidity.charge == false && this.answerValidity.formula == true){
        return "Incorrect charge"
      } else if (this.answerValidity.formula == false && this.answerValidity.charge == true) {
        return "Incorrect formula"
      } else if (this.answerValidity.formula == false && this.answerValidity.charge == false) {
        return "Incorrect formula & charge"
      } else {
        return this.boosts[this.randomNumber]
      }
    }
  },
  methods: {
    generateQuestion () {
      let randomIon = Object.keys(Ions)[Math.floor(Math.random() * Object.keys(Ions).length)]
      this.currentIon = Ions[randomIon]
    },
    checkAnswer (answer) {
      this.scoreboardMessageClasslist = ["scoreboard-content"]
      if (answer.formula == this.currentIon.formula && answer.charge == this.currentIon.charge){
        this.randomNumber = Math.floor(Math.random() * this.boosts.length)
        this.answerValidity.formula = this.answerValidity.charge = true
        this.generateQuestion()
        this.score++
        this.streak++
        this.$refs.messageSpan.classList.remove("messageIncorrect")
        this.$refs.messageSpan.classList.add("animate__animated", "animate__bounceIn", "messageCorrect")
        this.$emit("animationend")
      } else if (answer.formula != this.currentIon.formula && answer.charge == this.currentIon.charge) {
        this.answerValidity.formula = false
        this.answerValidity.charge = true
        this.streak = 0
        this.$refs.messageSpan.classList.remove("messageCorrect")
        this.$refs.messageSpan.classList.add("animate__animated", "animate__headShake", "messageIncorrect")
        this.$emit("animationend")
      } else if (answer.formula == this.currentIon.formula && answer.charge != this.currentIon.charge) {
        this.answerValidity.formula = true
        this.answerValidity.charge = false
        this.streak = 0
        this.$refs.messageSpan.classList.remove("messageCorrect")
        this.$refs.messageSpan.classList.add("animate__animated", "animate__headShake", "messageIncorrect")
        this.$emit("animationend")
      } else if (answer.formula != this.currentIon.formula && answer.charge != this.currentIon.charge) {
        this.answerValidity.formula = this.answerValidity.charge = false
        this.streak = 0
        this.$refs.messageSpan.classList.remove("messageCorrect")
        this.$refs.messageSpan.classList.add("animate__animated", "animate__headShake", "messageIncorrect")
        this.$emit("animationend")
      }
    },
    resetAnimation (){
      this.$refs.messageSpan.classList.remove("animate__animated", "animate__headShake", "animate__bounceIn")
    }
  },
  components: {
    Answer
  }
}
</script>

<style>

  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-image: url('./assets/images/molecule.jpg');
    background-attachment: fixed;
    background-size: cover;
  }

  .body-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85vh;
  }

  .question-container {
    background-color: black;
    color: white;
    font-size: 4vh;
    border: 5px solid deepskyblue;
    padding: 1.5% 5%;
    border-radius: 15px;
    font-family: Pangolin;
    width: 46vh;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 2);
  }

  .answer-container {
    width: 40vh;
    margin-top: 2rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: inherit;
    overflow: hidden;
    border: 4px solid grey;
    border-radius: 3vh;
    padding: 2vh;
  }

  .answer-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 1);
    background: inherit;
    filter: blur(35px);
    margin: -20px;
    z-index: -1;
  }

  .scoreboard-container {
    width: 44vh;
    display: flex;
    margin-top: 4vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: black;
    color: deepskyblue;
    padding: 3vh  3vh;
    font-size: 3vh;
    border-radius: 3vh;
    font-family: monospace;
    border: 5px solid deepskyblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 2);
  }

  .scoreboard-content {
    margin-top: 1vh;
  }

  .scoreboard-value {
    color: white;
    font-family: Courier New;
  }

  .messageCorrect {
    color: green;
  }

  .messageIncorrect {
    color: red;
  }



  @font-face {
    font-family: MajorMono;
    src: url('./assets/fonts/MajorMonoDisplay-Regular.ttf')
  }
  @font-face {
    font-family: Pangolin;
    src: url('./assets/fonts/Pangolin-Regular.ttf')
  }

  #app {
    height: inherit;
    width: inherit;
    display: flex;
    flex-direction: column;
  }

  .title-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 1);
    background: inherit;
    filter: blur(10px);
    margin: -20px;
    z-index: -1;
  }

  .title-container {
    width: 100%;
    height: 15vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: inherit;
    overflow: hidden;
    border-bottom: 4px solid grey;
  }


  #title {
    font-family: MajorMono;
    font-size: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

</style>
