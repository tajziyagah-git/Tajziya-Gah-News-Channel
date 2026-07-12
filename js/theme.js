/* ==========================================
   TAJZIYA GAH
   Theme System
========================================== */

const themeButton = document.getElementById("theme-toggle");

const body = document.body;

/* Load Saved Theme */

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    body.classList.add("dark");

    themeButton.innerHTML =

    '<i class="fa-solid fa-sun"></i>';

}

/* Toggle Theme */

themeButton.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeButton.innerHTML=

        '<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeButton.innerHTML=

        '<i class="fa-solid fa-moon"></i>';

    }

});