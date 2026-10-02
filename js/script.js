const navLinks = document.querySelectorAll(".nav-menu a");

/* =========================
   NAVBAR CLICK
========================= */

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});




/* =========================================================
   MOBILE NAVBAR
========================================================= */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuToggle && navMenu) {

    mobileMenuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("mobile-open");

        mobileMenuToggle.classList.toggle("open", isOpen);

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && navMenu.classList.contains("mobile-open")) {

            navMenu.classList.remove("mobile-open");
            mobileMenuToggle.classList.remove("open");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            mobileMenuToggle.setAttribute("aria-label", "Open navigation menu");
            mobileMenuToggle.focus();

        }

    });

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("mobile-open");
            mobileMenuToggle.classList.remove("open");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            mobileMenuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });

}

const nameText = document.getElementById("name-text");
const roleText = document.getElementById("role-text");

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * متن تایپ‌شونده از language.js می‌آید (انگلیسی یا فارسی).
 * اگر language.js لود نشده بود، همان متن انگلیسی استفاده می‌شود.
 */

function getTypingTexts() {

    if (window.DevNexus) {

        return {
            name: window.DevNexus.t("typing.name", "Emad Nourbakhsh"),
            role: window.DevNexus.t("typing.role", "Full Stack Developer")
        };

    }

    return {
        name: "Emad Nourbakhsh",
        role: "Full Stack Developer"
    };

}

/*
 * هر بار که تایپ از اول شروع می‌شود یک شماره‌ی جدید می‌گیرد.
 * اگر زبان عوض شود، تایپ قبلی با همین شماره متوقف می‌شود.
 */

let typingRun = 0;

function typeText(element, text, callback, runId) {
    let index = 0;

    function type() {

        if (runId !== typingRun) {
            return;
        }

        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;

            setTimeout(type, 100);
        } else {
            setTimeout(function () {

                if (runId === typingRun) {
                    callback();
                }

            }, 800);
        }
    }

    type();
}

function startTyping() {

    typingRun++;

    const runId = typingRun;

    // اگر این المان‌ها در صفحه نبودند، چیزی اجرا نشود
    if (!nameText || !roleText) {
        return;
    }

    const texts = getTypingTexts();

    // کاربرانی که انیمیشن کم می‌خواهند: متن کامل و ثابت
    if (prefersReducedMotion) {
        nameText.textContent = texts.name;
        roleText.textContent = texts.role;
        return;
    }

    // شروع دوباره با متن خالی
    nameText.textContent = "";
    roleText.textContent = "";

    // اول Name
    typeText(nameText, texts.name, function() {

        // بعد Role
        typeText(roleText, texts.role, function() {

            // وقتی هر دو کامل شدند، کمی مکث
            setTimeout(function() {

                if (runId !== typingRun) {
                    return;
                }

                // پاک شدن هر دو
                nameText.textContent = "";
                roleText.textContent = "";

                // شروع دوباره
                setTimeout(function () {

                    if (runId === typingRun) {
                        startTyping();
                    }

                }, 400);

            }, 1200);
        }, runId);
    }, runId);
}

startTyping();

// وقتی کاربر زبان را عوض کرد، تایپ با متن زبان جدید از اول شروع شود
document.addEventListener("devnexus:languagechange", startTyping);


const sectionIds = [
    "home",
    "about",
    "services",
    "projects",
    "skills",
    "experience",
    "contact"
];

const navSections = sectionIds
    .map(function(id) {
        return document.getElementById(id);
    })
    .filter(function(section) {
        return section !== null;
    });


