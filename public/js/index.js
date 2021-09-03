let addToCart = document.querySelector(".pdt-floating-span-btn-2");
let snackbar = document.querySelector(".snackbar");

function showSnackbar() {
    snackbar.classList.add("show-snackbar");

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { snackbar.classList.remove("show-snackbar"); }, 3000);
}


// carousel
let carousel = document.querySelector(".carousel");
let carouselSlide = document.querySelector(".carousel-slide");
let carouselImages = document.querySelectorAll(".carousel-images");
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
let pauseSlideshow = document.querySelector("#pauseSlideshow");
let resumeSlideshow = document.querySelector("#resumeSlideshow");

let totalImgs = carouselImages.length;
let counter = 1;
let sizeImg = 1519;

// setInterval(() => {
// }, 0);
sizeImg = carouselSlide.clientWidth;

carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;


nextBtn.addEventListener("click", () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'all 1s ease-in-out';
    counter++;
    carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
})

prevBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = 'all 1s ease-in-out';
    counter--;
    carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
    // }
})

carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id == "last-clone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
    }

    if (carouselImages[counter].id == "first-clone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
    }
})

let timerPause = null;

function startSetInterval() {
    timer = setInterval(() => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = 'all 1s ease-in-out';
        counter++;
        carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;

        carouselSlide.addEventListener("transitionend", () => {
            if (carouselImages[counter].id == "last-clone") {
                carouselSlide.style.transition = "none";
                counter = carouselImages.length - 2;
                carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
            }

            if (carouselImages[counter].id == "first-clone") {
                carouselSlide.style.transition = "none";
                counter = carouselImages.length - counter;
                carouselSlide.style.transform = `translateX(-${sizeImg * counter}px)`;
            }
        })
    }, 5000);
}

startSetInterval();

pauseSlideshow.addEventListener("click", () => {
    pauseSlideshow.style.display = "none";
    resumeSlideshow.style.display = "flex";
    clearInterval(timer);
})

resumeSlideshow.addEventListener("click", () => {
    pauseSlideshow.style.display = "flex";
    resumeSlideshow.style.display = "none";
    startSetInterval();
})



// contact us form form client side validation

let contactUsForm = document.querySelector(".contactus-form");
let contactUsUsername = document.querySelector("#contactus-name");
let contactUsEmail = document.querySelector("#contactus-email");
let contactUsSubject = document.querySelector("#contactus-subject");
let contactUsQuery = document.querySelector("#contactus-query");
contactUsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = checkvalidity();

    if (isValid) {
        contactUsForm.submit();
    }
})

const checkvalidity = () => {

    let validity = true;

    const usernameVal = contactUsUsername.value.trim();
    const emailVal = contactUsEmail.value.trim();
    const subjectVal = contactUsSubject.value.trim();
    const queryVal = contactUsQuery.value.trim();

    if (usernameVal == "") {
        validity = false;
        setErrorFor(contactUsUsername);
    } else {
        setSuccessFor(contactUsUsername);
    }


    if (emailVal == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailVal))) {
        validity = false;
        setErrorFor(contactUsEmail);
    } else {
        setSuccessFor(contactUsEmail);
    }


    if (subjectVal == "") {
        validity = false;
        setErrorFor(contactUsSubject);
    } else {
        setSuccessFor(contactUsSubject);
    }

    if (queryVal == "") {
        validity = false;
        setErrorFor(contactUsQuery);
    } else {
        setSuccessFor(contactUsQuery);
    }

    return validity;

}

function setErrorFor(input) {
    const inputParent = input.parentElement;
    const small = inputParent.querySelector("small");
    small.style.display = "block";
}

function setSuccessFor(input) {
    const inputParent = input.parentElement;
    const small = inputParent.querySelector("small");
    small.style.display = "none";
}