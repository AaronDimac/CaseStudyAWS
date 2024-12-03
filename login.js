// login.js
function OnSubmit() {
    let empNumber = document.getElementById("number").value;
    let password = document.getElementById("password").value;
    let errorDiv = document.getElementById("errorMessage").value;

    if(empNumber.length > 9 || empNumber.length < 9) {
        errorDiv.innerHTML = "<br/>Employee number must be 9 digits";
    }

    if(typeof empNumber === "number") {
        errorDiv.innerHTML = "<br/>Employee number must be a number";
        
    }
}