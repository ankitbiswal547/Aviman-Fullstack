function showEditable(x) {
    let showEditableBtn = document.querySelector(`#showEditable${x}`);
    let hideEditableBtn = document.querySelector(`#hideEditable${x}`);
    let nonEditableSec = document.querySelector(`.userpage-noneeditable-section${x}`);
    let editableSec = document.querySelector(`.userpage-editable-section${x}`);

    showEditableBtn.style.display = "none";
    hideEditableBtn.style.display = "grid";
    nonEditableSec.style.display = "none";
    editableSec.style.display = "block";
}

function hideEditable(x, e) {
    e.preventDefault();
    let showEditableBtn = document.querySelector(`#showEditable${x}`);
    let hideEditableBtn = document.querySelector(`#hideEditable${x}`);
    let nonEditableSec = document.querySelector(`.userpage-noneeditable-section${x}`);
    let editableSec = document.querySelector(`.userpage-editable-section${x}`);

    showEditableBtn.style.display = "grid";
    hideEditableBtn.style.display = "none";
    nonEditableSec.style.display = "block";
    editableSec.style.display = "none";
}


let uploadInput = document.querySelector(".custom-upload-input");
let styledInput = document.querySelector(".styledinput-section");
let uploadBtn = document.querySelector("#uploadBtn");
let submitBtn = document.querySelector(".custom-upload-submit-btn");
let uploadPopupSection = document.querySelector(".upload-image-popup-section");
let validationMsg = document.querySelector(".image-size-validation-msg");
let dontBeSmart = document.querySelector(".dontBeSmart");


uploadInput.addEventListener("change", () => {
    if (uploadInput.value != undefined) {
        dontBeSmart.style.display = "none";
        let fileSize = (uploadInput.files[0].size / 1024).toFixed(2);
        if (fileSize > 2600) {
            validationMsg.style.color = "red";
            uploadBtn.disabled = true;
            return;
        }
        validationMsg.style.color = "black";
        styledInput.textContent = `${uploadInput.value.substr(12)}`;
        uploadBtn.disabled = false;
    }
})

function uploadBtnClicked() {

    if (uploadInput.value != "") {
        submitBtn.click();
        dontBeSmart.style.display = "none";
        cancelUploadPopup();
    }
    else {
        dontBeSmart.textContent = "Don't be too Smart!! :(";
        dontBeSmart.style.display = "block";
        uploadBtn.disabled = true;
    }
}

function cancelUploadPopup() {
    uploadPopupSection.style.display = "none";
    dontBeSmart.style.display = "none";
}

function showUploadSectionPopup() {
    uploadPopupSection.style.display = "flex";
}


let userNavItems = document.querySelectorAll(".userpage-navigation-items");
let usernavProfile = document.querySelector("#usernav-profile");
let usernavAddress = document.querySelector("#usernav-adddress");
// let usernavHistory = document.querySelector("#usernav-history");
let usernavReviews = document.querySelector("#usernav-reviews");
let userIntroSec = document.querySelector(".user-intro-sec");
let addressSec = document.querySelector(".address-section");
let orderHistory = document.querySelector(".order-history");
let reviewsHistory = document.querySelector(".reviews-history");

for (let i of userNavItems) {
    i.addEventListener("click", () => {
        // if(i.classList.contains("active")) {
        //     i.remove
        // }
        let current = document.querySelector(".usernav-active");
        current.className = current.className.replace(" usernav-active", "");
        i.className += " usernav-active";
        userActiveState();
    })
}


function userActiveState() {
    if (usernavProfile.classList.contains("usernav-active")) {
        userIntroSec.classList.add("user-sec-visible");
    } else {
        userIntroSec.classList.remove("user-sec-visible");
    }

    if (usernavAddress.classList.contains("usernav-active")) {
        addressSec.classList.add("user-sec-visible");
    } else {
        addressSec.classList.remove("user-sec-visible");
    }

    // if (usernavHistory.classList.contains("usernav-active")) {
    //     orderHistory.classList.add("user-sec-visible");
    // } else {
    //     orderHistory.classList.remove("user-sec-visible");
    // }

    if (usernavReviews.classList.contains("usernav-active")) {
        reviewsHistory.classList.add("user-sec-visible");
    } else {
        reviewsHistory.classList.remove("user-sec-visible");
    }
    // console.log("spam")
}

