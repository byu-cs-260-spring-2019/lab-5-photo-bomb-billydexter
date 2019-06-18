import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import store from "./store";
import firebase from 'firebase';

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBkUmmHoDUDKToRld8DybmxDiDMlekKzpQ",
  authDomain: "photobombing54.firebaseapp.com",
  databaseURL: "https://photobombing54.firebaseio.com",
  projectId: "photobombing54",
  storageBucket: "photobombing54.appspot.com",
  messagingSenderId: "975175878907",
  appId: "1:975175878907:web:1f1a9fc3028bb620"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

firebase.auth().onAuthStateChanged(user => {
  if(user){
    store.commit('setUser',user);
  }
  else {
    store.commit('setUser',null);
  }
});
