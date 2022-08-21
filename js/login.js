var submit = document.getElementById("ingresar");

function redirection(){
    location.href = "index.html"
}

submit.addEventListener("click", function(){
var email = document.getElementById("floatingInput").value;
var pass = document.getElementById("floatingPassword").value;

if(email.length == '' || pass == ''){
    alert("Ingrese todos los datos requeridos")
} else{
    redirection()
}
})
    
