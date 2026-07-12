/* ==========================================
   TAJZIYA GAH
   NAVIGATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const navbar = document.getElementById("navbar");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const scrollBtn = document.getElementById("scrollTopBtn");

    /* ===============================
       Sticky Header
    =============================== */

    function updateHeader(){

    if(!header) return;

    if(window.scrollY>80){

        header.classList.add("sticky");

    }

    else{

        header.classList.remove("sticky");

    }

}

    window.addEventListener("scroll", updateHeader);

    /* ===============================
       Mobile Menu
    =============================== */

    if (mobileBtn && navbar) {

        mobileBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            navbar.classList.toggle("active");

            mobileBtn.classList.toggle("active");

        });

        document.addEventListener("click", (e) => {

            if (!navbar.contains(e.target) && !mobileBtn.contains(e.target)) {

                navbar.classList.remove("active");

                mobileBtn.classList.remove("active");

            }

        });

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                mobileBtn.classList.remove("active");

            });

        });

    }

    /* ===============================
       Active Page
    =============================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href").split("/").pop();

        if (href === currentPage || (currentPage === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

    /* ===============================
       Scroll To Top
    =============================== */

    function toggleScrollButton() {

        if (!scrollBtn) return;

        if (window.scrollY > 400) {

            scrollBtn.style.display = "flex";

        } else {

            scrollBtn.style.display = "none";

        }

    }

    window.addEventListener("scroll", toggleScrollButton);

    if (scrollBtn) {

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ===============================
       ESC closes mobile menu
    =============================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            navbar?.classList.remove("active");

            mobileBtn?.classList.remove("active");

        }

    });

});
