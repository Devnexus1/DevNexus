/* =========================================================
   DEVNEXUS - PROJECT DETAILS
   داده‌ی پروژه از بک‌اند می‌آید:  project-detail.html?id=3
   -> GET /api/projects/3

   اگر id نبود یا بک‌اند جواب نداد، همان محتوای نمونه‌ی داخل HTML
   (با عکس‌های image/project-1..4.webp) نمایش داده می‌شود.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    var mainImage = document.getElementById("project-main-image");

    if (!mainImage) {
        console.error("DevNexus: project-main-image پیدا نشد.");
        return;
    }

    var thumbsBox = document.getElementById("detail-thumbs");
    var prevButton = document.querySelector(".project-gallery-prev");
    var nextButton = document.querySelector(".project-gallery-next");
    var imageCounter = document.getElementById("project-image-counter");

    var FALLBACK_IMAGES = [
        "image/project-1.webp",
        "image/project-2.webp",
        "image/project-3.webp",
        "image/project-4.webp"
    ];

    var projectImages = FALLBACK_IMAGES.slice();
    var thumbnails = document.querySelectorAll(".project-thumb");
    var currentImage = 0;
    var autoPlay = null;
    var galleryReady = false;
    var project = null;
    var progressEl = null;


    function currentLang() {
        if (window.DevNexus) {
            return window.DevNexus.lang();
        }
        return document.documentElement.getAttribute("lang") === "fa" ? "fa" : "en";
    }

    function pick(value) {
        return value ? (value[currentLang()] || value.en || "") : "";
    }


    /* =========================================================
       GALLERY
    ========================================================= */

    function showProjectImage(index) {

        if (index < 0) {
            index = projectImages.length - 1;
        }

        if (index >= projectImages.length) {
            index = 0;
        }

        currentImage = index;

        mainImage.src = projectImages[currentImage];
        mainImage.alt = (project ? project.title.en : "Project") +
            " screenshot " + (currentImage + 1);

        mainImage.classList.remove("gallery-image-change");
        void mainImage.offsetWidth;
        mainImage.classList.add("gallery-image-change");

        thumbnails.forEach(function (thumbnail, thumbnailIndex) {
            thumbnail.classList.toggle("active", thumbnailIndex === currentImage);
        });

        restartProgress();

        if (imageCounter) {
            imageCounter.textContent =
                String(currentImage + 1).padStart(2, "0") + " / " +
                String(projectImages.length).padStart(2, "0");
        }
    }

    function restartProgress() {
        if (!progressEl) { return; }
        progressEl.classList.remove("run");
        void progressEl.offsetWidth;
        if (autoPlay) { progressEl.classList.add("run"); }
    }

    function stopAutoPlay() {
        if (progressEl) { progressEl.classList.remove("run"); }
        if (autoPlay) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    function startAutoPlay() {

        stopAutoPlay();

        if (projectImages.length <= 1) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        autoPlay = setInterval(function () {
            showProjectImage(currentImage + 1);
        }, 5000);

        restartProgress();
    }

    function bindThumbnails() {

        thumbnails = document.querySelectorAll(".project-thumb");

        thumbnails.forEach(function (thumbnail, index) {
            thumbnail.addEventListener("click", function (event) {
                event.preventDefault();
                stopAutoPlay();
                showProjectImage(index);
            });
        });
    }

    function setupGalleryEvents() {

        if (galleryReady) {
            return;
        }

        galleryReady = true;

        if (nextButton) {
            nextButton.addEventListener("click", function (event) {
                event.preventDefault();
                stopAutoPlay();
                showProjectImage(currentImage + 1);
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function (event) {
                event.preventDefault();
                stopAutoPlay();
                showProjectImage(currentImage - 1);
            });
        }

        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                showProjectImage(currentImage - 1);
            }
            if (event.key === "ArrowRight") {
                showProjectImage(currentImage + 1);
            }
        });

        var touchStartX = 0;

        mainImage.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        mainImage.addEventListener("touchend", function (event) {

            var distance = event.changedTouches[0].screenX - touchStartX;

            if (Math.abs(distance) < 50) {
                return;
            }

            stopAutoPlay();
            showProjectImage(distance > 0 ? currentImage - 1 : currentImage + 1);

        }, { passive: true });
    }

    function buildChrome() {

        var frame = document.querySelector(".project-gallery-main");

        if (!frame || frame.querySelector(".browser-bar")) {
            return;
        }

        var label = "";

        try {
            label = project && project.live_demo_url ? new URL(project.live_demo_url).host : "";
        } catch (error) {}

        if (!label) {
            label = (project ? project.title.en : document.getElementById("detail-title").textContent)
                .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }

        var bar = document.createElement("div");
        bar.className = "browser-bar";
        bar.setAttribute("aria-hidden", "true");
        bar.innerHTML = "<i></i><i></i><i></i><span></span>";
        bar.querySelector("span").textContent = label;
        frame.insertBefore(bar, frame.firstChild);

        progressEl = document.createElement("div");
        progressEl.className = "gallery-progress";
        progressEl.setAttribute("aria-hidden", "true");
        progressEl.innerHTML = "<span></span>";
        frame.appendChild(progressEl);

        // a missing image must not collapse the gallery
        mainImage.addEventListener("error", function () { mainImage.classList.add("is-broken"); });
        mainImage.addEventListener("load", function () { mainImage.classList.remove("is-broken"); });

        buildLightbox();
    }

    function buildLightbox() {

        var box = document.createElement("div");
        box.className = "dn-lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-modal", "true");
        box.innerHTML = '<button class="dn-close" type="button" aria-label="Close">×</button><img alt="">';
        document.body.appendChild(box);

        var big = box.querySelector("img");

        function close() { box.classList.remove("open"); }

        mainImage.addEventListener("click", function () {
            big.src = mainImage.currentSrc || mainImage.src;
            big.alt = mainImage.alt;
            stopAutoPlay();
            box.classList.add("open");
        });

        box.addEventListener("click", close);

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") { close(); }
        });
    }

    function startGallery() {
        buildChrome();
        bindThumbnails();
        setupGalleryEvents();
        showProjectImage(0);
        startAutoPlay();
    }


    /* =========================================================
       PROJECT TEXT (from API)
    ========================================================= */

    function detachI18n(ids) {
        // language.js نباید متن پویا را با متن نمونه‌ی ترجمه جایگزین کند
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                el.removeAttribute("data-i18n");
            }
        });
    }

    function renderTexts() {

        var title = pick(project.title);

        document.getElementById("detail-title").textContent = title;
        document.getElementById("detail-title-2").textContent = title;
        document.getElementById("detail-intro").textContent = pick(project.short);

        var box = document.getElementById("detail-description");

        // همه‌ی پاراگراف‌های قبلی (نمونه یا زبان قبلی) پاک می‌شوند
        box.querySelectorAll("p").forEach(function (p) {
            p.remove();
        });

        var paragraphs = pick(project.description)
            .split(/\n\s*\n/)
            .map(function (text) { return text.trim(); })
            .filter(Boolean);

        if (paragraphs.length === 0) {
            paragraphs = [pick(project.short)];
        }

        paragraphs.forEach(function (text) {
            var p = document.createElement("p");
            p.textContent = text;
            p.style.whiteSpace = "pre-line";
            box.appendChild(p);
        });

        document.title = title + " | DevNexus";
    }

    function renderLinks() {

        var github = document.getElementById("detail-github");
        var live = document.getElementById("detail-live");
        var box = document.getElementById("detail-links");

        function setLink(el, url) {
            if (url) {
                el.href = url;
                el.target = "_blank";
                el.rel = "noopener noreferrer";
                el.style.display = "";
            } else {
                el.style.display = "none";
            }
        }

        setLink(github, project.github_url);
        setLink(live, project.live_demo_url);

        if (!project.github_url && !project.live_demo_url) {
            box.style.display = "none";
        }
    }

    function renderTech() {

        var box = document.getElementById("detail-tech");

        box.innerHTML = "";

        project.technologies.forEach(function (name) {
            var chip = document.createElement("span");
            chip.textContent = name;
            box.appendChild(chip);
        });
    }

    function renderGallery() {

        if (!project.images.length) {
            // عکسی آپلود نشده: گالری نمونه حذف می‌شود تا تصویر بی‌ربط نمایش داده نشود
            document.querySelector(".project-gallery").style.display = "none";
            projectImages = [];
            return false;
        }

        projectImages = project.images.map(function (image) {
            return image.url;
        });

        thumbsBox.innerHTML = "";

        projectImages.forEach(function (url, index) {

            var button = document.createElement("button");
            button.className = "project-thumb";
            button.type = "button";
            button.setAttribute("aria-label", "Show project image " + (index + 1));

            var img = document.createElement("img");
            img.src = url;
            img.alt = "Project thumbnail " + (index + 1);
            img.loading = "lazy";
            img.decoding = "async";

            button.appendChild(img);
            thumbsBox.appendChild(button);
        });

        // با یک تصویر، فلش‌ها و تصویر بندانگشتی لازم نیست
        var single = projectImages.length === 1;

        if (prevButton) { prevButton.style.display = single ? "none" : ""; }
        if (nextButton) { nextButton.style.display = single ? "none" : ""; }
        if (imageCounter) { imageCounter.style.display = single ? "none" : ""; }
        thumbsBox.style.display = single ? "none" : "";

        return true;
    }

    function renderProject() {

        detachI18n([
            "detail-title",
            "detail-title-2",
            "detail-intro"
        ]);

        // پاراگراف‌های نمونه هم data-i18n دارند
        document.querySelectorAll("#detail-description p").forEach(function (p) {
            p.removeAttribute("data-i18n");
        });

        renderTexts();
        renderLinks();
        renderTech();

        if (renderGallery()) {
            startGallery();
        }

        document.addEventListener("devnexus:languagechange", renderTexts);
    }

    function showNotFound() {

        document.getElementById("detail-title").textContent = "Project not found";
        document.getElementById("detail-intro").textContent =
            "This project does not exist or is not published.";

        document.querySelector(".project-gallery").style.display = "none";
        document.querySelector(".project-details-content").style.display = "none";
    }


    /* =========================================================
       START
    ========================================================= */

    var id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        // بدون id: همان صفحه‌ی نمونه
        startGallery();
        return;
    }

    fetch("/api/projects/" + encodeURIComponent(id), {
        headers: { "Accept": "application/json" }
    })
        .then(function (response) {

            if (response.status === 404) {
                showNotFound();
                return null;
            }

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return response.json();
        })
        .then(function (data) {

            if (!data) {
                return;
            }

            project = data;
            renderProject();
        })
        .catch(function () {
            // بک‌اند در دسترس نیست: صفحه‌ی نمونه
            startGallery();
        });

});
