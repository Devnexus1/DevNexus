/* DevNexus - single script (merged). Home-page parts run only on index.html, the project part only on project-detail.html. */


/* ============================================================
   PART: language.js (both pages)
============================================================ */

/* =========================================================
   DEVNEXUS - LANGUAGE (EN / FA) & THEME (DARK / LIGHT)

   طرز کار:
   1) هر المانی که data-i18n یا data-i18n-html یا data-i18n-placeholder
      دارد، متنش با کلید همان attribute در دیکشنری فارسی (fa) عوض می‌شود.
   2) متن انگلیسی از خود HTML خوانده و ذخیره می‌شود،
      پس نیازی نیست متن انگلیسی را دوباره اینجا بنویسی.
   3) انتخاب زبان و تم در localStorage ذخیره می‌شود.
========================================================= */

(function () {

    "use strict";


    /* =========================================================
       STORAGE KEYS
    ========================================================= */

    const LANG_KEY = "devnexusLang";
    const THEME_KEY = "devnexusTheme";


    /* =========================================================
       PERSIAN TRANSLATIONS
       برای اضافه کردن متن جدید: کلید را در HTML با data-i18n
       بگذار و ترجمه‌اش را همین‌جا اضافه کن.
    ========================================================= */

    const fa = {

        /* Typing effect (script.js) */
        "typing.name": "عماد نوربخش",
        "typing.role": "برنامه‌نویس خلاق",

        /* Page titles */
        "page.title": "DevNexus | دِو نِکسوس",
        "page.detailTitle": "جزئیات پروژه | DevNexus",

        /* Navbar + footer links */
        "nav.home": "خانه",
        "nav.about": "درباره من",
        "nav.services": "خدمات",
        "nav.projects": "پروژه‌ها",
        "nav.skills": "مهارت‌ها",
        "nav.experience": "سوابق",
        "nav.contact": "تماس",
        "nav.talk": "بیا صحبت کنیم",

        /* Hero */
        "hero.badge": "کد / خلق / نوآوری",
        "hero.title": "سلام، من <span class=\"emad\">عماد</span> هستم",
        "hero.subtitle": "من ایده‌ها را به <span class=\"web\">کد</span> تبدیل می‌کنم",
        "hero.text": "یک برنامه‌نویس که عاشق تبدیل ایده‌های تازه و متفاوت به نرم‌افزار واقعی است. از ابداع راه‌های نو برای حل مسئله و ساختن چیزهایی که قبلاً ندیده‌اید لذت می‌برم.",
        "hero.viewProjects": "مشاهده پروژه‌ها",
        "hero.contactMe": "تماس با من",
        "scroll.down": "به پایین اسکرول کنید",

        /* About */
        "about.tag": "درباره من",
        "about.title": "من را بیشتر بشناسید",
        "about.subtitle": "کمی درباره اینکه چه کسی هستم و چه می‌کنم.",
        "about.who": "من کی هستم؟",
        "about.p1": "من یک توسعه‌دهنده و برنامه‌نویس هستم که از ابداع راه‌حل‌های خلاقانه و ساخت محصولات مدرن و اورجینال لذت می‌برم.",
        "about.p2": "عاشق کشف فناوری‌های جدید، حل مسئله به روش‌های غیرمنتظره و تبدیل ایده‌های تازه به تجربه‌های دیجیتال واقعی هستم.",
        "about.name": "نام:",
        "about.role": "نقش:",
        "about.stat1": "۱+",
        "about.stat2": "۲+",
        "about.stat3": "۴+",
        "about.stat1.label": "سال یادگیری",
        "about.stat2.label": "پروژه",
        "about.stat3.label": "فناوری",
        "about.cv": "دانلود رزومه",

        /* Services */
        "services.tag": "خدمات من",
        "services.title": "چه کار می‌کنم",
        "services.subtitle": "خدماتی که برای ساخت تجربه‌های دیجیتال مدرن ارائه می‌دهم",
        "services.web.title": "توسعه‌دهنده وب",
        "services.web.text": "ساخت وب‌سایت‌های مدرن، ریسپانسیو و کاربرپسند با کدی تمیز و بهینه.",
        "services.back.title": "توسعه بک‌اند",
        "services.back.text": "ساخت سیستم‌های بک‌اند قدرتمند، API و برنامه‌های مبتنی بر پایگاه داده.",
        "services.front.title": "توسعه فرانت‌اند",
        "services.front.text": "ساخت رابط‌های جذاب و ریسپانسیو با فناوری‌های مدرن فرانت‌اند.",
        "services.db.title": "طراحی پایگاه داده",
        "services.db.text": "طراحی پایگاه‌های داده ساختارمند و قابل اعتماد برای برنامه‌های امن و کارآمد.",

        /* Projects */
        "projects.tag": "پروژه‌های من",
        "projects.title": "نمونه‌کارهای برگزیده",
        "projects.subtitle": "مجموعه‌ای از پروژه‌هایی که با فناوری‌های مدرن و راهکارهای خلاقانه ساخته‌ام.",
        "projects.image": "تصویر پروژه",
        "projects.name": "نام پروژه",
        "projects.desc": "توضیحات پروژه از پنل ادمین می‌آید.",
        "projects.details": "مشاهده جزئیات <span>←</span>",

        /* Skills */
        "skills.tag": "مهارت‌های من",
        "skills.title": "تخصص فنی",
        "skills.subtitle": "فناوری‌ها و ابزارهایی که برای ساخت تجربه‌های دیجیتال مدرن، مقیاس‌پذیر و خلاقانه به کار می‌برم.",
        "skills.frontend": "فرانت‌اند",
        "skills.backend": "بک‌اند",
        "skills.database": "پایگاه داده",

        /* Experience */
        "experience.tag": "سوابق من",
        "experience.title": "مسیر من",
        "experience.subtitle": "مسیر یادگیری، رشد فنی و تجربه من در ساخت راهکارهای دیجیتال مدرن.",
        "exp1.date": "۲۰۲۵ - اکنون",
        "exp1.title": "برنامه‌نویس خلاق",
        "exp1.text": "طراحی و ساخت برنامه‌های وب و ایده‌های نوآورانه، از رابط کاربری تا بک‌اند، با ابزارهای مدرن.",
        "exp2.date": "۲۰۲۴ - ۲۰۲۵",
        "exp2.title": "یادگیری توسعه وب",
        "exp2.place": "توسعه شخصی",
        "exp2.text": "یادگیری مبانی توسعه وب و ساخت پروژه‌های عملی برای تقویت مهارت‌های برنامه‌نویسی، حل مسئله و طراحی وب.",
        "exp3.date": "۲۰۲۳ - ۲۰۲۴",
        "exp3.title": "مبانی برنامه‌نویسی",
        "exp3.place": "نرم‌افزار کامپیوتر",
        "exp3.text": "ساخت پایه‌های برنامه‌نویسی و کسب تجربه با الگوریتم‌ها، پایگاه داده و مفاهیم توسعه نرم‌افزار.",

        /* Contact */
        "contact.tag": "ارتباط با من",
        "contact.title": "بیایید با هم کار کنیم",
        "contact.subtitle": "پروژه‌ای در ذهن دارید؟ پیام بدهید تا ایده‌تان را به یک تجربه دیجیتال واقعی تبدیل کنیم.",
        "contact.email": "ایمیل",
        "contact.phone": "تلفن",
        "contact.location": "موقعیت",
        "contact.locationValue": "اصفهان، ایران",
        "contact.social": "شبکه‌های اجتماعی",
        "contact.note": "پس از ارسال پیام، درخواست شما را بررسی می‌کنم و به‌زودی از طریق ایمیل یا تلفن پاسخ می‌دهم. بیایید چیز بزرگی بسازیم.",

        /* Contact form */
        "form.name": "نام شما <span>*</span>",
        "form.email": "ایمیل شما <span>*</span>",
        "form.phone": "شماره تماس شما <span>*</span>",
        "form.type": "نوع پروژه",
        "form.message": "پیام شما <span>*</span>",
        "form.name.ph": "نام خود را وارد کنید",
        "form.email.ph": "ایمیل خود را وارد کنید",
        "form.phone.ph": "شماره تماس خود را وارد کنید",
        "form.message.ph": "درباره پروژه‌تان بنویسید...",
        "form.type.select": "نوع پروژه را انتخاب کنید",
        "form.type.website": "توسعه وب‌سایت",
        "form.type.webapp": "برنامه وب",
        "form.type.frontend": "توسعه فرانت‌اند",
        "form.type.backend": "توسعه بک‌اند",
        "form.type.database": "طراحی پایگاه داده",
        "form.type.other": "سایر",
        "form.send": "ارسال پیام <span>←</span>",
        "form.sending": "در حال ارسال پیام...",
        "form.success": "پیام ارسال شد. به‌زودی پاسخ می‌دهم.",
        "form.error": "ارسال پیام انجام نشد. دوباره تلاش کنید یا از طریق تلگرام پیام بدهید.",

        /* Footer */
        "footer.about": "برنامه‌نویسی ایده‌های نو و تبدیل آن‌ها به محصولات واقعی، با کد تمیز و نگاه خلاق.",
        "footer.links": "لینک‌های سریع",
        "footer.connect": "با من در ارتباط باشید",
        "footer.follow": "مرا دنبال کنید تا با هم چیز شگفت‌انگیزی بسازیم.",
        "footer.rights": "© ۲۰۲۶ DevNexus. تمامی حقوق محفوظ است.",
        "footer.tagline": "کد • خلق • نوآوری",

        /* Project details page */
        "detail.back": "→ بازگشت به پروژه‌ها",
        "detail.tag": "جزئیات پروژه",
        "detail.name": "بازار خودرو",
        "detail.intro": "یک پلتفرم وب مدرن برای خرید و فروش خودرو که با فناوری‌های روز ساخته شده است.",
        "detail.aboutTag": "درباره این پروژه",
        "detail.p1": "این پروژه یک پلتفرم تحت وب برای خرید و فروش خودرو است. کاربران می‌توانند خودروهای موجود را مرور کنند، جزئیات کامل آن‌ها را ببینند و آگهی‌های خود را مدیریت کنند.",
        "detail.p2": "این پلتفرم با رابط کاربری مدرن و بک‌اندی ساختارمند طراحی شده تا تجربه روان‌تری برای کاربران فراهم کند.",
        "detail.tech": "فناوری‌ها",
        "detail.github": "GitHub <span>←</span>",
        "detail.live": "نمایش زنده <span>←</span>",

        /* Toggle buttons */
        "ui.langLabel": "Switch language to English",
        "ui.langText": "EN",
        "ui.langTitle": "English",
        "ui.themeToLight": "تغییر به تم روشن",
        "ui.themeToDark": "تغییر به تم تیره"

    };


    /* =========================================================
       ENGLISH UI LABELS (فقط برای دکمه‌ها؛ بقیه از HTML خوانده می‌شود)
    ========================================================= */

    const en = {

        "ui.langLabel": "Switch language to Persian",
        "ui.langText": "فارسی",
        "ui.langTitle": "فارسی",
        "ui.themeToLight": "Switch to light theme",
        "ui.themeToDark": "Switch to dark theme"

    };


    /* =========================================================
       SAFE STORAGE HELPERS
    ========================================================= */

    function readStorage(key) {

        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }

    }


    function writeStorage(key, value) {

        try {
            localStorage.setItem(key, value);
        } catch (error) {
            /* Storage در دسترس نیست؛ مشکلی نیست */
        }

    }


    /* =========================================================
       STATE
    ========================================================= */

    const root = document.documentElement;

    let currentLang = readStorage(LANG_KEY) === "fa" ? "fa" : "en";

    let currentTheme = readStorage(THEME_KEY) === "light" ? "light" : "dark";

    const englishTitle = document.title;


    /* =========================================================
       TRANSLATE (t)
       برای متن‌هایی که از جاوااسکریپت ساخته می‌شوند.
    ========================================================= */

    function t(key, fallback) {

        if (currentLang === "fa" && fa[key] !== undefined) {
            return fa[key];
        }

        if (currentLang === "en" && en[key] !== undefined) {
            return en[key];
        }

        return fallback !== undefined ? fallback : key;

    }


    /* =========================================================
       APPLY LANGUAGE TO PAGE
    ========================================================= */

    function applyLanguage(silent) {

        root.setAttribute("lang", currentLang);
        root.setAttribute("dir", currentLang === "fa" ? "rtl" : "ltr");


        /* المان‌هایی که JS بعداً می‌سازد (مثل Scroll Down) */

        document.querySelectorAll(".scroll-down p:not([data-i18n])")
            .forEach(function (item) {
                item.setAttribute("data-i18n", "scroll.down");
            });


        /* متن ساده */

        document.querySelectorAll("[data-i18n]").forEach(function (el) {

            if (el._en === undefined) {
                el._en = el.textContent;
            }

            el.textContent =
                currentLang === "fa" && fa[el.dataset.i18n] !== undefined
                    ? fa[el.dataset.i18n]
                    : el._en;

        });


        /* متن همراه با تگ HTML */

        document.querySelectorAll("[data-i18n-html]").forEach(function (el) {

            if (el._enHtml === undefined) {
                el._enHtml = el.innerHTML;
            }

            el.innerHTML =
                currentLang === "fa" && fa[el.dataset.i18nHtml] !== undefined
                    ? fa[el.dataset.i18nHtml]
                    : el._enHtml;

        });


        /* Placeholder فرم */

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {

            if (el._enPlaceholder === undefined) {
                el._enPlaceholder = el.getAttribute("placeholder");
            }

            el.setAttribute(
                "placeholder",
                currentLang === "fa" && fa[el.dataset.i18nPlaceholder] !== undefined
                    ? fa[el.dataset.i18nPlaceholder]
                    : el._enPlaceholder
            );

        });


        /* عنوان تب مرورگر */

        if (document.querySelector(".project-details")) {

            document.title =
                currentLang === "fa"
                    ? fa["page.detailTitle"]
                    : englishTitle;

        } else {

            /* index page: the title stays exactly as written in <title>, in both languages */

        }


        updateLangButton();

        updateThemeButton();


        /* به بقیه‌ی فایل‌ها (مثل تایپ اسم در script.js) خبر بده */

        if (silent !== true) {

            document.dispatchEvent(
                new CustomEvent("devnexus:languagechange", {
                    detail: { lang: currentLang }
                })
            );

        }

    }


    /* =========================================================
       LANGUAGE BUTTON
    ========================================================= */

    const langButton = document.getElementById("lang-toggle");

    function updateLangButton() {

        if (!langButton) {
            return;
        }

        const text = langButton.querySelector(".lang-toggle-text");

        if (text) {
            text.textContent = t("ui.langText");
        }

        langButton.setAttribute("aria-label", t("ui.langLabel"));

        langButton.setAttribute("title", t("ui.langTitle"));

    }


    if (langButton) {

        langButton.addEventListener("click", function () {

            currentLang = currentLang === "fa" ? "en" : "fa";

            writeStorage(LANG_KEY, currentLang);

            applyLanguage();

        });

    }


    /* =========================================================
       THEME
    ========================================================= */

    const themeButton = document.getElementById("theme-toggle");

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme() {

        root.setAttribute("data-theme", currentTheme);

        if (themeColorMeta) {

            themeColorMeta.setAttribute(
                "content",
                currentTheme === "light" ? "#f3f6fb" : "#050811"
            );

        }

    }


    function updateThemeButton() {

        if (!themeButton) {
            return;
        }

        const label =
            currentTheme === "light"
                ? t("ui.themeToDark")
                : t("ui.themeToLight");

        themeButton.setAttribute("aria-label", label);

        themeButton.setAttribute("title", label);

    }


    if (themeButton) {

        themeButton.addEventListener("click", function () {

            currentTheme = currentTheme === "light" ? "dark" : "light";

            writeStorage(THEME_KEY, currentTheme);

            applyTheme();

            updateThemeButton();

        });

    }


    /* =========================================================
       PUBLIC API
    ========================================================= */

    window.DevNexus = {

        t: t,

        lang: function () {
            return currentLang;
        },

        /* بدون رویداد؛ فقط متن‌های تازه ساخته‌شده را ترجمه می‌کند */
        refresh: function () {
            applyLanguage(true);
        }

    };


    /* =========================================================
       START
    ========================================================= */

    applyTheme();

    applyLanguage();

})();


