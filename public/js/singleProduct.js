// SINGLE PRODUCTS PAGE
let descNavitem1 = document.querySelector("#desc-navitem-1");
let descNavitem2 = document.querySelector("#desc-navitem-2");

let pdtDesc = document.querySelector(".sp-pdt-desc");
let pdtSpec = document.querySelector(".sp-pdt-spec");


descNavitem1.addEventListener("click", () => {
    if (descNavitem2.classList.contains("sp-desc-firsthalf-navbar-li-active")) {
        descNavitem2.classList.remove("sp-desc-firsthalf-navbar-li-active");
        descNavitem1.classList.add("sp-desc-firsthalf-navbar-li-active");
        pdtDesc.style.display = "block";
        pdtSpec.style.display = "none";
    }
})

descNavitem2.addEventListener("click", () => {
    if (descNavitem1.classList.contains("sp-desc-firsthalf-navbar-li-active")) {
        descNavitem1.classList.remove("sp-desc-firsthalf-navbar-li-active");
        descNavitem2.classList.add("sp-desc-firsthalf-navbar-li-active");
        pdtDesc.style.display = "none";
        pdtSpec.style.display = "block";
    }
})


function showanswer(faqNum) {
    const faq = document.querySelector(`.faq-${faqNum}`);
    const answer = faq.nextElementSibling;

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
}

function selectImage(pdtImgId) {
    const pdtImageSelected = document.querySelector(`#pdtimg${pdtImgId}`);
    const bigImage = document.querySelector("#img-zoomed");
    if (bigImage.src == pdtImageSelected.src) {
        return;
    } else {
        bigImage.src = pdtImageSelected.src
    }
}

$(document).ready(function () {
    $('#product-slider').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('#product-slider').removeClass('cS-hidden');
        }
    });
});