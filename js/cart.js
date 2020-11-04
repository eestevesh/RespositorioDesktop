const URL_dos = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
var articlesArray = [];
var subTotalGeneral = 0;
var porcentajeDeEnvio = 0;

function deliveryCost() {
    let costoEnHTML = document.getElementById('envio');
    let costoDelEnvio = subTotalGeneral * (porcentajeDeEnvio / 100);
    costoEnHTML.innerHTML = 'UYU ' + costoDelEnvio;
}

//calculo del subtotal en cada articulo
function productSubTotal(article) {
    return article.unitCost * article.count;
}

//calculo del subtotal para el general
function calcularSubTotal(cantidad, index) {
    let subtotal = 0;
    if (articlesArray[index].currency === 'USD') {
        subtotal = articlesArray[index].unitCost * cantidad * 40;
    } else {
        subtotal = articlesArray[index].unitCost * cantidad;
    }
    return subtotal;
}

//calculo de Subtotal de la compra
function updateAllSubTotal() {
    let arrayCantidades = document.getElementsByClassName('productCount');
    let suballtotal = 0;
    for (let i = 0; i < arrayCantidades.length; i++) {
        suballtotal += calcularSubTotal(arrayCantidades[i].value, i);
    }
    document.getElementById('subtotal').innerHTML = 'UYU ' + suballtotal;
    subTotalGeneral = suballtotal;
}

//calculo de subtotal + envio
function calcularTotal() {
    let total = subTotalGeneral + subTotalGeneral * (porcentajeDeEnvio / 100);
    document.getElementById('total').innerHTML = 'UYU ' + total;
}

//funcion que verifica los costos al cambiar la cantidad de unidades de un articulo
function comprobarUnidades() {
    let cantidades = document.getElementsByClassName('productCount');
    for (let i = 0; i < cantidades.length; i++) {
        cantidades[i].addEventListener('change', function () {
            document.getElementById("productSubtotal-" + i).innerHTML =
                articlesArray[i].currency + " " + cantidades[i].value * articlesArray[i].unitCost;

            updateAllSubTotal();
            deliveryCost();
            calcularTotal();
            document.getElementById('productSubtotal-' + i).innerHTML = calcularSubTotal(articulo[i].count, i);
        })
    }
}


//funcion que elimina el articulo de la lista
function eliminarArticulo() {

    let articulosArray = document.getElementsByClassName('articulo');
    for (let i = 0; i < articulosArray.length; i++) {
        articulosArray[i].addEventListener('click', function () {
           
            let element = document.getElementById('articulo-' + i);
            let padre = document.getElementById("articulo-" + i).parentNode;
            padre.removeChild(element);
            
            
            updateAllSubTotal();
            deliveryCost();
            calcularTotal();
            comprobarUnidades();
        })
    }
}

function showCartProductsAndTotalCost(articulo) {

    let htmlToAppend = "";

    for (let i = 0; i < articulo.length; i++) {

        htmlToAppend += `
        <div >
            
                <tr class="articulo" id="articulo-${i}">
                    <td> <img src=` + articulo[i].src + ` width="50px"> </td>
                    <td> ` + articulo[i].name + ` </td>
                    <td> ` + articulo[i].currency + ` ` + articulo[i].unitCost + ` </td>
                    <td><input class="form-control productCount" style="width:60px;" onclick="comprobarUnidades()"
                    type="number" id="productCount${i}" value=` + articulo[i].count + ` min="1"></td>
                    <td><span id="productSubtotal-${i}" > ` + articulo[i].currency + ` ` + productSubTotal(articulo[i]) + `</span> </td>
                
                    <td>
                        <button type="button" class="close" aria-label="Close"
                            id="buttonEliminar-${i}" onclick="eliminarArticulo()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </td>


                </tr>
            
        </div>
        `
    };

    document.getElementById("cart-products").innerHTML = htmlToAppend;
    comprobarUnidades();
    updateAllSubTotal();
    calcularTotal();
    //eliminarArticulo();
    //    comprobarUnidadesTrasEliminar();


}
/* 
function pagarEnDolares(){
    document.getElementById('subtotal').innerHTML = 'USD ' + subTotalGeneral/40;
    document.getElementById('envio').innerHTML = 'USD ' + (subTotalGeneral/40)*(porcentajeDeEnvio/100);
    document.getElementById('total').innerHTML = 'USD ' + parseInt(subTotalGeneral/40) + parseInt(subTotalGeneral/40)*(porcentajeDeEnvio/100);
}

function pagarEnPesos() {
    updateAllSubTotal();
    calcularTotal();
} */

