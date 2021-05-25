 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAaT3415zSv6BfeiyKhUGSJfagrhXU_C-w",
  authDomain: "aurora-ef89c.firebaseapp.com",
  databaseURL: "https://aurora-ef89c.firebaseio.com",
  projectId: "aurora-ef89c",
  storageBucket: "aurora-ef89c.appspot.com",
  messagingSenderId: "643536444612",
  appId: "1:643536444612:web:a9ad2a68843fd91e247d91",
  measurementId: "G-JHFCCNZZWG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

 let db = firebase.firestore()

let auth = firebase.auth()

//função pra criar um novo usuário
/*
auth.createUserWithEmailAndPassword(email, password)
.then(user=>{

  console.log(user)

}).catch(err =>{


  console.log(err)

})

*/
/////Função de login
function login(){

let userEmail = "teste@teste.com"

let userPass = "123456"

//No Firebase authentication existem 3 tipos de persistência de login
//LOCAL(Padrão), SESSION E NONE
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{

  auth.signInWithEmailAndPassword(userEmail, userPass)
  .then(loggeduser => {
  
  console.log(auth.currentUser)
  
  }).catch(err => {
  
  console.log(err)
  
  })

}).catch(err=>{

  console.log(err)

})



//let user = auth.currentUser

//console.log(user)


}

login()

let user = auth.currentUser

auth.onAuthStateChanged(user => {

  if(user){

    console.log(user)
  }else{

    console.log('Ninguém logado')
  }

})

function logout(){

auth.signOut().then(() => {

console.log("Usuário foi deslogado")

}).catch(err =>{

  console.log(err)

})

}

setTimeout(login, 2000)



//Teste de segurança Firebase
// Alterar permissões através da aba regras
//Basta alterar de true pra liberar e false para não liberar

function ler(){

  db.collection("users").get().then(snapshot => {


snapshot.forEach(user => {

  console.log(user.data())
})

}).catch(err => {

  console.log(err)
})

}

function escrever(){

db.collection("users").add({pass:12345, email: "teste@teste.com"})
.then(doc => {
console.log(doc)

}).catch(err =>{

  console.log(err)

})

}

ler()

escrever()

/*
/////////////////////////////////////////

- Exemplo de regra do firebase para habilitar
ou não habilitar leitura ou escrita sobre o banco
de dados -

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone on the internet to view, edit, and delete
    // all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // your app will lose access to your Firestore database
    match /{document=**} {
      allow read: if true 
      allow write: if false;
    }
  }
}


//////////////////////////////////////////////////

- Exemplo de regra do firebase para o usuário somente
escrever ou ler no banco de dados se estiver logado

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone on the internet to view, edit, and delete
    // all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // your app will lose access to your Firestore database
    match /{document=**} {
      allow read: if true 
      allow write: if request.auth.uid != null;
    }
  }
}

OBS:. Para adicionar no banco de dados a função ''escrever()''
Terá que está abaixo do console.log(auth.currentUser)
*/