function updateActiveNav() {

    let currentSection = "home";

    navSections.forEach(function(section) {

        const rect = section.getBoundingClientRect();

        if (
            rect.top <= 180 &&
            rect.bottom > 180
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

window.addEventListener(
    "load",
    updateActiveNav
);

updateActiveNav();


sectionIds.forEach(function(id, index) {

    const currentSection = document.getElementById(id);
    const nextSection = document.getElementById(sectionIds[index + 1]);

    if (!currentSection || !nextSection) {
        return;
    }

    let scrollDown = currentSection.querySelector(".scroll-down");

    // اگر Scroll Down از قبل در HTML وجود نداشت
    if (!scrollDown) {

        scrollDown = document.createElement("a");

        scrollDown.className = "scroll-down";

        scrollDown.innerHTML = `
            <div class="mouse">
                <span></span>
            </div>
            <p>Scroll Down</p>
        `;

        currentSection.appendChild(scrollDown);

        // متن Scroll Down بر اساس زبان فعلی ترجمه شود
        if (window.DevNexus) {
            window.DevNexus.refresh();
        }
    }

    // فعال کردن Scroll Down
    scrollDown.addEventListener("click", function(e) {

        e.preventDefault();

        nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


(function () {

    function startDevNexusLoader() {

        const loader = document.getElementById("devnexus-loader");
        const loaderNumber = document.getElementById("loader-number");
        const progressBar = document.getElementById("loader-progress-bar");
        const curtain = document.getElementById("loader-curtain");

        if (!loader || !loaderNumber || !progressBar || !curtain) {
            console.error("DevNexus Loader: Elements not found.");
            return;
        }

        // اگر کاربر در همین نشست قبلاً لودر را دیده، دوباره نمایش داده نشود
        let alreadySeen = false;

        try {
            alreadySeen = sessionStorage.getItem("devnexusLoaderSeen") === "1";
        } catch (error) {
            alreadySeen = false;
        }

        if (alreadySeen || prefersReducedMotion) {

            loader.style.display = "none";
            curtain.style.display = "none";

            return;
        }

        try {
            sessionStorage.setItem("devnexusLoaderSeen", "1");
        } catch (error) {
            // Storage در دسترس نیست؛ مشکلی نیست
        }

        document.body.classList.add("loading");

        let progress = 1;

        loaderNumber.textContent = "1";
        progressBar.style.width = "1%";

        const loadingInterval = setInterval(function () {

            progress++;

            loaderNumber.textContent = progress;

            progressBar.style.width = progress + "%";

            if (progress >= 100) {

                clearInterval(loadingInterval);

                setTimeout(function () {

                    curtain.classList.add("reveal");

                    setTimeout(function () {

                        loader.classList.add("hide");

                        setTimeout(function () {

                            curtain.classList.add("exit");

                            document.body.classList.remove("loading");

                        }, 100);

                    }, 800);

                }, 300);
            }

        }, 15);
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startDevNexusLoader
        );

    } else {

        startDevNexusLoader();

    }

})();


/* =========================
   PROJECTS 360 CAROUSEL
========================= */

let projectCards = document.querySelectorAll(".project-card");
const projectPrev = document.querySelector(".project-prev");
const projectNext = document.querySelector(".project-next");

let currentProject = 0;


function updateProjects(){

    const total = projectCards.length;

    if(total === 0){
        return;
    }

    projectCards.forEach(function(card, index){

        card.classList.remove(
            "active",
            "left",
            "right",
            "hidden"
        );

        /*
         * فاصله کارت نسبت به پروژه فعال
         */

        let position =
            (index - currentProject + total) % total;

        /*
         * پروژه فعال
         */

        if(position === 0){

            card.classList.add("active");

        }

        /*
         * پروژه بعدی
         */

        else if(position === 1){

            card.classList.add("right");

        }

        /*
         * پروژه قبلی
         */

        else if(position === total - 1){

            card.classList.add("left");

        }

        /*
         * بقیه پروژه‌ها
         */

        else{

            card.classList.add("hidden");

        }

    });

}


/* =========================
   NEXT
========================= */

if(projectNext){

    projectNext.addEventListener("click", function(){

        currentProject++;

        if(currentProject >= projectCards.length){

            currentProject = 0;

        }

        updateProjects();

    });

}


/* =========================
   PREVIOUS
========================= */

if(projectPrev){

    projectPrev.addEventListener("click", function(){

        currentProject--;

        if(currentProject < 0){

            currentProject =
                projectCards.length - 1;

        }

        updateProjects();

    });

}


/* =========================
   START
========================= */

updateProjects();

/*
 * کارت‌های پروژه بعد از دریافت از بک‌اند ساخته می‌شوند (js/projects-loader.js)،
 * پس بعد از ساخته‌شدنشان، کاروسل دوباره مقداردهی می‌شود.
 */
document.addEventListener("devnexus:projectsrendered", function () {

    projectCards = document.querySelectorAll(".project-card");

    currentProject = 0;

    updateProjects();

});


const skillsSection = document.querySelector("#skills");
const skillBars = document.querySelectorAll("#skills .skill-bar span");
const skillPercentages = document.querySelectorAll("#skills .skill-top > span");


if (skillsSection && skillBars.length > 0) {

    let skillAnimations = [];


    const resetSkills = function () {

        // متوقف کردن تمام شمارنده‌ها

        skillAnimations.forEach(function (animation) {

            clearInterval(animation);

        });

        skillAnimations = [];


        // برگرداندن نوارها به صفر

        skillBars.forEach(function (bar) {

            bar.style.transition = "none";
            bar.style.width = "0%";

        });


        // برگرداندن درصدها به صفر

        skillPercentages.forEach(function (percentage) {

            percentage.textContent = "0%";

        });

    };


    const animateSkills = function () {

        resetSkills();

        setTimeout(function () {

            skillBars.forEach(function (bar, index) {

                const level =
                    parseInt(bar.getAttribute("data-level"));

                if (!isNaN(level)) {

                    // انیمیشن نوار

                    bar.style.transition =
                        "width 1.5s ease";

                    bar.style.width =
                        level + "%";


                    // شمارش درصد

                    let current = 0;

                    const animation = setInterval(function () {

                        current++;

                        if (skillPercentages[index]) {

                            skillPercentages[index].textContent =
                                current + "%";

                        }

                        if (current >= level) {

                            clearInterval(animation);

                        }

                    }, 1500 / level);


                    // ذخیره کردن Interval

                    skillAnimations.push(animation);

                }

            });

        }, 100);

    };


    const skillObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateSkills();

                } else {

                    resetSkills();

                }

            });

        }, {

            threshold: 0.25

        });


    skillObserver.observe(skillsSection);

}


/* =========================
   CONTACT FORM
   (ارسال به بک‌اند Flask: POST /contact)
========================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");

        formStatus.className = "form-status";
        formStatus.textContent = (window.DevNexus ? window.DevNexus.t("form.sending", "Sending your message...") : "Sending your message...");

        submitButton.disabled = true;

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Request failed: " + response.status);
            }

            formStatus.classList.add("success");
            formStatus.textContent =
                (window.DevNexus ? window.DevNexus.t("form.success", "Message sent. I'll get back to you soon.") : "Message sent. I'll get back to you soon.");

            contactForm.reset();

        } catch (error) {

            formStatus.classList.add("error");
            formStatus.textContent =
                (window.DevNexus ? window.DevNexus.t("form.error", "Could not send your message. Please try again or contact me on Telegram.") : "Could not send your message. Please try again or contact me on Telegram.");

        } finally {

            submitButton.disabled = false;

        }

    });

}


/* =========================================================
   HERO: soft glow that follows the cursor (desktop only)
========================================================= */
(function () {
    var hero = document.querySelector(".hero");
    if (!hero || window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }
    var frame = null;
    hero.addEventListener("pointermove", function (event) {
        if (frame) { return; }
        frame = requestAnimationFrame(function () {
            var rect = hero.getBoundingClientRect();
            hero.style.setProperty("--hx", (event.clientX - rect.left) + "px");
            hero.style.setProperty("--hy", (event.clientY - rect.top) + "px");
            frame = null;
        });
    }, { passive: true });
})();


/* =========================================================
   PROJECTS: counter + dots, click side cards, swipe, keyboard
========================================================= */
(function () {

    var carousel = document.querySelector(".projects-carousel");
    if (!carousel) { return; }

    var nav = document.createElement("div");
    nav.className = "projects-nav";
    nav.innerHTML = '<div class="projects-dots" role="tablist"></div><span class="projects-count" aria-live="polite"></span>';
    carousel.insertAdjacentElement("afterend", nav);

    var dotsBox = nav.querySelector(".projects-dots");
    var count = nav.querySelector(".projects-count");

    function pad(n) { return String(n).padStart(2, "0"); }

    function syncNav() {
        var total = projectCards.length;
        nav.style.display = total > 1 ? "" : "none";

        if (dotsBox.children.length !== total) {
            dotsBox.innerHTML = "";
            for (var i = 0; i < total; i++) {
                (function (index) {
                    var dot = document.createElement("button");
                    dot.type = "button";
                    dot.setAttribute("aria-label", "Project " + (index + 1));
                    dot.addEventListener("click", function () {
                        currentProject = index;
                        updateProjects();
                    });
                    dotsBox.appendChild(dot);
                })(i);
            }
        }

        Array.prototype.forEach.call(dotsBox.children, function (dot, index) {
            dot.classList.toggle("on", index === currentProject);
        });
        count.textContent = pad(currentProject + 1) + " / " + pad(total);
    }

    // run after the original updateProjects (called by arrows and by the loader)
    var originalUpdate = updateProjects;
    updateProjects = function () {
        originalUpdate();
        syncNav();
    };
    syncNav();

    /* click a side card to bring it forward */
    carousel.addEventListener("click", function (event) {
        var card = event.target.closest(".project-card");
        if (!card) { return; }
        if (card.classList.contains("right")) { projectNext.click(); }
        if (card.classList.contains("left")) { projectPrev.click(); }
    });

    /* cursor light on the active card */
    carousel.addEventListener("pointermove", function (event) {
        var card = event.target.closest(".project-card.active");
        if (!card) { return; }
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (event.clientX - rect.left) + "px");
        card.style.setProperty("--my", (event.clientY - rect.top) + "px");
    }, { passive: true });

    /* swipe on touch screens */
    var startX = null;
    carousel.addEventListener("touchstart", function (event) {
        startX = event.changedTouches[0].clientX;
    }, { passive: true });
    carousel.addEventListener("touchend", function (event) {
        if (startX === null) { return; }
        var dx = event.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) < 50) { return; }
        (dx < 0 ? projectNext : projectPrev).click();
    }, { passive: true });

    /* arrow keys only while the carousel is on screen */
    var visible = false;
    new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
    }, { threshold: 0.6 }).observe(carousel);

    document.addEventListener("keydown", function (event) {
        if (!visible || /input|textarea|select/i.test(event.target.tagName)) { return; }
        if (event.key === "ArrowRight") { projectNext.click(); }
        if (event.key === "ArrowLeft") { projectPrev.click(); }
    });
})();


