// edit product validation starts


const form = document.querySelector(".edit-pdt-form");
const pdtName = document.querySelector("#pdtName");
const category = document.querySelector("#category");
const price = document.querySelector("#price");
const pdtDesc = document.querySelector("#pdtDesc");
// const pdtImages = document.querySelector("#pdtImages");
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

    const nameVal = pdtName.value.trim();
    const catVal = category.value.trim();
    const priceVal = price.value.trim();
    const descVal = pdtDesc.value.trim();
    // const imageVal = pdtImages.files.length;
    const lenVal = length.value.trim();
    const breadthVal = breadth.value.trim();
    const heightVal = height.value.trim();
    const colorVal = color.value.trim();
    const materialVal = material.value.trim();
    const weightVal = weight.value.trim();
    const quantityVal = quantity.value.trim();

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

    // if (imageVal == 0) {
    //     validity = false;
    //     setErrorFor(pdtImages);
    // } else {
    //     setSuccessFor(pdtImages);
    // }

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