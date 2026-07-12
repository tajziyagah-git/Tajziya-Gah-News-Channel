/* ==========================================
   TAJZIYA GAH
   LANGUAGE SYSTEM
========================================== */

console.log("Language System Loaded");

// Detect correct path to /lang folder
const langPath = window.location.pathname.includes("/pages/")
    ? "../lang/"
    : "lang/";

// Elements
const languageBtn = document.getElementById("language-btn");
const languageDropdown = document.querySelector(".language-dropdown");

// Current language
let currentLanguage = localStorage.getItem("language") || "en";

/* ==========================================
   OPEN / CLOSE DROPDOWN
========================================== */

if (languageBtn && languageDropdown) {

    languageBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        languageDropdown.classList.toggle("show");

    });

    document.addEventListener("click", function () {

        languageDropdown.classList.remove("show");

    });

}

/* ==========================================
   LOAD LANGUAGE
========================================== */

async function loadLanguage(lang) {

    try {

        const response = await fetch(`${langPath}${lang}.json`);

        if (!response.ok) {

            throw new Error(`Unable to load ${lang}.json`);

        }

        const translations = await response.json();

        // Normal text
        document.querySelectorAll("[data-i18n]").forEach(element => {

            const key = element.dataset.i18n;

            if (translations[key]) {

                element.textContent = translations[key];

            }

        });

        // Placeholder text
        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

            const key = element.dataset.i18nPlaceholder;

            if (translations[key]) {

                element.placeholder = translations[key];

            }

        });

        // HTML language
        document.documentElement.lang = lang;

        // Urdu style
        if (lang === "ur") {

            document.body.classList.add("urdu");

            if (languageBtn) {

                languageBtn.innerHTML = "🌐 اردو";

            }

        } else {

            document.body.classList.remove("urdu");

            if (languageBtn) {

                languageBtn.innerHTML = "🌐 English";

            }

        }

        // Save language
        localStorage.setItem("language", lang);

        console.log("Language Loaded:", lang);

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   INITIAL LOAD
========================================== */

loadLanguage(currentLanguage);

/* ==========================================
   CHANGE LANGUAGE
========================================== */

document.querySelectorAll("[data-lang]").forEach(button => {

    button.addEventListener("click", function () {

        const selectedLanguage = this.dataset.lang;

        loadLanguage(selectedLanguage);

        if (languageDropdown) {

            languageDropdown.classList.remove("show");

        }

    });

});
document.dispatchEvent(
    new Event("languageChanged")
);