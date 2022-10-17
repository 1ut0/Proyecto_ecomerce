let products = [];

function showProducts(array){
  let htmlContentToAppend = "";
  for(let i = 0; i < array.products.length; i++){
    let catsCars = array.products[i];
    htmlContentToAppend += `
        <div onclick="setItem(`+catsCars.id+`)" class="list-group-item list-group-item-action cursor-active">
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

function setItem(id) {
    localStorage.setItem("prodID", id);
    window.location = 'product-info.html';
}

//funcion para filtrar por menor a mayor precio
document.getElementById("sortAsc").addEventListener("click", function(){
    let resultado = products.products
    resultado.sort((a, b) =>{
        return a.cost - b.cost
    })
    recargar(resultado)
    })

    document.getElementById("sortDesc").addEventListener("click", function() {
        let resultado = products.products
        resultado.sort((a, b) =>{
            return b.cost - a.cost
        })
        recargar(resultado)
    })

    document.getElementById("sortByCount").addEventListener("click", function(){
        let resultado = products.products
        resultado.sort((a, b) =>{
            return b.soldCount - a.soldCount
        })
        recargar(resultado)
    })

//filtrar precio por counts
document.getElementById("rangeFilterCount").addEventListener("click", function(){
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    let resultado = products.products.filter(product => product.cost >= minCount);
    recargar(resultado)

    let resultado2 = products.products.filter(product => product.cost <= maxCount);
    recargar(resultado2)
    
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
    recargar(resultado)
});



//funcion para recargar los objetos segun un array
function recargar(a){
    let htmlContentToAppend = "";

    for(let i = 0; i < a.length; i++){
        let catsCars = a[i];
        htmlContentToAppend += `
            <div onclick="setCatId(`+catsCars.id+`)" class="list-group-item list-group-item-action">
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