/* ============================================================
   PART: home page
============================================================ */

(function () {

    if (!document.getElementById("home")) { return; }

/* ---- script.js ---- */
(function () {
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
            role: window.DevNexus.t("typing.role", "Creative Programmer")
        };

    }

    return {
        name: "Emad Nourbakhsh",
        role: "Creative Programmer"
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


let activeNavId = null;

function updateActiveNav() {

    let currentSection = "home";

    navSections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom > 180) {
            currentSection = section.id;
        }
    });

    /* nothing changed -> no class writes, no style recalculation */
    if (currentSection === activeNavId) { return; }
    activeNavId = currentSection;

    navLinks.forEach(function(link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });

}

/* at most one update per frame while scrolling */
let navTicking = false;

function requestNavUpdate() {
    if (navTicking) { return; }
    navTicking = true;
    requestAnimationFrame(function () {
        navTicking = false;
        updateActiveNav();
    });
}

window.addEventListener("scroll", requestNavUpdate, { passive: true });

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

})();

/* ---- projects-loader.js ---- */
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


/* ---- skills-modern.js ---- */
/* =========================================================
   DEVNEXUS - SKILLS MODERN
   Adds (without touching the HTML): category colors, summary
   tiles, filter tabs, level chips, cursor light + tilt and a
   staggered entrance. script.js still drives the bars/percent.
========================================================= */

