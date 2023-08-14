'use strict'
//Variables
const usuarioRegistrado = JSON.parse(localStorage.getItem("userID"));
const correo = document.getElementById('correo');
const contrasena1 = document.getElementById('contrasena1');
const contrasena2 = document.getElementById('contrasena2');
const registroForm = document.querySelector('form');


// Agrega un evento submit al formulario de registro
registroForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    if (contrasena1.value == contrasena2.value & 
        (contrasena1.value).length >= 8 & 
        /[A-Z]/.test(contrasena1.value) &
        /[a-z]/.test(contrasena1.value) &
        /[0-9]/.test(contrasena1.value)){
        
        // Realiza una petición POST a la API
        fetch('http://localhost:8000/api/registro/', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                                correoBD:correo.value,  
                                contrasenaBD:contrasena1.value 
                                }),
        })
            .then((response) => response.json())
            //alertify
                alert("Contraseña Registrada", 
                   
                    window.location = "sign_in.html"
                  )
             
    }else{
        //alertify
                alert("Las contraseñas no coinciden o no cumplen con los características indicadas", 
                    
                    window.location = "register.html"
                  );
    }   
  });