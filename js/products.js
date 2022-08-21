let products = [];

function showProducts(array){
  let htmlContentToAppend = "";

  for(let i = 0; i < array.products.length; i++){
    let catsCars = array.products[i];
    console.log(catsCars)
    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + catsCars.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ catsCars.name +" "+catsCars.currency+" "+catsCars.cost+`</h4> 
                        <p> `+ catsCars.description +`</p> 
                        </div>
                        <small class="text-muted">` +catsCars.soldCount+ ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("listaAutos").innerHTML = htmlContentToAppend;
  }
  document.getElementById("products_low").innerHTML = "Veras aqui todos los productos de la categoria Autos"+array.catsCars
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CARS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data;
            showProducts(products);
        }
    });
});