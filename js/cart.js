const URL_dos = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
var articlesArray = [];
var subTotalGeneral = 0;


function productSubTotal(article) {
        return article.unitCost * article.count;
}

function calcularSubTotal(cantidad, index) {
    let subtotal = 0;
    if (articlesArray[index].currency === 'USD') {
        subtotal = articlesArray[index].unitCost * cantidad * 40;
    } else {
        subtotal = articlesArray[index].unitCost * cantidad;
    }
    return subtotal;
}

/* function allSubTotal(array) {
    let subTotal = 0;
    array.forEach(articulo => {

        subTotal += productSubTotal(articulo);
    });

    return subTotal;
} */

function updateAllSubTotal() {
    let arrayCantidades = document.getElementsByClassName('productCount');
    let suballtotal = 0;
    for (let i = 0; i < arrayCantidades.length; i++) {
        suballtotal += calcularSubTotal(arrayCantidades[i].value, i);
    }
    document.getElementById('subtotal').innerHTML = 'UYU ' + suballtotal;
    subTotalGeneral = suballtotal;
}

function calcularTotal() {
    let total = subTotalGeneral;
    document.getElementById('total').innerHTML = 'UYU ' + total;
}

function cartTotalCost(array) {

    // completar la funcion que retorne el total de la venta, 
    //coincide con la suma de los subtotales por videojuego
    let totalCost = 0;
    array.forEach(articulo => {

        totalCost += productSubTotal(articulo);
    });

    return totalCost;
}

function comprobarUnidades() {
    let cantidades = document.getElementsByClassName('productCount');
    for (let i = 0; i < cantidades.length; i++) {
        cantidades[i].addEventListener('change', function () {
            document.getElementById("productSubtotal-" + i).innerHTML =
                articlesArray[i].currency + " " + cantidades[i].value * articlesArray[i].unitCost;
                
            updateAllSubTotal();
            calcularTotal();
            document.getElementById('productSubtotal-' + 0).innerHTML = calcularSubTotal(articulo[0].count, 0)
            document.getElementById('productSubtotal-' + 1).innerHTML = calcularSubTotal(articulo[1].count, 1)
        })
    }
}

function showCartProductsAndTotalCost(articulo) {

    let htmlToAppend = "";

    for (let i = 0; i < articulo.length; i++) {

        htmlToAppend += `
        <div>
            
                <tr>
                    <td> <img src=` + articulo[i].src + ` width="50px"> </td>
                    <td> ` + articulo[i].name + ` </td>
                    <td> ` + articulo[i].currency + ` ` + articulo[i].unitCost + ` </td>
                    <td><input class="form-control productCount" style="width:60px;" 
                    type="number" id="productCount${i}" value=` + articulo[i].count + ` min="1"></td>
                    <td><span id="productSubtotal-${i}" > ` + articulo[i].currency + ` ` + productSubTotal(articulo[i]) + `</span> </td>
                </tr>
            
        </div>
        `
    };

    document.getElementById("cart-products").innerHTML = htmlToAppend;
    //    document.getElementById("subtotal").innerHTML += "UYU " + allSubTotal(array);
    //    document.getElementById("total").innerHTML += "UYU " + cartTotalCost(array);
    comprobarUnidades();
    updateAllSubTotal();
    calcularTotal();

}

function pagarEnDolares(){
    document.getElementById('subtotal').innerHTML = 'USD ' + subTotalGeneral/40;
    document.getElementById('total').innerHTML = 'USD ' + subTotalGeneral/40;
}

function pagarEnPesos() {
    updateAllSubTotal();
    calcularTotal();
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(URL_dos).then(function (resultObj) {
        if (resultObj.status === 'ok') {

            articlesArray = resultObj.data.articles;
            showCartProductsAndTotalCost(articlesArray);

        }
    });

});