/* =========================================================
   EXPERIENCE: scroll-driven timeline
========================================================= */
(function () {
    var timeline = document.querySelector(".experience-timeline");
    if (!timeline) { return; }

    var items = Array.prototype.slice.call(timeline.querySelectorAll(".experience-item"));
    var ticking = false;

    function update() {
        var vh = window.innerHeight;
        var rect = timeline.getBoundingClientRect();
        var line = vh * 0.6;
        var progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
        timeline.style.setProperty("--p", progress.toFixed(4));

        var current = null;
        items.forEach(function (item) {
            var dotY = item.getBoundingClientRect().top + 35;
            var reached = dotY < line;
            item.classList.toggle("reached", reached);
            if (reached) { current = item; }
        });
        items.forEach(function (item) {
            item.classList.toggle("current", item === current);
        });
        ticking = false;
    }

    function request() {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
})();


/* =========================================================
   CONTACT: copy buttons + message counter
========================================================= */
(function () {

    document.querySelectorAll(".contact-info-item").forEach(function (item) {
        var p = item.querySelector("p");
        if (!p || p.classList.contains("contact-socials") || p.hasAttribute("data-i18n")) { return; }

        var button = document.createElement("button");
        button.type = "button";
        button.className = "dn-copy";
        button.setAttribute("aria-label", "Copy");
        button.textContent = "⧉";

        button.addEventListener("click", function () {
            var text = p.textContent.trim();
            var done = function () {
                button.textContent = "✓";
                button.classList.add("done");
                setTimeout(function () {
                    button.textContent = "⧉";
                    button.classList.remove("done");
                }, 1500);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done).catch(function () {});
            }
        });

        item.appendChild(button);
    });

    var area = document.querySelector(".contact-form textarea");
    if (area) {
        var counter = document.createElement("div");
        counter.className = "dn-count";
        area.insertAdjacentElement("afterend", counter);
        var sync = function () { counter.textContent = area.value.length; };
        area.addEventListener("input", sync);
        document.getElementById("contact-form").addEventListener("reset", function () {
            setTimeout(sync, 0);
        });
        sync();
    }
})();


