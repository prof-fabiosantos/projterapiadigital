<template>
    <h1>{{ msg }}</h1>
    <div class="support-container">
      <h1 class="support-heading">Como você está se sentindo hoje?</h1>
      <div class="support-input">
        <input v-model="sentimento" type="text" placeholder="Digite aqui">
        <button @click="enviarSentimento()">Enviar</button>
      </div>
      <p>{{ status }}</p>
      <p class="support-message">{{ mensagem }}</p>

    </div>
  </template>

  <script>
import axios from 'axios';
import firebase from "./firebaseInit";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore"; 
import { query, getDocs } from "firebase/firestore";
const db = getFirestore(firebase);

  export default {
    data() {
      return {
        apiKey: '',
        sentimento: '',
        mensagem: '',
        prompt:'Ouvi dizer que você é capaz de ornecer um suporte emocional, vou descrever como estou me sentindo?',
        status:''
      }
    },
    mounted() {
    this.getKey();    
   },
    methods: {

    async getKey() {                
      
      const q = query(collection(db, "Key"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {        
          this.apiKey = doc.data().key  
      });       
      this.contextualizarChatGpt();
    },

    
    async enviarSentimento() {
        
        console.log("apiKey:"+this.apiKey);
        this.status = "AGUARDE A RESPOSTA" ;       
        
          try {
            const resposta = await axios.post(
              'https://api.openai.com/v1/completions',
              {
                model: 'text-davinci-003',
                prompt: this.sentimento,
                max_tokens: 2825,
                user: "1",
                stop: ["#", ";"],
                temperature: 0.90,
                presence_penalty: 0.0,
                frequency_penalty: 0.0
              },
              {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                  }
              }
            );

            if (resposta.status === 200) {
                this.status = "";
                const respostaAPI = resposta.data.choices[0].text.trim();

                this.mensagem = respostaAPI;                                        

                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(this.mensagem);
                utterance.voice = synth.getVoices().find(voice => voice.name === "Microsoft Maria - Portuguese (Brazil)");
                synth.speak(utterance);
                console.log(synth.getVoices());            

                } else {
                console.log('Erro ao acessar a API do OpenAI');
                console.log(resposta);
                }

          } catch (erro) {
            console.error('Erro ao fazer a solicitação para a API do OpenAI', erro);      
        }
    },

    async contextualizarChatGpt() {
        
        console.log("apiKey:"+this.apiKey);
              
        
          try {
            const resposta = await axios.post(
              'https://api.openai.com/v1/completions',
              {
                model: 'text-davinci-003',
                prompt: this.prompt,
                max_tokens: 1825,
                user: "1",
                stop: ["#", ";"],
                temperature: 0.90,
                presence_penalty: 0.0,
                frequency_penalty: 0.0
              },
              {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                  }
              }
            );

            if (resposta.status === 200) {
                
                const respostaAPI = resposta.data.choices[0].text.trim();

                let frase = respostaAPI;
                
                let novaFrase = frase.replace(/^[CcSs][\w\s]*[.,]?\s*/, "");
                this.mensagem = novaFrase; 

                console.log("Contextualizacao do ChatGPT:"+novaFrase)                                       

                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(novaFrase);
                utterance.voice = synth.getVoices().find(voice => voice.name === "Microsoft Maria - Portuguese (Brazil)");
                synth.speak(utterance);
                console.log(synth.getVoices());            

                } else {
                console.log('Erro ao acessar a API do OpenAI');
                console.log(resposta);
                }

          } catch (erro) {
            console.error('Erro ao fazer a solicitação para a API do OpenAI', erro);      
        }
    }
    
    }
  }
  </script>
  
  <style scoped>
  .support-container {
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  .support-heading {
    margin-top: 0;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .support-input {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
  }
  
  .support-input input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 70%;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .support-input button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    background-color: #2ecc71;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  
  .support-input button:hover {
    background-color: #27ae60;
  }
  
  .support-message {
    font-size: 1.2rem;
    text-align: center;
    color: #2c3e50;
    margin: 1.5rem 0;
  }
  </style>
  