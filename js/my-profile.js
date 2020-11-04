/* 
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("buttonSave").addEventListener("click", function () {
        guardar()

    })
});
 */

var nombre = document.getElementById("inputFirstName");
var apellido = document.getElementById("inputLastName");
var edad = document.getElementById("inputAge");
var email = document.getElementById("inputEmail1");
var telefono = document.getElementById("inputPhone");
//var userJSON = {};

//funcion para guardar datos del usuario e implementar en OnClick (en HTML)
function guardar() {

    if (nombre.value === "" || apellido.value === "" || edad.value === "" || email.value === "" || telefono.value === "") {
        document.getElementById('padreFormulario').innerHTML += `
            <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                <strong>Ups!</strong> Hay campos incompletos.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `
    } else {
        var userJSON =
            {
            Nombre: nombre.value,
            Apellido: apellido.value,
            Edad: edad.value,
            Email: email.value,
            Telefono: telefono.value
        }

        var nuevoJSON = JSON.stringify(userJSON);

        window.localStorage.setItem("fullUser", nuevoJSON);

    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let storage = localStorage.getItem("fullUser");
    let perfil = JSON.parse(storage);



    nombre.value = perfil.Nombre;
    apellido.value = perfil.Apellido;
    edad.value = perfil.Edad;
    email.value = perfil.Email;
    telefono.value = perfil.Telefono;


});

/*         userJSONFinal = JSON.parse(userJSON);
        localStorage.setItem("fullUser", userJSONFinal);
        document.getElementById("padreFormulario").innerHTML = localStorage.getItem("fullUser");
 */
