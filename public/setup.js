const spinner= `<div class="spinner"></div>`

let SUBMIT = document.getElementById("submit-btn");
let TEST = document.getElementById("test-btn");
let originalSUBMIT = document.getElementById("submit-btn").innerHTML;
let originalTEST = document.getElementById("test-btn").innerHTML;

const saveData = async (e) => {
    e.preventDefault();
    SUBMIT.innerHTML = spinner;
    console.log("pushed")
    let api_client = document.getElementById("api_client").value;
    let api_secret = document.getElementById("api_secret").value;
    let user_id = document.getElementById("user_id").value;
    let data = {
        user_id,
        api_client,
        api_secret
    }
    let saveKeys = await axios.post("/api/tiendanube/setup", data);
    if(saveKeys.data === "Success") {
        createAlert("Información guardada correctamente", "success");
        SUBMIT.innerHTML = originalSUBMIT;
        document.getElementById("test-btn").style.display = "flex";
    } else {
        createAlert("Por favor verificá tu información y probá nuevamente", "danger");
    }
    
}

    
const test = async () => {
    TEST.innerHTML = spinner;
    let user_id = document.getElementById("user_id").value;
    console.log("function to test api keys");
    let test = await axios.get(`/api/entregar/panel/test/${user_id}`);
    if(test.data){
        createAlert("Prueba exitosa, ya podés usar EntregarWeb!", "success");
    } else {
        createAlert("Hubo un error, por favor contactate con nosotros");
    }
    TEST.innerHTML = originalTEST;
    
}



//Helper function - Creates an alert on the bottom of the page.
const createAlert = (message, type) => {
    let alert = document.getElementById("alert")
    alert.innerHTML = message
    if(type === "success") {
        alert.classList.add("success");
    } else {
        alert.classList.add("danger");
    }
    alert.classList.add("animate__fadeInUp");
    alert.style.display = "block"

    setTimeout(() => {
        alert.classList.remove("animate__fadeInUp");
        alert.classList.add("animate__fadeOut");
        //Change actual page content
        setTimeout(() => {
            //4. After some time add a class to make it fade in
            alert.style.display = "none";
            if(type === "success") {
                alert.classList.remove("success");
            } else {
                alert.classList.remove("danger");
            }
            alert.classList.remove("animate__fadeOut");
        }, 500);

    }, 2000);
}