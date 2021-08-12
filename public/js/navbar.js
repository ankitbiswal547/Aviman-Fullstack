let backtotop = document.querySelector("#backtotop");
let cartScroll = document.querySelector(".show-on-scroll-cart");

let hamburger = document.querySelector(".hamburger");
let hamline = document.querySelectorAll(".hamline");
let hamline1 = document.querySelector("#hamline1");
let hamline2 = document.querySelector("#hamline2");
let hamline3 = document.querySelector("#hamline3");

let navbar = document.querySelector("#navbar");
let menubar = document.querySelector(".menubar");

// hamburger click event
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamanimate");
    for (let eachhamline of hamline) {
        eachhamline.classList.toggle("hamselected");
    }

    if (hamburger.classList.contains("hamanimate")) {
        navbar.style.zIndex = "300";
        menubar.style.display = "flex";
        setTimeout(() => {
            menubar.style.transform = "translateY(0%)";
            hamline3.style.display = "none";

            hamline1.style.animation = "hamline1animate 0.5s linear";
            hamline1.style.transform = `translateY(7px) rotate(45deg) scaleX(1.2)`;
            hamline2.style.animation = "hamline2animate 0.5s linear";
            hamline2.style.transform = `rotate(-45deg) scaleX(1.2)`;
        }, 0);
    } else {
        menubar.style.transform = "translateY(-100%)";
        hamline3.style.display = "block";

        setTimeout(() => {
            menubar.style.display = "none";
        }, 500);

        hamline1.style.animation = "hamline1removeanimate 0.5s linear";
        hamline1.style.transform = `rotate(0deg) scaleX(1)`;
        hamline2.style.animation = "hamline2removeanimate 0.5s linear";
        hamline2.style.transform = `rotate(0deg) scaleX(1)`;
    }
})



backtotop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

window.onscroll = function () { checkScrollBy() };

function checkScrollBy() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.style.position = "fixed";
    } else {
        navbar.style.position = "relative";
    }
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backtotop.style.display = "block";
        if (cartScroll) {
            cartScroll.style.display = "block";
        }
    }
    else {
        backtotop.style.display = "none";
        if (cartScroll) {
            cartScroll.style.display = "none";
        }
    }
}


function openUserPanel() {
    document.querySelector(".user-dropdown").classList.toggle("user-dropdown-toggle");
}