(function () {

    "use strict";

    var grid = document.querySelector("#skills .skills-grid");

    if (!grid) { return; }

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".skill-card"));

    if (!cards.length) { return; }

    var CATS = { "skills.frontend": "front", "skills.backend": "back", "skills.database": "db" };
    var ORDER = ["front", "back", "db"];

    var TEXT = {
        en: {
            all: "All",
            stats: ["Technologies", "Avg. proficiency", "Focus areas"],
            levels: ["Expert", "Advanced", "Intermediate", "Learning"]
        },
        fa: {
            all: "همه",
            stats: ["فناوری", "میانگین تسلط", "حوزه تخصصی"],
            levels: ["متخصص", "پیشرفته", "متوسط", "در حال یادگیری"]
        }
    };

    function lang() {
        if (window.DevNexus && window.DevNexus.lang) { return window.DevNexus.lang() === "fa" ? "fa" : "en"; }
        return document.documentElement.getAttribute("lang") === "fa" ? "fa" : "en";
    }

    function levelIndex(value) {
        return value >= 85 ? 0 : value >= 70 ? 1 : value >= 50 ? 2 : 3;
    }


    /* ---------- prepare cards ---------- */

    var items = cards.map(function (card, index) {

        var small = card.querySelector(".skill-info small");
        var key = small ? small.getAttribute("data-i18n") : "";
        var cat = CATS[key] || "front";
        var bar = card.querySelector(".skill-bar span");
        var level = bar ? parseInt(bar.getAttribute("data-level"), 10) || 0 : 0;

        card.setAttribute("data-cat", cat);
        card.style.setProperty("--i", index);

        var meta = document.createElement("div");
        meta.className = "skill-meta";

        var chip = document.createElement("span");
        chip.className = "skill-level";

        if (small) {
            small.parentNode.insertBefore(meta, small);
            meta.appendChild(small);
        } else {
            card.querySelector(".skill-info").appendChild(meta);
        }

        meta.appendChild(chip);

        return { card: card, cat: cat, level: level, small: small, chip: chip };
    });


    /* ---------- summary + tabs ---------- */

    var title = document.querySelector("#skills .section-title");

    var summary = document.createElement("div");
    summary.className = "skills-summary";

    var tabs = document.createElement("div");
    tabs.className = "skills-tabs";
    tabs.setAttribute("role", "group");

    var average = Math.round(items.reduce(function (sum, item) { return sum + item.level; }, 0) / items.length);
    var present = ORDER.filter(function (cat) {
        return items.some(function (item) { return item.cat === cat; });
    });

    var statValues = [String(items.length), average + "%", String(present.length)];
    var statLabels = [];

    statValues.forEach(function (value) {
        var tile = document.createElement("div");
        var strong = document.createElement("strong");
        var label = document.createElement("span");
        tile.className = "skills-stat";
        strong.textContent = value;
        tile.appendChild(strong);
        tile.appendChild(label);
        summary.appendChild(tile);
        statLabels.push(label);
    });

    var buttons = {};
    var current = "all";

    ["all"].concat(present).forEach(function (cat) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "skills-tab" + (cat === "all" ? " on" : "");
        button.setAttribute("aria-pressed", cat === "all" ? "true" : "false");
        button.addEventListener("click", function () { filter(cat); });
        tabs.appendChild(button);
        buttons[cat] = button;
    });

    title.parentNode.insertBefore(summary, grid);
    title.parentNode.insertBefore(tabs, grid);

    function categoryLabel(cat) {
        var found = items.filter(function (item) { return item.cat === cat && item.small; })[0];
        return found ? found.small.textContent.trim() : cat;
    }

    function applyTexts() {

        var dict = TEXT[lang()];

        statLabels.forEach(function (el, i) { el.textContent = dict.stats[i]; });

        buttons.all.textContent = dict.all;
        present.forEach(function (cat) { buttons[cat].textContent = categoryLabel(cat); });

        items.forEach(function (item) {
            item.chip.textContent = dict.levels[levelIndex(item.level)];
        });
    }

    function filter(cat) {

        if (cat === current) { return; }

        current = cat;

        Object.keys(buttons).forEach(function (key) {
            var on = key === cat;
            buttons[key].classList.toggle("on", on);
            buttons[key].setAttribute("aria-pressed", on ? "true" : "false");
        });

        items.forEach(function (item) {

            var show = cat === "all" || item.cat === cat;

            if (show && item.card.hidden) {
                item.card.hidden = false;
                item.card.classList.remove("pop");
                void item.card.offsetWidth;
                item.card.classList.add("pop");
            } else if (!show) {
                item.card.hidden = true;
            }
        });
    }

    applyTexts();

    // language.js rewrites the category text on a language change
    document.addEventListener("devnexus:languagechange", function () {
        setTimeout(applyTexts, 0);
    });


    /* ---------- cursor light + tilt (mouse only) ---------- */

    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach(function (card) {

        card.addEventListener("animationend", function () { card.classList.remove("pop"); });

        if (!canHover) { return; }

        card.addEventListener("pointermove", function (event) {

            var rect = card.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            card.style.setProperty("--mx", x + "px");
            card.style.setProperty("--my", y + "px");

            if (!reduced) {
                card.style.setProperty("--ry", ((x / rect.width - 0.5) * 7).toFixed(2) + "deg");
                card.style.setProperty("--rx", ((0.5 - y / rect.height) * 7).toFixed(2) + "deg");
            }
        });

        card.addEventListener("pointerleave", function () {
            card.style.setProperty("--rx", "0deg");
            card.style.setProperty("--ry", "0deg");
        });
    });


    /* ---------- entrance (once) ---------- */

    if (!("IntersectionObserver" in window)) { return; }

    grid.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                grid.classList.add("in");
                observer.disconnect();
            }
        });

    }, { threshold: 0.15 });

    observer.observe(grid);

})();


