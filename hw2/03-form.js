
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Name:", form.elements[0].value);
    console.log("Email:", form.elements[1].value);
    if(form.elements[2].value!=""){
        console.log("Feedback:",form.elements[2].value);
    }
    if(form.elements[3].checked){
         console.log("Yes,I would like to join newsletter");
    }
    else {
         console.log("No,thankyou");
    }
    
  });
