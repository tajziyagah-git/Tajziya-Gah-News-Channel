/* ==========================================================
   TAJZIYA GAH
   HOMEPAGE ENGINE V2
========================================================== */

const DATA = {

    homepage: null,

    articles: {}

};

const PATHS = {

    homepage: "data/homepage/homepage.json",

    articles: "data/articles/"

};

function language(){

    return localStorage.getItem("language") || "en";

}

/* ==========================================================
EDITOR'S PICKS
========================================================== */

function renderEditorsChoice(){

    const featuredContainer = document.getElementById("editor-featured");

    const sidebarContainer = document.getElementById("editor-sidebar");

    if(!featuredContainer || !sidebarContainer) return;

    const lang = language();

    const editors = Object.values(DATA.articles)

        .filter(article => article.isEditorsChoice)

        .sort((a,b)=>

            new Date(b.publishedAt) -

            new Date(a.publishedAt)

        );

    if(editors.length === 0){

        featuredContainer.innerHTML = "";

        sidebarContainer.innerHTML = "";

        return;

    }

    const featured = editors[0];

    featuredContainer.innerHTML = `

<article class="editor-featured">

    <img

        src="${featured.thumbnail}"

        alt="${featured.headline[lang]}">

    <div class="editor-overlay">

        <span class="category">

            ${featured.category}

        </span>

        <h2>

            ${featured.headline[lang]}

        </h2>

        <p>

            ${featured.summary[lang]}

        </p>

        <div class="editor-author">

            <div>

                <strong>

                    ${featured.author}

                </strong>

                <span>

                    ${featured.readingTime} min read

                </span>

            </div>

        </div>

    </div>

</article>

`;

    sidebarContainer.innerHTML = "";

    editors.slice(1,4).forEach(article=>{

        sidebarContainer.innerHTML += `

<article class="editor-card">

<a href="pages/article.html?id=${article.id}">

<img

src="${article.thumbnail}"

alt="${article.headline[lang]}">

</a>

<div>

<span class="category">

${article.category}

</span>

<h3>

<a href="pages/article.html?id=${article.id}">

${article.headline[lang]}

</a>

</h3>

<p>

${article.author}

</p>

</div>

</article>

`;

    });

}
/* ==========================================================
   LOAD JSON
========================================================== */

async function fetchJSON(path){

    try{

        const response = await fetch(path);

        if(!response.ok){

            throw new Error(path);

        }

        return await response.json();

    }

    catch(error){

        console.error("Cannot load:",path);

        return null;

    }

}

/* ==========================================================
   LOAD HOMEPAGE
========================================================== */

async function loadHomepage(){

    DATA.homepage = await fetchJSON(

        PATHS.homepage

    );

}

/* ==========================================================
   LOAD ARTICLE
========================================================== */

async function loadArticle(id){

    if(DATA.articles[id]){

        return DATA.articles[id];

    }

    const article = await fetchJSON(

        PATHS.articles + id + ".json"

    );

    DATA.articles[id]=article;

    return article;

}
/* ==========================================================
   GET ARTICLE
========================================================== */

function getArticle(id){

    return DATA.articles[id];

}

/* ==========================================================
   NEWS CARD COMPONENT
========================================================== */

function createNewsCard(article){

    const lang = language();

    return `

    <article class="news-card">

        <a href="pages/article.html?id=${article.id}">

            <img
                src="${article.thumbnail}"
                alt="${article.headline[lang]}">

        </a>

        <div class="news-card-content">

            <span class="news-category">

                ${article.category}

            </span>

            <h3>

                <a href="pages/article.html?id=${article.id}">

                    ${article.headline[lang]}

                </a>

            </h3>

            <p>

                ${article.summary[lang]}

            </p>

            <div class="news-meta">

                <span>

                    ${article.author}

                </span>

                <span>

                    ${article.published}

                </span>

            </div>

        </div>

    </article>

    `;

}

