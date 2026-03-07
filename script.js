const form = document.getElementById("diagnosticForm")

if(form){

form.addEventListener("submit", function(e){

e.preventDefault()

window.location.href = "thanks.html"

})

}