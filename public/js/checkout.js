const billingForm = document.querySelector('.billing-address-form');
const storedAddress = document.querySelector('.stored-addresses-section');
const changeAddressBtn = document.querySelector('.change-address-btn');

if (changeAddressBtn) {
    changeAddressBtn.addEventListener("click", () => {
        billingForm.style.display = "block";
        if (storedAddress) {
            storedAddress.style.display = "none";
        }
    })
}


if (billingForm) {
    // validating new address form

    const newaddFullname = document.querySelector("#billing-fullname");
    const newmobileNumber = document.querySelector("#billing-number");
    const newpincode = document.querySelector("#billing-pincode");
    const newflatAndHouseNo = document.querySelector("#billing-addressLineOne");
    const newareaAndColony = document.querySelector("#billing-addressLineTwo");
    const newtownOrCity = document.querySelector("#billing-city");
    const newstate = document.querySelector("#billing-state");

    billingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let validity = checkNewAddressFormValidity();

        if (validity) {
            billingForm.submit();
        }
    })

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