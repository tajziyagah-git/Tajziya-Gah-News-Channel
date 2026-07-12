/*=====================================
        VIDEO CENTER
======================================*/

let videos = [];

document.addEventListener("DOMContentLoaded", () => {

    loadVideos();

});

document.addEventListener("languageChanged", () => {

    renderVideos();

});

async function loadVideos() {

    try {

        const response = await fetch("../data/videos.json");

        videos = await response.json();

        renderVideos();

    }

    catch (error) {

        console.error(error);

    }

}

function renderVideos() {

    const lang = localStorage.getItem("language") || "en";

    const featured = document.getElementById("featured-video");
    const grid = document.getElementById("video-grid");

    featured.innerHTML = "";
    grid.innerHTML = "";

    if (videos.length === 0) return;

    const first = videos[0];

    featured.innerHTML = `

    <div class="featured-video-card">

        <img src="${first.thumbnail}" alt="${first.title[lang]}">

        <div>

            <span>${first.category}</span>

            <h2>${first.title[lang]}</h2>

            <p>${first.description[lang]}</p>
<a href="${first.youtube}"
   target="_blank"
   class="youtube-btn featured-btn">

    <i class="fab fa-youtube"></i>

    Watch Video on YouTube

</a>
        </div>

    </div>

    `;

    videos.forEach(video => {

        grid.innerHTML += `

        <article class="video-card">

            <img src="${video.thumbnail}" alt="${video.title[lang]}">

            <div class="video-content">

                <span>${video.category}</span>

                <h3>${video.title[lang]}</h3>

                <p>${video.description[lang]}</p>

                <small>${video.date} • ${video.duration}</small>

                <br><br>

               <a href="${video.youtube}"
   target="_blank"
   class="youtube-btn">

    <i class="fab fa-youtube"></i>

    Watch Video on YouTube

</a>

            </div>

        </article>

        `;

    });

}