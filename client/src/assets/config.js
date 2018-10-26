import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyA04gipW6gMu_d03KwGpP0X2JhEAe7EjAY",
    authDomain: "blog-3c37d.firebaseapp.com",
    databaseURL: "https://blog-3c37d.firebaseio.com",
    projectId: "blog-3c37d",
    storageBucket: "blog-3c37d.appspot.com",
    messagingSenderId: "560972862956"
};
let database = firebase.initializeApp(config).database();

export default database