const spinner= `<div class="spinner"></div>`
let SUBMIT = document.getElementById("submit-btn");
let originalSUBMIT = document.getElementById("submit-btn").innerHTML;

let loading = false;

const contact = async (e) => {
    if(loading) {
        return
    }
    e.preventDefault();
    loading = true;
    SUBMIT.innerHTML = spinner;
    try {
        let email = document.getElementById("email").value;
        let msg = document.getElementById("msg").value;
        let title = document.getElementById("title").value;
        let name = document.getElementById("name").value;
        if(email === "" || msg === "" || title === "" || name === "") {
            throw 'Revisá que todos los campos estén completos'
        }
        let body = {
            email,
            msg,
            title,
            name
        }
        let send = await axios.post("/api/tiendanube/contact", body);
        createAlert("Mensaje enviado, pronto nos contactaremos", "success");
        document.getElementById("email").value = ""
        document.getElementById("msg").value = ""
        document.getElementById("title").value = ""
        document.getElementById("name").value = ""
        SUBMIT.innerHTML = originalSUBMIT;
        loading = false;
    } catch (error) {
        console.log(error);
        createAlert(error);
        SUBMIT.innerHTML = originalSUBMIT;
        loading = false;
    }
 
 
}


//Helper function - Creates an alert on the bottom of the page.
const createAlert = (message, type) => {
    let alert = document.getElementById("alert")
    alert.innerHTML = message
    if(type === "success") {
        console.log("success")
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