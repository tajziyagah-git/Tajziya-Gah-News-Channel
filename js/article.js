/*=========================================
        ARTICLE PAGE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadArticle();

});

async function loadArticle() {

    const params = new URLSearchParams(window.location.search);

    // Default article if no id is supplied
    const id = params.get("id") || "article001";

    const language = localStorage.getItem("language") || "en";

    console.log("Loading Article:", id);

    try {

        const response = await fetch(`../data/articles/${id}.json`);

        if (!response.ok) {

            throw new Error("JSON file not found");

        }

        const article = await response.json();

        renderArticle(article, language);

    }

    catch (error) {

        console.error(error);

        document.getElementById("article-container").innerHTML =

            "<h2>Unable to load article.</h2>";

    }

}

function renderArticle(article, lang) {

    const container = document.getElementById("article-container");

    let paragraphs = "";

    article.content[lang].forEach(item => {

        paragraphs += `<p>${item}</p>`;

    });

    container.innerHTML = `

        <div class="article-header">

            <span class="article-category">

                ${article.category}

            </span>

            <h1>

                ${article.title[lang]}

            </h1>

            <div class="article-meta">

                <span>${article.author}</span>

                <span>${article.date}</span>

            </div>

        </div>

        <img
            src="${article.thumbnail}"
            class="article-image"
            alt="${article.title[lang]}">

        <div class="article-summary">

            ${article.summary[lang]}

        </div>

        <div class="article-content">

            ${paragraphs}

        </div>

    `;

}

document.addEventListener("languageChanged", () => {

    loadArticle();

});