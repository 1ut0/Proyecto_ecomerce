let id = localStorage.getItem("prodID");
let textComent = document.getElementById("comentar");
let puntaje = document.getElementById("selectStar");
let nameProd = document.getElementById("name");
let desProd = document.getElementById("description");
let canVen = document.getElementById("cantVen");
let catProd = document.getElementById("cat");
let precioProd = document.getElementById("precio");
let infoProduct = [];

function showImages(array){
    let arrayImg = "";
    for (let i = 0; i < array.length; i++) {
        let images = array[i];
        arrayImg +=`
        <div class="card">
            <div class="card" style="width: 18rem;">
            <img src="`+images+`" class="card-img-top" alt="...">
            </div>
        </div>
`
    document.getElementById("images").innerHTML = arrayImg;
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    
    getJSONData(PRODUCT_INFO_URL+id+EXT_TYPE)
    .then((resultObj =>{
        if(resultObj.status === "ok"){
            currentSelectProduct = resultObj.data
            infoProduct = currentSelectProduct;
            console.log(currentSelectProduct)
            
            showImages(infoProduct.images);
            nameProd.innerHTML = infoProduct.name;
            desProd.innerHTML = "Descripcion:"+" "+infoProduct.description;
            canVen.innerHTML = "Cantidad de Vendidos:"+" "+infoProduct.soldCount;
            catProd.innerHTML = "Categoria:"+" "+infoProduct.category;
            precioProd.innerHTML = "Precio:"+" "+infoProduct.currency+" "+infoProduct.cost;

            getJSONData(PRODUCT_INFO_COMMENTS_URL+id+EXT_TYPE).then(function(resultObj) {
            if(resultObj.status === "ok"){

                
                let comentarios = resultObj.data;
                let htmlContentToAppend = "";
                function showComentario(){
                if (comentarios.length > 0) {
                    comentarios.forEach(function (comentario) {
                        let comentStar = comentario.score;
                        let stars = "";

                        for(let i = 1; i <= comentStar; i++){
                            stars +=`<i class="fas fa-star checked"></i>`
                        }
                        for(let i = comentStar + 1; i <= 5; i++){
                            stars +=`<i class="far fa-star"></i>`
                        }

                        htmlContentToAppend +=`
                        <li class="media border list-group-item">
                            <div class="media-body">
                                <label class="mt-0"><strong>`+comentario.user+`</strong>
                                    <span class="mute">-`+comentario.dateTime+`</span>
                                    <span>-`+stars+`</span>
                                </label>
                                <br>
                                <label class="small">`+comentario.description+`</label>
                            </div>
                        </li>
                        `
                    });
                } else {
                    htmlContentToAppend = `<p>¡Se el primero en comentar!</p>`
                }
                document.getElementById("listComentarios").innerHTML = htmlContentToAppend;
                        }
                        showComentario();

               document.getElementById("btnComentar").addEventListener("click", function(){
                    
                }) 
            }
        })  
    }     
}))    
})
