var productsArray = [];
const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array){ //funcion que ordena segun el criterio
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) // criterio: por nombre ascendente
    {
        result = array.sort(function(a, b) {  // ordena de forma ascendente
            let aCost = parseInt(a.cost); // pasa el string a numero y lo guarda en una variable
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; } // compara dos palabras y coloca la menor (antes en abcedario) previo
            if ( aCost > bCost ){ return 1; } // coloca la mayor despues
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){ // criterio: por nombre descendente (de Z a A)
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost); // pasa el string a numero y lo guarda en una variable
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ // criterio: por numero
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); // pasa el string a numero y lo guarda en una variable
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProducts(currentProductsArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {


            htmlContentToAppend += `
                    <div class="list-group-item list-group-item-action">
                       <div class="row">
                            <div class="col-3">
                                <img src="` + products.imgSrc + `" alt="` + products.name + ` " class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class=" d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ products.name + `</h4>
                                    <small class="text-muted">` + products.soldCount + ` artículos vendidos</small>
                                </div>
                                <div>
                                    <p>`+ products.description + `</p>
                                </div>
                                <div>
                                    <p>`+ products.currency + ` ` + products.cost + `</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
        }

        document.getElementById("contenido").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProducts(currentProductsArray);
}

document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            productsArray = resultObj.data;
            sortAndShowProducts(ORDER_DESC_BY_COST, productsArray);
        }
    });


    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });



    document.getElementById("limpiarFiltro").addEventListener("click", function () {
        document.getElementById("precioMinimo").value = "";
        document.getElementById("precioMaximo").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProducts(currentProductsArray);
    });

    document.getElementById("filtrarPorPrecio").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("precioMinimo").value;
        maxCount = document.getElementById("precioMaximo").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProducts(currentProductsArray);
    });
    
});