//Habilitar y deshabilitar modal
let nombreTarjeta = document.getElementById('inputName');
let companiaTarjeta = document.getElementById('compania');
let serieTarjeta = document.getElementById('inputNumSerie');
let validezAnioTarjeta = document.getElementById('validezAnio');
let validezMesTarjeta = document.getElementById('validezMes');

let banco = document.getElementById('banco');
let nroCuenta = document.getElementById('inputCuenta');


//corroborar que los campos del modal no estén vacíos
document.getElementById('guardarDatosModal').addEventListener('click', function () {
    if ((nombreTarjeta.value === '' || companiaTarjeta.value === null || serieTarjeta.value === ''
        || validezAnioTarjeta.value === null || validezMesTarjeta.value === null) &&
        (banco.value === null || nroCuenta.value === '')) {
        document.getElementById('modalFooter').innerHTML += `
            <div class="alert alert-danger alert-dismissible fade show w-25" role="alert">
                <strong>Ups!</strong> Hay campos incompletos.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `

// si no están vacíos, alerta de OK        
    } else {
        document.getElementById('guardarDatosModal').className += "close";
        document.getElementById('modalFooter').innerHTML += `
            <div class="alert alert-success alert-dismissible fade show w-25" role="alert">
                <strong>Bien!</strong> Datos guardados.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `
// luego de guardar, el botón Cerrar no borra los datos
        document.getElementById('cerrarModal').addEventListener('click', function () {
            document.getElementById('exampleModal').hidden;
            
        })

    }
    
})


//eliminar datos ingresados en el modal el button Cerrar
document.getElementById('cerrarModal').addEventListener('click', function () {
    nombreTarjeta.value = '';
    companiaTarjeta.selectedIndex = 'true';
    serieTarjeta.value = '';
    validezMesTarjeta.selectedIndex = 'true';
    validezAnioTarjeta.selectedIndex = 'true';

    banco.selectedIndex = 'true';
    nroCuenta.value = '';    
})


let premiumRadio = document.getElementById('premiumRadio');
let expressRadio = document.getElementById('expressRadio');
let estandarRadio = document.getElementById('estandarRadio');

//funcion para validar campos de modal + envio en el OK final
function comprobarCompra() {

// primero revisa que una de las opciones del modal esté OK
    if ((nombreTarjeta.value === '' || companiaTarjeta.value === null || serieTarjeta.value === ''
        || validezAnioTarjeta.value === null || validezMesTarjeta.value === null) &&
        (banco.value === null || nroCuenta.value === '')) {
        document.getElementById('confirmarCompra').innerHTML += `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Ups!</strong> Debes agregar un método de compra.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `

//segundo que una de las opciones de envio esté seleccionada
    } else if (premiumRadio.checked === false && expressRadio.checked === false && estandarRadio.checked === false) {
        document.getElementById('confirmarCompra').innerHTML += `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Ups!</strong> Debes elegir un método de envío.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `

//con todo OK, alerta de éxito
    } else {
        document.getElementById('confirmarCompra').innerHTML += `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Has comprado con éxito!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>        
        `
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(URL_dos).then(function (resultObj) {
        if (resultObj.status === 'ok') {

            articlesArray = resultObj.data.articles;
            showCartProductsAndTotalCost(articlesArray);
            deliveryCost();
        }
    });


    //Al hacer click en el radio button se habilita/deshabilita la otra opcion del modal
    document.getElementById('radioTransferencia').addEventListener('click', function () {
        nombreTarjeta.disabled = true;
        companiaTarjeta.disabled = true;
        serieTarjeta.disabled = true;
        validezMesTarjeta.disabled = true;
        validezAnioTarjeta.disabled = true;

        banco.disabled = false;
        nroCuenta.disabled = false;
    });

    //Idem
    document.getElementById('radioTarjetas').addEventListener('click', function () {
        nombreTarjeta.disabled = false;
        companiaTarjeta.disabled = false;
        serieTarjeta.disabled = false;
        validezMesTarjeta.disabled = false;
        validezAnioTarjeta.disabled = false;

        banco.disabled = true;
        nroCuenta.disabled = true;
    })


    // las tres opciones de envio
    document.getElementById('premiumRadio').addEventListener('change', function () {
        porcentajeDeEnvio = 15;
        deliveryCost();
        calcularTotal();
    });

    document.getElementById('expressRadio').addEventListener('change', function () {
        porcentajeDeEnvio = 10;
        deliveryCost();
        calcularTotal();
    });

    document.getElementById('estandarRadio').addEventListener('change', function () {
        porcentajeDeEnvio = 5;
        deliveryCost();
        calcularTotal();
    });


});
