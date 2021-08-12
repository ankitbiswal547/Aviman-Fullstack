const navBtn = document.querySelector("#sidenavbtn");
const navbar = document.querySelector(".side-nav");

navBtn.addEventListener("click", () => {
    if (navbar.classList.contains("hide")) {
        navBtn.classList.remove("arrow-right");
        navbar.classList.remove("hide");
    } else {
        navbar.classList.add("hide");
        navBtn.classList.add("arrow-right");
    }
})


let navLinks = document.querySelectorAll(".nav-links");
let allPdt = document.querySelector("#allProducts");
// let editPdt = document.querySelector("#editProduct");
let newPdt = document.querySelector("#addNewProduct");
let home = document.querySelector("#home");
let newPdtNavlink = document.querySelector("#newPdtNavlink");
let allPdtsNavlink = document.querySelector("#allPdtsNavlink");
// let editPdtNavlink = document.querySelector("#editPdtNavlink");
let homelink = document.querySelector("#homeLink");

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", () => {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        navLinks[i].className += " active";
        checkactiveness();
    })
}

function checkactiveness() {
    if (homeLink.classList.contains("active")) {
        home.classList.add("visible");
    } else {
        home.classList.remove("visible");
    }

    if (newPdtNavlink.classList.contains("active")) {
        newPdt.classList.add("visible");
    } else {
        newPdt.classList.remove("visible");
    }

    if (allPdtsNavlink.classList.contains("active")) {
        allPdt.classList.add("visible");
    } else {
        allPdt.classList.remove("visible");
    }

    // if (editPdtNavlink.classList.contains("active")) {
    //     editPdt.classList.add("visible");
    // } else {
    //     editPdt.classList.remove("visible");
    // }
}

window.onload = () => {
    let urlHash = window.location.hash.replace("#", "");

    if (urlHash == "home") {
        homelink.classList.add("active");
    } else if (urlHash == "addNewProduct") {
        newPdtNavlink.classList.add("active");
    } else if (urlHash == "allProducts") {
        allPdtsNavlink.classList.add("active");
    }
    checkactiveness();
}

// new product validation starts


const form = document.querySelector(".new-pdt-form");
const pdtName = document.querySelector("#pdtName");
const pdtCode = document.querySelector("#pdtCode");
const category = document.querySelector("#category");
const size = document.querySelector("#size");
const price = document.querySelector("#price");
const pdtDesc = document.querySelector("#pdtDesc");
const pdtImages = document.querySelector("#pdtImages");
const length = document.querySelector("#length");
const breadth = document.querySelector("#breadth");
const height = document.querySelector("#height");
const color = document.querySelector("#color");
const material = document.querySelector("#material");
const weight = document.querySelector("#weight");
const quantity = document.querySelector("#quantity");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = checkvalidity();

    if (isValid) {
        form.submit();
    }
})

const checkvalidity = () => {

    let validity = true;

    const codeVal = pdtCode.value.trim();
    const nameVal = pdtName.value.trim();
    const catVal = category.value.trim();
    const sizeVal = size.value.trim();
    const priceVal = price.value.trim();
    const descVal = pdtDesc.value.trim();
    const imageVal = pdtImages.files.length;
    const lenVal = length.value.trim();
    const breadthVal = breadth.value.trim();
    const heightVal = height.value.trim();
    const colorVal = color.value.trim();
    const materialVal = material.value.trim();
    const weightVal = weight.value.trim();
    const quantityVal = quantity.value.trim();

    if (codeVal == "") {
        validity = false;
        setErrorFor(pdtCode);

    } else {
        setSuccessFor(pdtCode);
    }

    if (nameVal == "") {
        validity = false;
        setErrorFor(pdtName);

    } else {
        setSuccessFor(pdtName);
    }

    if (catVal == "") {
        validity = false;
        setErrorFor(category);
    } else {
        setSuccessFor(category);
    }

    if (sizeVal == "") {
        validity = false;
        setErrorFor(size);
    } else {
        setSuccessFor(size);
    }

    if (priceVal == "" || priceVal < 0) {
        validity = false;
        setErrorFor(price);
    } else {
        setSuccessFor(price);
    }

    if (lenVal == "" || lenVal < 0) {
        validity = false;
        setErrorFor(length);
    } else {
        setSuccessFor(length);
    }

    if (breadthVal == "" || breadthVal < 0) {
        validity = false;
        setErrorFor(breadth);
    } else {
        setSuccessFor(breadth);
    }

    if (heightVal == "" || heightVal < 0) {
        validity = false;
        setErrorFor(height);
    } else {
        setSuccessFor(height);
    }

    if (weightVal == "" || weightVal < 0) {
        validity = false;
        setErrorFor(weight);
    } else {
        setSuccessFor(weight);
    }

    if (quantityVal == "" || quantityVal < 0) {
        validity = false;
        setErrorFor(quantity);
    } else {
        setSuccessFor(quantity);
    }

    if (colorVal == "") {
        validity = false;
        setErrorFor(color);
    } else {
        setSuccessFor(color);
    }

    if (materialVal == "") {
        validity = false;
        setErrorFor(material);
    } else {
        setSuccessFor(material);
    }

    if (descVal == "") {
        validity = false;
        setErrorFor(pdtDesc);
    } else {
        setSuccessFor(pdtDesc);
    }

    if (imageVal == 0) {
        validity = false;
        setErrorFor(pdtImages);
    } else {
        setSuccessFor(pdtImages);
    }

    return validity;
}

const setErrorFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.style.display = "block";
}

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    const small = formControl.querySelector("small");
    small.style.display = "none";
}

// new product validation ends


// fire sale activation

const fireSaleForm = document.querySelector(".fire-sale-form");
const fireSaleInput = document.querySelector(".fire-sale-input");
const fireSaleBtn = document.querySelector(".fire-sale-btn");


if (fireSaleForm != null) {
    fireSaleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = checkFireSaleFormValidity();

        if (isValid) {
            fireSaleForm.submit();
        }
    })

    const checkFireSaleFormValidity = () => {

        let validity = true;
        let inputVal = fireSaleInput.value.trim();

        if (inputVal == "") {
            validity = false;

            fireSaleInput.style.border = "1px solid red";
            fireSaleInput.style.background = "#ff00000d";
        }

        return validity;
    }
}