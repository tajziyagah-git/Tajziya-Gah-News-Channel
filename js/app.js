/* ==========================================================
   TAJZIYA GAH
   APP.JS
   Main Application
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeClock();

    initializeStickyNavbar();

    initializeMobileDrawer();

    initializeSearchOverlay();

    initializeTheme();

});


/* ==========================================================
   LIVE DATE & TIME
========================================================== */

function initializeClock() {

    const dateElement = document.getElementById("currentDate");
    const timeElement = document.getElementById("currentTime");

    function updateClock() {

        const now = new Date();

        const dateOptions = {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        };

        const timeOptions = {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        };

        dateElement.textContent =
            now.toLocaleDateString("en-US", dateOptions);

        timeElement.textContent =
            now.toLocaleTimeString("en-US", timeOptions);

    }

    updateClock();

    setInterval(updateClock,1000);

}


/* ==========================================================
   STICKY NAVBAR
========================================================== */

function initializeStickyNavbar(){

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>20){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }

    });

}


/* ==========================================================
   MOBILE DRAWER
========================================================== */

function initializeMobileDrawer(){

    const menuButton=document.querySelector(".mobile-menu");

    const drawer=document.querySelector(".mobile-drawer");

    const closeButton=document.querySelector(".close-drawer");

    if(!menuButton) return;

    menuButton.addEventListener("click",()=>{

        drawer.classList.add("active");

        document.body.style.overflow="hidden";

    });

    closeButton.addEventListener("click",()=>{

        drawer.classList.remove("active");

        document.body.style.overflow="";

    });

}


/* ==========================================================
   SEARCH OVERLAY
========================================================== */

function initializeSearchOverlay(){

    const overlay=document.querySelector(".search-overlay");

    const searchButton=document.querySelector(".search-btn");

    const closeButton=document.querySelector(".close-search");

    if(!searchButton) return;

    searchButton.addEventListener("click",()=>{

        overlay.style.display="flex";

        document.body.style.overflow="hidden";

    });

    closeButton.addEventListener("click",closeSearch);

    window.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            closeSearch();

        }

    });

    function closeSearch(){

        overlay.style.display="none";

        document.body.style.overflow="";

    }

}


/* ==========================================================
   DARK MODE
========================================================== */

function initializeTheme(){

    const toggle=document.querySelector(".theme-toggle");

    if(!toggle) return;

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark-theme");

        updateThemeIcon(true);

    }

    toggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark-theme");

        const darkEnabled=document.body.classList.contains("dark-theme");

        localStorage.setItem(

            "theme",

            darkEnabled ? "dark" : "light"

        );

        updateThemeIcon(darkEnabled);

    });

}


/* ==========================================================
   CHANGE ICON
========================================================== */

function updateThemeIcon(isDark){

    const icon=document.querySelector(".theme-toggle i");

    if(!icon) return;

    if(isDark){

        icon.className="fa-solid fa-sun";

    }

    else{

        icon.className="fa-solid fa-moon";

    }

}