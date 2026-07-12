/*=========================================
        CATEGORY PAGE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

loadCategory();

});

document.addEventListener("languageChanged",()=>{

loadCategory();

});

async function loadCategory(){

const params=new URLSearchParams(window.location.search);

const category=params.get("category")||"pakistan";

const lang=localStorage.getItem("language")||"en";

document.getElementById("category-title").textContent=

category.charAt(0).toUpperCase()+category.slice(1);

try{

const response=await fetch(`../data/categories/${category}.json`);

if(!response.ok){

throw new Error("Category not found");

}

const articles=await response.json();

renderArticles(articles,lang);

}

catch(error){

console.error(error);

document.getElementById("category-grid").innerHTML=

"<h2>No Articles Found</h2>";

}

}

function renderArticles(articles,lang){

const grid=document.getElementById("category-grid");

grid.innerHTML="";

articles.forEach(article=>{

grid.innerHTML+=`

<article class="news-card">

<img src="${article.image}" alt="">

<div class="news-content">

<h3>

${article.title[lang]}

</h3>

<p>

${article.summary[lang]}

</p>

<div class="news-meta">

<span>${article.date}</span>

<span>${article.author}</span>

</div>

<a

href="article.html?id=${article.id}"

class="read-more">

Read More

</a>

</div>

</article>

`;

});

}