userActiveState();

let addressSecAddNewAddress = document.querySelector(".address-sec-add-new-address");
let addNewAddressForm = document.querySelector(".add-new-address-form");

function showNewAddressForm() {
    addNewAddressForm.style.display = "block";
    addressSecAddNewAddress.style.display = "none";
}

function showAddAddressBtn(e) {
    e.preventDefault();
    addNewAddressForm.style.display = "none";
    addressSecAddNewAddress.style.display = "flex";
}


// window.onscroll = function () { myFunction() };

// Get the navbar
// var usernavbar = document.querySelector(".userpage-navigation");

// Get the offset position of the navbar
// var sticky = usernavbar.offsetTop;

// function myFunction() {
//     if (window.pageYOffset >= 10) {
//         usernavbar.classList.add("sticky")
//     } else {
//         usernavbar.classList.remove("sticky");
//     }
// }

let userDetailForm = document.querySelector(".user-details-form");

userDetailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("submitted!!");

    let validity = checkValidity();

    if (validity) {
        userDetailForm.submit();
    }
})


const usernameInput = document.querySelector("#usernameInput");
const userEmail = document.querySelector("#userEmail");

const checkValidity = () => {
    let isvalid = true;

    const nameVal = usernameInput.value.trim();
    const emailVal = userEmail.value.trim();

    if (nameVal == "") {
        isvalid = false;
        setErrorFor(usernameInput, "Name is required");
    } else {
        setSuccessFor(usernameInput);
    }

    if (emailVal == "") {
        isvalid = false;
        setErrorFor(userEmail, "Email is required");
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailVal))) {
        isvalid = false;
        setErrorFor(userEmail, "Invalid email address.")
    } else {
        setSuccessFor(userEmail);
    }

    // console.log(nameVal, emailVal, aboutVal)

    return isvalid;
}


const setErrorFor = (input, msg) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");
    small.style.display = "block";
    small.textContent = msg;
}

const setSuccessFor = (input) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");

    small.style.display = "none";
}




// address form validation
const validateAddressForm = (form, e) => {
    e.preventDefault();
    const addressForm = document.querySelector(`.${form}`);

    const fullname = addressForm.querySelector("#addFullname");
    const mobileNum = addressForm.querySelector("#mnum");
    const pincode = addressForm.querySelector("#pincode");
    const flatAndHouseNo = addressForm.querySelector("#flatAndHouseNo");
    const areaAndColony = addressForm.querySelector("#areaAndColony");
    const townOrCity = addressForm.querySelector("#townOrCity");
    const state = addressForm.querySelector("#state");
    const addresstype = addressForm.querySelector("#addresstype");

    let validity = checkAddressFormValidity(fullname, mobileNum, pincode, flatAndHouseNo, areaAndColony, townOrCity, state, addresstype);

    // console.log(fullname);

    if (validity) {
        addressForm.submit();
    }
}

