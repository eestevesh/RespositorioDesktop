//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    function guardar(user) {

        if (user === "") {
            alert("El campo está vacio");
        } else {
            localStorage.setItem("usuario", user.trim());
        }

    }
});