/* =========================================================
   SERVICES: shared border light, image tilt, staggered entrance
========================================================= */
(function () {
    var grid = document.querySelector(".services-grid");
    var showcase = document.querySelector(".services-showcase");
    var image = document.querySelector(".services-3d-image");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var touch = window.matchMedia("(hover: none)").matches;

    if (grid) {
        var cards = grid.querySelectorAll(".services-card");

        if (!reduce && "IntersectionObserver" in window) {
            grid.classList.add("js-reveal");
            new IntersectionObserver(function (entries, observer) {
                if (entries[0].isIntersecting) {
                    grid.classList.add("in");
                    observer.disconnect();
                }
            }, { threshold: 0.15 }).observe(grid);
        }

        if (!touch) {
            grid.addEventListener("pointermove", function (event) {
                cards.forEach(function (card) {
                    var rect = card.getBoundingClientRect();
                    card.style.setProperty("--mx", (event.clientX - rect.left) + "px");
                    card.style.setProperty("--my", (event.clientY - rect.top) + "px");
                });
            }, { passive: true });
        }
    }

    if (showcase && image && !reduce && !touch) {
        showcase.addEventListener("pointermove", function (event) {
            var rect = showcase.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;
            image.style.transform =
                "rotateY(" + (x * 12).toFixed(2) + "deg) rotateX(" + (-y * 9).toFixed(2) + "deg)";
        }, { passive: true });

        showcase.addEventListener("pointerleave", function () {
            image.style.transform = "";
        });
    }
})();