/* ==========================================================
   HERO COMPONENT
========================================================== */

function createHero(article){

    const lang = language();

    return `

<section class="hero-slide">

<img

src="${article.thumbnail}"

alt="${article.headline[lang]}">

<div class="hero-content">

<span>

${article.category}

</span>

<h1>

${article.headline[lang]}

</h1>

<p>

${article.summary[lang]}

</p>

<a

href="pages/article.html?id=${article.id}"

class="btn">

Read Full Story

</a>

</div>

</section>

`;

}

/* ==========================================================
   RENDER HERO
========================================================== */

function renderHero(){

    const container = document.getElementById(

        "hero-container"

    );

    if(!container) return;

    const id = DATA.homepage.hero[0];

    const article = getArticle(id);

    container.innerHTML = createHero(article);

}

/* ==========================================================
   RENDER LATEST NEWS
========================================================== */

function renderLatestNews(){

    const container = document.getElementById(

        "latest-news-grid"

    );

    if(!container) return;

    container.innerHTML="";

    DATA.homepage.latest.forEach(id=>{

        container.innerHTML += createNewsCard(

            getArticle(id)

        );

    });

}

/*==================================================
FEATURED
==================================================*/

function renderFeaturedNews(){

    const container = document.getElementById(

        "featured-news-grid"

    );

    if(!container) return;

    container.innerHTML="";

    const featured = Object.values(DATA.articles)

        .filter(article=>article.isFeatured)

        .sort((a,b)=>

            new Date(b.publishedAt)-new Date(a.publishedAt)

        );

    featured.forEach(article=>{

        container.innerHTML += `

        <article class="featured-card">

            <a href="pages/article.html?id=${article.id}">

                <img

                    src="${article.thumbnail}"

                    alt="${article.headline[language()]}">

            </a>

            <div class="featured-content">

                <span>

                    ${article.category}

                </span>

                <h3>

                    <a href="pages/article.html?id=${article.id}">

                        ${article.headline[language()]}

                    </a>

                </h3>

                <p>

                    ${article.summary[language()]}

                </p>

            </div>

        </article>

        `;

    });

}

/* ==========================================================
   OPINION & ANALYSIS
========================================================== */

function renderOpinion(){

    const container = document.getElementById(

        "opinion-grid"

    );

    if(!container) return;

    const lang = language();

    container.innerHTML = "";

    DATA.homepage.opinion.forEach(id=>{

        const article = getArticle(id);

        if(!article) return;

        container.innerHTML += `

<article class="opinion-card">

<a href="pages/article.html?id=${article.id}">

<img

src="${article.thumbnail}"

alt="${article.headline[lang]}">

</a>

<div class="opinion-content">

<span class="category">

${article.opinionType}

</span>

<h3>

<a href="pages/article.html?id=${article.id}">

${article.headline[lang]}

</a>

</h3>

<p>

${article.summary[lang]}

</p>

<div class="author">

<div>

<strong>

${article.author}

</strong>

<span>

${article.readingTime} min read

</span>

</div>

</div>

</div>

</article>

`;

    });

}

/* ==========================================================
   PRELOAD ARTICLES
========================================================== */

async function preloadHomepageArticles(){

    const homepage = DATA.homepage;

    if(!homepage) return;

    const ids=[

...homepage.hero,

...homepage.breaking,

...homepage.latest,

...homepage.featured,

...homepage.editorChoice,

...homepage.opinion

];

    const unique=[...new Set(ids)];

    for(const id of unique){

        await loadArticle(id);

    }

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async()=>{

        await loadHomepage();

        await preloadHomepageArticles();

       renderHero();

renderLatestNews();

renderFeaturedNews();

renderEditorsChoice();

renderOpinion();
    }

);

document.addEventListener(

    "languageChanged",

    ()=>{

        renderHero();

renderLatestNews();

renderFeaturedNews();

renderEditorsChoice();

renderOpinion();
    }

);