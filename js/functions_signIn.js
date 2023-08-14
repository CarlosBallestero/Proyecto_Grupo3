'use strict'

//Variables
const url = `http://localhost:8000/api/login/`
const loginForm = document.getElementById("loginForm");
const correo = document.getElementById('correo');
const contrasena = document.getElementById('contrasena');


// Agrega un evento submit al formulario de inicio de sesión
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const Correo = correo.value;
    const contrasena2 = contrasena.value;
    
    // Realiza una petición POST a la API
    fetch(`http://localhost:8000/api/login/${Correo}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Contrasena: contrasena2 }),
    })
      .then((response) => response.json())
      .then((data) => {

      //Respuesta de la API
      console.log(data);
      if (data.success){
        localStorage.setItem("userID", JSON.stringify(Correo));
        window.location = "main.html"; 
      }else {
        //alertify
          alert("Credenciales inválidas.");
      }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
  });