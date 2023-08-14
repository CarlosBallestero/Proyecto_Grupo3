'use strict'

//Variables
const url = 'http://localhost:8000/api/inventario/'
const contenedorInventario = document.querySelector('tbody');
const modalInventario = new bootstrap.Modal(document.getElementById('modalInventario'));
const formInventario = document.querySelector('form');
const articulo = document.getElementById('articulo');
const precio = document.getElementById('precio');
const cantidad = document.getElementById('cantidad');
let opcion = '';
let resultados = '';
const usuarioID = JSON.parse(localStorage.getItem("userID")) || false;
const cierreSesion = document.getElementById('cierreSesion');

//No permita el ingreso a la app si no ha iniciado sesión
if (!usuarioID){
    
    alert("Por favor, inicie sesión.");
      window.location = "sign_in.html";
            
}

//Boton de crear abre modal y limpio
btnCrear.addEventListener('click', ()=>{
    articulo.value = ""; 
    precio.value = ""; 
    cantidad.value = "";
    modalInventario.show();
    opcion = 'crear';
})


//Función para Mostrar resultados

const mostrar = (inventarios) =>{
    inventarios.forEach(registro =>{
        resultados += ` <tr>
                            <td>${registro.idArticulo}</td>
                            <td>${registro.Articulo}</td>
                            <td>${registro.Precio}</td>
                            <td>${registro.Cantidad}</td>
                            <td class="text-center"> <a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td> 
                        </tr>
                        `;
    });
    contenedorInventario.innerHTML = resultados;
};


//Llamado de API
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data) )
    .catch(error => console.log(error))
   
    
//Configuración de botones
const on = (element, event, selector, handler) => { // on en un metodo de jquery que sirve para asignar eventos a los elementos del DOM
    element.addEventListener(event, e => { //element pasa todo el doc //event el click //selector el bnt borrar //handler lo que se libera

        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode //1 parent node toma solo los botones, el 2 toma toda la fila //Se toma el Id para pasarselo al API con target
    const idArticulo = fila.firstElementChild.innerHTML
    alertify.confirm("¿Seguro que desea borrar este registro?",
  function(){
    fetch(url+idArticulo, {
        method: 'DELETE'
    })
    .then( res => res.json() )
    .then( ()=> location.reload())
  },
  function(){
    alertify.error('Cancelado');
  })
})

//Editar
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const articuloForm = fila.children[1].innerHTML;
    const precioForm = fila.children[2].innerHTML;
    const cantidadForm = fila.children[3].innerHTML;

    articulo.value = articuloForm;
    precio.value = precioForm;
    cantidad.value = cantidadForm;
    opcion = 'editar';
    modalInventario.show();

})


//Guardar cambios editados o creados
formInventario.addEventListener('submit', (e)=> {
    //e.preventDefault();  //para que no se recargue la pagina
    if(opcion == 'crear'){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                articuloBD:articulo.value,
                precioBD:precio.value,
                cantidadBD:cantidad.value,
            })
        })
        .then( response => response.json())
        .then( data =>{
            const nuevoRegistro = []
            nuevoRegistro.push(data)
            mostrar(nuevoRegistro)
        })
    }
    if(opcion == 'editar'){
        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                articuloBD:articulo.value,
                precio:nombre.value,
                cantidadBD:cantidad.value
            })
        })
        .then( response => response.json())
        .then( response => location.reload)
    }
    modalInventario.hide();

})

cierreSesion.addEventListener("click", function (event) {
    // event.preventDefault(); 
     localStorage.removeItem('userID');
     window.location = "index.html";
 });