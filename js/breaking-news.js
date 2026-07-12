/*=========================================
        BREAKING NEWS
=========================================*/

let breakingNews = [];

document.addEventListener("DOMContentLoaded", loadBreakingNews);

document.addEventListener("languageChanged", renderTicker);

async function loadBreakingNews(){

    try{

        const response = await fetch("data/breaking-news.json");

        breakingNews = await response.json();

        renderTicker();

    }

    catch(error){

        console.error("Breaking News Error:",error);

    }

}

function renderTicker(){

    const ticker=document.getElementById("breakingTicker");

    if(!ticker) return;

    const lang=localStorage.getItem("language") || "en";

    let html="";

    breakingNews.forEach(news=>{

        html+=`

        <a href="pages/article.html?id=${news.id}">

            ${news.headline[lang]}

        </a>

        `;

    });

    html+=html;

    ticker.innerHTML=html;

}