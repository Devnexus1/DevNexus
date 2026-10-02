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
        "typing.role": "توسعه‌دهنده فول‌استک",

        /* Page titles */
        "page.title": "DevNexus | توسعه‌دهنده فول‌استک",
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
        "hero.badge": "کد / امنیت / نوآوری",
        "hero.title": "سلام، من <span class=\"emad\">عماد</span> هستم",
        "hero.subtitle": "من <span class=\"web\">راهکارهای وب مدرن</span> می‌سازم",
        "hero.text": "یک توسعه‌دهنده فول‌استک پرشور که عاشق تبدیل ایده‌ها به محصولات دیجیتال واقعی است. در ساخت وب‌سایت و برنامه‌های وب سریع، ریسپانسیو و کاربرپسند تخصص دارم.",
        "hero.viewProjects": "مشاهده پروژه‌ها",
        "hero.contactMe": "تماس با من",
        "scroll.down": "به پایین اسکرول کنید",

        /* About */
        "about.tag": "درباره من",
        "about.title": "من را بیشتر بشناسید",
        "about.subtitle": "کمی درباره اینکه چه کسی هستم و چه می‌کنم.",
        "about.who": "من کی هستم؟",
        "about.p1": "من یک توسعه‌دهنده پرشور هستم که از ساخت وب‌سایت‌ها و برنامه‌های وب مدرن، ریسپانسیو و کاربرپسند لذت می‌برم.",
        "about.p2": "عاشق یادگیری فناوری‌های جدید، حل مسئله و تبدیل ایده‌های خلاق به تجربه‌های دیجیتال واقعی هستم.",
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
        "exp1.title": "توسعه‌دهنده فول‌استک",
        "exp1.text": "توسعه برنامه‌های وب مدرن و ریسپانسیو، کار با فناوری‌های فرانت‌اند و بک‌اند، پایگاه داده و ابزارهای مدرن توسعه.",
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
        "footer.about": "ساخت تجربه‌های وب مدرن، ریسپانسیو و خلاقانه با کد تمیز و راهکارهای نوآورانه.",
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

            document.title =
                currentLang === "fa"
                    ? fa["page.title"]
                    : englishTitle;

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
