var product = {};
var comments = {};
var numero = {};
var productList = {};
const maxScore = 5;


function showComment(array) {
    let htmlCommentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        htmlCommentToAppend += ` 
            <div> 
                <br>
                <p>
                    <strong>Usuario:</strong> ` + comentario.user + `. 
                    <strong> Fecha:</strong> ` + comentario.dateTime + `
                </p>
                <p>
                    <strong>Comentario:</strong> ` + comentario.description + `
                </p>
                <div>
                ` + showScore(comentario.score) + `
                </div>
                <br>
                
            </div> 
        `

    }
    document.getElementById("productComments").innerHTML += htmlCommentToAppend;
}

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


function showScore(score) {

    let stars = "";
    let htmlScore = "";
    for (let i = 1; i <= maxScore; i++) {
        if (i <= score) {
            stars += '<i class="fa fa-star checked"></i>';
        } else {
            stars += '<i class="fa fa-star"></i>';
        }
    }

    htmlScore = `<span>  ${stars}</span>`;

    return htmlScore;

}

var numero = {};

function add(sno) {

    numero = sno;

    for (var i = 1; i <= 5; i++) {
        var cur = document.getElementById("star" + i)
        cur.className = "fa fa-star"
    }

    for (var i = 1; i <= sno; i++) {
        var cur = document.getElementById("star" + i)
        if (cur.className == "fa fa-star") {
            cur.className = "fa fa-star checked"
        } else {
            cur.className = "fa fa-star"
        }
    }

    return numero;
}

function mostrarRelacionados(array) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlRelacionados = "";

            for (let i = 0; i < array.length; i++) {
                let relatedProductPosition = array[i];
                let relatedProduct = productList[relatedProductPosition];
                
                //col-lg-3 col-md-4 col-6

                htmlRelacionados += `
                <div class= "col-md-3 col-sm-9 border ml-2 mr-2">
                    <div id="relatedProductImg" class= "row">
                        <img class="img-fluid p-2" src="`+ relatedProduct.imgSrc + `">
                    </div>                   
                    <div "relatedProductInfo" class= "row p-2">
                    <p><strong>`+ relatedProduct.name + `</strong></p> 
                    <p>`+ relatedProduct.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="products.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("productosRelacionados").innerHTML = htmlRelacionados;
        }
    })
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            mostrarRelacionados(product.relatedProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comment = resultObj.data;

            showComment(comment);
        }
    });

    document.getElementById("button").addEventListener("click", function () {

        // definir fecha en el comentario
        var today = new Date();
        var mes = parseInt(today.getMonth() + 1);

        if (mes < 10) {
            mes = "0" + mes
        }

        today = today.getFullYear() + '-' + mes + '-' + today.getDate() + '  ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        //definir usuario
        let usuario = localStorage.getItem("usuario");

        //definir puntaje
        let newScore = showScore(add(numero));

        //definir comentario
        let newComment = document.getElementById("productNewComment").value;

        //agregar usuario, fecha, comentario y puntaje a comentarios 
        let htmlContentToAppend = ` 
            <div> 
                <br>
                <p>
                    <strong>Usuario:</strong> ` + usuario + `. 
                    <strong> Fecha:</strong> ` + today + `
                </p>
                <p>
                    <strong>Comentario:</strong> ` + newComment + `
                </p>
                <div>
                ` + newScore + `
                </div>
                <br>
                
            </div> 
            `

        document.getElementById("productComments").innerHTML += htmlContentToAppend;


        //borrar textarea
        document.getElementById("productNewComment").value = "";

        //borrar estrellas
        document.getElementById("star1").className = "fa fa-star";
        document.getElementById("star2").className = "fa fa-star";
        document.getElementById("star3").className = "fa fa-star";
        document.getElementById("star4").className = "fa fa-star";
        document.getElementById("star5").className = "fa fa-star";
    });

});