/* ---- about-modern.js ---- */
/* =========================================================
   DEVNEXUS - ABOUT MODERN
   Entrance, cursor light on the panel, photo tilt, stat count-up.
========================================================= */

(function () {

    "use strict";

    var content = document.querySelector("#about .about-content");

    if (!content) { return; }

    var panel = content.querySelector(".about-text");
    var box = content.querySelector(".image-box");
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- cursor light on the panel ---------- */

    if (panel && canHover) {
        panel.addEventListener("pointermove", function (event) {
            var rect = panel.getBoundingClientRect();
            panel.style.setProperty("--mx", (event.clientX - rect.left) + "px");
            panel.style.setProperty("--my", (event.clientY - rect.top) + "px");
        });
    }


    /* ---------- photo tilt ---------- */

    if (box && canHover && !reduced) {

        var area = box.parentNode;

        area.addEventListener("pointermove", function (event) {
            var rect = box.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;
            box.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
            box.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
        });

        area.addEventListener("pointerleave", function () {
            box.style.setProperty("--rx", "0deg");
            box.style.setProperty("--ry", "0deg");
        });
    }


    /* ---------- stat count-up (keeps the current language's digits) ---------- */

    var FA = "۰۱۲۳۴۵۶۷۸۹";

    function countUp(el) {

        var raw = el.textContent.trim();
        var match = raw.match(/^([^\d۰-۹]*)([\d۰-۹]+)(.*)$/);

        if (!match) { return; }

        var persian = /[۰-۹]/.test(match[2]);
        var target = parseInt(match[2].replace(/[۰-۹]/g, function (d) { return FA.indexOf(d); }), 10);
        var start = null;
        var last = "";

        function format(n) {
            var text = String(n);
            return persian ? text.replace(/\d/g, function (d) { return FA[d]; }) : text;
        }

        function frame(time) {

            if (start === null) { start = time; }

            var progress = Math.min((time - start) / 1200, 1);
            var eased = 1 - Math.pow(1 - progress, 3);

            last = match[1] + format(Math.round(target * eased)) + match[3];
            el.textContent = last;

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else if (el.textContent === last) {
                el.textContent = raw;
            }
        }

        requestAnimationFrame(frame);
    }


    /* ---------- entrance (once) ---------- */

    if (!("IntersectionObserver" in window)) { return; }

    content.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) { return; }

            content.classList.add("in");
            observer.disconnect();

            if (!reduced) {
                content.querySelectorAll(".stats-number").forEach(countUp);
            }
        });

    }, { threshold: 0.2 });

    observer.observe(content);

})();


/* ---- services-modern.js ---- */
/* =========================================================
   DEVNEXUS - SERVICES MODERN
   Plays the photo's entrance once the layout scrolls into view
   (cards, cursor light and photo tilt already live in script.js).
========================================================= */

(function () {

    "use strict";

    var layout = document.querySelector("#services .services-layout");

    if (!layout || !("IntersectionObserver" in window)) { return; }

    var observer = new IntersectionObserver(function (entries) {

        if (entries[0].isIntersecting) {
            layout.classList.add("js-in");
            observer.disconnect();
        }

    }, { threshold: 0.15 });

    observer.observe(layout);

})();


})();


/* ============================================================
   PART: project-detail.js (project-detail.html only)
============================================================ */

(function () {

    if (!document.getElementById("project-main-image")) { return; }

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


})();
