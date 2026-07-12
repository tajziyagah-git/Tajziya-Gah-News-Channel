/* ==========================================================
   BREAKING NEWS ENGINE V2
========================================================== */

document.addEventListener("DOMContentLoaded", loadBreakingNews);

document.addEventListener("languageChanged", loadBreakingNews);

async function loadBreakingNews(){

    const ticker = document.getElementById("breakingTicker");

    if(!ticker) return;

    const lang = localStorage.getItem("language") || "en";

    try{

        // Load homepage controller
        const homepage = await fetch("data/homepage/homepage.json")
            .then(res=>res.json());

        ticker.innerHTML = "";

        for(const id of homepage.breaking){

            const article = await fetch(
                `data/articles/${id}.json`
            ).then(res=>res.json());

            ticker.innerHTML += `

<a
    href="pages/article.html?id=${article.id}"
    class="ticker-item">

    ${article.headline[lang]}

</a>

<span class="ticker-divider">

•

</span>

`;

        }

    }

    catch(error){

        console.error(error);

    }

}