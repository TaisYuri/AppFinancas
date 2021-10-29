import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyAwWclqBSDYZZ5Lwf4i2W0wuGxawp_2leM",
    authDomain: "meuapp-4b243.firebaseapp.com",
    projectId: "meuapp-4b243",
    storageBucket: "meuapp-4b243.appspot.com",
    messagingSenderId: "1036214683626",
    appId: "1:1036214683626:web:902d888828720a4e439493",
    measurementId: "G-T8B8M5EW4T"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
}

export default firebase;