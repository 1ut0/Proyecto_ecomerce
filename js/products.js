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
  document.getElementById("products_low").innerHTML = "Veras aqui todos los productos"
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data;
            showProducts(products);
        }
    });
});

//funcion para filtrar por menor a mayor precio
document.getElementById("sortAsc").addEventListener("click", function(){
    let resultado = products.products
    resultado.sort((a, b) =>{
        return a.cost - b.cost
    })

    console.log(resultado)
    recargar(resultado)

    })

    document.getElementById("sortDesc").addEventListener("click", function() {
        let resultado = products.products
        resultado.sort((a, b) =>{
            return b.cost - a.cost
        })

        console.log(resultado)
        recargar(resultado)
    })

    document.getElementById("sortByCount").addEventListener("click", function(){
        let resultado = products.products
        resultado.sort((a, b) =>{
            return b.soldCount - a.soldCount
        })
        console.log(resultado)
        recargar(resultado)
    })

//filtrar precio por counts
document.getElementById("rangeFilterCount").addEventListener("click", function(){
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;
    let resultado = products.products.filter(product => product.cost >= minCount);
    resultado = products.products.filter(product => product.cost <= maxCount);
    console.log(resultado)
    recargar(resultado)
})


//funcion para borrar campos
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = "";
    maxCount = "";
    let resultado = products.products;
    resultado.sort((a, b) =>{
        return a.id - b.id
    })
    console.log(resultado)
    recargar(resultado)
});

//funcion para recargar los objetos segun un array
function recargar(a){
    let htmlContentToAppend = "";

    for(let i = 0; i < a.length; i++){
        let catsCars = a[i];
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
    document.getElementById("products_low").innerHTML = "Veras aqui todos los productos"
}