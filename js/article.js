/* ==========================================================
   ARTICLE ENGINE V2
========================================================== */

let currentArticle = null;

document.addEventListener("DOMContentLoaded", initArticle);

document.addEventListener("languageChanged", () => {

    if(currentArticle){

        renderArticle(currentArticle);

    }

});

async function initArticle(){

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if(!id){

        showError("Article not found.");

        return;

    }

    try{

        const response = await fetch(

            `../data/articles/${id}.json`

        );

        if(!response.ok){

            throw new Error();

        }

        currentArticle = await response.json();

        renderArticle(currentArticle);

    }

    catch(error){

        console.error(error);

        showError("Unable to load article.");

    }

}

function renderArticle(article){

    const lang = localStorage.getItem("language") || "en";

    const container = document.getElementById("article-container");

    const paragraphs = article.content[lang]

        .map(p=>`<p>${p}</p>`)

        .join("");

    container.innerHTML = `

<article class="article">

<div class="article-header">

<span class="article-category">

${article.category}

</span>

<h1>

${article.headline[lang]}

</h1>

<div class="article-meta">

<span>

<i class="fa-regular fa-user"></i>

${article.author}

</span>

<span>

<i class="fa-regular fa-calendar"></i>

${new Date(article.publishedAt || article.date).toLocaleDateString()}

</span>

<span>

<i class="fa-regular fa-clock"></i>

${article.readingTime} min read

</span>

</div>

</div>

<img

class="article-image"

src="${article.thumbnail}"

alt="${article.headline[lang]}">

<div class="article-summary">

${article.summary[lang]}

</div>

<div class="article-content">

${paragraphs}

</div>

</article>

`;

    document.title =

        article.headline[lang] +

        " | Tajziya Gah";

}

function showError(message){

    document.getElementById(

        "article-container"

    ).innerHTML = `

<h2>${message}</h2>

`;

}