const checkAddressFormValidity = (fullname, mobileNum, pincode, flatAndHouseNo, areaAndColony, townOrCity, state, addresstype) => {
    isvalid = true;

    const nameVal = fullname.value.trim();
    const mobileNumVal = mobileNum.value.trim();
    const pincodeVal = pincode.value.trim();
    const flatAndHouseNoVal = flatAndHouseNo.value.trim();
    const areaAndColonyVal = areaAndColony.value.trim();
    const townOrCityVal = townOrCity.value.trim();
    const stateVal = state.value.trim();
    const addresstypeVal = addresstype.value.trim();

    if (nameVal == "") {
        isvalid = false;
        setErrorFor(fullname, "Name is required");
    } else {
        setSuccessFor(fullname);
    }

    if (mobileNumVal == "") {
        isvalid = false;
        setErrorFor(mobileNum, "Mobile Number is required");
    } else if (!(/^\d{10}$/.test(mobileNumVal))) {
        isvalid = false;
        setErrorFor(mobileNum, "Invalid mobile number.");
    } else {
        setSuccessFor(mobileNum);
    }

    if (pincodeVal == "") {
        isvalid = false;
        setErrorFor(pincode, "Pincode is required");
    } else if (!(/^[1-9][0-9]{5}$/.test(pincodeVal))) {
        isvalid = false;
        setErrorFor(pincode, "Invalid pincode.");
    } else {
        setSuccessFor(pincode);
    }

    if (flatAndHouseNoVal == "") {
        isvalid = false;
        setErrorFor(flatAndHouseNo, "Address line 1 is required");
    } else {
        setSuccessFor(flatAndHouseNo);
    }

    if (areaAndColonyVal == "") {
        isvalid = false;
        setErrorFor(areaAndColony, "Address line 2 is required");
    } else {
        setSuccessFor(areaAndColony);
    }

    if (townOrCityVal == "") {
        isvalid = false;
        setErrorFor(townOrCity, "City is required");
    } else {
        setSuccessFor(townOrCity);
    }

    if (stateVal == "") {
        isvalid = false;
        setErrorFor(state, "State is required");
    } else {
        setSuccessFor(state);
    }

    return isvalid;
}




// validating new address form

const newaddFullname = document.querySelector("#newaddFullname");
const newmobileNumber = document.querySelector("#newmobileNumber");
const newpincode = document.querySelector("#newpincode");
const newflatAndHouseNo = document.querySelector("#newflatAndHouseNo");
const newareaAndColony = document.querySelector("#newareaAndColony");
const newtownOrCity = document.querySelector("#newtownOrCity");
const newstate = document.querySelector("#newstate");

const validateNewAddressForm = (e) => {
    e.preventDefault();
    const newAddressForm = document.querySelector(".add-address-form");

    let validity = checkNewAddressFormValidity();

    if (validity) {
        newAddressForm.submit();
    }
}

const checkNewAddressFormValidity = () => {
    let isvalid = true;

    const nameVal = newaddFullname.value.trim();
    const mobileNumVal = newmobileNumber.value.trim();
    const pincodeVal = newpincode.value.trim();
    const flatAndHouseNoVal = newflatAndHouseNo.value.trim();
    const areaAndColonyVal = newareaAndColony.value.trim();
    const townOrCityVal = newtownOrCity.value.trim();
    const stateVal = newstate.value.trim();

    if (nameVal == "") {
        isvalid = false;
        setErrorFor(newaddFullname, "Name is required");
    } else {
        setSuccessFor(newaddFullname);
    }

    if (mobileNumVal == "") {
        isvalid = false;
        setErrorFor(newmobileNumber, "Mobile Number is required");
    } else if (!(/^\d{10}$/.test(mobileNumVal))) {
        isvalid = false;
        setErrorFor(newmobileNumber, "Invalid mobile number.");
    } else {
        setSuccessFor(newmobileNumber);
    }

    if (pincodeVal == "") {
        isvalid = false;
        setErrorFor(newpincode, "Pincode is required");
    } else if (!(/^[1-9][0-9]{5}$/.test(pincodeVal))) {
        isvalid = false;
        setErrorFor(newpincode, "Invalid pincode.");
    } else {
        setSuccessFor(newpincode);
    }

    if (flatAndHouseNoVal == "") {
        isvalid = false;
        setErrorFor(newflatAndHouseNo, "Address line 1 is required");
    } else {
        setSuccessFor(newflatAndHouseNo);
    }

    if (areaAndColonyVal == "") {
        isvalid = false;
        setErrorFor(newareaAndColony, "Address line 2 is required");
    } else {
        setSuccessFor(newareaAndColony);
    }

    if (townOrCityVal == "") {
        isvalid = false;
        setErrorFor(newtownOrCity, "City is required");
    } else {
        setSuccessFor(newtownOrCity);
    }

    if (stateVal == "") {
        isvalid = false;
        setErrorFor(newstate, "State is required");
    } else {
        setSuccessFor(newstate);
    }

    return isvalid;
}