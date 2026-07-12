/*===========================================
    TAJZIYA GAH
    HOME PAGE
===========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const lang = localStorage.getItem("language") || "en";

    loadHero(lang);

    loadBreakingNews(lang);

    loadLatestNews(lang);

});

async function loadHero(lang){

    const response = await fetch("data/hero.json");

    const hero = await response.json();

    const container = document.getElementById("hero-container");

    container.innerHTML = "";

    hero.forEach(news=>{

        container.innerHTML += `

        <div class="hero-card">

            <img src="${news.image}" alt="">

            <div class="hero-content">

                <span>${news.category}</span>

                <h1>${news.title[lang]}</h1>

                <p>${news.description[lang]}</p>

                <a href="pages/article.html?id=article001">Read More</a>

                   

            </div>

        </div>

        `;

    });

}

async function loadBreakingNews(lang){

    const response = await fetch("data/breaking-news.json");

    const news = await response.json();

    const ticker = document.getElementById("breaking-news-ticker");

    ticker.innerHTML = "";

    news.forEach(item=>{

        ticker.innerHTML += `

            <span>

            ${item.title[lang]}

            </span>

        `;

    });

}

async function loadLatestNews(lang){

    const response = await fetch("data/latest-news.json");

    const news = await response.json();

    const grid = document.getElementById("latest-news-grid");

    grid.innerHTML = "";

    news.forEach(article=>{

        grid.innerHTML += `

        <article class="news-card">

            <img src="${article.image}" alt="">

            <div class="news-content">

                <span>${article.category}</span>

                <h3>${article.title[lang]}</h3>

                <small>${article.date}</small>

            </div>

        </article>

        `;

    });

}