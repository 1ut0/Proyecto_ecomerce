let infoCart = []
let nameProd = document.getElementById("name");

function showSubTotal(array){
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let count = document.getElementById("cantProd").value;
    let cost = element.unitCost;
    let result = count * cost;
    document.getElementById("subTotal").innerHTML = result;
    }
    
}

function showInfoCart(array){
    let info = "";
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        info +=`
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
            <div class="row container p-0 m-0">
                <div class="col">
                    <img src="`+element.image+`" width="100px"></img>
                </div>
                <div class="col">
                    <p class="font-weight-normal text-end my-2">`+element.name+`</p>
                </div>
                <div class="col">
                    <p class="font-weight-normal text-end my-2">`+element.currency+element.unitCost+`</p>
                </div>
                <div class="col">
                    <input class="form-control" type="number" min="1" value="`+element.count+`" id="cant">
                    <input type="hidden" value="`+element.unitCost+`" id="precio" readonly>
                </div>
                <div class="col">
                    <p class="font-weight-normal text-end my-2" id="subTotal">`+element.currency+element.count*element.unitCost+`</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("list").innerHTML = info;

        document.getElementById("cant").addEventListener("input", function(){
            let precio = document.getElementById("precio").value;
            let cant = document.getElementById("cant").value;
            let result = cant * precio;
            document.getElementById("subTotal").innerHTML = element.currency+result;
        })
    }
}



document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(CART_INFO_URL)
    .then((result =>{
        if(result.status === "ok"){
            cart = result.data
            infoCart = cart
            console.log(infoCart)
            showInfoCart(infoCart.articles)
        }
    }))
})
