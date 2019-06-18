<template>
<div>
  <div v-if="user" class="header">
    <div>
      <h2>{{user.email}}</h2>
    </div>
    <h3>Ask a question about the odds of something happening (eg: What are the odds I get married someday?)</h3>
    <p><textarea v-model="oddsQuestion" placeholder="'What are the odds that...'"></textarea></p>
    <div class="button">
      <p><button @click="generateRating" class="pure-button pure-button-primary">Find the odds!</button></p>
    </div>
    <h3>Here are your previous predictions for the future:</h3>
    <div v-for= "msg in messages">
    	<h3>{{msg}}</h3>
    </div>
    <div class="button">
      <p><button @click="logout" class="pure-button pure-button-primary">Logout</button></p>
    </div>
  </div>
  <div v-else>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import { db } from '@/main'
export default {
  name: 'mypage',
  data() {
  	return {
  		message: '',
  		oddsQuestion: '',
  		messages: []
  	}
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$store.dispatch("getUser");
    this.getMessages();
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async getMessages() {
    	try
    	{
    		var itemsRef = db.collection('predictions');
      		var querysnapshot = await itemsRef.get();
      		let removeArray = querysnapshot.docs.map(doc => doc.data());
    		let newArray = [];
    		let userEmail = this.$store.state.user.email;
    		for (let i = 0; i < removeArray.length; i++)
    		{
    			if (userEmail === removeArray[i].email)
    			{
    				newArray.push(removeArray[i].title);
    			}
    		}
    		this.messages = newArray;
    	}
    	catch(error)
    	{
    		console.log(error);
    	}
    },
    async generateRating()
    {

      if (this.oddsQuestion === '')
      {
      	this.message = "Please enter in some text.";
      	return;
      }
      let rating = Math.floor((Math.random() * 10) + 1);
      if (rating === 1)
      {
      	this.message = this.oddsQuestion + " -1/10. Oof.";
      }
      if (rating === 2)
      {
      	this.message = this.oddsQuestion + " -2/10. Definitely not.";
      }
      if (rating === 3)
      {
      	this.message = this.oddsQuestion + " -3/10. Probs not.";
      }
      if (rating === 4)
      {
      	this.message = this.oddsQuestion + " -4/10. Unlikely.";
      }
      if (rating === 5)
      {
      	this.message = this.oddsQuestion + " -5/10. Maybe.";
      }
      if (rating === 6)
      {
      	this.message = this.oddsQuestion + " -6/10. Not bad odds.";
      }
      if (rating === 7)
      {
      	this.message = this.oddsQuestion + " -7/10. It's likely!";
      }
      if (rating === 8)
      {
      	this.message = this.oddsQuestion + " -8/10. It's looking pretty good!";
      }
      if (rating === 9)
      {
      	this.message = this.oddsQuestion + " -9/10. Yee.";
      }
      if (rating === 10)
      {
      	this.message = this.oddsQuestion + " -10/10. It is the most sure thing on earth.";
      }
      var itemsRef = db.collection('predictions');
      var querysnapshot = await itemsRef.get();
      let userr = this.$store.state.user;
      let numRecords = querysnapshot.docs.length;
      let data = {
      	email: userr.email,
      	title: this.message,
      	id: numRecords
      }
      itemsRef.doc(data.id.toString()).set(data);
      await this.getMessages();
      this.oddsQuestion = '';
    }
  }
}
</script>

<style scoped>
.pure-button {
  margin: 0px 20px;
}


.header .button {

}
</style>