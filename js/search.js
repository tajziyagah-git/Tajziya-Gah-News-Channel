/*====================================
        SEARCH SYSTEM
=====================================*/

let allArticles = [];

const language = localStorage.getItem("language") || "en";

document.addEventListener("DOMContentLoaded", () => {

    loadSearchIndex();

    document
        .getElementById("searchBtn")
        .addEventListener("click", performSearch);

    document
        .getElementById("searchInput")
        .addEventListener("keyup", function (e) {

            if (e.key === "Enter") {

                performSearch();

            }

        });

    showRecentSearches();

});

async function loadSearchIndex() {

    try {

        const response = await fetch("../data/search-index.json");

        allArticles = await response.json();

    }

    catch (error) {

        console.error(error);

    }

}

function performSearch() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    if (!keyword) return;

    saveRecentSearch(keyword);

    const results = allArticles.filter(article => {

        return (

            article.title[language]
                .toLowerCase()
                .includes(keyword)

            ||

            article.summary[language]
                .toLowerCase()
                .includes(keyword)

            ||

            article.category
                .toLowerCase()
                .includes(keyword)

            ||

            article.author
                .toLowerCase()
                .includes(keyword)

        );

    });

    displayResults(results, keyword);

    showRecentSearches();

}

function displayResults(results, keyword) {

    const container = document.getElementById("searchResults");

    container.innerHTML = "";

    if (results.length === 0) {

        container.innerHTML =

            "<h2>No Results Found</h2>";

        return;

    }

    results.forEach(article => {

        const title = highlight(article.title[language], keyword);

        const summary = highlight(article.summary[language], keyword);

        container.innerHTML += `

        <article class="search-card">

            <img src="${article.image}">

            <div>

                <h3>${title}</h3>

                <p>${summary}</p>

                <small>

                ${article.category} |

                ${article.date}

                </small>

                <br><br>

                <a href="article.html?id=${article.id}">

                Read More

                </a>

            </div>

        </article>

        `;

    });

}

function highlight(text, keyword) {

    return text.replace(

        new RegExp(keyword, "gi"),

        match => `<mark>${match}</mark>`

    );

}

function saveRecentSearch(keyword) {

    let searches =

        JSON.parse(localStorage.getItem("recentSearches")) || [];

    searches = searches.filter(item => item !== keyword);

    searches.unshift(keyword);

    searches = searches.slice(0, 5);

    localStorage.setItem(

        "recentSearches",

        JSON.stringify(searches)

    );

}

function showRecentSearches() {

    const container =

        document.getElementById("recentSearches");

    const searches =

        JSON.parse(localStorage.getItem("recentSearches")) || [];

    container.innerHTML = "";

    searches.forEach(item => {

        container.innerHTML +=

            `<button class="recent-search">${item}</button>`;

    });

    document
        .querySelectorAll(".recent-search")
        .forEach(btn => {

            btn.onclick = () => {

                document.getElementById("searchInput").value =

                    btn.innerText;

                performSearch();

            };

        });

}