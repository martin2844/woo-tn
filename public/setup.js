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
    let woo_url = document.getElementById("woo_url").value;
    let email = document.getElementById("email").value;
    console.log(user_id);
    let data = {
        user_id,
        api_client,
        api_secret,
        woo_url,
        email
    }
    let saveKeys = await axios.post("/api/tiendanube/setup", data);
    console.log(saveKeys);
    if(saveKeys.status === 200) {
        createAlert("Información guardada correctamente", "success");
        SUBMIT.innerHTML = originalSUBMIT;
        document.getElementById("test-btn").style.display = "flex";
    } else {
        createAlert("Por favor verificá tu información y probá nuevamente", "danger");
    }
    
}

    
const test = async () => {
    TEST.innerHTML = spinner;
    let woo_url = document.getElementById("woo_url").value;
    let user_id = document.getElementById("user_id").value;
    let api_client = document.getElementById("api_client").value;
    let api_secret = document.getElementById("api_secret").value;
    console.log("function to test api keys");
    //MUST CHECK IF IT ENDS with / or not 
    try {
        let test = await axios.get(`${woo_url}/wp-json/wc/v3/products?consumer_key=${api_client}&consumer_secret=${api_secret}`);
        if(test.data){
            createAlert("Prueba exitosa, ya podemos comenzar con la migración", "success");
        } else {
            createAlert("Hubo un error, por favor contactate con nosotros");
        }
    } catch (error) {
        console.log(error);
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