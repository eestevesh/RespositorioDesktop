var getJSONData = function (url) {
    var result = {};
    return fetch(url)
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw Error(respuesta.statusText);
            }
        })
        .then(function (respuesta) {
            result.status = 'ok';
            result.data = respuesta;
            return result;
        })
}

var productsArray = [];

function showProducts(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

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

        document.getElementById("contenido").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            productsArray = resultObj.data;
            showProducts(productsArray);
        }
    });
});
