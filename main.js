//Login change
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const elName = document.querySelector("#userName");
const loginCheck = (user) => {
  // Si existe un usuario muestra/ oculta elementos del nav
  if (user) {
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
    elName.style.display = "block";
  } else {
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
    elName.style.display = "none";
  }
};

// SignUp Event (REGISTRAR)
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Signup....");
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  // Método autenticar registro con Firebase
  auth
    // Intenta autenticación por email y password, proporcionamos el valor de ambos inputs
    .createUserWithEmailAndPassword(email, password)
    // Al ser correcto, devuelve una promesa
    .then((userCredential) => {
      // Limpiar form
      signupForm.reset();

      // Oculta modal
      $("#signupModal").modal("hide");
      console.log("Sign up success");
    });
});

// Signin Event (INGRESAR)
const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Signin...");
  const email = document.querySelector("#signin-email").value;
  const password = document.querySelector("#signin-password").value;
  console.log(email, password);

  // Método autenticar ingreso con Firebase
  auth
    // Intenta autenticación por email y password, proporcionamos el valor de ambos inputs
    .signInWithEmailAndPassword(email, password)
    // Al ser correcto, devuelve una promesa
    .then((userCredential) => {
      // Limpiar form
      signupForm.reset();

      // Oculta modal
      $("#signinModal").modal("hide");
      console.log("Sign in success :)");
    });
});

// Logout Event (SALIR)
const logout = document.querySelector("#logout");
logout.addEventListener("click", (event) => {
  event.preventDefault();
  // Método salir de la autenticación
  auth.signOut().then(() => {
    console.log("Sign out...");
  });
});

// Signin event (GOOGLE)
const googleButton = document.querySelector("#googleLogin");
googleButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Login with Google...");
  // Instancia clase de metodo autenticar con Google (provider)
  const provider = new firebase.auth.GoogleAuthProvider(); // 'auth' es un shortcut que indicamos en el HTML (const auth = firebase.auth();)
  // Especifica alcance adicional
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  auth
    .signInWithPopup(provider) // Intenta mostrar una ventana adicional y autenticar con Google
    // Devuelve Promesa y resolvemos el then.
    .then((result) => {
      console.log("Success Signin with Google Account! :)", result);
      // Oculta modal
      $("#signinModal").modal("hide");
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      console.log(
        "SOMETHING'S WRONG WHILE LOGIN :(",
        errorCode,
        errorMessage,
        email,
        credential
      );
    });
});

// Signup event (GOOGLE)
const googleSignUp = document.querySelector("#googleSignUp"); // Captura Botón Google
googleSignUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Sign up with Google Account...");
  let userYet = firebase.auth().currentUser;
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  // Especifica alcance adicional
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("Successfully Signup with Google Account!.");
      $("#signupModal").modal("hide");
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      console.log(
        "SOMETHING'S WRONG WHILE LOGIN :(",
        errorCode,
        errorMessage,
        email,
        credential
      );
    });
});
// Signin event (FACEBOOK)
const facebookButton = document.querySelector("#facebookLogin");
facebookButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Facebook Login...");
  // Instanciar clase para autenticar con Facebook (provider)
  const provider = new firebase.auth.FacebookAuthProvider();
  // El popup sera para Facebook
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // Oculta modal
      $("#signinModal").modal("hide");
      console.log(
        "Success Signin with Facebook Account! :)",
        result.user.displayName
      );
    })
    .catch((error) => {
      console.log(error);
    });
});
//SignUp event (FACEBOOK)
const facebookSignUp = document.querySelector("#facebookSignUp"); // Captura Botón Google
facebookSignUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Sign up with Facebook account...");
  const provider = new firebase.auth.FacebookAuthProvider();
  // El popup sera para Facebook
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // Oculta modal
      $("#signupModal").modal("hide");
      console.log("Success Signup using Facebook Account! :)", result);
    })
    .catch((error) => {
      console.log("Something is broken...", error);
    });
});
// SignUp event (GitHub)
const githubSignUp = document.querySelector("#githubSignUp");
githubSignUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("sign up with github Account...");
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      // Oculta modal
      $("#signupModal").modal("hide");
      console.log("Success Signup using Facebook Account! :)", result);
      const token = result.credential.accessToken;
      const user = result.user;
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
});
// SignUp event (Twitter)
const twitterSignUp = document.querySelector("#twitterSignUp");
twitterSignUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("sign up with twitter Account...");
  const provider = new firebase.auth.TwitterAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      const token = result.credential.accessToken;
      const secret = result.credential.secret;
      const user = result.user;
      console.log(user)
      // Oculta modal
      $("#signupModal").modal("hide");
      console.log("Success Signup using Twitter Account! :)", result);
    })
    .catch(function (error) {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
});
// ALBUMS LIST
const albumlist = document.querySelector(".albums"); // Selecciona elemento con clase albums (ul)
// Función que montara la data si el usuario esta logeado (data proviene de firestore)
const setUpAlbums = (data, userName) => {
  elName.innerHTML = `Welcome back ${userName}!`;
  // Si la longitud de la data existe (Si la data en si existe)
  if (data.length) {
    let html = ""; // Crea elemento vacio html
    // Por cada elemento de data crea su lista desordenada
    data.forEach((doc) => {
      const album = doc.data(); // obtener los datos reales de cada documento
      console.log("ALBUM LIST FROM FIRESTORE: ", album);
      const li = `
              <div class="card my-2 d-flex  p-2 mr-auto border-success rounded-circle">
                <li class="list-group-item list-group-item-action"> <!-- Agrega elementos li -->
                  <h3>${album.artist}</h3>
                  <p>${album.title}</p> 
                  <p>Track Number: ${album.tracks}</p>
                </li>
             </div>        
            `;
      html += li; // Agregar para cada documento el elemento html vacio mas el li
    });
    albumlist.innerHTML = html; // Pinta la data en el html (cada iteración del forEach)
  } else {
    albumlist.innerHTML =
      '<p class="h2 text-center"> LOGIN TO SEE ALBUMS :) </p>';
  }
};

// Eventos
// Comprobar cada cambio de estado del auth(registro, ingreso, salida)
auth.onAuthStateChanged((user) => {
  // Si existe un usuario significa que se ha logeado, si no, que se ha salido
  if (user) {
    // Muestra contenido diferente para un usuario logeado (Albums)
    console.log("Auth: signin as: ", user.displayName);
    // Query, de la colección 'albums' obten todos los docs, ademas con snapshot captura cada cambio nuevo
    fs.collection("albums")
      .get() // Obtiene todos los documentos dentro de colección 'albums
      .then((snapshot) => {
        setUpAlbums(snapshot.docs, user.displayName); // Ejecuta la iteración de los documentos y crea su estructura HTML
        loginCheck(user); // Ejecuta función para ocultar/mostrar contenido del nav
        console.log(snapshot.docs); // .docs muestra los documentos
      });
  } else {
    setUpAlbums([]); // Al no pasarle datos a la función se ejecuta el else de esa misma función, no hay datos por mostrar
    loginCheck(user);
    console.log("Auth: sign out");
  }
});
