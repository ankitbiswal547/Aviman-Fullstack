let switchTo3 = document.querySelector("#switchTo3");
let switchTo2 = document.querySelector("#switchTo2");
let eachProduct = document.querySelectorAll(".cp-each-product");
let pricingDiv = document.querySelectorAll(".cp-pricing");

switchTo3.addEventListener("click", () => {
    if (!switchTo3.classList.contains("view-active")) {
        switchTo3.classList.add("view-active");
        switchTo2.classList.remove("view-active");
        for (let pdt of eachProduct) {
            pdt.style.width = "30%";
        }
        for (let priceDiv of pricingDiv) {
            priceDiv.style.width = "100%";
        }
    }
})

switchTo2.addEventListener("click", () => {
    if (!switchTo2.classList.contains("view-active")) {
        switchTo3.classList.remove("view-active");
        switchTo2.classList.add("view-active");
        for (let pdt of eachProduct) {
            pdt.style.width = "47%";
        }
        for (let priceDiv of pricingDiv) {
            priceDiv.style.width = "100%";
        }
    }
})


let filterBtn = document.querySelector(".cp-filter-settings");
let allFilters = document.querySelector(".all-filters");
let filtersArrowDown = document.querySelector(".filters-animate-arrow");
let applyChangesBtn = document.querySelector(".apply-changes-btn");

filterBtn.addEventListener("click", () => {
    // filterBtn.style.color = "#e85a4f";
    filterBtn.classList.toggle("filters-active");
    allFilters.classList.toggle("show-all-filters");
    if (filterBtn.classList.contains("filters-active")) {
        filtersArrowDown.style.animation = `arrowDownAnimate 0.15s linear forwards`;
    } else {
        filtersArrowDown.style.animation = `arrowUpAnimate 0.15s linear forwards`;
    }
})

// applyChangesBtn.addEventListener("click", () => {
//     filterBtn.classList.remove("filters-active");
//     allFilters.classList.remove("show-all-filters");
//     filtersArrowDown.style.animation = `arrowUpAnimate 0.15s linear forwards`;
// })

const submitForm = () => {
    document.querySelector(".searchbar-form").submit();
}


const filterForm = document.querySelector('.filters-form');
const lowerLimit = document.querySelector('#lowerLimit');
const upperLimit = document.querySelector('#upperLimit');

filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = checkValidityFilterForm();

    if (isValid) {
        filterBtn.classList.remove("filters-active");
        allFilters.classList.remove("show-all-filters");
        filtersArrowDown.style.animation = `arrowUpAnimate 0.15s linear forwards`;
        filterForm.submit();
    }
})

const checkValidityFilterForm = () => {
    let validity = true;

    const lowerLimitVal = lowerLimit.value.trim();
    const upperLimitVal = upperLimit.value.trim();


    if (lowerLimitVal == "") {
        validity = false;
        SetPriceError("*Lower limit can't be empty");
    }

    if (upperLimitVal == "") {
        validity = false;
        SetPriceError("*Upper limit can't be empty");
    }
    if (lowerLimitVal != "" && upperLimitVal != "" && (parseInt(upperLimitVal) <= parseInt(lowerLimitVal))) {
        validity = false;
        SetPriceError("*Lower limit cannot be greater than or equal to upper limit.")
    }
    if (lowerLimitVal == "" && upperLimitVal == "") {
        validity = true;
        // SetPriceError("*Range fields can't be empty");
    }

    return validity;
}


function SetPriceError(msg) {
    const small = document.querySelector(".price-range-msg");
    small.textContent = msg;
}