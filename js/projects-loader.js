/* =========================================================
   DEVNEXUS - LOAD DATA FROM THE BACKEND (Flask)
   1) Project cards  ->  GET /api/projects
   2) Download-CV button  ->  GET /api/resume

   اگر بک‌اند در دسترس نبود یا پروژه‌ای منتشر نشده بود،
   همان کارت نمونه‌ی داخل index.html دست‌نخورده می‌ماند.
========================================================= */

(function () {

    "use strict";

    var track = document.querySelector(".projects-track");
    var projects = [];
    var cards = [];


    function currentLang() {
        if (window.DevNexus) {
            return window.DevNexus.lang();
        }
        return document.documentElement.getAttribute("lang") === "fa" ? "fa" : "en";
    }

    function pick(value) {
        if (!value) {
            return "";
        }
        return value[currentLang()] || value.en || "";
    }


    /* =========================
       PROJECT CARDS
    ========================= */

    function buildCard(project) {

        var card = document.createElement("div");
        card.className = "project-card";

        var imageBox = document.createElement("div");
        imageBox.className = "project-image";

        if (project.cover) {
            var img = document.createElement("img");
            img.src = project.cover;
            img.alt = project.title.en;
            img.loading = "lazy";
            img.decoding = "async";
            imageBox.appendChild(img);
        } else {
            var placeholder = document.createElement("div");
            placeholder.className = "project-image-placeholder";
            placeholder.textContent = project.title.en;
            imageBox.appendChild(placeholder);
        }

        var content = document.createElement("div");
        content.className = "project-content";

        var title = document.createElement("h3");
        var desc = document.createElement("p");

        var tech = document.createElement("div");
        tech.className = "project-technologies";

        project.technologies.slice(0, 6).forEach(function (name) {
            var chip = document.createElement("span");
            chip.textContent = name;
            tech.appendChild(chip);
        });

        var button = document.createElement("a");
        button.className = "project-button";
        button.href = "project-detail.html?id=" + encodeURIComponent(project.id);
        button.setAttribute("data-i18n-html", "projects.details");
        button.innerHTML = "View Details <span>→</span>";

        content.appendChild(title);
        content.appendChild(desc);
        content.appendChild(tech);
        content.appendChild(button);

        card.appendChild(imageBox);
        card.appendChild(content);

        return { project: project, el: card, title: title, desc: desc };
    }

    function applyTexts() {
        cards.forEach(function (item) {
            item.title.textContent = pick(item.project.title);
            item.desc.textContent = pick(item.project.short);
        });
    }

    function renderProjects() {

        track.innerHTML = "";
        cards = projects.map(buildCard);

        cards.forEach(function (item) {
            track.appendChild(item.el);
        });

        applyTexts();

        // دکمه‌ی «مشاهده جزئیات» هم به زبان فعلی ترجمه شود
        if (window.DevNexus) {
            window.DevNexus.refresh();
        }

        document.dispatchEvent(new CustomEvent("devnexus:projectsrendered"));
    }

    function loadProjects() {

        if (!track) {
            return;
        }

        fetch("/api/projects", { headers: { "Accept": "application/json" } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }
                return response.json();
            })
            .then(function (list) {
                if (!Array.isArray(list) || list.length === 0) {
                    return;
                }
                projects = list;
                renderProjects();
            })
            .catch(function () {
                /* بک‌اند در دسترس نیست: کارت نمونه می‌ماند */
            });
    }

    document.addEventListener("devnexus:languagechange", function () {
        if (cards.length) {
            applyTexts();
        }
    });


    /* =========================
       DOWNLOAD CV BUTTON
    ========================= */

    function loadResume() {

        var button = document.getElementById("cv-button");

        if (!button) {
            return;
        }

        fetch("/api/resume", { headers: { "Accept": "application/json" } })
            .then(function (response) {
                return response.ok ? response.json() : null;
            })
            .then(function (info) {
                if (info && info.available && info.url) {
                    button.href = info.url;
                } else if (info) {
                    // CV فعالی آپلود نشده؛ دکمه‌ی بی‌مقصد نمایش داده نشود
                    button.style.display = "none";
                }
            })
            .catch(function () {});
    }


    loadProjects();
    loadResume();

})();
