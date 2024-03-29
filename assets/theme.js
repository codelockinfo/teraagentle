/*
* @license
* Broadcast Theme (c) Invisible Themes
*
* The contents of this file should not be modified.
* add any minor changes to assets/custom.js
*
*/
(function(bodyScrollLock, themeCurrency, themeImages, themeAddresses, Sqrl, Flickity, FlickityFade, Rellax, ellipsed, AOS) {
    "use strict";
    function floatLabels(e) {
        e.querySelectorAll(".form-field").forEach((e=>{
            const t = e.querySelector("label")
              , s = e.querySelector("input, textarea");
            t && s && (s.addEventListener("keyup", (e=>{
                "" !== e.target.value ? t.classList.add("label--float") : t.classList.remove("label--float")
            }
            )),
            s.value && s.value.length && t.classList.add("label--float"))
        }
        ))
    }
    function readHeights() {
        const e = {};
        return e.windowHeight = window.innerHeight,
        e.announcementHeight = getHeight('[data-section-type*="announcement"] [data-bar-top]'),
        e.footerHeight = getHeight('[data-section-type*="footer"]'),
        e.menuHeight = getHeight("[data-header-height]"),
        e.headerHeight = e.menuHeight + e.announcementHeight,
        e.collectionNavHeight = getHeight("[data-collection-nav]"),
        e.logoHeight = getFooterLogoWithPadding(),
        e
    }
    function setVarsOnResize() {
        document.addEventListener("theme:resize", resizeVars),
        setVars()
    }
    function setVars() {
        const {windowHeight: e, announcementHeight: t, headerHeight: s, logoHeight: i, menuHeight: o, footerHeight: r, collectionNavHeight: a} = readHeights()
          , n = document.querySelector("[data-newsletter-holder].newsletter--left")
          , l = document.querySelector("#MainContent > .shopify-section:first-child > [data-announcement-wrapper]")
          , c = document.querySelector("[data-tracking-consent]");
        let d = 16;
        document.documentElement.style.setProperty("--full-screen", `${e}px`),
        document.documentElement.style.setProperty("--three-quarters", e * (3 / 4) + "px"),
        document.documentElement.style.setProperty("--two-thirds", e * (2 / 3) + "px"),
        document.documentElement.style.setProperty("--one-half", e / 2 + "px"),
        document.documentElement.style.setProperty("--one-third", e / 3 + "px"),
        document.documentElement.style.setProperty("--menu-height", `${o}px`),
        document.documentElement.style.setProperty("--announcement-height", `${t}px`),
        document.documentElement.style.setProperty("--header-height", `${s}px`),
        document.documentElement.style.setProperty("--collection-nav-height", `${a}px`),
        document.documentElement.style.setProperty("--footer-height", `${r}px`),
        document.documentElement.style.setProperty("--content-full", e - s - i / 2 + "px"),
        document.documentElement.style.setProperty("--content-min", e - s - r + "px"),
        document.querySelector("[data-tracking-consent].popup-cookies--bottom") && document.documentElement.style.setProperty("--cookie-bar-height", `${document.querySelector("[data-tracking-consent].popup-cookies--bottom").offsetHeight}px`),
        document.documentElement.style.setProperty("--newsletter-small-height", n ? `${n.offsetHeight}px` : "0px"),
        document.documentElement.style.setProperty("--announcement-height-high", l ? `${l.offsetHeight}px` : "0px"),
        c && c.offsetHeight > 0 && (d = c.offsetHeight + Number(getComputedStyle(c).bottom.replace("px", ""))),
        document.documentElement.style.setProperty("--mobile-newsletter-with-cookie-height", `${d}px`)
    }
    function resizeVars() {
        const {windowHeight: e, announcementHeight: t, headerHeight: s, logoHeight: i, menuHeight: o, footerHeight: r, collectionNavHeight: a} = readHeights()
          , n = document.querySelector("[data-newsletter-holder].newsletter--left")
          , l = document.querySelector("#MainContent > .shopify-section:first-child > [data-announcement-wrapper]")
          , c = document.querySelector("[data-tracking-consent]");
        let d = 16;
        document.documentElement.style.setProperty("--menu-height", `${o}px`),
        document.documentElement.style.setProperty("--announcement-height", `${t}px`),
        document.documentElement.style.setProperty("--header-height", `${s}px`),
        document.documentElement.style.setProperty("--collection-nav-height", `${a}px`),
        document.documentElement.style.setProperty("--footer-height", `${r}px`),
        document.documentElement.style.setProperty("--content-full", e - s - i / 2 + "px"),
        document.documentElement.style.setProperty("--content-min", e - s - r + "px"),
        document.querySelector("[data-tracking-consent].popup-cookies--bottom") && document.documentElement.style.setProperty("--cookie-bar-height", `${document.querySelector("[data-tracking-consent].popup-cookies--bottom").offsetHeight}px`),
        document.documentElement.style.setProperty("--newsletter-small-height", n ? `${n.offsetHeight}px` : "0px"),
        document.documentElement.style.setProperty("--announcement-height-high", l ? `${l.offsetHeight}px` : "0px"),
        c && c.offsetHeight > 0 && (d = c.offsetHeight + Number(getComputedStyle(c).bottom.replace("px", ""))),
        document.documentElement.style.setProperty("--mobile-newsletter-with-cookie-height", `${d}px`)
    }
    function getHeight(e) {
        const t = document.querySelector(e);
        return t ? t.offsetHeight : 0
    }
    function getFooterLogoWithPadding() {
        const e = getHeight("[data-footer-logo]");
        return e > 0 ? e + 20 : 0
    }
    function singles(e, t) {
        let s = 64
          , i = 0;
        t.forEach((e=>{
            if (e.offsetHeight > i) {
                const t = parseInt(window.getComputedStyle(e).marginTop) + parseInt(window.getComputedStyle(e).marginBottom);
                t > s && (s = t),
                i = e.offsetHeight
            }
        }
        ));
        const o = e.querySelectorAll("[data-overflow-background]");
        [e, ...o].forEach((e=>{
            e.style.setProperty("min-height", `calc(${i + s}px + var(--header-padding)`)
        }
        ))
    }
    function doubles(e) {
        if (window.innerWidth < window.theme.sizes.small) {
            return void e.querySelectorAll("[data-overflow-frame]").forEach((e=>{
                const t = e.querySelectorAll("[data-overflow-content]");
                singles(e, t)
            }
            ))
        }
        const t = 2 * parseInt(getComputedStyle(e).getPropertyValue("--outer"));
        let s = 0;
        const i = e.querySelectorAll("[data-overflow-frame]");
        e.querySelectorAll("[data-overflow-content]").forEach((e=>{
            e.offsetHeight > s && (s = e.offsetHeight)
        }
        ));
        [...i, ...e.querySelectorAll("[data-overflow-background]")].forEach((e=>{
            e.style.setProperty("min-height", `${s + t}px`)
        }
        )),
        e.style.setProperty("min-height", `${s + t + 2}px`)
    }
    function preventOverflow(e) {
        const t = e.querySelectorAll(".js-overflow-container");
        t && t.forEach((e=>{
            const t = e.querySelectorAll(".js-overflow-content");
            singles(e, t),
            document.addEventListener("theme:resize", (()=>{
                singles(e, t)
            }
            ))
        }
        ));
        const s = e.querySelectorAll("[data-overflow-wrapper]");
        s && s.forEach((e=>{
            doubles(e),
            document.addEventListener("theme:resize", (()=>{
                doubles(e)
            }
            ))
        }
        ))
    }
    function debounce(e, t) {
        let s;
        return function() {
            if (e) {
                const i = ()=>e.apply(this, arguments);
                clearTimeout(s),
                s = setTimeout(i, t)
            }
        }
    }
    function dispatch() {
        document.dispatchEvent(new CustomEvent("theme:resize",{
            bubbles: !0
        }))
    }
    function resizeListener() {
        window.addEventListener("resize", debounce((function() {
            dispatch()
        }
        ), 50))
    }
    window.theme = window.theme || {},
    window.theme.sizes = {
        mobile: 480,
        small: 750,
        large: 990,
        widescreen: 1400
    },
    window.theme.keyboardKeys = {
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        LEFTARROW: 37,
        RIGHTARROW: 39
    },
    window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let prev = window.pageYOffset
      , up = null
      , down = null
      , wasUp = null
      , wasDown = null
      , scrollLockTimeout = 0;
    function dispatch$1() {
        const e = window.pageYOffset;
        e > prev ? (down = !0,
        up = !1) : e < prev ? (down = !1,
        up = !0) : (up = null,
        down = null),
        prev = e,
        document.dispatchEvent(new CustomEvent("theme:scroll",{
            detail: {
                up: up,
                down: down,
                position: e
            },
            bubbles: !1
        })),
        up && !wasUp && document.dispatchEvent(new CustomEvent("theme:scroll:up",{
            detail: {
                position: e
            },
            bubbles: !1
        })),
        down && !wasDown && document.dispatchEvent(new CustomEvent("theme:scroll:down",{
            detail: {
                position: e
            },
            bubbles: !1
        })),
        wasDown = down,
        wasUp = up
    }
    function lock(e) {
        bodyScrollLock.disableBodyScroll(e.detail, {
            allowTouchMove: e=>"TEXTAREA" === e.tagName
        }),
        document.documentElement.setAttribute("data-scroll-locked", "")
    }
    function unlock() {
        if (scrollLockTimeout = setTimeout((()=>{
            document.body.removeAttribute("data-drawer-closing")
        }
        ), 20),
        document.body.hasAttribute("data-drawer-closing"))
            return document.body.removeAttribute("data-drawer-closing"),
            void (scrollLockTimeout && clearTimeout(scrollLockTimeout));
        document.body.setAttribute("data-drawer-closing", ""),
        document.documentElement.removeAttribute("data-scroll-locked"),
        bodyScrollLock.clearAllBodyScrollLocks()
    }
    function scrollListener() {
        let e;
        window.addEventListener("scroll", (function() {
            e && window.cancelAnimationFrame(e),
            e = window.requestAnimationFrame((function() {
                dispatch$1()
            }
            ))
        }
        ), {
            passive: !0
        }),
        window.addEventListener("theme:scroll:lock", lock),
        window.addEventListener("theme:scroll:unlock", unlock)
    }
    const wrap = (e,t="",s)=>{
        const i = s || document.createElement("div");
        return i.classList.add(t),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e)
    }
    ;
    function wrapElements(e) {
        e.querySelectorAll(".rte table").forEach((e=>{
            wrap(e, "rte__table-wrapper")
        }
        ));
        e.querySelectorAll('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"], .rte iframe#admin_bar_iframe').forEach((e=>{
            wrap(e, "rte__video-wrapper")
        }
        ))
    }
    function wasTouched() {
        window.theme.touched = !0,
        document.removeEventListener("touchstart", wasTouched, {
            passive: !0
        }),
        document.querySelector("body").classList.add("supports-touch"),
        document.dispatchEvent(new CustomEvent("theme:touch",{
            bubbles: !0
        }))
    }
    function lazyImageBackgrounds() {
        document.addEventListener("lazyloaded", (function(e) {
            const t = e.target.parentNode;
            t.classList.contains("lazy-image") && (t.style.backgroundImage = "none")
        }
        ))
    }
    function ariaToggle(e) {
        const t = e.querySelectorAll("[data-aria-toggle]");
        t.length && t.forEach((e=>{
            e.addEventListener("click", (function(e) {
                e.preventDefault();
                const t = e.currentTarget;
                t.setAttribute("aria-expanded", "false" == t.getAttribute("aria-expanded") ? "true" : "false");
                const s = t.getAttribute("aria-controls");
                document.querySelector(`#${s}`).classList.toggle("expanding"),
                document.querySelector(`#${s}`).classList.toggle("expanded"),
                setTimeout((function() {
                    document.querySelector(`#${s}`).classList.remove("expanding")
                }
                ), 500)
            }
            ))
        }
        ))
    }
    document.addEventListener("touchstart", wasTouched, {
        passive: !0
    }),
    resizeListener(),
    scrollListener(),
    lazyImageBackgrounds(),
    ariaToggle(document),
    window.addEventListener("load", (()=>{
        setVarsOnResize(),
        floatLabels(document),
        preventOverflow(document),
        wrapElements(document)
    }
    )),
    document.addEventListener("shopify:section:load", (e=>{
        const t = e.target;
        floatLabels(t),
        preventOverflow(t),
        wrapElements(t),
        ariaToggle(document)
    }
    )),
    function() {
        function e(e) {
            var t = window.innerWidth || document.documentElement.clientWidth
              , s = window.innerHeight || document.documentElement.clientHeight
              , i = e.getBoundingClientRect();
            return i.top >= 0 && i.bottom <= s && i.left >= 0 && i.right <= t
        }
        function t(e) {
            var t = window.innerWidth || document.documentElement.clientWidth
              , s = window.innerHeight || document.documentElement.clientHeight
              , i = e.getBoundingClientRect()
              , o = i.left >= 0 && i.left <= t || i.right >= 0 && i.right <= t
              , r = i.top >= 0 && i.top <= s || i.bottom >= 0 && i.bottom <= s;
            return o && r
        }
        window.visibilityHelper = {
            isElementTotallyVisible: e,
            isElementPartiallyVisible: t,
            inViewportPartially: function(e, s) {
                function i() {
                    var i = t(e);
                    i != o && (o = i,
                    "function" == typeof s && s(i, e))
                }
                var o = t(e);
                window.addEventListener("load", i),
                window.addEventListener("resize", i),
                window.addEventListener("scroll", i)
            },
            inViewportTotally: function(t, s) {
                function i() {
                    var i = e(t);
                    i != o && (o = i,
                    "function" == typeof s && s(i, t))
                }
                var o = e(t);
                window.addEventListener("load", i),
                window.addEventListener("resize", i),
                window.addEventListener("scroll", i)
            }
        }
    }();
    const showElement = (e,t=!1,s="block")=>{
        e && (t ? e.style.removeProperty("display") : e.style.display = s)
    }
    ;
    Shopify.Products = function() {
        const e = {
            howManyToShow: 4,
            howManyToStoreInMemory: 10,
            wrapperId: "recently-viewed-products",
            templateId: "recently-viewed-product-template",
            section: null,
            onComplete: null
        };
        let t = []
          , s = null
          , i = null
          , o = null;
        const r = {
            configuration: {
                expires: 90,
                path: "/",
                domain: window.location.hostname
            },
            name: "shopify_recently_viewed",
            write: function(e) {
                const t = e.join(" ");
                document.cookie = `${this.name}=${t}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`
            },
            read: function() {
                let e = []
                  , t = null;
                const s = document.querySelector("#template-product");
                if (-1 !== document.cookie.indexOf("; ") && document.cookie.split("; ").find((e=>e.startsWith(this.name))) && (t = document.cookie.split("; ").find((e=>e.startsWith(this.name))).split("=")[1]),
                null !== t && (e = t.split(" ")),
                s) {
                    const t = s.getAttribute("data-product-handle");
                    if (-1 != e.indexOf(t)) {
                        const s = e.indexOf(t);
                        e.splice(s, 1)
                    }
                }
                return e
            },
            destroy: function() {
                document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`
            },
            remove: function(e) {
                const t = this.read()
                  , s = t.indexOf(e);
                -1 !== s && (t.splice(s, 1),
                this.write(t))
            }
        }
          , a = (t,s,n,l)=>{
            s.length && t < e.howManyToShow ? fetch("/products/" + s[0] + ".js").then((e=>e.json())).then((e=>{
                let o;
                e.priceFormatted = themeCurrency.formatMoney(e.price, theme.moneyFormat),
                e.compareFormatted = themeCurrency.formatMoney(e.compare_at_price, theme.moneyFormat),
                e.topImage = e.media[0] ? themeImages.getSizedImageUrl(e.media[0].preview_image.src, "900x900") : "",
                e.bottomImage = e.media[1] ? themeImages.getSizedImageUrl(e.media[1].preview_image.src, "900x900") : "";
                let r = !1
                  , c = !1
                  , d = ""
                  , h = ""
                  , u = "is-hidden hidden"
                  , p = "is-hidden hidden"
                  , m = "is-hidden hidden"
                  , g = "is-hidden hidden"
                  , y = ""
                  , b = "is-hidden hidden"
                  , f = "is-hidden hidden"
                  , w = 150 * t
                  , v = 100 * t + 800
                  , S = 50 * t + 800;
                e.media.length > 1 ? d = "double__image" : h = "is-hidden hidden";
                for (let t = 0; t < e.tags.length; t++) {
                    if (e.tags[t].includes("_badge_")) {
                        r = !0,
                        o = e.tags[t].replace("_badge_", "").split("_").join(" ");
                        break
                    }
                    if (e.tags[t].includes("_preorder")) {
                        c = !0;
                        break
                    }
                }
                r && (u = ""),
                c && !r && (p = ""),
                e.compare_at_price > e.price && (y = "sale",
                m = "",
                c && r || (g = "",
                m = "is-hidden hidden")),
                e.available || (p = "is-hidden hidden",
                y = "is-hidden hidden",
                b = ""),
                e.price_varies && (f = "");
                const $ = e.title.replace(/(<([^>]+)>)/gi, "");
                let E = i.innerHTML;
                E = E.replace(/\|\|itemUrl\|\|/g, e.url),
                E = E.replace(/\|\|itemDoubleImageClass\|\|/g, d),
                E = E.replace(/\|\|itemTopImage\|\|/g, e.topImage),
                E = E.replace(/\|\|itemBottomImage\|\|/g, e.bottomImage),
                E = E.replace(/\|\|itemBottomImageClass\|\|/g, h),
                E = E.replace(/\|\|itemCustomBadgeClass\|\|/g, u),
                E = E.replace(/\|\|itemCustomBadgeVal\|\|/g, o),
                E = E.replace(/\|\|itemPreorderClass\|\|/g, p),
                E = E.replace(/\|\|itemSaleClass\|\|/g, m),
                E = E.replace(/\|\|itemSalePriceClass\|\|/g, g),
                E = E.replace(/\|\|itemPriceClass\|\|/g, y),
                E = E.replace(/\|\|itemFromClass\|\|/g, f),
                E = E.replace(/\|\|itemTitle\|\|/g, $),
                E = E.replace(/\|\|itemComparedPrice\|\|/g, e.compareFormatted),
                E = E.replace(/\|\|itemPrice\|\|/g, e.priceFormatted),
                E = E.replace(/\|\|itemHandle\|\|/g, e.handle),
                E = E.replace(/\|\|itemAosDelay\|\|/g, w),
                E = E.replace(/\|\|itemAosImageDuration\|\|/g, v),
                E = E.replace(/\|\|itemAosTextDuration\|\|/g, S),
                E = E.replace(/\|\|itemIndex\|\|/g, t),
                E = E.replace(/\|\|itemSoldClass\|\|/g, b),
                E = "Title" === e.options[0].name && 1 === e.options.length && "Default Title" === e.options[0].values[0] ? E.replace(/\|\|itemHasOnlyDefault\|\|/g, "data-quick-add-button") : E.replace(/\|\|itemHasOnlyDefault\|\|/g, "");
                const L = e.options.filter((e=>{
                    for (let t = 0; t < theme.swatchLabels.length; t++) {
                        const s = theme.swatchLabels[t].trim();
                        if (Object.values(e).includes(s))
                            return e
                    }
                }
                ));
                E = E.replace(/\|\|itemSwatchesHidden\|\|/g, L.length > 0 ? "" : "hide"),
                E = E.replace(/\|\|itemColorLabel\|\|/g, L.length > 0 ? L[0].name : ""),
                n.innerHTML += E,
                s.shift(),
                t++,
                a(t, s, n, l)
            }
            )).catch((()=>{
                r.remove(s[0]),
                s.shift(),
                a(t, s, n, l)
            }
            )) : ((t,s)=>{
                showElement(t, !0);
                const i = r.read().length;
                if (Shopify.recentlyViewed && o && i && i < o && t.children.length) {
                    let e = []
                      , s = []
                      , i = 0;
                    for (const t in Shopify.recentlyViewed) {
                        i += 1;
                        const o = Shopify.recentlyViewed[t].split(" ")
                          , a = parseInt(t.split("_")[1]);
                        e = [...e, ...o],
                        (r.read().length === a || i === Object.keys(Shopify.recentlyViewed).length && !s.length) && (s = [...s, ...o])
                    }
                    for (let i = 0; i < t.children.length; i++) {
                        const o = t.children[i];
                        e.length && o.classList.remove(...e),
                        s.length && o.classList.add(...s)
                    }
                }
                if (e.onComplete)
                    try {
                        e.onComplete(t, s)
                    } catch (e) {
                        console.log("error")
                    }
            }
            )(n, l)
        }
        ;
        return {
            showRecentlyViewed: function(n) {
                const l = n || {};
                Object.assign(e, l),
                t = r.read(),
                i = document.querySelector(`#${e.templateId}`),
                s = document.querySelector(`#${e.wrapperId}`),
                o = e.howManyToShow,
                e.howManyToShow = Math.min(t.length, e.howManyToShow),
                e.howManyToShow && i && s && a(0, t, s, e.section)
            },
            getConfig: function() {
                return e
            },
            clearList: function() {
                r.destroy()
            },
            recordRecentlyViewed: function(t) {
                const s = t || {};
                Object.assign(e, s);
                let i = r.read();
                if (-1 !== window.location.pathname.indexOf("/products/")) {
                    const t = decodeURIComponent(window.location.pathname).match(/\/products\/([a-z0-9\-]|[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|[\u203B]|[\w\u0430-\u044f]|[\u0400-\u04FF]|[\u0900-\u097F]|[\u0590-\u05FF\u200f\u200e]|[\u0621-\u064A\u0660-\u0669 ])+/)[0].split("/products/")[1]
                      , s = i.indexOf(t);
                    -1 === s ? (i.unshift(t),
                    i = i.splice(0, e.howManyToStoreInMemory)) : (i.splice(s, 1),
                    i.unshift(t)),
                    r.write(i)
                }
            },
            hasProducts: r.read().length > 0
        }
    }();
    const getUrlString = (e,t=[],s=!1)=>{
        const i = Object.keys(e).map((i=>{
            let o = e[i];
            if ("[object Object]" === Object.prototype.toString.call(o) || Array.isArray(o))
                return Array.isArray(e) ? t.push("") : t.push(i),
                getUrlString(o, t, Array.isArray(o));
            {
                let e = i;
                if (t.length > 0) {
                    e = (s ? t : [...t, i]).reduce(((e,t)=>"" === e ? t : `${e}[${t}]`), "")
                }
                return s ? `${e}[]=${o}` : `${e}=${o}`
            }
        }
        )).join("&");
        return t.pop(),
        i
    }
      , hideElement = e=>{
        e && (e.style.display = "none")
    }
      , fadeIn = (e,t,s=null)=>{
        e.style.opacity = 0,
        e.style.display = t || "block",
        function t() {
            let i = parseFloat(e.style.opacity);
            (i += .1) > 1 || (e.style.opacity = i,
            requestAnimationFrame(t)),
            1 === i && "function" == typeof s && s()
        }()
    }
    ;
    function forceFocus(e, t) {
        t = t || {};
        var s = e.tabIndex;
        e.tabIndex = -1,
        e.dataset.tabIndex = s,
        e.focus(),
        void 0 !== t.className && e.classList.add(t.className),
        e.addEventListener("blur", (function i(o) {
            o.target.removeEventListener(o.type, i),
            e.tabIndex = s,
            delete e.dataset.tabIndex,
            void 0 !== t.className && e.classList.remove(t.className)
        }
        ))
    }
    function focusHash(e) {
        e = e || {};
        var t = window.location.hash
          , s = document.getElementById(t.slice(1));
        if (s && e.ignore && s.matches(e.ignore))
            return !1;
        t && s && forceFocus(s, e)
    }
    function bindInPageLinks(e) {
        return e = e || {},
        Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).filter((function(t) {
            if ("#" === t.hash || "" === t.hash)
                return !1;
            if (e.ignore && t.matches(e.ignore))
                return !1;
            if (s = t.hash.substr(1),
            null === document.getElementById(s))
                return !1;
            var s, i = document.querySelector(t.hash);
            return !!i && (t.addEventListener("click", (function() {
                forceFocus(i, e)
            }
            )),
            !0)
        }
        ))
    }
    function focusable(e) {
        return Array.prototype.slice.call(e.querySelectorAll("[tabindex],[draggable],a[href],area,button:enabled,input:not([type=hidden]):enabled,object,select:enabled,textarea:enabled")).filter((function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
        ))
    }
    void 0 === Shopify.Cart && (Shopify.Cart = {}),
    Shopify.Cart.ShippingCalculator = function() {
        const _config = {
            submitButton: theme.strings.shippingCalcSubmitButton,
            submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
            templateId: "shipping-calculator-response-template",
            wrapperId: "wrapper-response",
            customerIsLoggedIn: !1
        }
          , _render = function(e) {
            const t = document.querySelector(`#${_config.templateId}`)
              , s = document.querySelector(`#${_config.wrapperId}`);
            if (t && s) {
                s.innerHTML = "";
                let i = ""
                  , o = ""
                  , r = "error center"
                  , a = t.innerHTML;
                const n = /[^[\]]+(?=])/g;
                if (e.rates && e.rates.length) {
                    let t = n.exec(a)[0];
                    e.rates.forEach((e=>{
                        let s = t;
                        s = s.replace(/\|\|rateName\|\|/, e.name),
                        s = s.replace(/\|\|ratePrice\|\|/, Shopify.Cart.ShippingCalculator.formatRate(e.price)),
                        i += s
                    }
                    ))
                }
                if (e.success) {
                    r = "success center";
                    const s = document.createElement("div");
                    s.innerHTML = t.innerHTML;
                    const i = s.querySelector("[data-template-no-shipping]");
                    e.rates.length < 1 && i && (o = i.getAttribute("data-template-no-shipping"))
                } else
                    o = e.errorFeedback;
                a = a.replace(n, "").replace("[]", ""),
                a = a.replace(/\|\|ratesList\|\|/g, i),
                a = a.replace(/\|\|successClass\|\|/g, r),
                a = a.replace(/\|\|ratesText\|\|/g, o),
                s.innerHTML += a
            }
        }
          , _enableButtons = function() {
            const e = document.querySelector(".get-rates");
            e.removeAttribute("disabled"),
            e.classList.remove("disabled"),
            e.value = _config.submitButton
        }
          , _disableButtons = function() {
            const e = document.querySelector(".get-rates");
            e.setAttribute("disabled", "disabled"),
            e.classList.add("disabled"),
            e.value = _config.submitButtonDisabled
        }
          , _getCartShippingRatesForDestination = function(e) {
            const t = encodeURI(getUrlString({
                shipping_address: e
            }))
              , s = `${window.theme.routes.cart}/shipping_rates.json?${t}`
              , i = new XMLHttpRequest;
            i.open("GET", s, !0),
            i.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    const t = JSON.parse(this.response).shipping_rates;
                    _onCartShippingRatesUpdate(t, e)
                } else
                    _onError(this)
            }
            ,
            i.onerror = function() {
                _onError(this)
            }
            ,
            i.send()
        }
          , _fullMessagesFromErrors = function(e) {
            const t = [];
            for (const s in e)
                for (const i of e[s])
                    t.push(s + " " + i);
            return t
        }
          , _onError = function(XMLHttpRequest) {
            hideElement(document.querySelector("#estimated-shipping"));
            const shippingChild = document.querySelector("#estimated-shipping em");
            if (shippingChild)
                for (; shippingChild.firstChild; )
                    shippingChild.removeChild(shippingChild.firstChild);
            _enableButtons();
            let feedback = "";
            const data = eval("(" + XMLHttpRequest.responseText + ")");
            feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + _fullMessagesFromErrors(data).join("; "),
            "Error : country is not supported." === feedback && (feedback = "We do not ship to this destination."),
            _render({
                rates: [],
                errorFeedback: feedback,
                success: !1
            }),
            showElement(document.querySelector(`#${_config.wrapperId}`))
        }
          , _onCartShippingRatesUpdate = function(e, t) {
            _enableButtons();
            let s = "";
            t.zip && (s += t.zip + ", "),
            t.province && (s += t.province + ", "),
            s += t.country;
            const i = document.querySelector("#estimated-shipping em");
            e.length && i && ("0.00" == e[0].price ? i.textContent = "FREE" : i.textContent = themeCurrency.formatMoney(e[0].price, theme.moneyFormat)),
            _render({
                rates: e,
                address: s,
                success: !0
            });
            const o = document.querySelectorAll(`#${_config.wrapperId}, #estimated-shipping`);
            o.length && o.forEach((e=>{
                fadeIn(e)
            }
            ))
        }
          , _init = function() {
            const e = document.querySelector(".get-rates")
              , t = document.querySelector("#address_container")
              , s = document.querySelector("#address_country")
              , i = document.querySelector("#address_province")
              , o = document.querySelector("html");
            let r = "en";
            if (o.hasAttribute("lang") && "" !== o.getAttribute("lang") && (r = o.getAttribute("lang")),
            t && themeAddresses.AddressForm(t, r, {
                shippingCountriesOnly: !0
            }),
            s && s.hasAttribute("data-default") && i && i.hasAttribute("data-default") && s.addEventListener("change", (function() {
                s.removeAttribute("data-default"),
                i.removeAttribute("data-default")
            }
            )),
            e && (e.addEventListener("click", (function(e) {
                _disableButtons();
                const t = document.querySelector(`#${_config.wrapperId}`);
                for (; t.firstChild; )
                    t.removeChild(t.firstChild);
                hideElement(t);
                const o = {};
                let r = s.value
                  , a = i.value;
                const n = s.getAttribute("data-default-fullname");
                "" === r && n && "" !== n && (r = n);
                const l = i.getAttribute("data-default-fullname");
                "" === a && l && "" !== l && (a = l),
                o.zip = document.querySelector("#address_zip").value || "",
                o.country = r || "",
                o.province = a || "",
                _getCartShippingRatesForDestination(o)
            }
            )),
            _config.customerIsLoggedIn && e.classList.contains("get-rates--trigger"))) {
                const t = document.querySelector("#address_zip");
                t && t.value && e.dispatchEvent(new Event("click"))
            }
        };
        return {
            show: function(e) {
                e = e || {},
                Object.assign(_config, e),
                document.addEventListener("DOMContentLoaded", (function() {
                    _init()
                }
                ))
            },
            getConfig: function() {
                return _config
            },
            formatRate: function(e) {
                return themeCurrency.formatMoney(e, theme.moneyFormat)
            }
        }
    }();
    var trapFocusHandlers = {};
    function trapFocus(e, t) {
        t = t || {};
        var s = focusable(e)
          , i = t.elementToFocus || e
          , o = s[0]
          , r = s[s.length - 1];
        removeTrapFocus(),
        trapFocusHandlers.focusin = function(t) {
            e === t.target || e.contains(t.target) || o.focus(),
            t.target !== e && t.target !== r && t.target !== o || document.addEventListener("keydown", trapFocusHandlers.keydown)
        }
        ,
        trapFocusHandlers.focusout = function() {
            document.removeEventListener("keydown", trapFocusHandlers.keydown)
        }
        ,
        trapFocusHandlers.keydown = function(t) {
            9 === t.keyCode && (t.target !== r || t.shiftKey || (t.preventDefault(),
            o.focus()),
            t.target !== e && t.target !== o || !t.shiftKey || (t.preventDefault(),
            r.focus()))
        }
        ,
        document.addEventListener("focusout", trapFocusHandlers.focusout),
        document.addEventListener("focusin", trapFocusHandlers.focusin),
        forceFocus(i, t)
    }
    function removeTrapFocus() {
        document.removeEventListener("focusin", trapFocusHandlers.focusin),
        document.removeEventListener("focusout", trapFocusHandlers.focusout),
        document.removeEventListener("keydown", trapFocusHandlers.keydown)
    }
    function accessibleLinks(e, t) {
        if ("string" != typeof e)
            throw new TypeError(e + " is not a String.");
        if (0 !== (e = document.querySelectorAll(e)).length) {
            (t = t || {}).messages = t.messages || {};
            var s = {
                newWindow: t.messages.newWindow || "Opens in a new window.",
                external: t.messages.external || "Opens external website.",
                newWindowExternal: t.messages.newWindowExternal || "Opens external website in a new window."
            }
              , i = t.prefix || "a11y"
              , o = {
                newWindow: i + "-new-window-message",
                external: i + "-external-message",
                newWindowExternal: i + "-new-window-external-message"
            };
            e.forEach((function(e) {
                var t = e.getAttribute("target")
                  , s = e.getAttribute("rel")
                  , i = function(e) {
                    return e.hostname !== window.location.hostname
                }(e)
                  , r = "_blank" === t
                  , a = null === s || -1 === s.indexOf("noopener");
                if (r && a) {
                    var n = null === s ? "noopener" : s + " noopener";
                    e.setAttribute("rel", n)
                }
                i && r ? e.setAttribute("aria-describedby", o.newWindowExternal) : i ? e.setAttribute("aria-describedby", o.external) : r && e.setAttribute("aria-describedby", o.newWindow)
            }
            )),
            function(e) {
                var t = document.createElement("ul")
                  , s = Object.keys(e).reduce((function(t, s) {
                    return t + "<li id=" + o[s] + ">" + e[s] + "</li>"
                }
                ), "");
                t.setAttribute("hidden", !0),
                t.innerHTML = s,
                document.body.appendChild(t)
            }(s)
        }
    }
    var a11y = Object.freeze({
        __proto__: null,
        forceFocus: forceFocus,
        focusHash: focusHash,
        bindInPageLinks: bindInPageLinks,
        focusable: focusable,
        trapFocus: trapFocus,
        removeTrapFocus: removeTrapFocus,
        accessibleLinks: accessibleLinks
    });
    const slideDown = (e,t=500,s=!0)=>{
        let i = window.getComputedStyle(e).display;
        if (s && "none" !== i)
            return;
        e.style.removeProperty("display"),
        "none" === i && (i = "block"),
        e.style.display = i;
        let o = e.offsetHeight;
        e.style.overflow = "hidden",
        e.style.height = 0,
        e.style.paddingTop = 0,
        e.style.paddingBottom = 0,
        e.style.marginTop = 0,
        e.style.marginBottom = 0,
        e.offsetHeight,
        e.style.boxSizing = "border-box",
        e.style.transitionProperty = "height, margin, padding",
        e.style.transitionDuration = t + "ms",
        e.style.height = o + "px",
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        window.setTimeout((()=>{
            e.style.removeProperty("height"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property")
        }
        ), t)
    }
      , slideUp = (e,t=500)=>{
        e.style.transitionProperty = "height, margin, padding",
        e.style.transitionDuration = t + "ms",
        e.style.boxSizing = "border-box",
        e.style.height = e.offsetHeight + "px",
        e.offsetHeight,
        e.style.overflow = "hidden",
        e.style.height = 0,
        e.style.paddingTop = 0,
        e.style.paddingBottom = 0,
        e.style.marginTop = 0,
        e.style.marginBottom = 0,
        window.setTimeout((()=>{
            e.style.display = "none",
            e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property")
        }
        ), t)
    }
      , slideToggle = (e,t=500)=>"none" === window.getComputedStyle(e).display ? slideDown(e, t) : slideUp(e, t);
    function FetchError(e) {
        this.status = e.status || null,
        this.headers = e.headers || null,
        this.json = e.json || null,
        this.body = e.body || null
    }
    function fetchProduct(e) {
        const t = `${window.theme.routes.root}products/${e}.js`;
        return window.fetch(t).then((e=>e.json())).catch((e=>{
            console.error(e)
        }
        ))
    }
    FetchError.prototype = Error.prototype;
    const selectors = {
        saleClass: "sale",
        soldClass: "sold-out",
        doubleImage: "double__image"
    };
    function formatPrices(e) {
        const t = e.price <= e.compare_at_price_min;
        let s = t ? selectors.saleClass : "";
        if (s += e.available ? "" : selectors.soldClass,
        e.price = themeCurrency.formatMoney(e.price, theme.moneyFormat),
        e.price_with_from = e.price,
        e.price_varies) {
            let t = themeCurrency.formatMoney(e.price_min, theme.moneyFormat);
            e.price_with_from = `<small>${window.theme.strings.from}</small> ${t}`
        }
        let i = "";
        void 0 !== e.media && e.media.length > 1 && (i += selectors.doubleImage);
        return {
            ...e,
            classes: s,
            on_sale: t,
            double_class: i,
            sold_out: !e.available,
            sold_out_translation: window.theme.strings.soldOut,
            compare_at_price: themeCurrency.formatMoney(e.compare_at_price, theme.moneyFormat),
            compare_at_price_max: themeCurrency.formatMoney(e.compare_at_price_max, theme.moneyFormat),
            compare_at_price_min: themeCurrency.formatMoney(e.compare_at_price_min, theme.moneyFormat),
            price_max: themeCurrency.formatMoney(e.price_max, theme.moneyFormat),
            price_min: themeCurrency.formatMoney(e.price_min, theme.moneyFormat),
            unit_price: themeCurrency.formatMoney(e.unit_price, theme.moneyFormat)
        }
    }
    const selectors$1 = {
        template: "[pair-product-template]",
        pairProducts: "[data-pair-products]",
        upsellButton: "[data-upsell-btn]",
        upsellButtonText: "[data-upsell-btn-text]"
    };
    class PairWithProduct {
        constructor(e) {
            this.handle = e,
            this.document = document,
            this.template = this.document.querySelector(selectors$1.template).innerHTML,
            this.pairProducts = this.document.querySelector(selectors$1.pairProducts),
            this.pairProductHolder = this.document.querySelector(selectors$1.pairProductsHolder),
            this.resizeEventUpsell = ()=>this.calcUpsellButtonDemensions(),
            this.variant = null,
            this.variantObject = null,
            this.init()
        }
        init() {
            if (this.handle.includes("_")) {
                const e = this.handle.split("_");
                this.handle = e[0],
                this.variant = e[1]
            }
            fetchProduct(this.handle).then((e=>{
                if (void 0 === e)
                    return void this.document.dispatchEvent(new CustomEvent("upsell-product-error"));
                const t = formatPrices(e);
                let s = !1;
                null !== this.variant && t.variants.filter((e=>(e.id === Number(this.variant) && e.available && (this.variantObject = e,
                s = !0),
                e))),
                t.available && null === this.variant || s ? this.renderPairProduct(t) : (this.pairProducts.innerHTML = "",
                this.document.dispatchEvent(new CustomEvent("upsell-unavailable")))
            }
            )).catch((e=>{
                console.error(e)
            }
            ))
        }
        renderPairProduct(e) {
            const t = this.renderProduct(e);
            this.pairProducts.innerHTML = t,
            this.upsellButtonDemensions()
        }
        upsellButtonDemensions() {
            this.calcUpsellButtonDemensions(),
            document.addEventListener("theme:resize", this.resizeEventUpsell)
        }
        calcUpsellButtonDemensions() {
            const e = this.pairProducts.querySelector(selectors$1.upsellButtonText)
              , t = this.pairProducts.querySelector(selectors$1.upsellButton);
            e && t.style.setProperty("--btn-text-width", `${e.clientWidth}px`)
        }
        renderProduct(e) {
            let t = null
              , s = ""
              , i = ""
              , o = !0
              , r = !1;
            if (void 0 !== e.media && (t = e.media[0]),
            null !== this.variantObject && void 0 !== this.variantObject.featured_media && (t = this.variantObject.featured_media),
            s = t ? {
                thumb: themeImages.getSizedImageUrl(t.preview_image.src, "480x480")
            } : {
                thumb: window.theme.assets.no_image
            },
            "Title" === e.options[0].name && 1 === e.options.length && "Default Title" === e.options[0].values[0] && (o = !1),
            null === this.variantObject)
                for (let t = 0; t < e.variants.length; t++) {
                    const s = e.variants[t];
                    if (s.available) {
                        const e = s.title.replaceAll("/", "<span>&nbsp;</span>");
                        r = void 0 !== s.unit_price;
                        i = {
                            ...formatPrices(s),
                            title: e,
                            hasUnitPrice: r
                        };
                        break
                    }
                }
            if (null !== this.variantObject) {
                const e = this.variantObject.title.replaceAll("/", "<span>&nbsp;</span>");
                r = void 0 !== this.variantObject.unit_price;
                i = {
                    ...formatPrices(this.variantObject),
                    title: e,
                    hasUnitPrice: r
                }
            }
            if ("" === i)
                return "";
            const a = e.title.replace(/(<([^>]+)>)/gi, "");
            i.unit_price_measurement && (i.unitValue = i.unit_price_measurement.reference_unit,
            1 !== i.unit_price_measurement.reference_value && (i.unitCount = i.unit_price_measurement.reference_value));
            const n = {
                ...e,
                title: a,
                image: s,
                firstAvailableVariant: i,
                hasVariants: o,
                addToCartText: theme.strings.upsellAddToCart,
                unitPriceLabel: theme.strings.unitPrice,
                unitPriceSeparator: theme.strings.unitPriceSeparator
            };
            return Sqrl.render(this.template, {
                product: n
            })
        }
    }
    const selectors$2 = {
        quantityHolder: "[data-quantity-holder]",
        quantityField: "[data-quantity-field]",
        quantityButton: "[data-quantity-button]",
        quantityMinusButton: "[data-quantity-minus]",
        quantityPlusButton: "[data-quantity-plus]",
        quantityReadOnly: "read-only",
        isDisabled: "is-disabled"
    };
    class QuantityCounter {
        constructor(e, t=!1) {
            this.holder = e,
            this.quantityUpdateCart = t
        }
        init() {
            this.settings = selectors$2,
            this.quantity = this.holder.querySelector(this.settings.quantityHolder),
            this.quantity && (this.field = this.quantity.querySelector(this.settings.quantityField),
            this.buttons = this.quantity.querySelectorAll(this.settings.quantityButton),
            this.increaseButton = this.quantity.querySelector(this.settings.quantityPlusButton),
            this.quantityValue = Number(this.field.value || 0),
            this.cartItemID = this.field.getAttribute("data-id"),
            this.maxValue = Number(this.field.getAttribute("max")) > 0 ? Number(this.field.getAttribute("max")) : null,
            this.minValue = Number(this.field.getAttribute("min")) > 0 ? Number(this.field.getAttribute("min")) : 0,
            this.disableIncrease = this.disableIncrease.bind(this),
            this.emptyField = !1,
            this.updateQuantity = this.updateQuantity.bind(this),
            this.decrease = this.decrease.bind(this),
            this.increase = this.increase.bind(this),
            this.disableIncrease(),
            this.quantity.classList.contains(this.settings.quantityReadOnly) || (this.changeValueOnClick(),
            this.changeValueOnInput()))
        }
        changeValueOnClick() {
            const e = this;
            this.buttons.forEach((t=>{
                t.addEventListener("click", (t=>{
                    t.preventDefault();
                    const s = t.target
                      , i = s.matches(e.settings.quantityMinusButton) || s.closest(e.settings.quantityMinusButton)
                      , o = s.matches(e.settings.quantityPlusButton) || s.closest(e.settings.quantityPlusButton);
                    i && e.decrease(),
                    o && e.increase(),
                    e.updateQuantity()
                }
                ))
            }
            ))
        }
        changeValueOnInput() {
            const e = this;
            this.field.addEventListener("input", (function() {
                e.quantityValue = this.value,
                "" === this.value && (e.emptyField = !0),
                e.updateQuantity()
            }
            ), this)
        }
        updateQuantity() {
            this.maxValue < this.quantityValue && null !== this.maxValue && (this.quantityValue = this.maxValue),
            this.minValue > this.quantityValue && (this.quantityValue = this.minValue),
            this.field.value = this.quantityValue,
            this.disableIncrease(),
            document.dispatchEvent(new CustomEvent("popout:updateValue")),
            this.quantityUpdateCart && this.updateCart()
        }
        decrease() {
            this.quantityValue > this.minValue ? this.quantityValue-- : this.quantityValue = 0
        }
        increase() {
            this.quantityValue++
        }
        disableIncrease() {
            this.increaseButton.classList.toggle(this.settings.isDisabled, this.quantityValue >= this.maxValue && null !== this.maxValue)
        }
        updateCart() {
            const e = new CustomEvent("update-cart",{
                bubbles: !0,
                detail: {
                    id: this.cartItemID,
                    quantity: this.quantityValue,
                    valueIsEmpty: this.emptyField
                }
            });
            this.holder.dispatchEvent(e)
        }
    }
    const settings = {
        cartDrawerEnabled: window.theme.cartDrawerEnabled,
        times: {
            timeoutAddProduct: 1e3,
            closeDropdownAfter: 5e3
        },
        classes: {
            hidden: "is-hidden",
            added: "is-added",
            htmlClasses: "has-open-cart-dropdown",
            open: "is-open",
            active: "is-active",
            visible: "is-visible",
            loading: "is-loading",
            disabled: "is-disabled",
            success: "is-success",
            error: "has-error",
            headerStuck: "js__header__stuck",
            drawerVisible: "drawer--visible"
        },
        attributes: {
            transparent: "data-header-transparent",
            upsellButton: "data-upsell-btn"
        },
        elements: {
            html: "html",
            outerSection: "[data-section-id]",
            cartDropdown: "[data-cart-dropdown]",
            cartDropdownBody: "[data-cart-dropdown-body]",
            emptyMessage: "[data-empty-message]",
            buttonHolder: "[data-foot-holder]",
            itemsHolder: "[data-items-holder]",
            item: "[data-item]",
            cartToggleElement: "[data-cart-toggle]",
            cartItemRemove: "[data-item-remove]",
            cartCount: "[data-cart-count]",
            cartCountValue: "data-cart-count",
            clickedElementForExpanding: "[data-expand-button]",
            cartWidget: "[data-cart-widget]",
            cartTotal: "[data-cart-total]",
            cartMessage: "[data-cart-message]",
            cartMessageValue: "data-cart-message",
            buttonAddToCart: "[data-add-to-cart]",
            formErrorsContainer: "[data-cart-errors-container]",
            cartErrors: "[data-cart-errors]",
            cartCloseError: "[data-cart-error-close]",
            formCloseError: "[data-close-error]",
            quickAddHolder: "[data-quick-add-holder]",
            cartProgress: "[data-cart-progress]",
            cartOriginalTotal: "[data-cart-original-total]",
            cartOriginaTotalPrice: "[data-cart-original-total-price]",
            cartDiscountsHolder: "[data-cart-discounts-holder]",
            headerWrapper: "[data-header-wrapper]",
            burgerButton: "[data-drawer-toggle]",
            upsellHolder: "[data-upsell-holder]",
            errorMessage: "[data-error-message]",
            navDrawer: "[data-drawer]",
            pairProductsHolder: "[data-pair-products-holder]",
            pairProducts: "[data-pair-products]",
            buttonSkipPairProduct: "[data-skip-pair-product]",
            productIDAttribute: "data-product-id",
            leftToSpend: "[data-left-to-spend]"
        },
        formatMoney: theme.moneyFormat,
        cartTotalDiscountsTemplate: "[data-cart-total-discount]"
    };
    class CartDrawer {
        constructor() {
            "/password" !== window.location.pathname && this.init()
        }
        init() {
            this.settings = settings,
            this.document = document,
            this.html = this.document.querySelector(this.settings.elements.html),
            this.cartDropdown = this.document.querySelector(this.settings.elements.cartDropdown),
            this.cartDropdownBody = this.document.querySelector(this.settings.elements.cartDropdownBody),
            this.emptyMessage = this.document.querySelector(this.settings.elements.emptyMessage),
            this.buttonHolder = this.document.querySelector(this.settings.elements.buttonHolder),
            this.itemsHolder = this.document.querySelector(this.settings.elements.itemsHolder),
            this.items = this.document.querySelectorAll(this.settings.elements.item),
            this.counterHolders = this.document.querySelectorAll(this.settings.elements.cartCount),
            this.cartTotal = this.document.querySelector(this.settings.elements.cartTotal),
            this.cartMessage = this.document.querySelectorAll(this.settings.elements.cartMessage),
            this.cartOriginalTotal = this.document.querySelector(this.settings.elements.cartOriginalTotal),
            this.cartOriginaTotalPrice = this.document.querySelector(this.settings.elements.cartOriginaTotalPrice),
            this.cartDiscountHolder = this.document.querySelector(this.settings.elements.cartDiscountsHolder),
            this.clickedElementForExpanding = this.document.querySelectorAll(this.settings.elements.clickedElementForExpanding),
            this.cartTotalDiscountTemplate = this.document.querySelector(this.settings.cartTotalDiscountsTemplate).innerHTML,
            this.cartErrorHolder = this.document.querySelector(this.settings.elements.cartErrors),
            this.cartCloseErrorMessage = this.document.querySelector(this.settings.elements.cartCloseError),
            this.headerWrapper = this.document.querySelector(this.settings.elements.headerWrapper),
            this.accessibility = a11y,
            this.navDrawer = this.document.querySelector(this.settings.elements.navDrawer),
            this.pairProductsHolder = this.document.querySelector(this.settings.elements.pairProductsHolder),
            this.pairProducts = this.document.querySelector(this.settings.elements.pairProducts),
            this.form = null,
            this.build = this.build.bind(this),
            this.addToCart = this.addToCart.bind(this),
            this.updateCart = this.updateCart.bind(this),
            this.openCartDropdown = this.openCartDropdown.bind(this),
            this.closeCartDropdown = this.closeCartDropdown.bind(this),
            this.toggleCartDropdown = this.toggleCartDropdown.bind(this),
            this.hasItemsInCart = this.hasItemsInCart.bind(this),
            this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this),
            this.cartDropdownIsBuilded = this.items.length > 0,
            this.totalItems = this.cartDropdownIsBuilded,
            this.cartDropdownIsOpen = !1,
            this.cartDiscounts = 0,
            this.cartDrawerEnabled = this.settings.cartDrawerEnabled,
            this.cartLimitErrorIsHidden = !0,
            this.eventToggleCart(),
            this.expandEvents(),
            this.cartEvents(),
            this.cartEventAdd(),
            this.initQuantity(),
            this.customEventAddProduct(),
            this.estimateShippingCalculator(),
            this.cartMessage.length > 0 && (this.cartFreeLimitShipping = 100 * Number(this.cartMessage[0].getAttribute("data-limit")),
            this.subtotal = 0,
            this.circumference = 28 * Math.PI,
            this.cartBarProgress()),
            this.pairWithArray = window.pairWithProducts,
            this.sessionStorage = window.sessionStorage,
            this.getEnablePairProducts(),
            this.renderPairProducts(),
            this.pairProductSkipEvent(),
            this.document.addEventListener("upsell-unavailable", (()=>{
                this.checkPairProductIsSoldOut()
            }
            ))
        }
        initQuantity() {
            this.items = this.document.querySelectorAll(this.settings.elements.item),
            this.items.forEach((e=>{
                new QuantityCounter(e,!0).init(),
                this.customEventsHandle(e)
            }
            ))
        }
        expandEvents() {
            const e = this.document.querySelectorAll(this.settings.elements.cartWidget);
            this.clickedElementForExpanding.forEach((t=>{
                t.addEventListener("click", (s=>{
                    s.preventDefault();
                    const i = this.document.querySelector(t.getAttribute("href"));
                    t.classList.toggle(this.settings.classes.active),
                    slideToggle(i, 400),
                    e.length > 1 && e.forEach((e=>{
                        if (e !== i.parentElement) {
                            const t = e.querySelector(this.settings.elements.clickedElementForExpanding);
                            t.classList.remove(this.settings.classes.active),
                            slideUp(t.nextElementSibling, 400)
                        }
                    }
                    ))
                }
                ))
            }
            ))
        }
        customEventsHandle(e) {
            e.addEventListener("update-cart", debounce((t=>{
                this.updateCart({
                    id: t.detail.id,
                    quantity: t.detail.quantity
                }, e, t.detail.valueIsEmpty)
            }
            ), 500))
        }
        customEventAddProduct() {
            this.html.addEventListener("cart:add-to-cart", debounce((e=>{
                this.addToCart(`id=${e.detail.data.id}`, e.detail)
            }
            ), 500))
        }
        cartEvents() {
            const e = this;
            this.document.querySelectorAll(e.settings.elements.cartItemRemove).forEach((t=>{
                t.addEventListener("click", (function(t) {
                    t.preventDefault(),
                    e.updateCart({
                        id: this.getAttribute("data-id"),
                        quantity: 0
                    })
                }
                ))
            }
            )),
            this.cartCloseErrorMessage && this.cartCloseErrorMessage.addEventListener("click", (e=>{
                e.preventDefault(),
                slideUp(this.cartErrorHolder, 400)
            }
            ))
        }
        cartEventAdd() {
            this.document.addEventListener("click", (e=>{
                const t = e.target;
                if (t.matches(this.settings.elements.buttonAddToCart) || t.closest(this.settings.elements.buttonAddToCart) && t) {
                    let s = ""
                      , i = t.matches(this.settings.elements.buttonAddToCart) ? t : t.closest(this.settings.elements.buttonAddToCart);
                    if (i.hasAttribute(this.settings.elements.productIDAttribute) ? s = `id=${Number(i.getAttribute(this.settings.elements.productIDAttribute))}` : (this.form = t.closest("form"),
                    s = new FormData(this.form),
                    s = new URLSearchParams(s).toString()),
                    null !== this.form && this.form.querySelector('[type="file"]'))
                        return;
                    if (e.preventDefault(),
                    t.hasAttribute("disabled") || t.parentNode.hasAttribute("disabled"))
                        return;
                    this.addToCart(s, null, i),
                    this.html.dispatchEvent(new CustomEvent("cart:add-item",{
                        bubbles: !0,
                        detail: {
                            selector: t
                        }
                    }))
                }
            }
            ))
        }
        estimateShippingCalculator() {
            Shopify.Cart.ShippingCalculator.show({
                submitButton: theme.strings.shippingCalcSubmitButton,
                submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
                customerIsLoggedIn: theme.customerLoggedIn,
                moneyFormat: theme.moneyWithCurrencyFormat
            })
        }
        getCart() {
            fetch("/cart.js").then(this.handleErrors).then((e=>e.json())).then((e=>(this.updateCounter(e.item_count),
            this.newTotalItems = e.items.length,
            this.buildTotalPrice(e),
            this.freeShippingMessageHandle(e.total_price),
            this.cartMessage.length > 0 && (this.subtotal = e.total_price,
            this.updateProgress()),
            fetch("/cart?section_id=api-cart-items")))).then((e=>e.text())).then((e=>{
                const t = document.createElement("div");
                t.innerHTML = e,
                t.querySelector("script") ? this.pairWithArray = JSON.parse(t.querySelector("script").innerText.split("=")[1].replace(";", "")) : this.pairWithArray = void 0,
                this.getEnablePairProducts(),
                this.renderPairProducts();
                const s = t.querySelector("[data-api-content]").innerHTML;
                this.build(s)
                if(window.BOLD && BOLD.common){
                  BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
                }
            }
            )).catch((e=>console.log(e)))
        }
        addToCart(e, t=null, s=null, i=null) {
            null === this.form && null !== t && t.label && (this.form = t.label.parentNode.querySelector("form")),
            this.cartDrawerEnabled && s && s.classList.add(this.settings.classes.loading),
            fetch("/cart/add.js", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: e
            }).then((e=>e.json())).then((e=>{
                s && s.setAttribute("disabled", "disabled"),
                e.status ? null !== t ? this.addToCartError(e, t.element, s) : this.addToCartError(e, null, s) : this.cartDrawerEnabled ? (null !== t && t.label && (t.label.classList.remove(this.settings.classes.hidden, this.settings.classes.loading),
                t.label.classList.add(this.settings.classes.added)),
                this.getCart(),
                setTimeout((()=>{
                    null !== s && (s.classList.remove(this.settings.classes.loading),
                    s.removeAttribute("disabled"),
                    s.classList.add(this.settings.classes.success),
                    document.dispatchEvent(new CustomEvent("product:bar:button",{
                        bubbles: !1
                    })),
                    s.closest(this.settings.elements.pairProductsHolder) && setTimeout((()=>{
                        s.classList.remove(this.settings.classes.success)
                    }
                    ), 2 * this.settings.times.timeoutAddProduct)),
                    this.cartDropdown && (this.openCartDropdown(),
                    this.cartDropdownIsOpen = !0)
                }
                ), this.settings.times.timeoutAddProduct)) : window.location = theme.routes.cart
                if(window.BOLD && BOLD.common){
                  BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
                }
            }
            )).catch((e=>console.log(e)))
        }
        updateCart(e={}, t=null, s=!1) {
            let i = null
              , o = null
              , r = null
              , a = e.quantity;
            null !== t && t.closest(this.settings.elements.item).classList.add(this.settings.classes.loading),
            this.items.forEach((e=>{
                e.classList.add(this.settings.classes.disabled),
                e.querySelector("input").blur()
            }
            )),
            fetch("/cart.js").then(this.handleErrors).then((e=>e.json())).then((t=>{
                const s = t.items.findIndex((t=>t.key === e.id));
                o = t.item_count,
                r = t.items[s].title;
                const i = {
                    line: `${s + 1}`,
                    quantity: a
                };
                return fetch("/cart/change.js", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(i)
                })
            }
            )).then(this.handleErrors).then((e=>e.json())).then((e=>{
                i = e.item_count,
                s && (a = 1),
                0 !== a && (this.cartLimitErrorIsHidden = i !== o,
                this.toggleLimitError(r)),
                this.updateCounter(i),
                this.buildTotalPrice(e),
                this.freeShippingMessageHandle(e.total_price),
                this.cartDiscounts = e.total_discount,
                this.cartMessage.length > 0 && (this.subtotal = e.total_price,
                this.updateProgress()),
                this.getCart()
            }
            )).catch((e=>console.log(e)))
        }
        toggleLimitError(e) {
            this.cartErrorHolder.querySelector(this.settings.elements.errorMessage).innerText = e,
            this.cartLimitErrorIsHidden ? slideUp(this.cartErrorHolder, 400) : slideDown(this.cartErrorHolder, 400)
        }
        handleErrors(e) {
            return e.ok ? e : e.json().then((function(t) {
                throw new FetchError({
                    status: e.statusText,
                    headers: e.headers,
                    json: t
                })
            }
            ))
        }
        addToCartError(e, t, s) {
            this.cartDrawerEnabled && s && null !== s.closest(this.settings.elements.cartDropdown) && !s.closest(this.settings.elements.cartDropdown) && this.closeCartDropdown();
            let i = s.closest(this.settings.elements.outerSection).querySelector(this.settings.elements.formErrorsContainer);
            if (null !== s) {
                const e = s.closest(this.settings.elements.upsellHolder);
                e && e.querySelector(this.settings.elements.formErrorsContainer) && (i = e.querySelector(this.settings.elements.formErrorsContainer)),
                s.classList.remove(this.settings.classes.loading),
                s.removeAttribute("disabled"),
                document.dispatchEvent(new CustomEvent("product:bar:button",{
                    bubbles: !1
                }))
            }
            i && (i.innerHTML = `<div class="errors">${e.message}: ${e.description}<span class="errors__close" data-close-error><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close-thin" viewBox="0 0 27 27"><g stroke="#979797" fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M.5.5l26 26M26.5.5l-26 26"></path></g></svg></span></div>`,
            i.classList.add(this.settings.classes.visible),
            document.dispatchEvent(new CustomEvent("product:bar:error",{
                bubbles: !1
            }))),
            t && this.html.dispatchEvent(new CustomEvent("cart:add-to-error",{
                bubbles: !0,
                detail: {
                    message: e.message,
                    description: e.description,
                    holder: t
                }
            })),
            this.document.addEventListener("click", (e=>{
                const t = e.target;
                (t.matches(this.settings.elements.formCloseError) || t.closest(this.settings.elements.formCloseError)) && (e.preventDefault(),
                i.classList.remove(this.settings.classes.visible))
            }
            ))
        }
        openCartDropdown() {
            document.dispatchEvent(new CustomEvent("theme:drawer:close",{
                bubbles: !1
            })),
            document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: this.cartDropdown
            })),
            document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: this.cartDropdownBody
            })),
            this.html.classList.add(this.settings.classes.htmlClasses),
            this.cartDropdown.classList.add(this.settings.classes.open),
            this.accessibility.removeTrapFocus(),
            this.accessibility.trapFocus(this.cartDropdown, {
                elementToFocus: this.cartDropdown.querySelector("a:first-child, input:first-child")
            }),
            this.cartDropdownIsBuilded || this.getCart()
        }
        closeCartDropdown() {
            if (this.document.dispatchEvent(new CustomEvent("theme:cart-close",{
                bubbles: !0
            })),
            this.accessibility.removeTrapFocus(),
            slideUp(this.cartErrorHolder, 400),
            this.html.classList.contains("is-focused")) {
                const e = this.document.querySelector(`${this.settings.elements.cartToggleElement}[data-focus-element]`);
                setTimeout((()=>{
                    e.focus()
                }
                ), 200)
            }
            const e = this.document.querySelector(`[${this.settings.attributes.upsellButton}].${this.settings.classes.success}`);
            e && setTimeout((()=>{
                e.classList.remove(this.settings.classes.success)
            }
            ), 2e3),
            this.html.classList.remove(this.settings.classes.htmlClasses),
            this.cartDropdown.classList.remove(this.settings.classes.open),
            document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0
            }))
        }
        toggleCartDropdown() {
            this.cartDropdownIsOpen = !this.cartDropdownIsOpen,
            this.cartDropdownIsOpen ? this.openCartDropdown() : this.closeCartDropdown()
        }
        eventToggleCart() {
            this.document.addEventListener("click", (e=>{
                const t = e.target
                  , s = !(t.matches(this.settings.elements.cartToggleElement) || t.closest(this.settings.elements.cartToggleElement))
                  , i = !(t.matches(this.settings.elements.cartDropdown) || t.closest(this.settings.elements.cartDropdown))
                  , o = !(t.matches(this.settings.elements.buttonSkipPairProduct) || t.closest(this.settings.elements.buttonSkipPairProduct));
                t.matches(this.settings.elements.cartToggleElement) || t.closest(this.settings.elements.cartToggleElement) ? (e.preventDefault(),
                this.toggleCartDropdown()) : this.cartDropdownIsOpen && s && i && o && (this.cartDropdownIsOpen = !1,
                this.closeCartDropdown())
            }
            ))
        }
        toggleClassesOnContainers() {
            const e = this;
            this.emptyMessage.classList.toggle(e.settings.classes.hidden, e.hasItemsInCart()),
            this.buttonHolder.classList.toggle(e.settings.classes.hidden, !e.hasItemsInCart()),
            this.itemsHolder.classList.toggle(e.settings.classes.hidden, !e.hasItemsInCart())
        }
        build(e) {
            this.totalItems !== this.newTotalItems && (this.totalItems = this.newTotalItems,
            this.toggleClassesOnContainers()),
            this.itemsHolder.innerHTML = e,
            this.cartEvents(),
            this.initQuantity()
        }
        updateCounter(e) {
            this.counterHolders.length && this.counterHolders.forEach((t=>{
                t.innerHTML = e,
                t.setAttribute(settings.elements.cartCountValue, e)
            }
            ))
        }
        hasItemsInCart() {
            return this.totalItems > 0
        }
        buildTotalPrice(e) {
            if (e.original_total_price > e.total_price && e.cart_level_discount_applications.length > 0 ? (this.cartOriginalTotal.classList.remove(this.settings.classes.hidden),
            this.cartOriginaTotalPrice.innerHTML = themeCurrency.formatMoney(e.original_total_price, this.settings.formatMoney)) : this.cartOriginalTotal.classList.add(this.settings.classes.hidden),
            this.cartTotal.innerHTML = themeCurrency.formatMoney(e.total_price, this.settings.formatMoney),
            e.cart_level_discount_applications.length > 0) {
                const t = this.buildCartTotalDiscounts(e.cart_level_discount_applications);
                this.cartDiscountHolder.classList.remove(this.settings.classes.hidden),
                this.cartDiscountHolder.innerHTML = t
            } else
                this.cartDiscountHolder.classList.add(this.settings.classes.hidden)
        }
        buildCartTotalDiscounts(e) {
            let t = "";
            return e.forEach((e=>{
                t += Sqrl.render(this.cartTotalDiscountTemplate, {
                    discountTitle: e.title,
                    discountTotalAllocatedAmount: themeCurrency.formatMoney(e.total_allocated_amount, this.settings.formatMoney)
                })
            }
            )),
            t
        }
        freeShippingMessageHandle(e) {
            this.cartMessage.length > 0 && this.document.querySelectorAll(this.settings.elements.cartMessage).forEach((t=>{
                const s = t.hasAttribute(this.settings.elements.cartMessageValue) && "true" === t.getAttribute(this.settings.elements.cartMessageValue) && 0 !== e ? this.settings.classes.success : this.settings.classes.hidden;
                t.classList.toggle(s, e >= this.cartFreeLimitShipping || 0 === e)
            }
            ))
        }
        cartBarProgress(e=null) {
            this.document.querySelectorAll(this.settings.elements.cartProgress).forEach((t=>{
                this.setProgress(t, null === e ? t.getAttribute("data-percent") : e)
            }
            ))
        }
        setProgress(e, t) {
            const s = this.circumference - t / 100 * this.circumference / 2;
            e.style.strokeDashoffset = s
        }
        updateProgress() {
            const e = this.subtotal / this.cartFreeLimitShipping * 100
              , t = themeCurrency.formatMoney(this.cartFreeLimitShipping - this.subtotal, this.settings.formatMoney);
            this.document.querySelectorAll(this.settings.elements.leftToSpend).forEach((e=>{
                e.innerHTML = t.replace(".00", "")
            }
            )),
            this.cartBarProgress(e > 100 ? 100 : e)
        }
        renderPairProducts() {
            null !== this.pairProductsHolder && (void 0 === this.pairWithArray || this.pairWithArray.length <= 0 ? this.pairProductsHolder.classList.add(this.settings.classes.hidden) : (new PairWithProduct(this.pairWithArray[0]),
            this.document.addEventListener("upsell-product-error", (()=>{
                this.checkPairProductIsSoldOut()
            }
            )),
            this.pairProductsHolder.classList.remove(this.settings.classes.hidden)))
        }
        getEnablePairProducts() {
            void 0 !== this.pairWithArray && void 0 !== this.sessionStorage && null !== this.sessionStorage.getItem("pair_products") && (this.pairWithArray = this.pairWithArray.filter((e=>-1 === this.sessionStorage.getItem("pair_products").indexOf(`,${e},`))))
        }
        pairProductSkipEvent() {
            null !== this.pairProductsHolder && this.pairProductsHolder.addEventListener("click", (e=>{
                const t = e.target;
                (t.matches(this.settings.elements.buttonSkipPairProduct) || t.closest(this.settings.elements.buttonSkipPairProduct)) && (e.preventDefault(),
                void 0 !== this.sessionStorage && this.sessionStorage.setItem("pair_products", null !== this.sessionStorage.getItem("pair_products") ? `${this.sessionStorage.getItem("pair_products")},${this.pairWithArray[0]},` : `,${this.pairWithArray[0]},`),
                this.getEnablePairProducts(),
                this.pairWithArray.length <= 0 ? this.pairProductsHolder.classList.add(this.settings.classes.hidden) : new PairWithProduct(this.pairWithArray[0]))
            }
            ))
        }
        checkPairProductIsSoldOut() {
            void 0 !== this.sessionStorage && (this.sessionStorage.setItem("pair_products", null !== this.sessionStorage.getItem("pair_products") ? `${this.sessionStorage.getItem("pair_products")},${this.pairWithArray[0]},` : `,${this.pairWithArray[0]},`),
            this.getEnablePairProducts(),
            this.pairWithArray.length <= 0 ? this.pairProductsHolder.classList.add(this.settings.classes.hidden) : this.renderPairProducts())
        }
    }
    window.cart = new CartDrawer;
    const settings$1 = {
        elements: {
            html: "html",
            body: "body",
            inPageLink: "[data-skip-content]",
            linkesWithOnlyHash: 'a[href="#"]',
            triggerFocusElement: "[data-focus-element]",
            cartDropdown: "#cart-dropdown",
            search: "#search-popdown",
            accordionContent: ".accordion-content",
            tabs: ".tabs",
            accordionDataToggle: "data-accordion-toggle",
            thumbData: "data-thumb-item"
        },
        classes: {
            focus: "is-focused",
            open: "is-open",
            accordionToggle: "accordion-toggle",
            tabLink: "tab-link"
        },
        keysCodes: {
            escapeCode: 27,
            tabCode: 9,
            enterCode: 13,
            spaceCode: 32
        }
    };
    class Accessibility {
        constructor() {
            this.init()
        }
        init() {
            this.settings = settings$1,
            this.window = window,
            this.document = document,
            this.a11y = a11y,
            this.cart = this.window.cart,
            this.inPageLink = this.document.querySelector(this.settings.elements.inPageLink),
            this.linkesWithOnlyHash = this.document.querySelectorAll(this.settings.elements.linkesWithOnlyHash),
            this.html = this.document.querySelector(this.settings.elements.html),
            this.body = this.document.querySelector(this.settings.elements.body),
            this.cartDropdown = this.document.querySelector(this.settings.elements.cartDropdown),
            this.lastFocused = null,
            this.isFocused = !1,
            this.a11y.focusHash(),
            this.a11y.bindInPageLinks(),
            this.clickEvents(),
            this.focusEvents(),
            this.focusEventsOff(),
            this.closeExpandedElements()
        }
        clickEvents() {
            this.inPageLink && this.inPageLink.addEventListener("click", (e=>{
                e.preventDefault()
            }
            )),
            this.linkesWithOnlyHash && this.linkesWithOnlyHash.forEach((e=>{
                e.addEventListener("click", (e=>{
                    e.preventDefault()
                }
                ))
            }
            ))
        }
        focusEvents() {
            this.document.addEventListener("keyup", (e=>{
                e.keyCode === this.settings.keysCodes.tabCode && (this.body.classList.add(this.settings.classes.focus),
                this.isFocused = !0)
            }
            )),
            this.document.addEventListener("keyup", (e=>{
                if (!this.isFocused)
                    return;
                const t = e.target
                  , s = e.keyCode === this.settings.keysCodes.enterCode || e.keyCode === this.settings.keysCodes.spaceCode
                  , i = t.matches(this.settings.elements.triggerFocusElement) || t.closest(this.settings.elements.triggerFocusElement)
                  , o = t.classList.contains(this.settings.classes.accordionToggle) || t.parentNode.classList.contains(this.settings.classes.accordionToggle) || t.hasAttribute(this.settings.elements.accordionDataToggle) || t.parentNode.hasAttribute(this.settings.elements.accordionDataToggle)
                  , r = t.classList.contains(this.settings.classes.tabLink) || t.parentNode.classList.contains(this.settings.classes.tabLink)
                  , a = t.hasAttribute(this.settings.elements.thumbData) || t.parentNode.hasAttribute(this.settings.elements.thumbData)
                  , n = t.hasAttribute("data-popdown-toggle") || t.closest(this.settings.elements.triggerFocusElement) && t.closest(this.settings.elements.triggerFocusElement).hasAttribute("data-popdown-toggle");
                if (a && t.click(),
                s && i) {
                    null === this.lastFocused && (this.lastFocused = t);
                    let e = this.document.querySelector(this.settings.elements.cartDropdown);
                    if (n && (e = this.document.querySelector(this.settings.elements.search)),
                    o && (e = t.nextElementSibling,
                    t.click()),
                    r) {
                        const s = `.tab-content-${t.getAttribute("data-tab")}`;
                        e = this.document.querySelector(s),
                        t.click()
                    }
                    e.querySelector("a, input") && this.a11y.trapFocus(e, {
                        elementToFocus: e.querySelector("a:first-child, input:first-child")
                    })
                }
            }
            )),
            this.html.addEventListener("cart:add-item", (e=>{
                this.lastFocused = e.detail.selector
            }
            ))
        }
        focusEventsOff() {
            this.document.addEventListener("mousedown", (()=>{
                this.body.classList.remove(this.settings.classes.focus),
                this.isFocused = !1
            }
            ))
        }
        closeExpandedElements() {
            document.addEventListener("keyup", (e=>{
                if (e.keyCode !== this.settings.keysCodes.escapeCode)
                    return;
                this.a11y.removeTrapFocus(),
                this.html.classList.contains(this.cart.settings.classes.htmlClasses) && (this.cart.toggleCartDropdown(),
                this.html.classList.remove(this.cart.settings.classes.htmlClasses),
                this.cartDropdown.classList.remove(this.cart.settings.classes.open));
                const t = document.querySelectorAll(this.settings.elements.accordionContent);
                if (t.length)
                    for (let e = 0; e < t.length; e++) {
                        if ("block" !== t[e].style.display)
                            continue;
                        t[e].previousElementSibling.classList.remove(this.settings.classes.open),
                        slideUp(t[e])
                    }
                null !== this.lastFocused && setTimeout((()=>{
                    this.lastFocused.focus(),
                    this.lastFocused = null
                }
                ), 600)
            }
            ))
        }
    }
    window.accessibility = new Accessibility,
    theme.ProductModel = function() {
        let e = {}
          , t = {}
          , s = {};
        const i = "[data-product-single-media-wrapper]"
          , o = "[data-product-slideshow]"
          , r = "[data-shopify-xr]"
          , a = "data-media-id"
          , n = "data-model-id"
          , l = "data-shopify-model3d-id"
          , c = "model-viewer"
          , d = "#ModelJson-"
          , h = "media--hidden";
        function u(t) {
            if (t)
                console.warn(t);
            else if (window.ShopifyXR) {
                for (const t in e)
                    if (e.hasOwnProperty(t)) {
                        const s = e[t];
                        if (s.loaded)
                            continue;
                        const i = document.querySelector(`${d}${t}`);
                        i && (window.ShopifyXR.addModels(JSON.parse(i.innerHTML)),
                        s.loaded = !0)
                    }
                window.ShopifyXR.setupXRElements()
            } else
                document.addEventListener("shopify_xr_initialized", (function() {
                    u()
                }
                ))
        }
        function p(e) {
            if (e)
                console.warn(e);
            else
                for (const e in t)
                    if (t.hasOwnProperty(e)) {
                        const s = t[e];
                        s.modelViewerUi || (s.modelViewerUi = new Shopify.ModelViewerUI(s.$element)),
                        m(s)
                    }
        }
        function m(e) {
            const t = s[e.sectionId];
            e.$container.addEventListener("mediaVisible", (function() {
                t.$element.setAttribute(l, e.modelId),
                g(e.mediaId),
                window.theme.touched || e.modelViewerUi.play()
            }
            )),
            e.$container.addEventListener("mediaHidden", (function() {
                t.$element.setAttribute(l, t.defaultId),
                e.modelViewerUi.pause()
            }
            )),
            e.$container.addEventListener("xrLaunch", (function() {
                e.modelViewerUi.pause()
            }
            )),
            e.$element.addEventListener("shopify_model_viewer_ui_toggle_play", (function() {
                g(e.mediaId)
            }
            ))
        }
        function g(e) {
            const t = `[${a}="${e}"]`
              , s = document.querySelector(`${i}${t}`)
              , o = document.querySelectorAll(`${i}:not(${t})`);
            s.classList.remove(h),
            o.length && o.forEach((e=>{
                e.dispatchEvent(new CustomEvent("mediaHidden")),
                e.classList.add(h)
            }
            ))
        }
        return {
            init: function(i, l) {
                e[l] = {
                    loaded: !1
                };
                const d = i.getAttribute(a)
                  , h = i.querySelector(c)
                  , m = h.getAttribute(n)
                  , g = i.closest(o).parentElement.querySelector(r);
                s[l] = {
                    $element: g,
                    defaultId: m
                },
                t[d] = {
                    modelId: m,
                    mediaId: d,
                    sectionId: l,
                    $container: i,
                    $element: h
                },
                window.Shopify.loadFeatures([{
                    name: "shopify-xr",
                    version: "1.0",
                    onLoad: u
                }, {
                    name: "model-viewer-ui",
                    version: "1.0",
                    onLoad: p
                }])
            },
            removeSectionModels: function(s) {
                for (const e in t)
                    if (t.hasOwnProperty(e)) {
                        t[e].sectionId === s && delete t[e]
                    }
                delete e[s],
                delete theme.mediaInstances[s]
            }
        }
    }();
    const selectors$3 = {
        templateAddresses: ".template-addresses",
        addressNewForm: "#AddressNewForm",
        btnNew: ".address-new-toggle",
        btnEdit: ".address-edit-toggle",
        btnDelete: ".address-delete",
        classHide: "hide",
        dataFormId: "data-form-id",
        dataConfirmMessage: "data-confirm-message",
        defaultConfirmMessage: "Are you sure you wish to delete this address?",
        editAddress: "#EditAddress",
        addressCountryNew: "AddressCountryNew",
        addressProvinceNew: "AddressProvinceNew",
        addressProvinceContainerNew: "AddressProvinceContainerNew",
        addressCountryOption: ".address-country-option",
        addressCountry: "AddressCountry",
        addressProvince: "AddressProvince",
        addressProvinceContainer: "AddressProvinceContainer"
    };
    class Addresses {
        constructor(e) {
            this.section = e,
            this.addressNewForm = this.section.querySelector(selectors$3.addressNewForm),
            this.init()
        }
        init() {
            if (this.addressNewForm) {
                const e = this.section
                  , t = this.addressNewForm;
                this.customerAddresses();
                const s = e.querySelectorAll(selectors$3.btnNew);
                s.length && s.forEach((e=>{
                    e.addEventListener("click", (function() {
                        t.classList.toggle(selectors$3.classHide)
                    }
                    ))
                }
                ));
                const i = e.querySelectorAll(selectors$3.btnEdit);
                i.length && i.forEach((t=>{
                    t.addEventListener("click", (function() {
                        const t = this.getAttribute(selectors$3.dataFormId);
                        e.querySelector(`${selectors$3.editAddress}_${t}`).classList.toggle(selectors$3.classHide)
                    }
                    ))
                }
                ));
                const o = e.querySelectorAll(selectors$3.btnDelete);
                o.length && o.forEach((e=>{
                    e.addEventListener("click", (function() {
                        const e = this.getAttribute(selectors$3.dataFormId)
                          , t = this.getAttribute(selectors$3.dataConfirmMessage);
                        confirm(t || selectors$3.defaultConfirmMessage) && Shopify.postLink("/account/addresses/" + e, {
                            parameters: {
                                _method: "delete"
                            }
                        })
                    }
                    ))
                }
                ))
            }
        }
        customerAddresses() {
            Shopify.CountryProvinceSelector && new Shopify.CountryProvinceSelector(selectors$3.addressCountryNew,selectors$3.addressProvinceNew,{
                hideElement: selectors$3.addressProvinceContainerNew
            });
            this.section.querySelectorAll(selectors$3.addressCountryOption).forEach((e=>{
                const t = e.getAttribute(selectors$3.dataFormId)
                  , s = `${selectors$3.addressCountry}_${t}`
                  , i = `${selectors$3.addressProvince}_${t}`
                  , o = `${selectors$3.addressProvinceContainer}_${t}`;
                new Shopify.CountryProvinceSelector(s,i,{
                    hideElement: o
                })
            }
            ))
        }
    }
    const template = document.querySelector(selectors$3.templateAddresses);
    template && new Addresses(template);
    const selectors$4 = {
        accountTemplateLogged: ".customer-logged-in",
        account: ".account",
        accountSidebarMobile: ".account-sidebar--mobile"
    };
    class Account {
        constructor(e) {
            this.section = e,
            this.init()
        }
        init() {
            this.section.querySelector(selectors$4.account) && this.accountMobileSidebar()
        }
        accountMobileSidebar() {
            this.section.querySelector(selectors$4.accountSidebarMobile).addEventListener("click", (function() {
                const e = this.nextElementSibling;
                e && "UL" === e.tagName && e.classList.toggle("visible")
            }
            ))
        }
    }
    const template$1 = document.querySelector(selectors$4.accountTemplateLogged);
    template$1 && new Account(template$1);
    const selectors$5 = {
        form: "[data-account-form]",
        showReset: "[data-show-reset]",
        hideReset: "[data-hide-reset]",
        recover: "[data-recover-password]",
        login: "[data-login-form]",
        recoverHash: "#recover",
        hideClass: "is-hidden"
    };
    class Login {
        constructor(e) {
            this.form = e,
            this.showButton = e.querySelector(selectors$5.showReset),
            this.hideButton = e.querySelector(selectors$5.hideReset),
            this.recover = e.querySelector(selectors$5.recover),
            this.login = e.querySelector(selectors$5.login),
            this.init()
        }
        init() {
            window.location.hash == selectors$5.recoverHash ? this.showRecoverPasswordForm() : this.hideRecoverPasswordForm(),
            this.showButton.addEventListener("click", function(e) {
                e.preventDefault(),
                this.showRecoverPasswordForm()
            }
            .bind(this), !1),
            this.hideButton.addEventListener("click", function(e) {
                e.preventDefault(),
                this.hideRecoverPasswordForm()
            }
            .bind(this), !1)
        }
        showRecoverPasswordForm() {
            return this.login.classList.add(selectors$5.hideClass),
            this.recover.classList.remove(selectors$5.hideClass),
            window.location.hash = selectors$5.recoverHash,
            !1
        }
        hideRecoverPasswordForm() {
            return this.recover.classList.add(selectors$5.hideClass),
            this.login.classList.remove(selectors$5.hideClass),
            window.location.hash = "",
            !1
        }
    }
    const loginForm = document.querySelector(selectors$5.form);
    loginForm && new Login(loginForm),
    window.Shopify = window.Shopify || {},
    window.Shopify.theme = window.Shopify.theme || {},
    window.Shopify.theme.sections = window.Shopify.theme.sections || {},
    window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {},
    window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
    const registered = window.Shopify.theme.sections.registered
      , instances = window.Shopify.theme.sections.instances
      , selectors$6 = {
        id: "data-section-id",
        type: "data-section-type"
    };
    class Registration {
        constructor(e=null, t=[]) {
            this.type = e,
            this.components = validateComponentsArray(t),
            this.callStack = {
                onLoad: [],
                onUnload: [],
                onSelect: [],
                onDeselect: [],
                onBlockSelect: [],
                onBlockDeselect: [],
                onReorder: []
            },
            t.forEach((e=>{
                for (const [t,s] of Object.entries(e)) {
                    const e = this.callStack[t];
                    Array.isArray(e) && "function" == typeof s ? e.push(s) : (console.warn(`Unregisted function: '${t}' in component: '${this.type}'`),
                    console.warn(s))
                }
            }
            ))
        }
        getStack() {
            return this.callStack
        }
    }
    class Section {
        constructor(e, t) {
            this.container = validateContainerElement(e),
            this.id = e.getAttribute(selectors$6.id),
            this.type = t.type,
            this.callStack = t.getStack();
            try {
                this.onLoad()
            } catch (e) {
                console.warn(`Error in section: ${this.id}`),
                console.warn(this),
                console.warn(e)
            }
        }
        callFunctions(e, t=null) {
            this.callStack[e].forEach((e=>{
                const s = {
                    id: this.id,
                    type: this.type,
                    container: this.container
                };
                t ? e.call(s, t) : e.call(s)
            }
            ))
        }
        onLoad() {
            this.callFunctions("onLoad")
        }
        onUnload() {
            this.callFunctions("onUnload")
        }
        onSelect(e) {
            this.callFunctions("onSelect", e)
        }
        onDeselect(e) {
            this.callFunctions("onDeselect", e)
        }
        onBlockSelect(e) {
            this.callFunctions("onBlockSelect", e)
        }
        onBlockDeselect(e) {
            this.callFunctions("onBlockDeselect", e)
        }
        onReorder(e) {
            this.callFunctions("onReorder", e)
        }
    }
    function validateContainerElement(e) {
        if (!(e instanceof Element))
            throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
        if (null === e.getAttribute(selectors$6.id))
            throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + selectors$6.id + " attribute.");
        return e
    }
    function validateComponentsArray(e) {
        if (void 0 !== e && "object" != typeof e || null === e)
            throw new TypeError("Theme Sections: The components object provided is not a valid");
        return e
    }
    function register(e, t) {
        if ("string" != typeof e)
            throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
        if (void 0 !== registered[e])
            throw new Error('Theme Sections: A section of type "' + e + '" has already been registered. You cannot register the same section type twice');
        Array.isArray(t) || (t = [t]);
        const s = new Registration(e,t);
        return registered[e] = s,
        registered
    }
    function load(e, t) {
        e = normalizeType(e),
        void 0 === t && (t = document.querySelectorAll("[" + selectors$6.type + "]")),
        t = normalizeContainers(t),
        e.forEach((function(e) {
            const s = registered[e];
            void 0 !== s && (t = t.filter((function(t) {
                return !isInstance(t) && (null !== t.getAttribute(selectors$6.type) && (t.getAttribute(selectors$6.type) !== e || (instances.push(new Section(t,s)),
                !1)))
            }
            )))
        }
        ))
    }
    function reorder(e, t) {
        e = normalizeType(e),
        t = normalizeContainers(t);
        const s = registered[e[0]];
        if (void 0 !== s)
            return !isInstance(t) && (null !== t.getAttribute(selectors$6.type) && (t.getAttribute(selectors$6.type) !== e[0] || (instances.push(new Section(t,s)),
            !1)))
    }
    function unload(e) {
        getInstances(e).forEach((function(e) {
            var t = instances.map((function(e) {
                return e.id
            }
            )).indexOf(e.id);
            instances.splice(t, 1),
            e.onUnload()
        }
        ))
    }
    function getInstances(e) {
        var t = [];
        if (NodeList.prototype.isPrototypeOf(e) || Array.isArray(e))
            var s = e[0];
        if (e instanceof Element || s instanceof Element)
            normalizeContainers(e).forEach((function(e) {
                t = t.concat(instances.filter((function(t) {
                    return t.container === e
                }
                )))
            }
            ));
        else if ("string" == typeof e || "string" == typeof s) {
            normalizeType(e).forEach((function(e) {
                t = t.concat(instances.filter((function(t) {
                    return t.type === e
                }
                )))
            }
            ))
        }
        return t
    }
    function getInstanceById(e) {
        for (var t, s = 0; s < instances.length; s++)
            if (instances[s].id === e) {
                t = instances[s];
                break
            }
        return t
    }
    function isInstance(e) {
        return getInstances(e).length > 0
    }
    function normalizeType(e) {
        return "*" === e ? e = Object.keys(registered) : "string" == typeof e ? e = [e] : e.constructor === Section ? e = [e.prototype.type] : Array.isArray(e) && e[0].constructor === Section && (e = e.map((function(e) {
            return e.type
        }
        ))),
        e = e.map((function(e) {
            return e.toLowerCase()
        }
        ))
    }
    function normalizeContainers(e) {
        return NodeList.prototype.isPrototypeOf(e) && e.length > 0 ? e = Array.prototype.slice.call(e) : NodeList.prototype.isPrototypeOf(e) && 0 === e.length || null === e ? e = [] : !Array.isArray(e) && e instanceof Element && (e = [e]),
        e
    }
    window.Shopify.designMode && (document.addEventListener("shopify:section:load", (function(e) {
        var t = e.detail.sectionId
          , s = e.target.querySelector("[" + selectors$6.id + '="' + t + '"]');
        null !== s && load(s.getAttribute(selectors$6.type), s)
    }
    )),
    document.addEventListener("shopify:section:reorder", (function(e) {
        var t = e.detail.sectionId
          , s = e.target.querySelector("[" + selectors$6.id + '="' + t + '"]');
        null !== s && reorder(s.getAttribute(selectors$6.type), s)
    }
    )),
    document.addEventListener("shopify:section:unload", (function(e) {
        var t = e.detail.sectionId
          , s = e.target.querySelector("[" + selectors$6.id + '="' + t + '"]');
        "object" == typeof getInstances(s)[0] && unload(s)
    }
    )),
    document.addEventListener("shopify:section:select", (function(e) {
        var t = getInstanceById(e.detail.sectionId);
        "object" == typeof t && t.onSelect(e)
    }
    )),
    document.addEventListener("shopify:section:deselect", (function(e) {
        var t = getInstanceById(e.detail.sectionId);
        "object" == typeof t && t.onDeselect(e)
    }
    )),
    document.addEventListener("shopify:block:select", (function(e) {
        var t = getInstanceById(e.detail.sectionId);
        "object" == typeof t && t.onBlockSelect(e)
    }
    )),
    document.addEventListener("shopify:block:deselect", (function(e) {
        var t = getInstanceById(e.detail.sectionId);
        "object" == typeof t && t.onBlockDeselect(e)
    }
    )));
    const selectors$7 = {
        slider: "[data-slider]",
        slide: "[data-slide]",
        slideValue: "data-slide",
        prevArrow: "[data-prev-arrow]",
        nextArrow: "[data-next-arrow]",
        slideshowSlideImg: ".slide-image-img",
        flickityPrevArrow: ".flickity-button.previous",
        flickityNextArrow: ".flickity-button.next",
        collectionImage: ".collection-item__image",
        productItemImage: ".product-item__image",
        columnImage: ".column__image__wrapper",
        sliderThumb: "[data-slider-thumb]",
        sliderThumbClick: "[data-slider-thumb-click]",
        heroContent: ".hero__content",
        heroContentWrapper: ".hero__content__wrapper",
        dataSliderAnimate: "data-slider-animate",
        dataSliderAnimateOnce: "data-slider-animate-once",
        dataAos: "[data-aos]",
        dataAspectRatio: "data-aspectratio",
        dataDots: "data-dots",
        dataArrows: "data-arrows",
        dataAutoplay: "data-autoplay",
        dataAutoplaySpeed: "data-speed",
        dataColor: "data-color",
        dataInfinite: "data-infinite",
        dataSetHeight: "data-set-height",
        dataWatchCss: "data-watch-css",
        dataAdaptiveHeight: "data-adaptive-height",
        dataCellAlign: "data-cell-align",
        dataDraggable: "data-draggable",
        dataPercentPosition: "data-percent-position",
        dataSlideIndex: "data-slide-index",
        dataSlidesLargeDesktop: "data-slides-large-desktop",
        dataSlidesDesktop: "data-slides-desktop",
        dataSlidesTabletDesktop: "data-slides-tablet",
        dataSlidesMobileDesktop: "data-slides-mobile",
        dataSliderStartIndex: "data-slider-start-index",
        dataGroupCells: "data-group-cells",
        dataArrowPositionMiddle: "data-arrow-position-middle",
        dataEqualizeHeight: "data-equalize-height",
        dataFade: "data-fade"
    }
      , classes = {
        classIsSelected: "is-selected",
        textDark: "text-dark",
        textLight: "text-light",
        transparentWrapper: "transparent__wrapper",
        heroContentTransparent: "hero__content--transparent",
        classSliderInitialized: "js-slider--initialized",
        classSliderArrowsHidden: "flickity-button-hide",
        classAosAnimate: "aos-animate",
        classAosAnimated: "aos-animated"
    }
      , sections = {};
    class Slider {
        constructor(e, t=null) {
            this.container = e,
            this.slideshow = t || this.container.querySelector(selectors$7.slider),
            this.slideshow && (this.slideshowSlides = this.slideshow.querySelectorAll(selectors$7.slide),
            this.sliderPrev = this.container.querySelector(selectors$7.prevArrow),
            this.sliderNext = this.container.querySelector(selectors$7.nextArrow),
            this.sliderThumbs = this.container.querySelectorAll(selectors$7.sliderThumb),
            this.sliderThumbsClick = this.container.querySelectorAll(selectors$7.sliderThumbClick),
            this.currentSlideColor = this.slideshowSlides[0].getAttribute(selectors$7.dataColor),
            this.showDots = "hidden" != this.slideshow.getAttribute(selectors$7.dataDots),
            this.showArrows = "true" === this.slideshow.getAttribute(selectors$7.dataArrows),
            this.autoPlay = "true" === this.slideshow.getAttribute(selectors$7.dataAutoplay),
            this.autoPlaySpeed = this.slideshow.getAttribute(selectors$7.dataAutoplaySpeed),
            this.infinite = "false" !== this.slideshow.getAttribute(selectors$7.dataInfinite),
            this.setMinHeightFlag = "true" === this.slideshow.getAttribute(selectors$7.dataSetHeight),
            this.watchCss = "true" === this.slideshow.getAttribute(selectors$7.dataWatchCss),
            this.adaptiveHeight = "false" !== this.slideshow.getAttribute(selectors$7.dataAdaptiveHeight),
            this.cellAlignLeft = "left" === this.slideshow.getAttribute(selectors$7.dataCellAlign),
            this.cellAlignRight = "right" === this.slideshow.getAttribute(selectors$7.dataCellAlign),
            this.draggable = "false" !== this.slideshow.getAttribute(selectors$7.dataDraggable),
            this.percentPosition = "false" !== this.slideshow.getAttribute(selectors$7.dataPercentPosition),
            this.multipleSlides = this.slideshow.hasAttribute(selectors$7.dataSlidesLargeDesktop),
            this.sliderStartIndex = this.slideshow.hasAttribute(selectors$7.dataSliderStartIndex),
            this.groupCells = "true" === this.slideshow.getAttribute(selectors$7.dataGroupCells),
            this.sliderAnimate = "true" === this.slideshow.getAttribute(selectors$7.dataSliderAnimate),
            this.sliderAnimateOnce = "true" === this.slideshow.getAttribute(selectors$7.dataSliderAnimateOnce),
            this.dataEqualizeHeight = "true" === this.slideshow.getAttribute(selectors$7.dataEqualizeHeight),
            this.fade = "true" === this.slideshow.getAttribute(selectors$7.dataFade),
            this.resizeEvent = debounce((()=>this.resizeEvents()), 100),
            this.resizeEventAlt = debounce((()=>this.addRemoveSlidesForDevices()), 100),
            this.flkty = null,
            this.init())
        }
        init() {
            const e = {
                initialIndex: this.sliderStartIndex ? parseInt(this.slideshow.getAttribute(selectors$7.dataSliderStartIndex)) : 0,
                autoPlay: !(!this.autoPlay || !this.autoPlaySpeed) && parseInt(this.autoPlaySpeed),
                contain: !0,
                pageDots: this.showDots,
                prevNextButtons: this.showArrows,
                adaptiveHeight: this.adaptiveHeight,
                wrapAround: this.infinite,
                percentPosition: this.percentPosition,
                watchCSS: this.watchCss,
                cellAlign: this.cellAlignLeft ? "left" : this.cellAlignRight ? "right" : "center",
                groupCells: this.groupCells,
                draggable: !!this.draggable && ">1",
                on: {
                    ready: ()=>{
                        if (this.sliderAnimate && this.sliderAnimateOnce && !this.autoPlay) {
                            this.slideshow.querySelector(`.${classes.classIsSelected}`).classList.add(classes.classAosAnimated)
                        }
                        setTimeout((()=>{
                            this.slideshow.parentNode.dispatchEvent(new CustomEvent("slider-is-loaded",{
                                bubbles: !0,
                                detail: {
                                    slider: this
                                }
                            }))
                        }
                        ), 10),
                        this.slideActions(),
                        this.slideshow.classList.contains(classes.classIsSelected) && this.slideshow.classList.remove(classes.classIsSelected),
                        this.showArrows && (this.initArrows(),
                        this.positionArrows())
                    }
                    ,
                    resize: ()=>{
                        this.showArrows && this.positionArrows()
                    }
                }
            };
            this.fade && (e.fade = !0,
            this.flkty = new FlickityFade(this.slideshow,e)),
            this.fade || (this.flkty = new Flickity(this.slideshow,e)),
            this.setMinHeight(),
            this.dataEqualizeHeight && this.equalizeHeight(),
            this.sliderPrev && this.sliderPrev.addEventListener("click", (e=>{
                e.preventDefault(),
                this.flkty.previous(!0)
            }
            )),
            this.sliderNext && this.sliderNext.addEventListener("click", (e=>{
                e.preventDefault(),
                this.flkty.next(!0)
            }
            )),
            this.flkty.on("change", (()=>this.slideActions())),
            this.addRemoveSlidesForDevices(),
            window.addEventListener("resize", this.resizeEventAlt),
            this.sliderAnimate && this.flkty.on("settle", (()=>this.sliderSettle())),
            (this.setMinHeightFlag || this.multipleSlides) && window.addEventListener("resize", this.resizeEvent),
            this.sliderThumbsClick.length && this.sliderThumbsClick.forEach((e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault();
                    const s = [...e.parentElement.children].indexOf(e);
                    this.flkty.select(s)
                }
                ))
            }
            ))
        }
        sliderSettle() {
            let e = this.slideshow.querySelectorAll(`.${classes.classIsSelected} ${selectors$7.dataAos}`);
            this.sliderAnimateOnce && (e = this.slideshow.querySelectorAll(`.${classes.classIsSelected}:not(.${classes.classAosAnimated}) .${classes.classAosAnimated}`)),
            e.length && e.forEach((e=>{
                e.classList.add(classes.classAosAnimate),
                this.sliderAnimateOnce && e.closest(`.${classes.classIsSelected}`).classList.add(classes.classAosAnimated)
            }
            ))
        }
        addRemoveSlidesForDevices() {
            if (this.hasDiffSlidesForMobileDesktop = Array.prototype.filter.call(this.slideshowSlides, (e=>{
                if (e.classList.contains("desktop") || e.classList.contains("mobile"))
                    return e
            }
            )).length > 0,
            !this.hasDiffSlidesForMobileDesktop)
                return;
            let e = null;
            e = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 749 ? `${selectors$7.slide}.mobile, ${selectors$7.slide}:not(.desktop)` : `${selectors$7.slide}.desktop, ${selectors$7.slide}:not(.mobile)`,
            this.flkty.options.cellSelector = e,
            this.flkty.selectCell(0, !1, !0),
            this.flkty.reloadCells(),
            this.flkty.reposition(),
            this.flkty.resize(),
            this.slideActions()
        }
        resizeEvents() {
            this.setMinHeight(),
            this.multipleSlides && (this.showArrows && this.initArrows(),
            this.flkty.resize(),
            this.slideshow.classList.contains(classes.classSliderInitialized) || this.flkty.select(0))
        }
        slideActions() {
            const e = this.slideshow.querySelector(`.${classes.classIsSelected}`);
            this.currentSlideColor = e.getAttribute(selectors$7.dataColor),
            this.currentSlideColor && (this.slideshow.classList.remove(classes.textLight, classes.textDark),
            this.slideshow.classList.add(this.currentSlideColor)),
            this.container.classList.remove(classes.transparentWrapper);
            const t = e.querySelector(selectors$7.heroContentWrapper);
            if (t && t.classList.contains(classes.heroContentTransparent) && this.container.classList.add(classes.transparentWrapper),
            this.setMinHeight(),
            this.sliderAnimate) {
                let e = this.slideshow.querySelectorAll(`.${classes.classIsSelected} .${classes.classAosAnimate}`);
                this.sliderAnimateOnce && (e = this.slideshow.querySelectorAll(`.${classes.classIsSelected}:not(.${classes.classAosAnimated}) .${classes.classAosAnimate}`)),
                e.length && e.forEach((e=>{
                    e.classList.remove(classes.classAosAnimate),
                    this.sliderAnimateOnce && e.classList.add(classes.classAosAnimated)
                }
                ))
            }
            if (this.sliderThumbs.length && this.sliderThumbs.length === this.slideshowSlides.length && e.hasAttribute(selectors$7.dataSlideIndex)) {
                const t = parseInt(e.getAttribute(selectors$7.dataSlideIndex))
                  , s = this.container.querySelector(`${selectors$7.sliderThumb}.${classes.classIsSelected}`);
                s && s.classList.remove(classes.classIsSelected),
                this.sliderThumbs[t].classList.add(classes.classIsSelected)
            }
        }
        setMinHeight() {
            this.setMinHeightFlag && this.slideshowSlides.forEach((e=>{
                const t = e.querySelector(selectors$7.slideshowSlideImg);
                let s = "";
                t && t.hasAttribute(selectors$7.dataAspectRatio) && (s = t.getAttribute(selectors$7.dataAspectRatio));
                let i = 0
                  , o = 0;
                const r = e.querySelector(selectors$7.heroContent);
                if (r) {
                    o = parseInt(window.getComputedStyle(r).marginTop) + parseInt(window.getComputedStyle(r).marginBottom),
                    i = r.offsetHeight + o
                }
                const a = parseInt(getComputedStyle(e, null).width.replace("px", ""));
                let n = parseInt(a / s) || 0;
                const l = e.classList.contains(classes.classIsSelected);
                i > n && (n = i),
                null !== this.flkty && this.flkty.maxCellHeight > n && (n = this.flkty.maxCellHeight);
                const c = `calc(${n}px + var(--header-padding)`;
                e.style.setProperty("min-height", c);
                const d = e.querySelector(selectors$7.heroContentWrapper);
                d && d.style.setProperty("min-height", c),
                l && this.slideshow.parentElement.style.setProperty("min-height", c)
            }
            ))
        }
        positionArrows() {
            if (this.slideshow.hasAttribute(selectors$7.dataArrowPositionMiddle) && this.showArrows) {
                const e = this.slideshow.querySelector(selectors$7.collectionImage) || this.slideshow.querySelector(selectors$7.productItemImage) || this.slideshow.querySelector(selectors$7.columnImage);
                if (!e)
                    return;
                this.slideshow.querySelector(selectors$7.flickityPrevArrow).style.top = e.clientHeight / 2 + "px",
                this.slideshow.querySelector(selectors$7.flickityNextArrow).style.top = e.clientHeight / 2 + "px"
            }
        }
        initArrows() {
            if (!this.multipleSlides)
                return;
            const e = parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesLargeDesktop))
              , t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
              , s = this.slideshow.hasAttribute(selectors$7.dataSlidesDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesDesktop)) : 3
              , i = this.slideshow.hasAttribute(selectors$7.dataSlidesTabletDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesTabletDesktop)) : 2
              , o = this.slideshow.hasAttribute(selectors$7.dataSlidesMobileDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesMobileDesktop)) : 1
              , r = t > 1339 && this.slideshowSlides.length > e
              , a = t <= 1339 && t > 1023 && this.slideshowSlides.length > s
              , n = t <= 1023 && t > 749 && this.slideshowSlides.length > i
              , l = t <= 749 && this.slideshowSlides.length > o
              , c = Boolean(r || a || n || l);
            this.slideshow.classList.toggle(classes.classSliderArrowsHidden, !c),
            this.slideshow.classList.toggle(classes.classSliderInitialized, c)
        }
        equalizeHeight() {
            Flickity.prototype._createResizeClass = function() {
                setTimeout((()=>{
                    this.element.classList.add("flickity-resize")
                }
                ))
            }
            ,
            Flickity.createMethods.push("_createResizeClass");
            const e = Flickity.prototype.resize;
            Flickity.prototype.resize = function() {
                this.element.classList.remove("flickity-resize"),
                e.call(this),
                this.element.classList.add("flickity-resize")
            }
            ,
            this.flkty.resize()
        }
        onUnload() {
            (this.setMinHeightFlag || this.multipleSlides) && window.removeEventListener("resize", this.resizeEvent),
            this.slideshow && this.flkty && (this.flkty.options.watchCSS = !1,
            this.flkty.destroy())
        }
        onBlockSelect(e) {
            if (!this.slideshow)
                return;
            const t = this.slideshow.querySelector(`[${selectors$7.slideValue}="${e.detail.blockId}"]`);
            if (!t)
                return;
            let s = parseInt(t.getAttribute(selectors$7.dataSlideIndex));
            this.multipleSlides && !this.slideshow.classList.contains(classes.classSliderInitialized) && (s = 0),
            this.slideshow.classList.add(classes.classIsSelected),
            this.flkty.selectCell(s),
            this.flkty.stopPlayer()
        }
        onBlockDeselect() {
            this.slideshow && (this.slideshow.classList.remove(classes.classIsSelected),
            this.autoPlay && this.flkty.playPlayer())
        }
    }
    const slider = {
        onLoad() {
            sections[this.id] = [];
            this.container.querySelectorAll(selectors$7.slider).forEach((e=>{
                sections[this.id].push(new Slider(this.container,e))
            }
            ))
        },
        onUnload(e) {
            sections[this.id].forEach((t=>{
                "function" == typeof t.onUnload && t.onUnload(e)
            }
            ))
        },
        onBlockSelect(e) {
            sections[this.id].forEach((t=>{
                "function" == typeof t.onBlockSelect && t.onBlockSelect(e)
            }
            ))
        },
        onBlockDeselect(e) {
            sections[this.id].forEach((t=>{
                "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e)
            }
            ))
        }
    };
    function t(e) {
        var t = e.getBoundingClientRect()
          , s = t.left
          , i = t.right
          , o = t.top
          , r = t.bottom
          , a = window.pageYOffset;
        return {
            height: r - o,
            width: i - s,
            top: {
                y: a + o,
                x: s + (i - s) / 2
            },
            bottom: {
                y: a + r,
                x: s + (i - s) / 2
            },
            left: {
                y: o + (r - o) / 2,
                x: s
            },
            right: {
                y: o + (r - o) / 2,
                x: i
            },
            topLeft: {
                y: a + o,
                x: s
            },
            bottomLeft: {
                y: a + r,
                x: s
            },
            topRight: {
                y: a + o,
                x: i
            },
            bottomRight: {
                y: a + r,
                x: i
            }
        }
    }
    function e(e, s, i) {
        var o = t(s)[i]
          , r = t(e)
          , a = window.pageYOffset
          , n = {
            top: a,
            bottom: a + window.innerHeight,
            left: 0,
            right: window.innerWidth
        }
          , l = {
            top: {
                x: r.width / 2,
                y: r.height
            },
            bottom: {
                x: r.width / 2,
                y: 0
            },
            left: {
                x: r.width,
                y: r.height / 2
            },
            right: {
                x: 0,
                y: r.height / 2
            },
            topLeft: {
                x: r.width,
                y: r.height
            },
            topRight: {
                x: 0,
                y: r.height
            },
            bottomLeft: {
                x: r.width,
                y: 0
            },
            bottomRight: {
                x: 0,
                y: 0
            }
        }
          , c = o.x - l[i].x
          , d = o.y - l[i].y;
        c < n.left ? c = n.left : c + r.width > n.right && (c = n.right - r.width),
        d < n.top ? d = n.top : d + r.height > n.bottom && (d = n.bottom - r.height),
        e.style.transform = "translateX(" + Math.round(c) + "px) translateY(" + Math.round(d) + "px)"
    }
    function i(e) {
        e.length > 0 && e.shift().apply(this, e)
    }
    function n(e, t) {
        e(),
        i(t)
    }
    function o(e, t) {
        return function() {
            var s = [].slice.call(arguments)
              , i = s[0];
            if ("number" == typeof i)
                return o(e, i);
            "number" == typeof t ? setTimeout((function() {
                n(e, s)
            }
            ), t) : n(e, s)
        }
    }
    function s() {
        var e = [].slice.call(arguments);
        return o((function() {
            i(e.slice(0))
        }
        ))
    }
    var r = function(e) {
        var t = e.popover;
        void 0 === t && (t = null);
        var s = e.position;
        void 0 === s && (s = "bottom");
        var i = e.transitionSpeed;
        void 0 === i && (i = 0);
        var o = e.onChange;
        void 0 === o && (o = null),
        this.target = e.target,
        this.popover = this.createPopover(t),
        this.position = s,
        this.transitionSpeed = i,
        this.onChange = o,
        this.state = {
            pinned: !1,
            busy: !1,
            requestClose: !1
        },
        this.pin = this.pin.bind(this),
        this.unpin = this.unpin.bind(this),
        this.block = this.block.bind(this),
        this.unblock = this.unblock.bind(this),
        this.isExternalClick = this.isExternalClick.bind(this),
        this.handleKeyup = this.handleKeyup.bind(this),
        this.focusNode = null
    };
    r.prototype.setState = function(e, t) {
        this.state = Object.assign(this.state, e),
        t && o(t, 0)()
    }
    ,
    r.prototype.block = function() {
        this.setState({
            busy: !0
        })
    }
    ,
    r.prototype.unblock = function() {
        var e = this;
        this.setState({
            busy: !1
        }, (function() {
            e.state.requestClose && e.unpin()
        }
        ))
    }
    ,
    r.prototype.toggle = function() {
        this.state.pinned ? this.unpin() : this.pin()
    }
    ,
    r.prototype.pin = function() {
        var t = this;
        if (!this.state.busy && !this.state.pinned) {
            this.setState({
                busy: !0
            }),
            this.focusNode = document.activeElement;
            var i = o((function() {
                return document.body.appendChild(t.popover)
            }
            ))
              , r = o((function() {
                return i = t.target,
                o = t.position,
                (s = t.popover).classList.add("is-tacked"),
                e(s, i, o),
                {
                    update: function() {
                        e(s, i, o)
                    },
                    destroy: function() {
                        s.style.transform = "",
                        s.classList.remove("is-tacked")
                    }
                };
                var s, i, o
            }
            ))
              , a = o((function() {
                t.popover.classList.add("is-visible"),
                t.popover.setAttribute("tabindex", "0"),
                t.popover.setAttribute("aria-hidden", "false")
            }
            ))
              , n = o((function() {
                return t.popover.focus()
            }
            ))
              , l = o((function() {
                return t.setState({
                    busy: !1,
                    pinned: !0
                })
            }
            ));
            s(i, r, a(0), n(0), l)(),
            this.popover.addEventListener("mouseenter", this.block),
            this.popover.addEventListener("mouseleave", this.unblock),
            window.addEventListener("click", this.isExternalClick),
            window.addEventListener("touchstart", this.isExternalClick),
            window.addEventListener("keyup", this.handleKeyup),
            window.addEventListener("resize", this.unpin),
            this.onChange && this.onChange({
                pinned: !0
            })
        }
    }
    ,
    r.prototype.unpin = function(e) {
        var t = this;
        this.setState({
            requestClose: !0
        }),
        (e || !this.state.busy && this.state.pinned) && o((function() {
            t.setState({
                busy: !0
            }),
            t.popover.removeEventListener("mouseenter", t.block),
            t.popover.removeEventListener("mouseleave", t.unblock),
            window.removeEventListener("click", t.isExternalClick),
            window.removeEventListener("touchstart", t.isExternalClick),
            window.removeEventListener("keyup", t.handleKeyup),
            window.removeEventListener("resize", t.unpin);
            var e = o((function() {
                return t.popover.classList.add("is-hiding")
            }
            ))
              , i = o((function() {
                return document.body.removeChild(t.popover)
            }
            ))
              , r = o((function() {
                return t.focusNode.focus()
            }
            ))
              , a = o((function() {
                t.popover.classList.remove("is-hiding"),
                t.popover.classList.remove("is-visible"),
                t.setState({
                    busy: !1,
                    pinned: !1,
                    requestClose: !1
                })
            }
            ));
            s(e, i(t.transitionSpeed), r, a)(),
            t.onChange && t.onChange({
                pinned: !1
            })
        }
        ), 0)()
    }
    ,
    r.prototype.handleKeyup = function(e) {
        27 === e.keyCode && this.unpin()
    }
    ,
    r.prototype.isExternalClick = function(e) {
        e.target === this.popover || this.popover.contains(e.target) || e.target === this.target || this.target.contains(e.target) || this.unpin()
    }
    ,
    r.prototype.createPopover = function(e) {
        var t = document.createElement("div");
        return t.className = "poppy",
        t.role = "dialog",
        t.setAttribute("aria-label", "Share Dialog"),
        t.setAttribute("aria-hidden", "true"),
        "string" == typeof e ? t.innerHTML = e : t.appendChild(e),
        t
    }
    ;
    const selectors$8 = {
        tooltip: "data-tooltip",
        tooltipStopMouseEnter: "data-tooltip-stop-mouseenter"
    }
      , classes$1 = {
        tooltipDefault: "poppy__tooltip"
    };
    let sections$1 = {};
    class Tooltip {
        constructor(e, t={}) {
            this.tooltip = e,
            this.tooltip.hasAttribute(selectors$8.tooltip) && (this.label = this.tooltip.getAttribute(selectors$8.tooltip),
            this.pop = null,
            this.class = t.class || classes$1.tooltipDefault,
            this.transitionSpeed = t.transitionSpeed || 200,
            this.tooltipPosition = t.position || "bottom",
            this.addPinEvent = ()=>this.addPin(),
            this.addPinMouseEvent = ()=>this.addPin(!0),
            this.removePinEvent = ()=>this.removePin(),
            this.removePinMouseEvent = ()=>this.removePin(!0),
            this.init())
        }
        init() {
            this.pop = new r({
                target: this.tooltip,
                popover: `\n      <div class="${this.class}__wrapper">\n      <div class="${this.class}">\n      ${this.label}\n      </div>\n      </div>\n      `,
                position: this.tooltipPosition,
                transitionSpeed: this.transitionSpeed
            }),
            this.tooltip.addEventListener("mouseenter", this.addPinMouseEvent),
            this.tooltip.addEventListener("mouseleave", this.removePinMouseEvent),
            this.tooltip.addEventListener("poppy:init", this.addPinEvent),
            document.addEventListener("poppy:close", this.removePinEvent),
            document.addEventListener("theme:scroll", this.removePinEvent)
        }
        addPin(e=!1) {
            this.pop && (e && !this.tooltip.hasAttribute(selectors$8.tooltipStopMouseEnter) || !e) && this.pop.pin()
        }
        removePin(e=!1) {
            (this.pop || this.pop.state.pinned) && (e && !this.tooltip.hasAttribute(selectors$8.tooltipStopMouseEnter) || !e) && this.pop.unpin()
        }
        unload() {
            this.pop && (this.tooltip.removeEventListener("mouseenter", this.addPinMouseEvent),
            this.tooltip.removeEventListener("mouseleave", this.removePinMouseEvent),
            this.tooltip.removeEventListener("poppy:init", this.addPinEvent),
            document.removeEventListener("poppy:close", this.removePinEvent),
            document.removeEventListener("theme:scroll", this.removePinEvent))
        }
    }
    const tooltipSection = {
        onLoad() {
            sections$1[this.id] = [];
            this.container.querySelectorAll(`[${selectors$8.tooltip}]`).forEach((e=>{
                sections$1[this.id].push(new Tooltip(e))
            }
            ))
        },
        onUnload: function() {
            sections$1[this.id].forEach((e=>{
                "function" == typeof e.unload && e.unload()
            }
            ))
        }
    }
      , selectors$9 = {
        copyClipboard: "[data-copy-clipboard]",
        tooltip: "data-tooltip"
    }
      , sections$2 = {};
    class CopyClipboard {
        constructor(e) {
            this.container = e.container,
            this.copyButtons = this.container.querySelectorAll(selectors$9.copyClipboard),
            this.copyButtons.length && this.init()
        }
        init() {
            this.copyButtons.forEach((e=>{
                e.hasAttribute(selectors$9.tooltip) && new Tooltip(e),
                e.addEventListener("click", (function(e) {
                    e.preventDefault();
                    const t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                      , s = this.getAttribute("href");
                    let i = document.createElement("input");
                    i.type = "text",
                    this.appendChild(i);
                    const o = this.querySelector("input");
                    o.value = s,
                    o.select(),
                    o.setSelectionRange(0, 99999),
                    document.execCommand("copy"),
                    this.removeChild(o),
                    this.hasAttribute(selectors$9.tooltip) && t > 749 && (this.dispatchEvent(new CustomEvent("poppy:init",{
                        bubbles: !0
                    })),
                    setTimeout((()=>{
                        document.dispatchEvent(new CustomEvent("poppy:close"))
                    }
                    ), 2e3))
                }
                ))
            }
            ))
        }
    }
    const copyClipboard = {
        onLoad() {
            sections$2[this.id] = new CopyClipboard(this)
        }
    };
    var sections$3 = {};
    const parallaxHero = {
        onLoad() {
            sections$3[this.id] = [];
            this.container.querySelectorAll("[data-parallax-wrapper]").forEach((e=>{
                const t = e.querySelector("[data-parallax-img]");
                sections$3[this.id].push(new Rellax(t,{
                    center: !0,
                    round: !0,
                    frame: e
                }))
            }
            )),
            window.addEventListener("load", (()=>{
                sections$3[this.id].forEach((e=>{
                    "function" == typeof e.refresh && e.refresh()
                }
                ))
            }
            ))
        },
        onUnload: function() {
            sections$3[this.id].forEach((e=>{
                "function" == typeof e.destroy && e.destroy()
            }
            ))
        }
    }
      , selectors$a = {
        sidebar: ".sidebar",
        widgetCategories: ".widget--categories",
        widgetLinksEl: ".widget__links",
        widgetLinks: ".widget__links .has-sub-nav > a",
        widgetLinksSub: ".widget__links .submenu > li > a",
        listEl: "li",
        linkEl: "a",
        articleSingle: ".article--single",
        sidebarContents: ".sidebar__contents",
        hasSubNav: ".has-sub-nav"
    }
      , classes$2 = {
        classOpen: "open",
        classActive: "active",
        classSubmenu: "submenu"
    }
      , sections$4 = {};
    class Article {
        constructor(e) {
            this.container = e.container,
            this.sidebar = this.container.querySelector(selectors$a.sidebar),
            this.widgetCategories = this.container.querySelector(selectors$a.widgetCategories),
            this.resizeEvent = ()=>this.categories(),
            this.init()
        }
        init() {
            this.sidebar && this.sidebarNav()
        }
        sidebarNav() {
            this.navStates(),
            this.container.addEventListener("click", (e=>{
                const t = e.target.tagName.toLowerCase() === selectors$a.linkEl
                  , s = e.target.closest(`${selectors$a.listEl}${selectors$a.hasSubNav}`)
                  , i = e.target.closest(selectors$a.widgetLinksEl)
                  , o = t && s && i
                  , r = e.target.nextElementSibling;
                !((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small) && o && r && (r.parentElement.classList.toggle(classes$2.classActive),
                r.classList.toggle(classes$2.classOpen),
                r.setAttribute("aria-expanded", r.classList.contains(classes$2.classOpen)),
                slideToggle(r),
                e.preventDefault())
            }
            )),
            this.widgetCategories && (this.widgetCategoriesNext = this.widgetCategories.nextSibling,
            this.widgetCategoriesParentNode = this.widgetCategories.parentNode,
            this.categories(),
            document.addEventListener("theme:resize", this.resizeEvent))
        }
        navStates() {
            const e = this.container.querySelectorAll(`${selectors$a.widgetLinks}, ${selectors$a.widgetLinksSub}`);
            e.length && e.forEach((e=>{
                if (e.getAttribute("href") === window.location.pathname) {
                    const t = e.closest(selectors$a.hasSubNav);
                    if (e.closest("li").classList.add(classes$2.classActive),
                    !t)
                        return;
                    t.classList.add(classes$2.classActive);
                    const s = t.querySelector(`.${classes$2.classSubmenu}`);
                    s && (s.classList.toggle(classes$2.classOpen),
                    s.setAttribute("aria-expanded", s.classList.contains(classes$2.classOpen)),
                    showElement(s))
                }
            }
            ))
        }
        categories() {
            const e = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small
              , t = document.querySelector(selectors$a.widgetCategories);
            e ? document.querySelector(selectors$a.articleSingle).prepend(t) : this.widgetCategoriesParentNode.insertBefore(t, this.widgetCategoriesNext)
        }
        onUnload() {
            this.widgetCategories && document.removeEventListener("theme:resize", this.resizeEvent)
        }
    }
    const articleSection = {
        onLoad() {
            sections$4[this.id] = new Article(this)
        },
        onUnload(e) {
            sections$4[this.id].onUnload(e)
        }
    };
    register("article", [articleSection, slider, copyClipboard, parallaxHero]),
    register("blog-template", [slider]),
    register("hero", parallaxHero);
    const selectors$b = {
        popoutWrapper: "[data-popout]",
        popoutList: "[data-popout-list]",
        popoutToggle: "[data-popout-toggle]",
        popoutInput: "[data-popout-input]",
        popoutOptions: "[data-popout-option]",
        popoutPrevent: "data-popout-prevent",
        popoutQuantity: "data-quantity-field",
        dataValue: "data-value",
        ariaExpanded: "aria-expanded",
        ariaCurrent: "aria-current",
        productGridImage: "[data-product-image]",
        productGrid: "[data-product-grid-item]"
    }
      , classes$3 = {
        listVisible: "popout-list--visible",
        currentSuffix: "--current",
        classPopoutAlternative: "popout-container--alt",
        visible: "is-visible"
    };
    let sections$5 = {};
    class Popout {
        constructor(e) {
            this.container = e,
            this.popoutList = this.container.querySelector(selectors$b.popoutList),
            this.popoutToggle = this.container.querySelector(selectors$b.popoutToggle),
            this.popoutInput = this.container.querySelector(selectors$b.popoutInput),
            this.popoutOptions = this.container.querySelectorAll(selectors$b.popoutOptions),
            this.popoutPrevent = "true" === this.container.getAttribute(selectors$b.popoutPrevent),
            this.popupToggleFocusoutEvent = e=>this.popupToggleFocusout(e),
            this.popupListFocusoutEvent = e=>this.popupListFocusout(e),
            this.popupToggleClickEvent = e=>this.popupToggleClick(e),
            this.containerKeyupEvent = e=>this.containerKeyup(e),
            this.popupOptionsClickEvent = e=>this.popupOptionsClick(e),
            this._connectOptionsDispatchEvent = e=>this._connectOptionsDispatch(e),
            this._connectOptions(),
            this._connectToggle(),
            this._onFocusOut(),
            this.popoutInput && this.popoutInput.hasAttribute(selectors$b.popoutQuantity) && document.addEventListener("popout:updateValue", this.updatePopout.bind(this))
        }
        unload() {
            this.popoutOptions.length && this.popoutOptions.forEach((e=>{
                e.removeEventListener("clickDetails", this.popupOptionsClickEvent),
                e.removeEventListener("click", this._connectOptionsDispatchEvent)
            }
            )),
            this.popoutToggle.removeEventListener("click", this.popupToggleClickEvent),
            this.popoutToggle.removeEventListener("focusout", this.popupToggleFocusoutEvent),
            this.popoutList.removeEventListener("focusout", this.popupListFocusoutEvent),
            this.container.removeEventListener("keyup", this.containerKeyupEvent)
        }
        popupToggleClick(e) {
            const t = "true" === e.currentTarget.getAttribute(selectors$b.ariaExpanded);
            if (this.popoutList.closest(selectors$b.productGrid)) {
                const e = this.popoutList.closest(selectors$b.productGrid).querySelector(selectors$b.productGridImage);
                e && e.classList.toggle(classes$3.visible, !t)
            }
            e.currentTarget.setAttribute(selectors$b.ariaExpanded, !t),
            this.popoutList.classList.toggle(classes$3.listVisible)
        }
        popupToggleFocusout(e) {
            this.container.contains(e.relatedTarget) || this._hideList()
        }
        popupListFocusout(e) {
            const t = e.currentTarget.contains(e.relatedTarget);
            this.popoutList.classList.contains(classes$3.listVisible) && !t && this._hideList()
        }
        popupOptionsClick(e) {
            if ("#" === e.target.closest(selectors$b.popoutOptions).attributes.href.value) {
                e.preventDefault();
                let t = "";
                if (e.currentTarget.getAttribute(selectors$b.dataValue) && (t = e.currentTarget.getAttribute(selectors$b.dataValue)),
                this.popoutInput.value = t,
                this.popoutPrevent) {
                    this.popoutInput.dispatchEvent(new Event("change")),
                    !e.detail.preventTrigger && this.popoutInput.hasAttribute(selectors$b.popoutQuantity) && this.popoutInput.dispatchEvent(new Event("input"));
                    const s = this.popoutList.querySelector(`[class*="${classes$3.currentSuffix}"]`);
                    let i = classes$3.currentSuffix;
                    if (s && s.classList.length)
                        for (const e of s.classList)
                            if (e.includes(classes$3.currentSuffix)) {
                                i = e;
                                break
                            }
                    const o = this.popoutList.querySelector(`.${i}`);
                    o && (o.classList.remove(`${i}`),
                    e.currentTarget.parentElement.classList.add(`${i}`));
                    const r = this.popoutList.querySelector(`[${selectors$b.ariaCurrent}]`);
                    r && r.hasAttribute(`${selectors$b.ariaCurrent}`) && (r.removeAttribute(`${selectors$b.ariaCurrent}`),
                    e.currentTarget.setAttribute(`${selectors$b.ariaCurrent}`, "true")),
                    "" !== t && (this.popoutToggle.textContent = t),
                    this.popupToggleFocusout(e),
                    this.popupListFocusout(e)
                } else
                    this._submitForm(t)
            }
        }
        updatePopout() {
            const e = this.popoutList.querySelector(`[${selectors$b.dataValue}="${this.popoutInput.value}"]`);
            e ? (e.dispatchEvent(new CustomEvent("clickDetails",{
                cancelable: !0,
                bubbles: !0,
                detail: {
                    preventTrigger: !0
                }
            })),
            e.parentElement.nextSibling || this.container.classList.add(classes$3.classPopoutAlternative)) : this.container.classList.add(classes$3.classPopoutAlternative)
        }
        containerKeyup(e) {
            e.which === window.theme.keyboardKeys.ESCAPE && (this._hideList(),
            this.popoutToggle.focus())
        }
        bodyClick(e) {
            const t = this.container.contains(e.target);
            this.popoutList.classList.contains(classes$3.listVisible) && !t && this._hideList()
        }
        _connectToggle() {
            this.popoutToggle.addEventListener("click", this.popupToggleClickEvent)
        }
        _connectOptions() {
            this.popoutOptions.length && this.popoutOptions.forEach((e=>{
                e.addEventListener("clickDetails", this.popupOptionsClickEvent),
                e.addEventListener("click", this._connectOptionsDispatchEvent)
            }
            ))
        }
        _connectOptionsDispatch(e) {
            const t = new CustomEvent("clickDetails",{
                cancelable: !0,
                bubbles: !0,
                detail: {
                    preventTrigger: !1
                }
            });
            e.target.dispatchEvent(t) || e.preventDefault()
        }
        _onFocusOut() {
            this.popoutToggle.addEventListener("focusout", this.popupToggleFocusoutEvent),
            this.popoutList.addEventListener("focusout", this.popupListFocusoutEvent),
            this.container.addEventListener("keyup", this.containerKeyupEvent),
            document.body.addEventListener("click", this.bodyClick.bind(this))
        }
        _submitForm() {
            const e = this.container.closest("form");
            e && e.submit()
        }
        _hideList() {
            this.popoutList.classList.remove(classes$3.listVisible),
            this.popoutToggle.setAttribute(selectors$b.ariaExpanded, !1)
        }
    }
    const popoutSection = {
        onLoad() {
            sections$5[this.id] = [];
            this.container.querySelectorAll(selectors$b.popoutWrapper).forEach((e=>{
                sections$5[this.id].push(new Popout(e))
            }
            ))
        },
        onUnload() {
            sections$5[this.id].forEach((e=>{
                "function" == typeof e.unload && e.unload()
            }
            ))
        }
    }
      , selectors$c = {
        newsletterForm: "[data-newsletter-form]",
        newsletterHeading: "[data-newsletter-heading]"
    }
      , classes$4 = {
        success: "has-success",
        error: "not-success",
        hide: "hide"
    }
      , sections$6 = {};
    class NewsletterCheckForResult {
        constructor(e) {
            this.sessionStorage = window.sessionStorage,
            this.newsletter = e,
            this.stopSubmit = !0,
            this.isChallengePage = !1,
            this.formID = null,
            this.checkForChallengePage(),
            this.newsletterSubmit = e=>this.newsletterSubmitEvent(e),
            this.isChallengePage || this.init()
        }
        init() {
            this.newsletter.addEventListener("submit", this.newsletterSubmit),
            this.showMessage()
        }
        newsletterSubmitEvent(e) {
            this.stopSubmit && (e.preventDefault(),
            this.removeStorage(),
            this.writeStorage(),
            this.stopSubmit = !1,
            this.newsletter.submit())
        }
        checkForChallengePage() {
            this.isChallengePage = "/challenge" === window.location.pathname
        }
        writeStorage() {
            void 0 !== this.sessionStorage && this.sessionStorage.setItem("newsletter_form_id", this.newsletter.id)
        }
        readStorage() {
            this.formID = this.sessionStorage.getItem("newsletter_form_id")
        }
        removeStorage() {
            this.sessionStorage.removeItem("newsletter_form_id")
        }
        showMessage() {
            if (this.readStorage(),
            this.newsletter.id === this.formID) {
                const e = document.getElementById(this.formID)
                  , t = e.parentElement.querySelector(selectors$c.newsletterHeading);
                -1 !== window.location.search.indexOf("?customer_posted=true") ? (e.classList.remove(classes$4.error),
                e.classList.add(classes$4.success),
                t && t.classList.add(classes$4.hide)) : -1 !== window.location.search.indexOf("accepts_marketing") && (e.classList.remove(classes$4.success),
                e.classList.add(classes$4.error),
                t && t.classList.add(classes$4.hide)),
                this.scrollToForm(e)
            }
        }
        scrollToForm(e) {
            const t = e.getBoundingClientRect();
            t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth) || setTimeout((()=>{
                window.scroll({
                    top: t.top,
                    left: 0,
                    behavior: "smooth"
                })
            }
            ), 400)
        }
        unload() {
            this.newsletter.removeEventListener("submit", this.newsletterSubmit)
        }
    }
    const newsletterCheckForResultSection = {
        onLoad() {
            sections$6[this.id] = [];
            this.container.querySelectorAll(selectors$c.newsletterForm).forEach((e=>{
                sections$6[this.id].push(new NewsletterCheckForResult(e))
            }
            ))
        },
        onUnload() {
            sections$6[this.id].forEach((e=>{
                "function" == typeof e.unload && e.unload()
            }
            ))
        }
    };
    register("footer", [popoutSection, parallaxHero, newsletterCheckForResultSection]);
    const selectors$d = {
        reviews: "data-reviews"
    };
    class ProductGridReviews {
        constructor(e) {
            this.container = e.container,
            this.showReviews = "false" !== this.container.getAttribute(selectors$d.reviews),
            this.reviewsAppInstalled = "function" == typeof window.SPR,
            this.init()
        }
        init() {
            this.showReviews && this.reviewsAppInstalled && (window.SPR.initDomEls(),
            window.SPR.loadBadges())
        }
    }
    const productGridReviews = {
        onLoad() {
            new ProductGridReviews(this)
        }
    };
    function Listeners() {
        this.entries = []
    }
    function getVariantFromSerializedArray(e, t) {
        return _validateProductStructure(e),
        getVariantFromOptionArray(e, _createOptionArrayFromOptionCollection(e, t))
    }
    function getVariantFromOptionArray(e, t) {
        return _validateProductStructure(e),
        _validateOptionsArray(t),
        e.variants.filter((function(e) {
            return t.every((function(t, s) {
                return e.options[s] === t
            }
            ))
        }
        ))[0] || null
    }
    function _createOptionArrayFromOptionCollection(e, t) {
        _validateProductStructure(e),
        _validateSerializedArray(t);
        var s = [];
        return t.forEach((function(t) {
            for (var i = 0; i < e.options.length; i++) {
                if ((e.options[i].name || e.options[i]).toLowerCase() === t.name.toLowerCase()) {
                    s[i] = t.value;
                    break
                }
            }
        }
        )),
        s
    }
    function _validateProductStructure(e) {
        if ("object" != typeof e)
            throw new TypeError(e + " is not an object.");
        if (0 === Object.keys(e).length && e.constructor === Object)
            throw new Error(e + " is empty.")
    }
    function _validateSerializedArray(e) {
        if (!Array.isArray(e))
            throw new TypeError(e + " is not an array.");
        if (0 === e.length)
            throw new Error(e + " is empty.");
        if (!e[0].hasOwnProperty("name"))
            throw new Error(e[0] + "does not contain name key.");
        if ("string" != typeof e[0].name)
            throw new TypeError("Invalid value type passed for name of option " + e[0].name + ". Value should be string.")
    }
    function _validateOptionsArray(e) {
        if (Array.isArray(e) && "object" == typeof e[0])
            throw new Error(e + "is not a valid array of options.")
    }
    Listeners.prototype.add = function(e, t, s) {
        this.entries.push({
            element: e,
            event: t,
            fn: s
        }),
        e.addEventListener(t, s)
    }
    ,
    Listeners.prototype.removeAll = function() {
        this.entries = this.entries.filter((function(e) {
            return e.element.removeEventListener(e.event, e.fn),
            !1
        }
        ))
    }
    ;
    var selectors$e = {
        idInput: '[name="id"]',
        planInput: '[name="selling_plan"]',
        optionInput: '[name^="options"]',
        quantityInput: '[name="quantity"]',
        propertyInput: '[name^="properties"]'
    };
    function getUrlWithVariant(e, t) {
        return /variant=/.test(e) ? e.replace(/(variant=)[^&]+/, "$1" + t) : /\?/.test(e) ? e.concat("&variant=").concat(t) : e.concat("?variant=").concat(t)
    }
    class ProductForm {
        constructor(e, t, s) {
            this.element = e,
            this.form = "FORM" == this.element.tagName ? this.element : this.element.querySelector("form"),
            this.product = this._validateProductObject(t),
            this.variantElement = this.element.querySelector(selectors$e.idInput),
            s = s || {},
            this._listeners = new Listeners,
            this._listeners.add(this.element, "submit", this._onSubmit.bind(this, s)),
            this.optionInputs = this._initInputs(selectors$e.optionInput, s.onOptionChange),
            this.planInputs = this._initInputs(selectors$e.planInput, s.onPlanChange),
            this.quantityInputs = this._initInputs(selectors$e.quantityInput, s.onQuantityChange),
            this.propertyInputs = this._initInputs(selectors$e.propertyInput, s.onPropertyChange)
        }
        destroy() {
            this._listeners.removeAll()
        }
        options() {
            return this._serializeInputValues(this.optionInputs, (function(e) {
                return e.name = /(?:^(options\[))(.*?)(?:\])/.exec(e.name)[2],
                e
            }
            ))
        }
        variant() {
            const e = this.options();
            return e.length ? getVariantFromSerializedArray(this.product, e) : this.product.variants[0]
        }
        plan(e) {
            let t = {
                allocation: null,
                group: null,
                detail: null
            };
            const s = new FormData(this.form).get("selling_plan");
            return s && e && (t.allocation = e.selling_plan_allocations.find((function(e) {
                return e.selling_plan_id.toString() === s.toString()
            }
            ))),
            t.allocation && (t.group = this.product.selling_plan_groups.find((function(e) {
                return e.id.toString() === t.allocation.selling_plan_group_id.toString()
            }
            ))),
            t.group && (t.detail = t.group.selling_plans.find((function(e) {
                return e.id.toString() === s.toString()
            }
            ))),
            t && t.allocation && t.detail && t.allocation ? t : null
        }
        properties() {
            return this._serializeInputValues(this.propertyInputs, (function(e) {
                return e.name = /(?:^(properties\[))(.*?)(?:\])/.exec(e.name)[2],
                e
            }
            ))
        }
        quantity() {
            return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1
        }
        getFormState() {
            const e = this.variant();
            return {
                options: this.options(),
                variant: e,
                properties: this.properties(),
                quantity: this.quantity(),
                plan: this.plan(e)
            }
        }
        _setIdInputValue(e) {
            e && e.id ? this.variantElement.value = e.id.toString() : this.variantElement.value = "",
            this.variantElement.dispatchEvent(new Event("change"))
        }
        _onSubmit(e, t) {
            t.dataset = this.getFormState(),
            e.onFormSubmit && e.onFormSubmit(t)
        }
        _onOptionChange(e) {
            this._setIdInputValue(e.dataset.variant)
        }
        _onFormEvent(e) {
            return void 0 === e ? Function.prototype.bind() : function(t) {
                t.dataset = this.getFormState(),
                this._setIdInputValue(t.dataset.variant),
                e(t)
            }
            .bind(this)
        }
        _initInputs(e, t) {
            return Array.prototype.slice.call(this.element.querySelectorAll(e)).map(function(e) {
                return this._listeners.add(e, "change", this._onFormEvent(t)),
                e
            }
            .bind(this))
        }
        _serializeInputValues(e, t) {
            return e.reduce((function(e, s) {
                return (s.checked || "radio" !== s.type && "checkbox" !== s.type) && e.push(t({
                    name: s.name,
                    value: s.value
                })),
                e
            }
            ), [])
        }
        _validateProductObject(e) {
            if ("object" != typeof e)
                throw new TypeError(e + " is not an object.");
            if (void 0 === e.variants[0].options)
                throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
            return e
        }
    }
    function getScript(e, t, s) {
        let i = document.getElementsByTagName("head")[0]
          , o = !1
          , r = document.createElement("script");
        r.src = e,
        r.onload = r.onreadystatechange = function() {
            o || this.readyState && "loaded" != this.readyState && "complete" != this.readyState ? s() : (o = !0,
            t())
        }
        ,
        i.appendChild(r)
    }
    const loaders = {};
    function loadScript(e={}) {
        if (e.type || (e.type = "json"),
        e.url)
            return loaders[e.url] ? loaders[e.url] : getScriptWithPromise(e.url, e.type);
        if (e.json)
            return loaders[e.json] ? Promise.resolve(loaders[e.json]) : window.fetch(e.json).then((e=>e.json())).then((t=>(loaders[e.json] = t,
            t)));
        if (e.name) {
            const t = "".concat(e.name, e.version);
            return loaders[t] ? loaders[t] : loadShopifyWithPromise(e)
        }
        return Promise.reject()
    }
    function getScriptWithPromise(e, t) {
        const s = new Promise(((s,i)=>{
            "text" === t ? fetch(e).then((e=>e.text())).then((e=>{
                s(e)
            }
            )).catch((e=>{
                i(e)
            }
            )) : getScript(e, (function() {
                s()
            }
            ), (function() {
                i()
            }
            ))
        }
        ));
        return loaders[e] = s,
        s
    }
    function loadShopifyWithPromise(e) {
        const t = "".concat(e.name, e.version)
          , s = new Promise(((t,s)=>{
            try {
                window.Shopify.loadFeatures([{
                    name: e.name,
                    version: e.version,
                    onLoad: e=>{
                        onLoadFromShopify(t, s, e)
                    }
                }])
            } catch (e) {
                s(e)
            }
        }
        ));
        return loaders[t] = s,
        s
    }
    function onLoadFromShopify(e, t, s) {
        return s ? t(s) : e()
    }
    window.isYoutubeAPILoaded = !1,
    window.isPlyrLoaded = !1;
    const selectors$f = {
        elements: {
            scrollbarAttribute: "data-scrollbar",
            scrollbar: "data-scrollbar-slider",
            scrollbarSlideFullWidth: "data-scrollbar-slide-fullwidth",
            scrollbarArrowPrev: "[data-scrollbar-arrow-prev]",
            scrollbarArrowNext: "[data-scrollbar-arrow-next]"
        },
        classes: {
            hide: "is-hidden"
        },
        times: {
            delay: 200
        }
    };
    class NativeScrollbar {
        constructor(e) {
            this.scrollbar = e,
            this.arrowNext = this.scrollbar.parentNode.querySelector(selectors$f.elements.scrollbarArrowNext),
            this.arrowPrev = this.scrollbar.parentNode.querySelector(selectors$f.elements.scrollbarArrowPrev),
            this.scrollbar.hasAttribute(selectors$f.elements.scrollbarAttribute) && (this.init(),
            this.resize()),
            this.scrollbar.hasAttribute(selectors$f.elements.scrollbar) && this.scrollToVisibleElement()
        }
        init() {
            this.arrowNext && this.arrowPrev && (this.toggleNextArrow(),
            this.events())
        }
        resize() {
            document.addEventListener("theme:resize", (()=>{
                this.toggleNextArrow()
            }
            ))
        }
        events() {
            this.arrowNext.addEventListener("click", (e=>{
                e.preventDefault(),
                this.goToNext()
            }
            )),
            this.arrowPrev.addEventListener("click", (e=>{
                e.preventDefault(),
                this.goToPrev()
            }
            )),
            this.scrollbar.addEventListener("scroll", (()=>{
                this.togglePrevArrow(),
                this.toggleNextArrow()
            }
            ))
        }
        goToNext() {
            const e = (this.scrollbar.hasAttribute(selectors$f.elements.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2) + this.scrollbar.scrollLeft;
            this.move(e),
            this.arrowPrev.classList.remove(selectors$f.classes.hide),
            this.toggleNextArrow()
        }
        goToPrev() {
            const e = this.scrollbar.hasAttribute(selectors$f.elements.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2
              , t = this.scrollbar.scrollLeft - e;
            this.move(t),
            this.arrowNext.classList.remove(selectors$f.classes.hide),
            this.togglePrevArrow()
        }
        toggleNextArrow() {
            setTimeout((()=>{
                this.arrowNext.classList.toggle(selectors$f.classes.hide, Math.round(this.scrollbar.scrollLeft + this.scrollbar.getBoundingClientRect().width + 1) >= this.scrollbar.scrollWidth)
            }
            ), selectors$f.times.delay)
        }
        togglePrevArrow() {
            setTimeout((()=>{
                this.arrowPrev.classList.toggle(selectors$f.classes.hide, this.scrollbar.scrollLeft <= 0)
            }
            ), selectors$f.times.delay)
        }
        scrollToVisibleElement() {
            [].forEach.call(this.scrollbar.children, (e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault(),
                    this.move(e.offsetLeft - e.clientWidth)
                }
                ))
            }
            ))
        }
        move(e) {
            this.scrollbar.scrollTo({
                top: 0,
                left: e,
                behavior: "smooth"
            })
        }
    }
    const defaults = {
        color: "ash"
    }
      , selectors$g = {
        formGridSwatch: "[data-grid-swatch-form]",
        swatch: "data-swatch",
        outerGrid: "[data-product-grid-item]",
        slide: "[data-grid-slide]",
        image: "data-swatch-image",
        variant: "data-swatch-variant",
        button: "[data-swatch-button]",
        link: "[data-grid-link]",
        wrapper: "[data-grid-swatches]",
        template: "[data-swatch-template]",
        handle: "data-swatch-handle",
        label: "data-swatch-label",
        tooltip: "data-tooltip",
        swatchCount: "data-swatch-count",
        scrollbar: "data-scrollbar"
    }
      , classes$5 = {
        visible: "is-visible",
        stopEvents: "no-events"
    };
    class ColorMatch {
        constructor(e={}) {
            this.settings = {
                ...defaults,
                ...e
            },
            this.match = this.init()
        }
        getColor() {
            return this.match
        }
        init() {
            return loadScript({
                json: window.theme.assets.swatches
            }).then((e=>this.matchColors(e, this.settings.color))).catch((e=>{
                console.log("failed to load swatch colors script"),
                console.log(e)
            }
            ))
        }
        matchColors(e, t) {
            let s = "#E5E5E5"
              , i = null;
            const o = window.theme.assets.base || "/"
              , r = t.toLowerCase().replace(/\s/g, "")
              , a = e.colors;
            if (a) {
                let e = null;
                if (a.filter(((t,s)=>{
                    if (Object.keys(t).toString().toLowerCase().replace(/\s/g, "") === r)
                        return e = s,
                        t
                }
                )).length && null !== e) {
                    const t = Object.values(a[e])[0];
                    s = t,
                    (t.includes(".jpg") || t.includes(".jpeg") || t.includes(".png") || t.includes(".svg")) && (i = `${o}${t}`,
                    s = "#888888")
                }
            }
            return {
                color: this.settings.color,
                path: i,
                hex: s
            }
        }
    }
    class Swatch {
        constructor(e) {
            this.element = e,
            this.colorString = e.getAttribute(selectors$g.swatch),
            this.image = e.getAttribute(selectors$g.image),
            this.variant = e.getAttribute(selectors$g.variant);
            new ColorMatch({
                color: this.colorString
            }).getColor().then((e=>{
                this.colorMatch = e,
                this.init()
            }
            ))
        }
        init() {
            this.setStyles(),
            this.variant && this.handleEvents()
        }
        setStyles() {
            this.colorMatch.hex && this.element.style.setProperty("--swatch", `${this.colorMatch.hex}`),
            this.colorMatch.path && (this.element.style.setProperty("background-image", `url(${this.colorMatch.path})`),
            this.element.style.setProperty("background-size", "cover"),
            this.element.style.setProperty("background-position", "center center"))
        }
        handleEvents() {
            this.outer = this.element.closest(selectors$g.outerGrid),
            this.outer && (this.slide = this.outer.querySelector(selectors$g.slide),
            this.linkElement = this.outer.querySelector(selectors$g.link),
            this.linkElementAll = this.outer.querySelectorAll(selectors$g.link),
            this.linkDestination = getUrlWithVariant(this.linkElement.getAttribute("href"), this.variant),
            this.button = this.element.closest(selectors$g.button),
            this.button.closest(selectors$g.formGridSwatch) && this.button.addEventListener("mouseenter", function() {
                this.changeImage()
            }
            .bind(this)),
            this.button.closest(selectors$g.formGridSwatch) || this.button.addEventListener("click", function() {
                this.changeImage()
            }
            .bind(this)))
        }
        changeImage() {
            if (this.linkElementAll.forEach((e=>{
                e.setAttribute("href", this.linkDestination)
            }
            )),
            this.slide.setAttribute("src", this.linkDestination),
            this.image) {
                let e = 180 * Math.ceil(this.slide.offsetWidth / 180)
                  , t = themeImages.getSizedImageUrl(this.image, `${e}x`);
                window.fetch(t).then((e=>e.blob())).then((e=>{
                    var t = URL.createObjectURL(e);
                    this.slide.style.setProperty("background-color", "#fff"),
                    this.slide.style.setProperty("background-image", `url("${t}")`)
                }
                )).catch((e=>{
                    console.log(`Error: ${e}`)
                }
                ))
            }
        }
    }
    class GridSwatch {
        constructor(e, t) {
            this.counterSwatches = e.parentNode.previousElementSibling,
            this.template = document.querySelector(selectors$g.template).innerHTML,
            this.wrap = e,
            this.container = t,
            this.handle = e.getAttribute(selectors$g.handle);
            const s = e.getAttribute(selectors$g.label).trim().toLowerCase();
            fetchProduct(this.handle).then((e=>{
                this.product = e,
                this.colorOption = e.options.find((function(e) {
                    return e.name.toLowerCase() === s || null
                }
                )),
                this.colorOption && (this.swatches = this.colorOption.values,
                this.init())
            }
            ))
        }
        init() {
            this.wrap.innerHTML = "",
            this.count = 0,
            this.swatches.forEach((e=>{
                let t = this.product.variants.find((t=>t.options.includes(e)));
                if (t) {
                    this.count++;
                    const s = t.featured_media ? t.featured_media.preview_image.src : "";
                    this.wrap.innerHTML += Sqrl.render(this.template, {
                        color: e,
                        uniq: `${this.product.id}-${t.id}`,
                        variant: t.id,
                        available: t.available,
                        image: s
                    })
                }
            }
            )),
            this.swatchElements = this.wrap.querySelectorAll(`[${selectors$g.swatch}]`),
            this.counterSwatches.hasAttribute(selectors$g.swatchCount) && (this.counterSwatches.innerText = `${this.count} ${this.count > 1 ? theme.strings.otherColor : theme.strings.oneColor}`,
            this.counterSwatches.addEventListener("mouseenter", (()=>{
                this.wrap.closest(selectors$g.link).classList.add(classes$5.stopEvents),
                this.counterSwatches.nextElementSibling.classList.add(classes$5.visible)
            }
            )),
            this.counterSwatches.closest(selectors$g.outerGrid).addEventListener("mouseleave", (()=>{
                this.wrap.closest(selectors$g.link).classList.remove(classes$5.stopEvents),
                this.counterSwatches.nextElementSibling.classList.remove(classes$5.visible)
            }
            ))),
            this.wrap.hasAttribute(selectors$g.scrollbar) && new NativeScrollbar(this.wrap),
            this.swatchElements.forEach((e=>{
                new Swatch(e);
                const t = e.closest(`[${selectors$g.tooltip}]`);
                t && new Tooltip(t)
            }
            ))
        }
    }
    const makeGridSwatches = e=>{
        e.container.querySelectorAll(selectors$g.wrapper).forEach((e=>{
            new GridSwatch(e,void 0)
        }
        ))
    }
      , swatchSection = {
        onLoad() {
            this.swatches = [];
            this.container.querySelectorAll(`[${selectors$g.swatch}]`).forEach((e=>{
                this.swatches.push(new Swatch(e))
            }
            ))
        }
    }
      , swatchGridSection = {
        onLoad() {
            makeGridSwatches(this)
        }
    }
      , selectors$h = {
        elements: {
            html: "html",
            body: "body",
            sectionId: "data-section-id",
            sectionOuter: "[data-section-id]",
            productGrid: "data-product-grid-item",
            formQuickAdd: "[data-form-quick-add]",
            quickAddLabel: "data-quick-add-label",
            quickCollectionHande: "data-collection-handle",
            selectOption: "[data-select-option]:not([data-quick-add-button])",
            holderFormQuickAdd: "[data-quick-add-holder]",
            goToNextElement: "data-go-to-next",
            quickAddElement: "data-quick-add-button",
            productJson: "[data-product-json]",
            productOptionsJson: "[data-product-options-json]",
            quickAddFormHolder: "[data-quick-add-form-holder]",
            featuredImageHolder: "[data-grid-slide]",
            productImagesHolder: "[data-product-image]",
            productInformationHolder: "[data-product-information]",
            scrollbarHolder: "[data-scrollbar]",
            scrollbarArrowPrev: "[data-scrollbar-arrow-prev]",
            scrollbarArrowNext: "[data-scrollbar-arrow-next]",
            radioOption: "[data-radio-option]",
            popoutWrapper: "[data-popout]",
            popupList: "[data-popout-list]",
            popupoutOption: "[data-popout-option]",
            popupoutOptionValue: "data-value",
            popupoutToggle: "[data-popout-toggle]",
            selectPosition: "data-select-position",
            swatch: "data-swatch",
            backButton: "[data-back-button]",
            messageError: "[data-message-error]",
            idInput: '[name="id"]',
            buttonQuickAddMobile: "[data-button-quick-add-mobile]",
            ariaExpanded: "aria-expanded",
            input: "input"
        },
        classes: {
            active: "is-active",
            select: "is-selected",
            disable: "is-disable",
            hide: "is-hidden",
            added: "is-added",
            loading: "is-loading",
            visible: "is-visible",
            error: "has-error",
            focus: "is-focused",
            popupoutVisible: "popout-list--visible"
        },
        times: {
            debounce: 500,
            delay: 400,
            delaySmall: 200,
            delayMedium: 2e3,
            delayLarge: 5e3
        },
        imageSize: "800x800"
    }
      , instances$1 = [];
    class QuickAddProduct {
        constructor(e) {
            this.cart = window.cart,
            this.a11y = a11y,
            this.themeAccessibility = window.accessibility,
            this.document = document,
            this.html = this.document.querySelector(selectors$h.elements.html),
            this.body = this.document.querySelector(selectors$h.elements.body),
            this.productGrid = e,
            this.holder = this.productGrid.querySelector(selectors$h.elements.holderFormQuickAdd),
            this.quickAddLabel = this.productGrid.querySelector(`[${selectors$h.elements.quickAddLabel}]`),
            this.quickAddFormHolder = this.productGrid.querySelector(selectors$h.elements.quickAddFormHolder),
            this.featuredImageHolder = this.productGrid.querySelector(selectors$h.elements.featuredImageHolder),
            this.productInformationHolder = this.productGrid.querySelector(selectors$h.elements.productInformationHolder),
            this.buttonQuickAddMobile = this.productGrid.querySelector(selectors$h.elements.buttonQuickAddMobile),
            this.sectionOuter = this.productGrid.closest(selectors$h.elements.sectionOuter),
            this.sectionId = this.sectionOuter.getAttribute(selectors$h.elements.sectionId),
            this.productJSON = null,
            this.productOptionsJSON = null,
            this.productForm = null,
            this.selectedOptions = [],
            this.filteredOptions = [],
            this.enableMobileMode = !1,
            this.accessibilityStopEvent = !1,
            this.quickAddFormIsLoaded = !1,
            theme.enableQuickAdd && (this.accessibility(),
            this.show(),
            this.hide(),
            this.errorHandle())
        }
        initNativeScrollbar() {
            this.scrollbarHolder.length && this.scrollbarHolder.forEach((e=>{
                new NativeScrollbar(e)
            }
            ))
        }
        getForm() {
            if (this.quickAddFormIsLoaded)
                return;
            this.quickAddFormIsLoaded = !0;
            const e = "/" === theme.routes.root ? "" : theme.routes.root;
            fetch(e + "/products/" + this.quickAddLabel.getAttribute(selectors$h.elements.quickAddLabel) + "?section_id=api-quick-add").then((e=>e.text())).then((e=>{
                const t = document.createElement("div");
                t.innerHTML = e;
                const s = t.querySelector("[data-api-content]").innerHTML
                  , i = `${this.quickAddLabel.getAttribute(selectors$h.elements.quickCollectionHande)}-${this.sectionId}`;
                this.quickAddFormHolder.innerHTML = s.replaceAll("||collection-index||", i),
                this.loadForm()
            }
            )).catch((e=>{
                console.warn(e)
            }
            ))
        }
        loadForm() {
            this.form = this.quickAddFormHolder.querySelector(selectors$h.elements.formQuickAdd),
            this.selectOption = this.quickAddFormHolder.querySelectorAll(selectors$h.elements.selectOption),
            this.productElemJSON = this.quickAddFormHolder.querySelector(selectors$h.elements.productJson),
            this.productOptionsElemJSON = this.quickAddFormHolder.querySelector(selectors$h.elements.productOptionsJson),
            this.scrollbarHolder = this.quickAddFormHolder.querySelectorAll(selectors$h.elements.scrollbarHolder),
            this.popoutWrapper = this.quickAddFormHolder.querySelectorAll(selectors$h.elements.popoutWrapper),
            this.swatches = this.quickAddFormHolder.querySelectorAll(`[${selectors$h.elements.swatch}]`),
            this.backButtons = this.quickAddFormHolder.querySelectorAll(selectors$h.elements.backButton),
            this.swatches.length && (this.swatches.forEach((e=>{
                new Swatch(e)
            }
            )),
            this.changeVariantImageOnHover()),
            this.popoutWrapper.length && this.popoutWrapper.forEach((e=>{
                new Popout(e)
            }
            )),
            this.initNativeScrollbar(),
            this.initGoToBack();
            const e = this.productElemJSON && "" !== this.productElemJSON.innerHTML
              , t = this.productOptionsElemJSON && "" !== this.productOptionsElemJSON.innerHTML;
            e && t ? (this.productJSON = JSON.parse(this.productElemJSON.innerHTML),
            this.productOptionsJSON = JSON.parse(this.productOptionsElemJSON.innerHTML),
            this.initForm()) : console.error("Missing product JSON or product options with values JSON")
        }
        initForm() {
            this.filterFirstOptionValues(),
            this.productForm = new ProductForm(this.form,this.productJSON,{
                onOptionChange: this.onOptionChange.bind(this)
            }),
            this.enableMobileMode ? (this.addFirstVariantIsDefault(this.buttonQuickAddMobile.hasAttribute(selectors$h.elements.quickAddElement)),
            this.buttonQuickAddMobile.classList.add(selectors$h.classes.hide),
            this.buttonQuickAddMobile.classList.remove(selectors$h.classes.loading),
            this.quickAddLabel.classList.add(selectors$h.classes.hide),
            this.toggleClasses()) : this.quickAddLabel.classList.remove(selectors$h.classes.disable, selectors$h.classes.hide)
        }
        onOptionChange(e) {
            const t = e.target
              , s = t.closest(selectors$h.elements.selectOption)
              , i = Number(s.getAttribute(selectors$h.elements.selectPosition))
              , o = e.dataset.variant ? e.dataset.variant.options[i - 1] : e.dataset.options[i - 1]
              , r = this.body.classList.contains(selectors$h.classes.focus);
            this.changeVariantImage(e.dataset.variant),
            r && this.accessibilityStopEvent || (this.selectedOptions.push(e.target.value),
            s.classList.add(selectors$h.classes.select),
            this.filterAvailableOptions(o, i),
            t.hasAttribute(selectors$h.elements.goToNextElement) && (s.classList.remove(selectors$h.classes.active),
            s.nextElementSibling.classList.add(selectors$h.classes.active)),
            t.hasAttribute(selectors$h.elements.quickAddElement) && e.dataset.variant.available && (theme.cartDrawerEnabled && (this.quickAddLabel.classList.remove(selectors$h.classes.hide),
            this.quickAddLabel.classList.add(selectors$h.classes.loading)),
            this.html.dispatchEvent(new CustomEvent("cart:add-to-cart",{
                bubbles: !0,
                detail: {
                    element: this.holder,
                    label: this.quickAddLabel,
                    data: {
                        id: e.dataset.variant.id,
                        quantity: 1
                    }
                }
            })),
            setTimeout((()=>{
                this.selectedOptions = [],
                this.resetInputsOfInstance()
            }
            ), selectors$h.times.delayMedium),
            s.classList.remove(selectors$h.classes.active)),
            r && t.hasAttribute(selectors$h.elements.goToNextElement) && this.accessibilityTrapFocus(s.nextElementSibling),
            this.accessibilityStopEvent = !1)
        }
        initGoToBack() {
            this.backButtons.length && this.backButtons.forEach((e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault();
                    const s = this.body.classList.contains(selectors$h.classes.focus);
                    this.selectedOptions.pop();
                    const i = e.closest(selectors$h.elements.selectOption);
                    let o = i.previousElementSibling.matches(selectors$h.elements.selectOption) ? i.previousElementSibling : this.quickAddLabel;
                    if (o === this.quickAddLabel && s && (this.themeAccessibility.lastFocused = this.quickAddLabel),
                    o === this.quickAddLabel && this.enableMobileMode && (o = this.buttonQuickAddMobile),
                    o !== this.quickAddLabel) {
                        s && this.accessibilityTrapFocus(o);
                        const e = i.querySelectorAll(selectors$h.elements.input)
                          , t = i.querySelectorAll(selectors$h.elements.popupoutOption)
                          , r = o.querySelectorAll(selectors$h.elements.input)
                          , a = o.querySelectorAll(selectors$h.elements.popupoutOption);
                        e && e.forEach((e=>{
                            e.checked = !1
                        }
                        )),
                        t && t.forEach((e=>{
                            e.classList.remove(selectors$h.classes.visible)
                        }
                        )),
                        r && r.forEach((e=>{
                            e.checked = !1
                        }
                        )),
                        a && a.forEach((e=>{
                            e.classList.remove(selectors$h.classes.visible)
                        }
                        ))
                    }
                    o !== this.buttonQuickAddMobile && (s && this.accessibilityTrapFocus(o),
                    o.classList.add(selectors$h.classes.active, selectors$h.classes.select)),
                    o === this.buttonQuickAddMobile && this.holder.classList.remove(selectors$h.classes.visible),
                    o.classList.remove(selectors$h.classes.hide),
                    i.classList.remove(selectors$h.classes.active, selectors$h.classes.select),
                    s && o.focus()
                }
                ))
            }
            ))
        }
        toggleClasses() {
            if (this.holder.classList.add(selectors$h.classes.visible),
            this.selectOption && this.selectOption.length && "&nbsp;" !== this.quickAddFormHolder.innerHTML) {
                this.quickAddLabel.classList.add(selectors$h.classes.hide);
                0 === Array.from(this.selectOption).filter((e=>e.classList.contains(selectors$h.classes.active))).length && (this.selectOption[0].classList.add(selectors$h.classes.active),
                this.body.classList.contains(selectors$h.classes.focus) && this.accessibilityStopEvent && setTimeout((()=>{
                    this.accessibilityTrapFocus(this.selectOption[0])
                }
                ), selectors$h.times.delaySmall))
            }
        }
        addFirstVariantIsDefault(e) {
            const t = this.productJSON.variants[0];
            e && t.available && (theme.cartDrawerEnabled && (this.quickAddLabel.classList.remove(selectors$h.classes.hide),
            this.quickAddLabel.classList.add(selectors$h.classes.loading)),
            this.html.dispatchEvent(new CustomEvent("cart:add-to-cart",{
                bubbles: !0,
                detail: {
                    element: this.holder,
                    label: this.quickAddLabel,
                    data: {
                        id: t.id,
                        quantity: 1
                    }
                }
            })))
        }
        show() {
            this.buttonQuickAddMobile && this.buttonQuickAddMobile.addEventListener("click", (()=>{
                this.enableMobileMode = !0,
                this.buttonQuickAddMobile.classList.add(selectors$h.classes.loading),
                "&nbsp;" !== this.quickAddFormHolder.innerHTML || this.quickAddFormIsLoaded ? (this.toggleClasses(),
                this.buttonQuickAddMobile.classList.remove(selectors$h.classes.loading),
                this.buttonQuickAddMobile.classList.add(selectors$h.classes.hide),
                this.holder.classList.add(selectors$h.classes.visible)) : this.getForm(),
                null !== this.productJSON && this.addFirstVariantIsDefault(this.buttonQuickAddMobile.hasAttribute(selectors$h.elements.quickAddElement))
            }
            )),
            this.productGrid && this.productGrid.addEventListener("mouseenter", (()=>{
                this.enableMobileMode = !1,
                this.hideOtherHolders(),
                this.quickAddFormHolder && "&nbsp;" === this.quickAddFormHolder.innerHTML && !this.quickAddFormIsLoaded && this.getForm()
            }
            )),
            this.quickAddLabel && (this.quickAddLabel.addEventListener("focusin", (()=>{
                this.enableMobileMode = !1,
                "&nbsp;" !== this.quickAddFormHolder.innerHTML || this.quickAddFormIsLoaded || this.getForm()
            }
            )),
            this.quickAddLabel.addEventListener("click", (()=>{
                this.enableMobileMode = !1;
                this.quickAddLabel.classList.contains(selectors$h.classes.added) || this.quickAddLabel.classList.contains(selectors$h.classes.disable) || null === this.productJSON || (this.selectedOptions = [],
                this.addFirstVariantIsDefault(this.quickAddLabel.hasAttribute(selectors$h.elements.quickAddElement)),
                "&nbsp;" !== this.quickAddFormHolder.innerHTML && this.toggleClasses())
            }
            ))),
            this.productInformationHolder.addEventListener("mouseenter", (()=>{
                this.featuredImageHolder.closest(selectors$h.elements.productImagesHolder).classList.remove(selectors$h.classes.visible)
            }
            ))
        }
        hide() {
            (this.quickAddLabel || this.buttonQuickAddMobile) && (theme.cartDrawerEnabled ? this.document.addEventListener("theme:cart-close", (()=>{
                setTimeout((()=>{
                    this.resetButtonsOfInstance()
                }
                ), selectors$h.times.delayLarge)
            }
            )) : setTimeout((()=>{
                this.resetButtonsOfInstance()
            }
            ), selectors$h.times.delayLarge))
        }
        accessibility() {
            this.productGrid.addEventListener("keyup", (e=>{
                if (e.keyCode === window.theme.keyboardKeys.TAB && (this.accessibilityStopEvent = !0),
                e.keyCode === window.theme.keyboardKeys.ENTER) {
                    this.accessibilityStopEvent = !1;
                    (e.target.hasAttribute(selectors$h.elements.popupoutOptionValue) ? e.target.closest(selectors$h.elements.popupList).nextElementSibling : e.target).dispatchEvent(new Event("change"))
                }
            }
            ))
        }
        accessibilityTrapFocus(e) {
            this.a11y.removeTrapFocus(),
            this.a11y.trapFocus(e, {
                elementToFocus: e.querySelector(selectors$h.elements.backButton)
            })
        }
        filterAvailableOptions(e, t, s=!0) {
            const i = this.productJSON.variants.filter((s=>{
                if (!(s.options.length > 1))
                    return s[`option${t}`] === e && s.available;
                {
                    let i = [];
                    if (this.selectedOptions.forEach(((o,r)=>{
                        i.push(s[`option${t}`] === e && s.options[r] === o && s.available)
                    }
                    )),
                    !i.includes(!1) && i.length > 0)
                        return s
                }
            }
            ));
            this.productOptionsJSON.forEach((e=>{
                if (e.position !== t) {
                    const t = {};
                    t.name = e.name,
                    t.position = e.position,
                    t.values = [],
                    e.values.forEach((s=>{
                        i.filter((t=>t[`option${e.position}`] === s)).length && t.values.push(s)
                    }
                    )),
                    this.filteredOptions = [...this.filteredOptions, t]
                }
            }
            )),
            s && (this.disableUnavailableValues(),
            this.filteredOptions = [])
        }
        filterFirstOptionValues() {
            this.productOptionsJSON[0].values.forEach((e=>{
                if (0 === this.productJSON.variants.filter((t=>t.option1 === e && t.available)).length && void 0 !== this.selectOption[0]) {
                    const t = this.selectOption[0].querySelector(`input[value="${e}"]`)
                      , s = this.selectOption[0].querySelector(`[${selectors$h.elements.popupoutOptionValue}="${e}"]`);
                    t && (t.checked = !1,
                    t.disabled = !0),
                    s && (s.classList.add(selectors$h.classes.disable),
                    s.setAttribute("tabindex", -1))
                }
            }
            ))
        }
        disableUnavailableValues() {
            this.selectOption && this.selectOption.forEach((e=>{
                const t = e.querySelectorAll(selectors$h.elements.input)
                  , s = e.querySelectorAll(selectors$h.elements.popupoutOption);
                t.forEach((t=>{
                    e.classList.contains(selectors$h.classes.select) || (t.checked = !1,
                    t.disabled = !0),
                    this.filteredOptions.forEach((e=>{
                        e.values.includes(t.value) && (t.disabled = !1)
                    }
                    ))
                }
                )),
                s.forEach((t=>{
                    e.classList.contains(selectors$h.classes.select) || (t.setAttribute("tabindex", -1),
                    t.classList.add(selectors$h.classes.disable)),
                    this.filteredOptions.forEach((e=>{
                        e.values.includes(t.getAttribute(`${selectors$h.elements.popupoutOptionValue}`)) && (t.classList.remove(selectors$h.classes.disable),
                        t.setAttribute("tabindex", 1))
                    }
                    ))
                }
                ))
            }
            ))
        }
        changeVariantImageOnHover() {
            this.swatches.forEach((e=>{
                e.addEventListener("mouseover", (()=>{
                    for (let t = 0; t < this.productJSON.variants.length; t++) {
                        const s = this.productJSON.variants[t];
                        if (void 0 !== s.featured_media && s.options[this.selectedOptions.length] === e.getAttribute(selectors$h.elements.swatch)) {
                            this.changeVariantImage(s);
                            break
                        }
                    }
                }
                ))
            }
            ))
        }
        changeVariantImage(e) {
            if (e && e.featured_media && void 0 !== e.featured_media) {
                const t = themeImages.getSizedImageUrl(e.featured_media.preview_image.src, selectors$h.imageSize);
                this.featuredImageHolder.style.setProperty("background-image", `url(${t})`),
                this.featuredImageHolder.closest(selectors$h.elements.productImagesHolder).classList.add(selectors$h.classes.visible)
            }
        }
        resetOptions(e) {
            e.querySelectorAll(selectors$h.elements.input).forEach((e=>{
                e.checked = !1,
                e.disabled = !1
            }
            )),
            e.querySelectorAll(selectors$h.elements.popupoutOption).forEach((e=>{
                e.classList.remove(selectors$h.classes.disable),
                e.setAttribute("tabindex", 1)
            }
            ))
        }
        hideOtherHolders() {
            const e = this.document.querySelectorAll(selectors$h.elements.holderFormQuickAdd);
            e && e.forEach((e=>{
                if (e !== this.holder) {
                    e.classList.remove(selectors$h.classes.visible);
                    const t = e.querySelector(selectors$h.elements.popupoutToggle);
                    t && (t.setAttribute(selectors$h.elements.ariaExpanded, !1),
                    t.nextElementSibling.classList.remove(selectors$h.classes.popupoutVisible)),
                    this.popoutWrapper && e.closest(`[${selectors$h.elements.productGrid}]`).querySelector(selectors$h.elements.productImagesHolder).classList.remove(selectors$h.classes.visible)
                }
            }
            ))
        }
        resetInputsOfInstance() {
            this.selectOption && (this.quickAddLabel.classList.remove(selectors$h.classes.hide),
            this.initNativeScrollbar(),
            this.selectOption.forEach((e=>{
                e.classList.remove(selectors$h.classes.active, selectors$h.classes.select);
                const t = e.querySelector(selectors$h.elements.popupoutToggle);
                t && (t.innerText = theme.strings.selectValue,
                t.setAttribute(selectors$h.elements.ariaExpanded, !1)),
                this.resetOptions(e)
            }
            )),
            this.filterFirstOptionValues(),
            this.filteredOptions = [])
        }
        resetButtonsOfInstance() {
            this.quickAddLabel.classList.remove(selectors$h.classes.select, selectors$h.classes.added, selectors$h.classes.visible),
            this.buttonQuickAddMobile.classList.remove(selectors$h.classes.hide)
        }
        errorHandle() {
            this.html.addEventListener("cart:add-to-error", (e=>{
                const t = e.detail.holder
                  , s = t.querySelector(selectors$h.elements.messageError);
                t.querySelector(`[${selectors$h.elements.quickAddLabel}]`).classList.remove(selectors$h.classes.visible, selectors$h.classes.added, selectors$h.classes.loading),
                t.classList.add(selectors$h.classes.error),
                s.innerText = e.detail.description,
                setTimeout((()=>{
                    t.classList.remove(selectors$h.classes.error),
                    t.classList.add(selectors$h.classes.visible),
                    t.previousElementSibling.classList.remove(selectors$h.classes.hide)
                }
                ), selectors$h.times.delayLarge)
            }
            ))
        }
    }
    const quickAddProduct = {
        onLoad() {
            this.container.querySelectorAll(`[${selectors$h.elements.productGrid}]`).forEach((e=>{
                instances$1.push(new QuickAddProduct(e))
            }
            ))
        }
    }
      , selectors$i = {
        rangeSlider: "[data-range-slider]",
        rangeDotLeft: "[data-range-left]",
        rangeDotRight: "[data-range-right]",
        rangeLine: "[data-range-line]",
        rangeHolder: "[data-range-holder]",
        dataMin: "data-se-min",
        dataMax: "data-se-max",
        dataMinValue: "data-se-min-value",
        dataMaxValue: "data-se-max-value",
        dataStep: "data-se-step",
        dataFilterUpdate: "data-range-filter-update",
        priceMin: "[data-field-price-min]",
        priceMax: "[data-field-price-max]"
    }
      , classes$6 = {
        classInitialized: "is-initialized"
    };
    class RangeSlider {
        constructor(e) {
            this.container = e.container,
            this.slider = e.querySelector(selectors$i.rangeSlider),
            this.slider && (this.onMoveEvent = e=>this.onMove(e),
            this.onStopEvent = e=>this.onStop(e),
            this.onStartEvent = e=>this.onStart(e),
            this.startX = 0,
            this.x = 0,
            this.touchLeft = this.slider.querySelector(selectors$i.rangeDotLeft),
            this.touchRight = this.slider.querySelector(selectors$i.rangeDotRight),
            this.lineSpan = this.slider.querySelector(selectors$i.rangeLine),
            this.min = parseFloat(this.slider.getAttribute(selectors$i.dataMin)),
            this.max = parseFloat(this.slider.getAttribute(selectors$i.dataMax)),
            this.step = 0,
            this.normalizeFact = 26,
            this.init())
        }
        init() {
            let e = this.min;
            this.slider.hasAttribute(selectors$i.dataMinValue) && (e = parseFloat(this.slider.getAttribute(selectors$i.dataMinValue)));
            let t = this.max;
            this.slider.hasAttribute(selectors$i.dataMaxValue) && (t = parseFloat(this.slider.getAttribute(selectors$i.dataMaxValue))),
            e < this.min && (e = this.min),
            t > this.max && (t = this.max),
            e > t && (e = t),
            this.slider.getAttribute(selectors$i.dataStep) && (this.step = Math.abs(parseFloat(this.slider.getAttribute(selectors$i.dataStep)))),
            this.reset(),
            this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth,
            this.selectedTouch = null,
            this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact,
            this.setMinValue(e),
            this.setMaxValue(t),
            this.touchLeft.addEventListener("mousedown", this.onStartEvent),
            this.touchRight.addEventListener("mousedown", this.onStartEvent),
            this.touchLeft.addEventListener("touchstart", this.onStartEvent),
            this.touchRight.addEventListener("touchstart", this.onStartEvent),
            this.slider.classList.add(classes$6.classInitialized)
        }
        reset() {
            this.touchLeft.style.left = "0px",
            this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px",
            this.lineSpan.style.marginLeft = "0px",
            this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px",
            this.startX = 0,
            this.x = 0
        }
        setMinValue(e) {
            const t = (e - this.min) / (this.max - this.min);
            this.touchLeft.style.left = Math.ceil(t * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + "px",
            this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px",
            this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px",
            this.slider.setAttribute(selectors$i.dataMinValue, e)
        }
        setMaxValue(e) {
            const t = (e - this.min) / (this.max - this.min);
            this.touchRight.style.left = Math.ceil(t * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + "px",
            this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px",
            this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px",
            this.slider.setAttribute(selectors$i.dataMaxValue, e)
        }
        onStart(e) {
            e.preventDefault();
            let t = e;
            e.touches && (t = e.touches[0]),
            e.currentTarget === this.touchLeft ? this.x = this.touchLeft.offsetLeft : this.x = this.touchRight.offsetLeft,
            this.startX = t.pageX - this.x,
            this.selectedTouch = e.currentTarget,
            this.slider.addEventListener("mousemove", this.onMoveEvent),
            this.slider.addEventListener("mouseup", this.onStopEvent),
            this.slider.addEventListener("touchmove", this.onMoveEvent),
            this.slider.addEventListener("touchend", this.onStopEvent)
        }
        onMove(e) {
            let t = e;
            if (e.touches && (t = e.touches[0]),
            this.x = t.pageX - this.startX,
            this.selectedTouch === this.touchLeft ? (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10 ? this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10 : this.x < 0 && (this.x = 0),
            this.selectedTouch.style.left = this.x + "px") : this.selectedTouch === this.touchRight && (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10 ? this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10 : this.x > this.maxX && (this.x = this.maxX),
            this.selectedTouch.style.left = this.x + "px"),
            this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px",
            this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px",
            this.calculateValue(),
            this.slider.getAttribute("on-change")) {
                new Function("min, max",this.slider.getAttribute("on-change"))(this.slider.getAttribute(selectors$i.dataMinValue), this.slider.getAttribute(selectors$i.dataMaxValue))
            }
            this.onChange(this.slider.getAttribute(selectors$i.dataMinValue), this.slider.getAttribute(selectors$i.dataMaxValue))
        }
        onStop(e) {
            this.slider.removeEventListener("mousemove", this.onMoveEvent),
            this.slider.removeEventListener("mouseup", this.onStopEvent),
            this.slider.removeEventListener("touchmove", this.onMoveEvent),
            this.slider.removeEventListener("touchend", this.onStopEvent),
            this.selectedTouch = null,
            this.calculateValue(),
            this.onChanged(this.slider.getAttribute(selectors$i.dataMinValue), this.slider.getAttribute(selectors$i.dataMaxValue))
        }
        onChange(e, t) {
            const s = this.slider.closest(selectors$i.rangeHolder);
            if (s) {
                const i = s.querySelector(selectors$i.priceMin)
                  , o = s.querySelector(selectors$i.priceMax);
                i && o && (i.value = e,
                o.value = t)
            }
        }
        onChanged(e, t) {
            this.slider.hasAttribute(selectors$i.dataFilterUpdate) && this.slider.dispatchEvent(new CustomEvent("range:filter:update",{
                bubbles: !0
            }))
        }
        calculateValue() {
            const e = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
            let t = this.lineSpan.offsetLeft / this.initialValue
              , s = t + e;
            if (t = t * (this.max - this.min) + this.min,
            s = s * (this.max - this.min) + this.min,
            0 !== this.step) {
                let e = Math.floor(t / this.step);
                t = this.step * e,
                e = Math.floor(s / this.step),
                s = this.step * e
            }
            this.selectedTouch === this.touchLeft && this.slider.setAttribute(selectors$i.dataMinValue, t),
            this.selectedTouch === this.touchRight && this.slider.setAttribute(selectors$i.dataMaxValue, s)
        }
    }
    const selectors$j = {
        form: "[data-collection-filters-form]",
        inputs: "input, select, label, textarea",
        priceMin: "[data-field-price-min]",
        priceMax: "[data-field-price-max]",
        rangeMin: "[data-se-min-value]",
        rangeMax: "[data-se-max-value]",
        rangeMinValue: "data-se-min-value",
        rangeMaxValue: "data-se-max-value"
    };
    class FiltersForm {
        constructor(e) {
            this.form = e.container.querySelector(selectors$j.form),
            this.filtersInputs = [],
            this.form && (new RangeSlider(this.form),
            this.filtersInputs = this.form.querySelectorAll(selectors$j.inputs),
            this.init())
        }
        init() {
            this.filtersInputs.forEach((e=>{
                e.addEventListener("input", debounce(function() {
                    this.form && "function" == typeof this.form.submit && this.form.submit()
                }
                .bind(this), 500))
            }
            )),
            this.form.addEventListener("range:filter:update", (()=>this.updateRange()))
        }
        updateRange() {
            if (this.form && "function" == typeof this.form.submit) {
                const e = this.form.querySelector(selectors$j.rangeMin)
                  , t = this.form.querySelector(selectors$j.rangeMax)
                  , s = this.form.querySelector(selectors$j.priceMin)
                  , i = this.form.querySelector(selectors$j.priceMax);
                if (e && t && s && i && e.hasAttribute(selectors$j.rangeMinValue) && t.hasAttribute(selectors$j.rangeMaxValue)) {
                    const o = parseInt(s.placeholder)
                      , r = parseInt(i.placeholder)
                      , a = parseInt(e.getAttribute(selectors$j.rangeMinValue))
                      , n = parseInt(t.getAttribute(selectors$j.rangeMaxValue));
                    o === a && r === n || (s.value = a,
                    i.value = n,
                    this.form.submit())
                }
            }
        }
    }
    const collectionFiltersForm = {
        onLoad() {
            this.filterForm = new FiltersForm(this)
        },
        onUnload: function() {
            this.filterForm && "function" == typeof this.filterForm.unload && this.filterForm.unload()
        }
    }
      , selectors$k = {
        sort: "[data-sort-enabled]",
        sortLinks: "[data-sort-link]",
        sortValue: "data-value",
        collectionNav: "[data-collection-nav]",
        collectionNavGrouped: "[data-collection-nav-grouped]",
        collectionSidebarHeading: "[data-collection-sidebar-heading]",
        collectionSidebar: "[data-collection-sidebar]",
        collectionSidebarSlider: "[data-collection-sidebar-slider]",
        collectionSidebarSlideOut: "[data-collection-sidebar-slide-out]",
        collectionSidebarCloseButton: "[data-collection-sidebar-close]",
        showMoreOptions: "[data-show-more]",
        groupTagsButton: "[data-aria-toggle]",
        headerSticky: '[data-header-sticky="sticky"]',
        headerHeight: "[data-header-height]",
        linkAdd: "[data-link-add]",
        linkRemove: "[data-link-remove]",
        linkHidden: "[data-link-hidden]",
        swatch: "data-swatch"
    }
      , classes$7 = {
        expanded: "expanded",
        expanding: "expanding",
        noMobileAnimation: "no-mobile-animation",
        hidden: "is-hidden",
        active: "is-active"
    };
    let sections$7 = {};
    class Collection {
        constructor(e) {
            this.container = e.container,
            this.sort = this.container.querySelector(selectors$k.sort),
            this.collectionNav = this.container.querySelector(selectors$k.collectionNav),
            this.sortLinks = this.container.querySelectorAll(selectors$k.sortLinks),
            this.collectionSidebar = this.container.querySelector(selectors$k.collectionSidebar),
            this.collectionSidebarCloseButton = this.container.querySelector(selectors$k.collectionSidebarCloseButton),
            this.groupTagsButton = this.container.querySelector(selectors$k.groupTagsButton),
            this.headerSticky = null !== document.querySelector(selectors$k.headerSticky),
            this.showMoreOptions = this.container.querySelectorAll(selectors$k.showMoreOptions),
            this.collectionSidebarHeading = this.container.querySelectorAll(selectors$k.collectionSidebarHeading),
            this.swatches = this.container.querySelectorAll(`[${selectors$k.swatch}]`),
            this.resizeEvent = debounce((()=>this.hideSidebarSliderOnMobile()), 200),
            this.groupTagsButtonClickEvent = e=>this.groupTagsButtonClick(e),
            this.collectionSidebarCloseEvent = e=>this.collectionSidebarClose(e),
            this.init()
        }
        init() {
            this.sort && this.initClick(),
            this.removeUnusableFilters(),
            null !== this.groupTagsButton && (this.hideSidebarSliderOnMobile(),
            this.groupTagsButton.addEventListener("click", this.groupTagsButtonClickEvent),
            document.addEventListener("theme:resize", this.resizeEvent),
            setTimeout((()=>{
                this.collectionSidebar.classList.remove(classes$7.noMobileAnimation)
            }
            ), 1e3)),
            null !== this.collectionSidebarCloseButton && this.collectionSidebarCloseButton.addEventListener("click", this.collectionSidebarCloseEvent),
            this.container.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.ESCAPE && this.hideSidebar()
            }
            .bind(this)),
            this.showMoreOptions && this.showMoreOptions.forEach((e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault(),
                    e.classList.add(classes$7.hidden),
                    e.previousElementSibling.querySelectorAll(selectors$k.linkHidden).forEach((e=>{
                        e.classList.remove(classes$7.hidden)
                    }
                    ))
                }
                ))
            }
            )),
            this.collectionSidebarHeading && this.collectionSidebarHeading.forEach((e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault(),
                    e.classList.toggle(classes$7.active),
                    slideToggle(e.nextElementSibling),
                    e.nextElementSibling.nextElementSibling && slideToggle(e.nextElementSibling.nextElementSibling)
                }
                ))
            }
            )),
            this.swatches && this.swatches.forEach((e=>{
                new Swatch(e)
            }
            ))
        }
        onClick(e) {
            const t = e.currentTarget.getAttribute(selectors$k.sortValue)
              , s = new window.URL(window.location.href)
              , i = s.searchParams;
            i.set("sort_by", t),
            s.search = i.toString(),
            window.location.replace(s.toString())
        }
        initClick() {
            this.sortLinks.forEach((e=>{
                e.addEventListener("click", function(e) {
                    this.onClick(e)
                }
                .bind(this))
            }
            ))
        }
        removeUnusableFilters() {
            const e = this.container.querySelectorAll(selectors$k.collectionNavGrouped);
            e.length > 0 && e.forEach((e=>{
                const t = e.querySelector(selectors$k.linkAdd)
                  , s = e.querySelector(selectors$k.linkRemove);
                t || s || (hideElement(e),
                hideElement(e.parentElement.querySelector(selectors$k.collectionSidebarHeading)))
            }
            ))
        }
        showSidebarCallback() {
            const e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
              , t = this.container.querySelector(selectors$k.collectionSidebarSlideOut)
              , s = this.container.querySelector(selectors$k.collectionSidebarSlider) || t;
            if (e < theme.sizes.small && null === t) {
                const e = this.headerSticky ? document.querySelector(selectors$k.headerHeight).getBoundingClientRect().height : 0
                  , t = this.groupTagsButton.offsetTop - e;
                window.scrollTo({
                    top: t,
                    left: 0,
                    behavior: "smooth"
                })
            }
            (e < theme.sizes.small || null !== t) && document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: s
            }))
        }
        hideSidebar() {
            this.groupTagsButton.setAttribute("aria-expanded", "false"),
            this.collectionSidebar.classList.add(classes$7.expanding),
            this.collectionSidebar.classList.remove(classes$7.expanded),
            setTimeout((()=>{
                this.collectionSidebar.classList.remove(classes$7.expanding)
            }
            ), 500),
            document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0
            }))
        }
        hideSidebarSliderOnMobile() {
            (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small && this.hideSidebar()
        }
        collectionSidebarClose(e) {
            e.preventDefault(),
            this.hideSidebar()
        }
        groupTagsButtonClick() {
            this.collectionSidebar.classList.contains(classes$7.expanded) ? this.showSidebarCallback() : document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0
            }))
        }
        onUnload() {
            null !== this.groupTagsButton && this.groupTagsButton.removeEventListener("click", this.groupTagsButtonClickEvent),
            null !== this.collectionSidebarCloseButton && this.collectionSidebarCloseButton.removeEventListener("click", this.collectionSidebarCloseEvent)
        }
    }
    const collectionSection = {
        onLoad() {
            sections$7[this.id] = new Collection(this)
        },
        onUnload(e) {
            sections$7[this.id].onUnload(e)
        }
    };
    register("collection", [slider, parallaxHero, productGridReviews, quickAddProduct, collectionSection, popoutSection, swatchGridSection, collectionFiltersForm]);
    const selectors$l = {
        frame: "[data-ticker-frame]",
        scale: "[data-ticker-scale]",
        text: "[data-ticker-text]",
        clone: "data-clone",
        animationClass: "ticker--animated",
        unloadedClass: "ticker--unloaded",
        comparitorClass: "ticker__comparitor",
        moveTime: 1.63,
        space: 100
    };
    class Ticker {
        constructor(e, t=!1) {
            this.frame = e,
            this.stopClone = t,
            this.scale = this.frame.querySelector(selectors$l.scale),
            this.text = this.frame.querySelector(selectors$l.text),
            this.comparitor = this.text.cloneNode(!0),
            this.comparitor.classList.add(selectors$l.comparitorClass),
            this.frame.appendChild(this.comparitor),
            this.scale.classList.remove(selectors$l.unloadedClass),
            this.resizeEvent = debounce((()=>this.checkWidth()), 100),
            this.listen()
        }
        unload() {
            document.removeEventListener("theme:resize", this.resizeEvent)
        }
        listen() {
            document.addEventListener("theme:resize", this.resizeEvent),
            this.checkWidth()
        }
        checkWidth() {
            const e = 2 * window.getComputedStyle(this.frame).paddingLeft.replace("px", "");
            if (this.frame.clientWidth - e < this.comparitor.clientWidth || this.stopClone) {
                if (this.text.classList.add(selectors$l.animationClass),
                1 === this.scale.childElementCount) {
                    if (this.clone = this.text.cloneNode(!0),
                    this.clone.setAttribute(selectors$l.clone, ""),
                    this.scale.appendChild(this.clone),
                    this.stopClone)
                        for (let e = 0; e < 10; e++) {
                            const e = this.text.cloneNode(!0);
                            e.setAttribute(selectors$l.clone, ""),
                            this.scale.appendChild(e)
                        }
                    const e = this.text.clientWidth / selectors$l.space * selectors$l.moveTime;
                    this.scale.style.setProperty("--animation-time", `${e}s`)
                }
            } else {
                this.text.classList.add(selectors$l.animationClass);
                let e = this.scale.querySelector(`[${selectors$l.clone}]`);
                e && this.scale.removeChild(e),
                this.text.classList.remove(selectors$l.animationClass)
            }
        }
    }
    const selectors$m = {
        bar: "[data-bar]",
        barSlide: "[data-slide]",
        frame: "[data-ticker-frame]",
        header: "[data-header-wrapper]",
        slider: "[data-slider]",
        slideValue: "data-slide",
        tickerScale: "[data-ticker-scale]",
        tickerText: "[data-ticker-text]",
        dataTargetReferrer: "data-target-refferer"
    }
      , sections$8 = {};
    class Bar {
        constructor(e) {
            this.barHolder = e,
            this.locationPath = location.href,
            this.slides = this.barHolder.querySelectorAll(selectors$m.barSlide),
            this.slider = this.barHolder.querySelector(selectors$m.slider),
            this.init()
        }
        init() {
            this.removeAnnouncement(),
            this.slider && this.initSliders(),
            this.slider || this.initTickers(!0)
        }
        removeAnnouncement() {
            for (let e = 0; e < this.slides.length; e++) {
                const t = this.slides[e];
                t.hasAttribute(selectors$m.dataTargetReferrer) && (-1 !== this.locationPath.indexOf(t.getAttribute(selectors$m.dataTargetReferrer)) || window.Shopify.designMode || t.parentNode.removeChild(t))
            }
        }
        initSliders() {
            this.slider = new Slider(this.barHolder),
            this.slider.flkty.reposition(),
            this.barHolder.addEventListener("slider-is-loaded", (()=>{
                this.initTickers()
            }
            ))
        }
        initTickers(e=!1) {
            this.barHolder.querySelectorAll(selectors$m.frame).forEach((t=>{
                new Ticker(t,e)
            }
            ))
        }
        toggleTicker(e, t) {
            const s = document.querySelector(selectors$m.tickerScale)
              , i = document.querySelector(`[${selectors$m.slideValue}="${e.detail.blockId}"]`);
            t && i && (s.setAttribute("data-stop", ""),
            s.querySelectorAll(selectors$m.tickerText).forEach((e=>{
                e.classList.remove("ticker--animated"),
                e.style.transform = `translate3d(${-(i.offsetLeft - i.clientWidth)}px, 0, 0)`
            }
            ))),
            !t && i && (s.querySelectorAll(selectors$m.tickerText).forEach((e=>{
                e.classList.add("ticker--animated"),
                e.removeAttribute("style")
            }
            )),
            s.removeAttribute("data-stop"))
        }
        onBlockSelect(e) {
            this.slider ? this.slider.onBlockSelect(e) : this.toggleTicker(e, !0)
        }
        onBlockDeselect(e) {
            this.slider ? this.slider.onBlockDeselect(e) : this.toggleTicker(e, !1)
        }
    }
    const bar = {
        onLoad() {
            sections$8[this.id] = [];
            const e = this.container.querySelector(selectors$m.bar);
            sections$8[this.id].push(new Bar(e))
        },
        onBlockSelect(e) {
            sections$8[this.id].forEach((t=>{
                "function" == typeof t.onBlockSelect && t.onBlockSelect(e)
            }
            ))
        },
        onBlockDeselect(e) {
            sections$8[this.id].forEach((t=>{
                "function" == typeof t.onBlockSelect && t.onBlockDeselect(e)
            }
            ))
        }
    };
    register("announcement", [bar]);
    const selectors$n = {
        body: "body",
        drawerWrappper: "[data-drawer]",
        drawerInner: "[data-drawer-inner]",
        underlay: "[data-drawer-underlay]",
        stagger: "[data-stagger-animation]",
        wrapper: "[data-header-transparent]",
        transparent: "data-header-transparent",
        drawerToggle: "data-drawer-toggle",
        focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])'
    }
      , classes$8 = {
        isVisible: "drawer--visible",
        isFocused: "is-focused",
        headerStuck: "js__header__stuck"
    };
    let sections$9 = {};
    class Drawer {
        constructor(e) {
            this.drawer = e,
            this.drawerWrapper = this.drawer.closest(selectors$n.drawerWrappper),
            this.drawerInner = this.drawer.querySelector(selectors$n.drawerInner),
            this.underlay = this.drawer.querySelector(selectors$n.underlay),
            this.wrapper = this.drawer.closest(selectors$n.wrapper),
            this.key = this.drawer.dataset.drawer;
            const t = `[${selectors$n.drawerToggle}='${this.key}']`;
            this.buttons = document.querySelectorAll(t),
            this.staggers = this.drawer.querySelectorAll(selectors$n.stagger),
            this.body = document.querySelector(selectors$n.body),
            this.initWatchFocus = e=>this.watchFocus(e),
            this.connectToggle(),
            this.connectDrawer(),
            this.closers(),
            this.staggerChildAnimations()
        }
        connectToggle() {
            this.buttons.forEach((e=>{
                e.addEventListener("click", (()=>{
                    this.drawer.dispatchEvent(new CustomEvent("theme:drawer:toggle",{
                        bubbles: !1
                    }))
                }
                ))
            }
            ))
        }
        connectDrawer() {
            this.drawer.addEventListener("theme:drawer:toggle", (()=>{
                this.drawer.classList.contains(classes$8.isVisible) ? this.drawer.dispatchEvent(new CustomEvent("theme:drawer:close",{
                    bubbles: !0
                })) : this.drawer.dispatchEvent(new CustomEvent("theme:drawer:open",{
                    bubbles: !0
                }))
            }
            )),
            document.addEventListener("theme:drawer:close", this.hideDrawer.bind(this)),
            document.addEventListener("theme:drawer:open", this.showDrawer.bind(this))
        }
        staggerChildAnimations() {
            this.staggers.forEach((e=>{
                e.querySelectorAll(":scope > * > [data-animates]").forEach(((e,t)=>{
                    e.style.transitionDelay = 50 * t + 10 + "ms"
                }
                ))
            }
            ))
        }
        watchFocus(e) {
            !this.wrapper.contains(e.target) && this.body.classList.contains(classes$8.isFocused) && this.hideDrawer()
        }
        closers() {
            this.wrapper.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.ESCAPE && (this.hideDrawer(),
                this.buttons[0].focus())
            }
            .bind(this)),
            this.underlay.addEventListener("click", (()=>{
                this.hideDrawer()
            }
            ))
        }
        showDrawer() {
            document.dispatchEvent(new CustomEvent("theme:drawer:close",{
                bubbles: !1
            })),
            this.buttons.forEach((e=>{
                e.setAttribute("aria-expanded", !0),
                e.classList.add(classes$8.isVisible)
            }
            )),
            this.drawer.classList.add(classes$8.isVisible),
            this.drawer.querySelector(selectors$n.focusable).focus(),
            this.wrapper.setAttribute(selectors$n.transparent, !1),
            document.addEventListener("focusin", this.initWatchFocus),
            document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: this.drawerInner
            }))
        }
        hideDrawer() {
            this.buttons.forEach((e=>{
                e.setAttribute("aria-expanded", !0),
                e.classList.remove(classes$8.isVisible)
            }
            )),
            this.drawer.classList.remove(classes$8.isVisible),
            document.removeEventListener("focusin", this.initWatchFocus),
            this.wrapper.classList.contains(classes$8.headerStuck) || this.wrapper.setAttribute(selectors$n.transparent, theme.transparentHeader),
            document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0
            })),
            document.dispatchEvent(new CustomEvent("theme:sliderule:close",{
                bubbles: !1
            }))
        }
    }
    const drawer = {
        onLoad() {
            sections$9[this.id] = [];
            this.container.querySelectorAll(selectors$n.drawerWrappper).forEach((e=>{
                sections$9[this.id].push(new Drawer(e))
            }
            ))
        }
    }
      , selectors$o = {
        announcement: "[data-announcement-wrapper]",
        transparent: "data-header-transparent",
        header: "[data-header-wrapper] header",
        headerIsNotFixed: '[data-header-sticky="static"]'
    }
      , classes$9 = {
        stuck: "js__header__stuck",
        stuckAnimated: "js__header__stuck--animated",
        triggerAnimation: "js__header__stuck--trigger-animation",
        stuckBackdrop: "js__header__stuck__backdrop",
        headerIsNotVisible: "is-not-visible",
        hasStickyHeader: "has-sticky-header"
    };
    let sections$a = {};
    class Sticky {
        constructor(e) {
            this.wrapper = e,
            this.type = this.wrapper.dataset.headerSticky,
            this.sticks = "sticky" === this.type,
            this.static = "static" === this.type,
            this.win = window,
            this.animated = "directional" === this.type,
            this.currentlyStuck = !1,
            this.cls = this.wrapper.classList;
            const t = document.querySelector(selectors$o.announcement)
              , s = t ? t.clientHeight : 0;
            this.headerHeight = document.querySelector(selectors$o.header).clientHeight,
            this.blur = this.headerHeight + s,
            this.stickDown = this.headerHeight + s,
            this.stickUp = s,
            this.scrollEventStatic = ()=>this.checkIsVisible(),
            this.scrollEventListen = e=>this.listenScroll(e),
            this.scrollEventUpListen = ()=>this.scrollUpDirectional(),
            this.scrollEventDownListen = ()=>this.scrollDownDirectional(),
            "false" !== this.wrapper.getAttribute(selectors$o.transparent) && (this.blur = s),
            this.sticks && (this.stickDown = s,
            this.scrollDownInit(),
            document.body.classList.add(classes$9.hasStickyHeader)),
            this.static && document.addEventListener("theme:scroll", this.scrollEventStatic),
            this.listen()
        }
        unload() {
            (this.sticks || this.animated) && document.removeEventListener("theme:scroll", this.scrollEventListen),
            this.animated && (document.removeEventListener("theme:scroll:up", this.scrollEventUpListen),
            document.removeEventListener("theme:scroll:down", this.scrollEventDownListen)),
            this.static && document.removeEventListener("theme:scroll", this.scrollEventStatic)
        }
        listen() {
            (this.sticks || this.animated) && document.addEventListener("theme:scroll", this.scrollEventListen),
            this.animated && (document.addEventListener("theme:scroll:up", this.scrollEventUpListen),
            document.addEventListener("theme:scroll:down", this.scrollEventDownListen))
        }
        listenScroll(e) {
            e.detail.down ? (!this.currentlyStuck && e.detail.position > this.stickDown && this.stickSimple(),
            !this.currentlyBlurred && e.detail.position > this.blur && this.addBlur()) : (e.detail.position <= this.stickUp && this.unstickSimple(),
            e.detail.position <= this.blur && this.removeBlur())
        }
        stickSimple() {
            this.animated && this.cls.add(classes$9.stuckAnimated),
            this.cls.add(classes$9.stuck),
            this.wrapper.setAttribute(selectors$o.transparent, !1),
            this.currentlyStuck = !0
        }
        unstickSimple() {
            document.documentElement.hasAttribute("data-scroll-locked") || (this.cls.remove(classes$9.stuck),
            this.wrapper.setAttribute(selectors$o.transparent, theme.transparentHeader),
            this.animated && this.cls.remove(classes$9.stuckAnimated),
            this.currentlyStuck = !1)
        }
        scrollDownInit() {
            window.scrollY > this.stickDown && this.stickSimple(),
            window.scrollY > this.blur && this.addBlur()
        }
        stickDirectional() {
            this.cls.add(classes$9.triggerAnimation)
        }
        unstickDirectional() {
            this.cls.remove(classes$9.triggerAnimation)
        }
        scrollDownDirectional() {
            this.unstickDirectional()
        }
        scrollUpDirectional() {
            window.scrollY <= this.stickDown ? this.unstickDirectional() : this.stickDirectional()
        }
        addBlur() {
            this.cls.add(classes$9.stuckBackdrop),
            this.currentlyBlurred = !0
        }
        removeBlur() {
            this.cls.remove(classes$9.stuckBackdrop),
            this.currentlyBlurred = !1
        }
        checkIsVisible() {
            const e = document.querySelector(selectors$o.headerIsNotFixed)
              , t = this.win.pageYOffset;
            e && e.classList.toggle(classes$9.headerIsNotVisible, t >= this.headerHeight)
        }
    }
    const stickyHeader = {
        onLoad() {
            sections$a = new Sticky(this.container)
        },
        onUnload: function() {
            "function" == typeof sections$a.unload && sections$a.unload()
        }
    }
      , selectors$p = {
        disclosureToggle: "data-hover-disclosure-toggle",
        disclosureWrappper: "[data-hover-disclosure]",
        link: "[data-top-link]",
        wrapper: "[data-header-wrapper]",
        stagger: "[data-stagger]",
        staggerPair: "[data-stagger-first]",
        staggerAfter: "[data-stagger-second]",
        focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    }
      , classes$a = {
        isVisible: "is-visible",
        meganavVisible: "meganav--visible",
        meganavIsTransitioning: "meganav--is-transitioning"
    };
    let sections$b = {}
      , disclosures = {};
    class HoverDisclosure {
        constructor(e) {
            this.disclosure = e,
            this.wrapper = e.closest(selectors$p.wrapper),
            this.key = this.disclosure.id,
            this.trigger = document.querySelector(`[${selectors$p.disclosureToggle}='${this.key}']`),
            this.link = this.trigger.querySelector(selectors$p.link),
            this.grandparent = this.trigger.classList.contains("grandparent"),
            this.transitionTimeout = 0,
            this.trigger.setAttribute("aria-haspopup", !0),
            this.trigger.setAttribute("aria-expanded", !1),
            this.trigger.setAttribute("aria-controls", this.key),
            this.connectHoverToggle(),
            this.handleTablets(),
            this.staggerChildAnimations()
        }
        onBlockSelect(e) {
            this.disclosure.contains(e.target) && this.showDisclosure()
        }
        onBlockDeselect(e) {
            this.disclosure.contains(e.target) && this.hideDisclosure()
        }
        showDisclosure() {
            this.wrapper.classList.add(classes$a.meganavIsTransitioning),
            this.grandparent ? this.wrapper.classList.add(classes$a.meganavVisible) : this.wrapper.classList.remove(classes$a.meganavVisible),
            this.trigger.setAttribute("aria-expanded", !0),
            this.trigger.classList.add(classes$a.isVisible),
            this.disclosure.classList.add(classes$a.isVisible),
            this.transitionTimeout && clearTimeout(this.transitionTimeout);
            const e = this;
            this.transitionTimeout = setTimeout((function() {
                e.wrapper.classList.remove(classes$a.meganavIsTransitioning)
            }
            ), 200)
        }
        hideDisclosure() {
            this.disclosure.classList.remove(classes$a.isVisible),
            this.trigger.classList.remove(classes$a.isVisible),
            this.trigger.setAttribute("aria-expanded", !1),
            this.wrapper.classList.remove(classes$a.meganavVisible, classes$a.meganavIsTransitioning)
        }
        staggerChildAnimations() {
            this.disclosure.querySelectorAll(selectors$p.stagger).forEach(((e,t)=>{
                e.style.transitionDelay = 50 * t + 10 + "ms"
            }
            ));
            this.disclosure.querySelectorAll(selectors$p.staggerPair).forEach(((e,t)=>{
                const s = 150 * t;
                e.style.transitionDelay = `${s}ms`,
                e.parentElement.querySelectorAll(selectors$p.staggerAfter).forEach(((e,t)=>{
                    const i = 20 * (t + 1);
                    e.style.transitionDelay = `${s + i}ms`
                }
                ))
            }
            ))
        }
        handleTablets() {
            this.trigger.addEventListener("touchstart", function(e) {
                this.disclosure.classList.contains(classes$a.isVisible) || (e.preventDefault(),
                this.showDisclosure())
            }
            .bind(this), {
                passive: !0
            })
        }
        connectHoverToggle() {
            this.trigger.addEventListener("mouseenter", this.showDisclosure.bind(this)),
            this.link.addEventListener("focus", this.showDisclosure.bind(this)),
            this.trigger.addEventListener("mouseleave", this.hideDisclosure.bind(this)),
            this.trigger.addEventListener("focusout", function(e) {
                this.trigger.contains(e.relatedTarget) || this.hideDisclosure()
            }
            .bind(this)),
            this.disclosure.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.ESCAPE && this.hideDisclosure()
            }
            .bind(this))
        }
    }
    const hoverDisclosure = {
        onLoad() {
            sections$b[this.id] = [],
            disclosures = this.container.querySelectorAll(selectors$p.disclosureWrappper),
            disclosures.forEach((e=>{
                sections$b[this.id].push(new HoverDisclosure(e))
            }
            ))
        },
        onBlockSelect(e) {
            sections$b[this.id].forEach((t=>{
                "function" == typeof t.onBlockSelect && t.onBlockSelect(e)
            }
            ))
        },
        onBlockDeselect(e) {
            sections$b[this.id].forEach((t=>{
                "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e)
            }
            ))
        }
    }
      , selectors$q = {
        count: "data-cart-count"
    };
    class Totals {
        constructor(e) {
            this.section = e,
            this.counts = this.section.querySelectorAll(`[${selectors$q.count}]`),
            this.cart = null,
            this.listen()
        }
        listen() {
            document.addEventListener("theme:cart:change", function(e) {
                this.cart = e.detail.cart,
                this.update()
            }
            .bind(this))
        }
        update() {
            this.cart && this.counts.forEach((e=>{
                e.setAttribute(selectors$q.count, this.cart.item_count),
                e.innerHTML = `${this.cart.item_count}`
            }
            ))
        }
    }
    const headerTotals = {
        onLoad() {
            new Totals(this.container)
        }
    }
      , selectors$r = {
        append: "[data-predictive-search-append]",
        input: "data-predictive-search-input",
        productTemplate: "[product-grid-item-template]",
        productWrapper: "[data-product-wrap]",
        productWrapperOuter: "[data-product-wrap-outer]",
        titleTemplate: "[data-predictive-search-title-template]",
        titleWrapper: "[data-search-title-wrap]",
        dirtyClass: "dirty",
        loadingClass: "is-loading",
        searchPopdown: "search-popdown"
    };
    class SearchPredictive {
        constructor(e) {
            this.input = e,
            this.key = this.input.getAttribute(selectors$r.input);
            const t = `[id='${this.key}']`;
            this.append = document.querySelector(t),
            this.productTemplate = document.querySelector(selectors$r.productTemplate).innerHTML,
            this.titleTemplate = document.querySelector(selectors$r.titleTemplate).innerHTML,
            this.titleWrapper = document.querySelector(selectors$r.titleWrapper),
            this.productWrapper = this.append.querySelector(selectors$r.productWrapper),
            this.productWrapperOuter = this.append.querySelector(selectors$r.productWrapperOuter),
            this.popdown = document.getElementById(selectors$r.searchPopdown),
            this.result = null,
            this.accessibility = a11y,
            this.initSearch()
        }
        initSearch() {
            this.input.addEventListener("input", debounce(function(e) {
                const t = e.target.value;
                t && t.length > 1 ? (this.productWrapperOuter.classList.add(selectors$r.loadingClass),
                this.render(t)) : (this.reset(),
                this.append.classList.remove(selectors$r.dirtyClass))
            }
            .bind(this), 300)),
            this.input.addEventListener("clear", this.reset.bind(this))
        }
        render(e) {
            fetch(`/search/suggest.json?q=${encodeURIComponent(e)}&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=last`).then(this.handleErrors).then((e=>e.json())).then((e=>(this.result = e.resources.results,
            this.fetchProducts(e.resources.results.products)))).then((t=>{
                this.injectTitle(e),
                setTimeout((()=>{
                    this.reset(!1),
                    this.productWrapperOuter.classList.remove(selectors$r.loadingClass),
                    this.injectProduct(t),
                    this.append.classList.add(selectors$r.dirtyClass),
                    this.accessibility.trapFocus(this.popdown),
                    this.input.focus()
                }
                ), 1e3)
            }
            )).catch((e=>{
                console.error(e)
            }
            ))
        }
        reset(e=!0) {
            this.productWrapper.innerHTML = "",
            this.append.classList.remove(selectors$r.dirtyClass),
            this.input.val = "",
            this.accessibility.removeTrapFocus(),
            e && (this.titleWrapper.innerHTML = "")
        }
        injectTitle(e) {
            let t = window.theme.strings.noResultsFor
              , s = "";
            this.result && this.result.products.length > 0 && (s = this.result.products.length,
            t = window.theme.strings.resultsFor),
            this.titleWrapper.innerHTML = Sqrl.render(this.titleTemplate, {
                count: s,
                title: t,
                query: e
            })
        }
        injectProduct(e) {
            this.productWrapper.innerHTML += e
        }
        fetchProducts(e) {
            const t = [];
            return e.forEach((e=>{
                t.push(fetchProduct(e.handle).then((e=>{
                    const t = formatPrices(e);
                    return this.renderProduct(t)
                }
                )))
            }
            )),
            Promise.all(t).then((e=>{
                let t = "";
                return e.forEach((e=>{
                    t += e
                }
                )),
                t
            }
            ))
        }
        renderProduct(e) {
            let t = null
              , s = null
              , i = ""
              , o = "";
            void 0 !== e.media && (t = e.media[0],
            s = e.media[1]),
            i = t ? {
                thumb: themeImages.getSizedImageUrl(t.preview_image.src, "800x800"),
                alt: t.preview_image.src
            } : {
                thumb: window.theme.assets.no_image,
                alt: ""
            },
            s && (o = {
                thumb: themeImages.getSizedImageUrl(s.preview_image.src, "800x800"),
                alt: s.preview_image.src
            });
            const r = e.title.replace(/(<([^>]+)>)/gi, "")
              , a = {
                ...e,
                title: r,
                image: i,
                secondImage: o
            };
            return Sqrl.render(this.productTemplate, {
                product: a
            })
        }
        handleErrors(e) {
            return e.ok ? e : e.json().then((function(t) {
                throw new FetchError({
                    status: e.statusText,
                    headers: e.headers,
                    json: t
                })
            }
            ))
        }
    }
    const selectors$s = {
        body: "body",
        popdownTrigger: "data-popdown-toggle",
        close: "[data-close-popdown]",
        input: "[data-predictive-search-input]"
    }
      , classes$b = {
        isVisible: "is-visible"
    };
    let sections$c = {};
    class SearchPopdownTriggers {
        constructor(e) {
            this.trigger = e,
            this.key = this.trigger.getAttribute(selectors$s.popdownTrigger),
            this.search = null;
            const t = `[id='${this.key}']`;
            this.document = document,
            this.popdown = document.querySelector(t),
            this.input = this.popdown.querySelector(selectors$s.input),
            this.close = this.popdown.querySelector(selectors$s.close),
            this.body = document.querySelector(selectors$s.body),
            this.accessibility = a11y,
            this.initTriggerEvents(),
            this.initPopdownEvents()
        }
        initTriggerEvents() {
            this.trigger.setAttribute("aria-haspopup", !0),
            this.trigger.setAttribute("aria-expanded", !1),
            this.trigger.setAttribute("aria-controls", this.key),
            this.trigger.addEventListener("click", (e=>{
                e.preventDefault(),
                this.body.classList.contains("is-focused") || this.showPopdown()
            }
            )),
            this.trigger.addEventListener("keyup", (e=>{
                e.which !== window.theme.keyboardKeys.SPACE && e.which !== window.theme.keyboardKeys.ENTER || !this.body.classList.contains("is-focused") || this.showPopdown()
            }
            ))
        }
        initPopdownEvents() {
            this.search = new SearchPredictive(this.input),
            this.popdown.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.ESCAPE && this.hidePopdown()
            }
            .bind(this)),
            this.close.addEventListener("click", function() {
                this.hidePopdown()
            }
            .bind(this)),
            this.document.addEventListener("click", (e=>{
                const t = e.target
                  , s = !(t.matches(`[${selectors$s.popdownTrigger}]`) || t.closest(`[${selectors$s.popdownTrigger}]`))
                  , i = !(t.matches(`#${this.key}`) || t.closest(`#${this.key}`));
                s && i && this.popdown.classList.contains(classes$b.isVisible) && this.hidePopdown()
            }
            ))
        }
        hidePopdown() {
            this.popdown.classList.remove(classes$b.isVisible),
            this.input.form.reset(),
            this.input.dispatchEvent(new CustomEvent("clear",{
                bubbles: !1
            })),
            this.accessibility.removeTrapFocus(),
            document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0
            })),
            this.body.classList.contains("is-focused") && setTimeout((()=>{
                this.trigger.focus()
            }
            ), 200)
        }
        showPopdown() {
            document.dispatchEvent(new CustomEvent("theme:drawer:close",{
                bubbles: !1
            })),
            document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: this.popdown
            })),
            this.popdown.classList.add(classes$b.isVisible);
            const e = this.input.value;
            this.input.value = "",
            this.input.value = e,
            this.accessibility.trapFocus(this.popdown),
            this.input.focus()
        }
    }
    const searchPopdown = {
        onLoad() {
            sections$c[this.id] = [];
            this.container.querySelectorAll(`[${selectors$s.popdownTrigger}]`).forEach((e=>{
                sections$c[this.id].push(new SearchPopdownTriggers(e))
            }
            ))
        }
    }
      , selectors$t = {
        slideruleOpen: "data-sliderule-open",
        slideruleClose: "data-sliderule-close",
        sliderulePane: "data-sliderule-pane",
        slideruleWrappper: "[data-sliderule]",
        focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        children: ":scope > [data-animates], \n             :scope > * > [data-animates], \n             :scope > * > * >[data-animates],\n             :scope > * > .sliderule-grid  > *"
    }
      , classes$c = {
        isVisible: "is-visible"
    };
    let sections$d = {};
    class HeaderMobileSliderule {
        constructor(e) {
            this.sliderule = e,
            this.wrapper = e.closest(selectors$t.wrapper),
            this.key = this.sliderule.id;
            const t = `[${selectors$t.slideruleOpen}='${this.key}']`
              , s = `[${selectors$t.slideruleClose}='${this.key}']`;
            this.trigger = document.querySelector(t),
            this.exit = document.querySelector(s),
            this.pane = document.querySelector(`[${selectors$t.sliderulePane}]`),
            this.children = this.sliderule.querySelectorAll(selectors$t.children),
            this.trigger.setAttribute("aria-haspopup", !0),
            this.trigger.setAttribute("aria-expanded", !1),
            this.trigger.setAttribute("aria-controls", this.key),
            this.clickEvents(),
            this.staggerChildAnimations(),
            document.addEventListener("theme:sliderule:close", this.closeSliderule.bind(this))
        }
        clickEvents() {
            this.trigger.addEventListener("click", function() {
                this.showSliderule()
            }
            .bind(this)),
            this.exit.addEventListener("click", function() {
                this.hideSliderule()
            }
            .bind(this))
        }
        keyboardEvents() {
            this.trigger.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.SPACE && this.showSliderule()
            }
            .bind(this)),
            this.sliderule.addEventListener("keyup", function(e) {
                e.which === window.theme.keyboardKeys.ESCAPE && (this.hideSliderule(),
                this.buttons[0].focus())
            }
            .bind(this))
        }
        staggerChildAnimations() {
            this.children.forEach(((e,t)=>{
                e.style.transitionDelay = 50 * t + 10 + "ms"
            }
            ))
        }
        hideSliderule() {
            this.pane.style.setProperty("--sliderule-height", "auto"),
            this.sliderule.classList.remove(classes$c.isVisible),
            this.children.forEach((e=>{
                e.classList.remove(classes$c.isVisible)
            }
            ));
            const e = parseInt(this.pane.dataset.sliderulePane, 10) - 1;
            this.pane.setAttribute(selectors$t.sliderulePane, e)
        }
        showSliderule() {
            this.pane.style.setProperty("--sliderule-height", "auto"),
            this.sliderule.classList.add(classes$c.isVisible),
            this.children.forEach((e=>{
                e.classList.add(classes$c.isVisible)
            }
            ));
            const e = parseInt(this.pane.dataset.sliderulePane, 10) + 1;
            this.pane.setAttribute(selectors$t.sliderulePane, e);
            const t = parseInt(this.trigger.nextElementSibling.offsetHeight);
            this.pane.style.setProperty("--sliderule-height", `${t}px`)
        }
        closeSliderule() {
            this.pane && this.pane.hasAttribute(selectors$t.sliderulePane) && parseInt(this.pane.getAttribute(selectors$t.sliderulePane)) > 0 && (this.hideSliderule(),
            parseInt(this.pane.getAttribute(selectors$t.sliderulePane)) > 0 && this.pane.setAttribute(selectors$t.sliderulePane, 0))
        }
    }
    const headerMobileSliderule = {
        onLoad() {
            sections$d[this.id] = [];
            this.container.querySelectorAll(selectors$t.slideruleWrappper).forEach((e=>{
                sections$d[this.id].push(new HeaderMobileSliderule(e))
            }
            ))
        }
    }
      , selectors$u = {
        wrapper: "[data-header-wrapper]",
        html: "html",
        style: "data-header-style",
        widthContentWrapper: "[data-takes-space-wrapper]",
        widthContent: "[data-child-takes-space]",
        desktop: "[data-header-desktop]",
        cloneClass: "js__header__clone",
        showMobileClass: "js__show__mobile",
        backfill: "[data-header-backfill]",
        transparent: "data-header-transparent",
        overrideBorder: "header-override-border",
        firstSectionHasImage: ".main-content > .shopify-section:first-child [data-overlay-header]",
        preventTransparentHeader: ".main-content > .shopify-section:first-child [data-prevent-transparent-header]",
        deadLink: '.navlink[href="#"]'
    };
    let sections$e = {};
    class Header {
        constructor(e) {
            this.wrapper = e,
            this.html = document.querySelector(selectors$u.html),
            this.style = this.wrapper.dataset.style,
            this.desktop = this.wrapper.querySelector(selectors$u.desktop),
            this.isTransparentHeader = "false" !== this.wrapper.getAttribute(selectors$u.transparent),
            this.overlayedImages = document.querySelectorAll(selectors$u.firstSectionHasImage),
            this.deadLinks = document.querySelectorAll(selectors$u.deadLink),
            this.resizeEventWidth = ()=>this.checkWidth(),
            this.resizeEventOverlay = ()=>this.subtractAnnouncementHeight(),
            this.killDeadLinks(),
            "drawer" !== this.style && this.desktop && (this.minWidth = this.getMinWidth(),
            this.listenWidth()),
            this.checkForImage(),
            window.dispatchEvent(new Event("resize")),
            document.addEventListener("header:check", this.checkForImage.bind(this)),
            this.html.style.setProperty("--scrollbar-width", window.innerWidth - this.html.clientWidth + "px")
        }
        unload() {
            document.removeEventListener("theme:resize", this.resizeEventWidth),
            document.removeEventListener("theme:resize", this.resizeEventOverlay)
        }
        checkForImage() {
            this.overlayedImages = document.querySelectorAll(selectors$u.firstSectionHasImage);
            let e = document.querySelectorAll(selectors$u.preventTransparentHeader).length;
            this.overlayedImages.length && !e && this.isTransparentHeader ? (this.listenOverlay(),
            this.wrapper.setAttribute(selectors$u.transparent, !0),
            document.querySelector(selectors$u.backfill).style.display = "none",
            theme.transparentHeader = !0) : (this.wrapper.setAttribute(selectors$u.transparent, !1),
            document.querySelector(selectors$u.backfill).style.display = "block",
            theme.transparentHeader = !1),
            !this.overlayedImages.length || e || this.isTransparentHeader || (this.wrapper.classList.add(selectors$u.overrideBorder),
            this.subtractHeaderHeight())
        }
        listenOverlay() {
            document.addEventListener("theme:resize", this.resizeEventOverlay),
            this.subtractAnnouncementHeight()
        }
        listenWidth() {
            document.addEventListener("theme:resize", this.resizeEventWidth),
            this.checkWidth()
        }
        killDeadLinks() {
            this.deadLinks.forEach((e=>{
                e.onclick = e=>{
                    e.preventDefault()
                }
            }
            ))
        }
        subtractAnnouncementHeight() {
            const {windowHeight: e, announcementHeight: t, headerHeight: s} = readHeights();
            this.overlayedImages.forEach((i=>{
                i.style.setProperty("--full-screen", e - t + "px"),
                i.style.setProperty("--header-padding", `${s}px`),
                i.classList.add("has-overlay")
            }
            ))
        }
        subtractHeaderHeight() {
            const {windowHeight: e, headerHeight: t} = readHeights();
            this.overlayedImages.forEach((s=>{
                s.style.setProperty("--full-screen", e - t + "px")
            }
            ))
        }
        checkWidth() {
            document.body.clientWidth < this.minWidth ? this.wrapper.classList.add(selectors$u.showMobileClass) : this.wrapper.classList.remove(selectors$u.showMobileClass)
        }
        getMinWidth() {
            const e = this.wrapper.cloneNode(!0);
            e.classList.add(selectors$u.cloneClass),
            document.body.appendChild(e);
            const t = e.querySelectorAll(selectors$u.widthContentWrapper);
            let s = 0
              , i = 0;
            return t.forEach((e=>{
                const t = e.querySelectorAll(selectors$u.widthContent);
                let o = 0;
                o = 3 === t.length ? _sumSplitWidths(t) : _sumWidths(t),
                o > s && (s = o,
                i = 20 * t.length)
            }
            )),
            document.body.removeChild(e),
            s + i
        }
    }
    function _sumSplitWidths(e) {
        let t = [];
        e.forEach((e=>{
            e.firstElementChild && t.push(e.firstElementChild.clientWidth)
        }
        )),
        t[0] > t[2] ? t[2] = t[0] : t[0] = t[2];
        return t.reduce(((e,t)=>e + t))
    }
    function _sumWidths(e) {
        let t = 0;
        return e.forEach((e=>{
            t += e.clientWidth
        }
        )),
        t
    }
    const header = {
        onLoad() {
            sections$e = new Header(this.container),
            setVarsOnResize()
        },
        onUnload() {
            "function" == typeof sections$e.unload && sections$e.unload()
        }
    };
    register("header", [header, drawer, popoutSection, headerMobileSliderule, stickyHeader, hoverDisclosure, headerTotals, searchPopdown]);
    const selectors$v = {
        slider: "[data-slider]",
        slide: "[data-slide]",
        thumb: "[data-slider-thumb]"
    }
      , classes$d = {
        classIsSelected: "is-selected"
    }
      , sections$f = {};
    class Look {
        constructor(e) {
            this.container = e.container,
            this.slider = this.container.querySelector(selectors$v.slider),
            this.slides = this.container.querySelectorAll(selectors$v.slide),
            this.thumbs = this.container.querySelectorAll(selectors$v.thumb),
            this.slider && this.slides.length && this.thumbs.length && (this.resizeEvent = ()=>this.checkPosition(),
            this.slider.addEventListener("scroll", this.resizeEvent),
            document.addEventListener("theme:resize", this.resizeEvent))
        }
        checkPosition() {
            if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small) {
                const e = this.slider.offsetWidth
                  , t = this.slider.scrollLeft + e;
                this.slides.forEach(((e,s)=>{
                    const i = e.offsetWidth
                      , o = e.offsetLeft + i;
                    let r = !1;
                    const a = this.slides[s + 1];
                    if (a) {
                        const e = a.offsetWidth
                          , s = a.offsetLeft;
                        t >= s + e && (r = !0)
                    }
                    this.thumbs[s].classList.toggle(classes$d.classIsSelected, t >= o && !r)
                }
                ))
            }
        }
        onUnload() {
            this.slider && this.slides.length && this.thumbs.length && (document.removeEventListener("theme:resize", this.resizeEvent),
            this.slider.removeEventListener("scroll", this.resizeEvent))
        }
    }
    const lookSection = {
        onLoad() {
            sections$f[this.id] = new Look(this)
        },
        onUnload(e) {
            sections$f[this.id].onUnload(e)
        }
    };
    register("look", [lookSection, slider, productGridReviews, quickAddProduct, swatchGridSection]);
    const selectors$w = {
        body: "body",
        dataRelatedSectionElem: "[data-related-section]",
        dataTabsHolder: "[data-tabs-holder]",
        dataTab: "data-tab",
        dataTabIndex: "data-tab-index",
        dataTabStartIndex: "data-start-index",
        blockId: "data-block-id",
        tabsLi: "ul.tabs > li",
        tabLink: ".tab-link",
        tabLinkRecent: ".tab-link__recent",
        tabContent: ".tab-content",
        scrollbarHolder: "[data-scrollbar]",
        scrollbarArrowPrev: "[data-scrollbar-arrow-prev]",
        scrollbarArrowNext: "[data-scrollbar-arrow-next]",
        productModal: "[data-product-modal]",
        dataLockScrollbar: "data-lock-scroll"
    }
      , classes$e = {
        classCurrent: "current",
        classHide: "hide",
        classAlt: "alt",
        classAosAnimate: "aos-animate",
        classAosNoTransition: "aos-no-transition"
    }
      , sections$g = {};
    class GlobalTabs {
        constructor(e) {
            this.container = e,
            this.body = document.querySelector(selectors$w.body),
            this.accessibility = window.accessibility,
            this.container && (this.scrollbarHolder = this.container.querySelectorAll(selectors$w.scrollbarHolder),
            this.init(),
            this.initNativeScrollbar())
        }
        init() {
            const e = this.container
              , t = e.querySelectorAll(selectors$w.tabsLi)
              , s = e.querySelector(`${selectors$w.tabLink}-${e.hasAttribute(selectors$w.dataTabStartIndex) ? e.getAttribute(selectors$w.dataTabStartIndex) : 0}`)
              , i = e.querySelector(`${selectors$w.tabContent}-${e.hasAttribute(selectors$w.dataTabStartIndex) ? e.getAttribute(selectors$w.dataTabStartIndex) : 0}`);
            i && i.classList.add(classes$e.classCurrent),
            s && s.classList.add(classes$e.classCurrent),
            this.checkVisibleTabLinks(),
            this.container.addEventListener("tabs:checkRecentTab", (()=>this.checkRecentTab())),
            this.container.addEventListener("tabs:hideRelatedTab", (()=>this.hideRelatedTab())),
            t.length && t.forEach((t=>{
                const s = parseInt(t.getAttribute(selectors$w.dataTab))
                  , i = e.querySelector(`${selectors$w.tabContent}-${s}`);
                t.addEventListener("click", (()=>{
                    this.tabChange(t, i)
                }
                )),
                t.addEventListener("keyup", (e=>{
                    e.which !== window.theme.keyboardKeys.SPACE && e.which !== window.theme.keyboardKeys.ENTER || !this.body.classList.contains("is-focused") || (this.tabChange(t, i),
                    i.querySelector("a, input") && (this.accessibility.lastFocused = t,
                    this.accessibility.a11y.trapFocus(i, {
                        elementToFocus: i.querySelector("a:first-child, input:first-child")
                    })))
                }
                ))
            }
            ))
        }
        tabChange(e, t) {
            this.container.querySelector(`${selectors$w.tabsLi}.${classes$e.classCurrent}`).classList.remove(classes$e.classCurrent);
            this.container.querySelector(`${selectors$w.tabContent}.${classes$e.classCurrent}`).classList.remove(classes$e.classCurrent),
            e.classList.add(classes$e.classCurrent),
            t.classList.add(classes$e.classCurrent),
            e.classList.contains(classes$e.classHide) && t.classList.add(classes$e.classHide),
            this.checkVisibleTabLinks(),
            this.accessibility.a11y.removeTrapFocus(),
            this.animateItems(t)
        }
        animateItems(e, t=!0) {
            const s = e.querySelectorAll("[data-aos]");
            s.length && s.forEach((e=>{
                e.classList.remove(classes$e.classAosAnimate),
                t && (e.classList.add(classes$e.classAosNoTransition),
                setTimeout((()=>{
                    e.classList.remove(classes$e.classAosNoTransition),
                    e.classList.add(classes$e.classAosAnimate)
                }
                ), 100))
            }
            ))
        }
        initNativeScrollbar() {
            this.scrollbarHolder.length && this.scrollbarHolder.forEach((e=>{
                new NativeScrollbar(e)
            }
            ))
        }
        checkVisibleTabLinks() {
            const e = this.container.querySelectorAll(selectors$w.tabsLi)
              , t = this.container.querySelectorAll(`${selectors$w.tabLink}.${classes$e.classHide}`);
            e.length - t.length < 2 ? this.container.classList.add(classes$e.classAlt) : this.container.classList.remove(classes$e.classAlt)
        }
        checkRecentTab() {
            const e = this.container.querySelector(selectors$w.tabLinkRecent);
            if (e) {
                e.classList.remove(classes$e.classHide);
                const t = parseInt(e.getAttribute(selectors$w.dataTab))
                  , s = this.container.querySelector(`${selectors$w.tabContent}[${selectors$w.dataTabIndex}="${t}"]`);
                s && (s.classList.remove(classes$e.classHide),
                this.animateItems(s, !1)),
                this.checkVisibleTabLinks(),
                this.initNativeScrollbar()
            }
        }
        hideRelatedTab() {
            const e = this.container.querySelector(selectors$w.dataRelatedSectionElem);
            if (!e)
                return;
            const t = e.closest(`${selectors$w.tabContent}.${classes$e.classCurrent}`);
            if (!t)
                return;
            const s = parseInt(t.getAttribute(selectors$w.dataTabIndex))
              , i = this.container.querySelectorAll(selectors$w.tabsLi);
            if (i.length > s) {
                const e = i[s].nextSibling;
                e && (i[s].classList.add(classes$e.classHide),
                e.dispatchEvent(new Event("click")),
                this.initNativeScrollbar())
            }
        }
        onBlockSelect(e) {
            const t = this.container.querySelector(`${selectors$w.tabLink}[${selectors$w.blockId}="${e.detail.blockId}"]`);
            t && (t.dispatchEvent(new Event("click")),
            t.parentNode.scrollTo({
                top: 0,
                left: t.offsetLeft - t.clientWidth,
                behavior: "smooth"
            }))
        }
    }
    const tabs = {
        onLoad() {
            sections$g[this.id] = [];
            this.container.querySelectorAll(selectors$w.dataTabsHolder).forEach((e=>{
                sections$g[this.id].push(new GlobalTabs(e))
            }
            ))
        },
        onBlockSelect(e) {
            sections$g[this.id].forEach((t=>{
                "function" == typeof t.onBlockSelect && t.onBlockSelect(e)
            }
            ))
        }
    };
    register("product-grid", [productGridReviews, slider, quickAddProduct, swatchGridSection, tabs]);
    const fadeOut = (e,t=null)=>{
        e.style.opacity = 1,
        function s() {
            (e.style.opacity -= .1) < 0 ? e.style.display = "none" : requestAnimationFrame(s),
            0 === parseFloat(e.style.opacity) && "function" == typeof t && t()
        }()
    }
      , selectors$x = {
        productSlideshow: "[data-product-slideshow]",
        productThumbs: "[data-product-thumbs]",
        sliderThumb: "[data-thumb-item]",
        dataTallLayout: "data-tall-layout",
        dataType: "data-type",
        dataMediaId: "data-media-id",
        dataThumb: "data-thumb",
        dataThumbIndex: "data-thumb-index",
        ariaLabel: "aria-label",
        dataThumbnail: "[data-thumbnail]",
        productSlideThumb: ".js-product-slide-thumb",
        classSelected: "is-active",
        classMediaHidden: "media--hidden",
        sliderEnabled: "flickity-enabled",
        focusEnabled: "is-focused",
        thumbsSlider: "[data-thumbs-slider]"
    }
      , thumbIcons = {
        model: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-model" viewBox="0 0 26 26"><path d="M1 25h24V1H1z"/><path class="icon-media-model-outline" d="M.5 25v.5h25V.5H.5z" fill="none"/><path class="icon-media-model-element" d="M19.13 8.28L14 5.32a2 2 0 0 0-2 0l-5.12 3a2 2 0 0 0-1 1.76V16a2 2 0 0 0 1 1.76l5.12 3a2 2 0 0 0 2 0l5.12-3a2 2 0 0 0 1-1.76v-6a2 2 0 0 0-.99-1.72zm-6.4 11.1l-5.12-3a.53.53 0 0 1-.26-.38v-6a.53.53 0 0 1 .27-.46l5.12-3a.53.53 0 0 1 .53 0l5.12 3-4.72 2.68a1.33 1.33 0 0 0-.67 1.2v6a.53.53 0 0 1-.26 0z" opacity=".6" style="isolation:isolate"/></svg>',
        video: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-video" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25h24V1H1v24z"/><path class="icon-media-video-outline" d="M.5 25v.5h25V.5H.5V25z"/><path class="icon-media-video-element" fill-rule="evenodd" clip-rule="evenodd" d="M9.718 6.72a1 1 0 0 0-1.518.855v10.736a1 1 0 0 0 1.562.827l8.35-5.677a1 1 0 0 0-.044-1.682l-8.35-5.06z" opacity=".6"/></svg>'
    };
    class InitSlider {
        constructor(e) {
            this.container = e.container,
            this.tallLayout = "true" === this.container.getAttribute(selectors$x.dataTallLayout),
            this.slideshow = this.container.querySelector(selectors$x.productSlideshow),
            this.thumbs = this.container.querySelector(selectors$x.productThumbs),
            this.mobileSliderEnable = "true" === this.container.getAttribute(selectors$x.mobileSliderEnable),
            this.flkty = null,
            this.flktyThumbs = null,
            this.thumbsSlider = null,
            this.init()
        }
        init() {
            this.tallLayout ? (this.initSliderMobile(),
            document.addEventListener("theme:resize", (()=>{
                this.initSliderMobile()
            }
            ))) : this.createSlider()
        }
        initSliderMobile() {
            (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small ? this.createSlider() : this.destroySlider()
        }
        destroySlider() {
            this.slideshow.classList.contains(selectors$x.sliderEnabled) && this.flkty.destroy(),
            this.thumbs && (this.thumbs.innerHTML = ""),
            null !== this.flktyThumbs && (this.flktyThumbs.destroy(),
            this.flktyThumbs = null)
        }
        createSlider() {
            if (!this.slideshow)
                return;
            const e = this
              , t = this.slideshow.querySelectorAll(`[${selectors$x.dataType}]`)[0];
            let s = {
                autoPlay: !1,
                prevNextButtons: !1,
                contain: !0,
                pageDots: !1,
                adaptiveHeight: !0,
                wrapAround: !0,
                fade: !0,
                on: {
                    ready: function() {
                        e.sliderThumbs(this)
                    }
                }
            };
            if (this.flkty = new FlickityFade(this.slideshow,s),
            this.flkty.resize(),
            t) {
                const e = t.getAttribute(selectors$x.dataType);
                "model" !== e && "video" !== e && "external_video" !== e || (this.flkty.options.draggable = !1,
                this.flkty.updateDraggable())
            }
            this.flkty.on("change", (function(t) {
                let s = t;
                if (e.thumbs) {
                    const i = e.thumbs.querySelector(`.${selectors$x.classSelected}`)
                      , o = e.thumbs.querySelector(`${selectors$x.sliderThumb} [${selectors$x.dataThumbIndex}="${t}"]`);
                    i && (s = Array.from(i.parentElement.children).indexOf(i),
                    i.classList.remove(selectors$x.classSelected)),
                    o && o.parentElement.classList.add(selectors$x.classSelected)
                }
                const i = this.cells[s].element
                  , o = this.selectedElement;
                i.dispatchEvent(new CustomEvent("mediaHidden")),
                o.classList.remove(selectors$x.classMediaHidden)
            }
            )),
            this.flkty.on("settle", (function() {
                const t = this.selectedElement
                  , s = Array.prototype.filter.call(t.parentNode.children, (function(e) {
                    return e !== t
                }
                ))
                  , i = t.getAttribute(selectors$x.dataType)
                  , o = document.body.classList.contains(selectors$x.focusEnabled);
                "model" === i || "video" === i || "external_video" === i ? (e.flkty.options.draggable = !1,
                e.flkty.updateDraggable()) : (e.flkty.options.draggable = !0,
                e.flkty.updateDraggable()),
                o && t.dispatchEvent(new Event("focus")),
                s.length && s.forEach((e=>{
                    e.classList.add(selectors$x.classMediaHidden)
                }
                )),
                t.dispatchEvent(new CustomEvent("mediaVisible"))
            }
            )),
            e.container.addEventListener("click", (function(t) {
                const s = t.target;
                if (s.matches(selectors$x.productSlideThumb) || s.closest(selectors$x.productSlideThumb)) {
                    t.preventDefault();
                    let i, o = 0;
                    i = s.matches(selectors$x.productSlideThumb) ? s : s.closest(selectors$x.productSlideThumb),
                    o = parseInt(i.getAttribute(selectors$x.dataThumbIndex)),
                    e.flkty.select(o)
                }
            }
            ))
        }
        createThumbSlider() {
            let e = {
                autoPlay: !1,
                prevNextButtons: !1,
                contain: !0,
                pageDots: !1,
                adaptiveHeight: !1,
                wrapAround: !1,
                cellAlign: "left"
            }
              , t = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small;
            this.thumbsSlider = this.container.querySelector(selectors$x.thumbsSlider);
            const s = ()=>{
                this.flktyThumbs = new FlickityFade(this.thumbsSlider,e),
                this.flktyThumbs.resize()
            }
            ;
            t && s(),
            document.addEventListener("theme:resize", (()=>{
                t = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < theme.sizes.small,
                t ? s() : null !== this.flktyThumbs && (this.flktyThumbs.destroy(),
                this.flktyThumbs = null)
            }
            ))
        }
        sliderThumbs(e) {
            const t = e.slides;
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (this.thumbs && t.length) {
                let e = "";
                t.forEach(((t,s)=>{
                    const i = t.cells[0].element
                      , o = i.getAttribute(selectors$x.dataType)
                      , r = i.getAttribute(selectors$x.dataMediaId)
                      , a = i.getAttribute(selectors$x.dataThumb);
                    let n = "";
                    const l = thumbIcons[o] ? thumbIcons[o] : "";
                    let c = "";
                    i.querySelector(`[${selectors$x.ariaLabel}]`) && (n = i.querySelector(`[${selectors$x.ariaLabel}]`).getAttribute(selectors$x.ariaLabel)),
                    "" === n && i.hasAttribute(selectors$x.ariaLabel) && (n = i.getAttribute(selectors$x.ariaLabel)),
                    i.setAttribute("tabindex", "-1"),
                    (i.classList.contains(selectors$x.classSelected) || 0 === s) && (c = selectors$x.classSelected),
                    e += `<div class="thumb ${c}" data-thumb-item><a href="${a}" class="thumb__link thumb__link--${o} js-product-slide-thumb" data-thumb-index="${s}" data-thumbnail data-media-id="${r}"><img class="thumb__link__image lazyload" alt="${n}" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048, 2450, 2700, 3000, 3350, 3750, 4100]" data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${a}">${l}</a></div>`
                }
                )),
                "" !== e && (e = `<div class="thumbs-holder" data-thumbs-slider>${e}</div>`,
                this.thumbs.innerHTML = e,
                this.createThumbSlider())
            }
            const s = this.container.querySelectorAll(selectors$x.dataThumbnail);
            s.length && s.forEach((t=>{
                t.addEventListener("click", (function(e) {
                    e.preventDefault()
                }
                )),
                t.addEventListener("keyup", (function(t) {
                    if (13 === t.keyCode) {
                        const t = this.getAttribute(selectors$x.dataMediaId)
                          , s = e.element.querySelector(`[${selectors$x.dataMediaId}="${t}"]`).querySelectorAll('model-viewer, video, iframe, button, [href], input, [tabindex]:not([tabindex="-1"])')[0];
                        s && (s.dispatchEvent(new Event("focus")),
                        s.dispatchEvent(new Event("select")))
                    }
                }
                ))
            }
            ))
        }
    }
    const selectors$y = {
        dataEnableSound: "data-enable-sound",
        dataEnableBackground: "data-enable-background",
        dataEnableAutoplay: "data-enable-autoplay",
        dataEnableLoop: "data-enable-loop",
        dataVideoId: "data-video-id",
        dataVideoType: "data-video-type",
        videoIframe: "[data-video-id]"
    }
      , classes$f = {
        loaded: "loaded"
    };
    class LoadVideoVimeo {
        constructor(e) {
            this.container = e,
            this.player = this.container.querySelector(selectors$y.videoIframe),
            this.player && (this.videoID = this.player.getAttribute(selectors$y.dataVideoId),
            this.videoType = this.player.getAttribute(selectors$y.dataVideoType),
            this.enableBackground = "true" === this.player.getAttribute(selectors$y.dataEnableBackground),
            this.disableSound = "false" === this.player.getAttribute(selectors$y.dataEnableSound),
            this.enableAutoplay = "false" !== this.player.getAttribute(selectors$y.dataEnableAutoplay),
            this.enableLoop = "false" !== this.player.getAttribute(selectors$y.dataEnableLoop),
            "vimeo" == this.videoType && this.init())
        }
        init() {
            this.loadVimeoPlayer()
        }
        loadVimeoPlayer() {
            const e = "https://vimeo.com/" + this.videoID;
            let t = "";
            const s = this.player
              , i = {
                url: e,
                background: this.enableBackground,
                muted: this.disableSound,
                autoplay: this.enableAutoplay,
                loop: this.enableLoop
            };
            for (let e in i)
                t += encodeURIComponent(e) + "=" + encodeURIComponent(i[e]) + "&";
            fetch(`https://vimeo.com/api/oembed.json?${t}`).then((e=>e.json())).then((function(e) {
                s.innerHTML = e.html,
                setTimeout((function() {
                    s.parentElement.classList.add(classes$f.loaded)
                }
                ), 1e3)
            }
            )).catch((function() {
                console.log("error")
            }
            ))
        }
    }
    const throttle = (e,t)=>{
        let s, i;
        return function o(...r) {
            const a = Date.now();
            i = clearTimeout(i),
            !s || a - s >= t ? (e.apply(null, r),
            s = a) : i = setTimeout(o.bind(null, ...r), t - (a - s))
        }
    }
      , selectors$z = {
        dataSectionId: "data-section-id",
        dataEnableSound: "data-enable-sound",
        dataHideOptions: "data-hide-options",
        dataCheckPlayerVisibility: "data-check-player-visibility",
        dataVideoId: "data-video-id",
        dataVideoType: "data-video-type",
        videoIframe: "[data-video-id]",
        videoWrapper: ".video-wrapper",
        youtubeWrapper: "[data-youtube-wrapper]"
    }
      , classes$g = {
        loaded: "loaded"
    }
      , players = [];
    class LoadVideoYT {
        constructor(e) {
            this.container = e,
            this.player = this.container.querySelector(selectors$z.videoIframe),
            this.player && (this.videoOptionsVars = {},
            this.videoID = this.player.getAttribute(selectors$z.dataVideoId),
            this.videoType = this.player.getAttribute(selectors$z.dataVideoType),
            "youtube" == this.videoType && (this.checkPlayerVisibilityFlag = "true" === this.player.getAttribute(selectors$z.dataCheckPlayerVisibility),
            this.playerID = this.player.querySelector(selectors$z.youtubeWrapper) ? this.player.querySelector(selectors$z.youtubeWrapper).id : this.player.id,
            this.player.hasAttribute(selectors$z.dataHideOptions) && (this.videoOptionsVars = {
                cc_load_policy: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                autohide: 0,
                controls: 0,
                branding: 0,
                showinfo: 0,
                rel: 0,
                fs: 0,
                wmode: "opaque"
            }),
            this.init(),
            this.container.addEventListener("touchstart", (function(e) {
                if (e.target.matches(selectors$z.videoWrapper) || e.target.closest(selectors$z.videoWrapper)) {
                    const t = e.target.querySelector(selectors$z.videoIframe).id;
                    players[t].playVideo()
                }
            }
            ))))
        }
        init() {
            window.isYoutubeAPILoaded ? this.loadYoutubePlayer() : loadScript({
                url: "https://www.youtube.com/iframe_api"
            }).then((()=>this.loadYoutubePlayer()))
        }
        loadYoutubePlayer() {
            const e = {
                ...{
                    height: "720",
                    width: "1280",
                    playerVars: this.videoOptionsVars,
                    events: {
                        onReady: e=>{
                            const t = e.target.getIframe()
                              , s = t.id
                              , i = "true" === document.querySelector(`#${s}`).getAttribute(selectors$z.dataEnableSound);
                            t.setAttribute("tabindex", "-1"),
                            i ? e.target.unMute() : e.target.mute(),
                            e.target.playVideo(),
                            this.checkPlayerVisibilityFlag && (this.checkPlayerVisibility(s),
                            window.addEventListener("scroll", throttle((()=>{
                                this.checkPlayerVisibility(s)
                            }
                            ), 150)))
                        }
                        ,
                        onStateChange: e=>{
                            0 == e.data && e.target.playVideo(),
                            1 == e.data && e.target.getIframe().parentElement.classList.add(classes$g.loaded)
                        }
                    }
                }
            };
            e.videoId = this.videoID,
            this.videoID.length && YT.ready((()=>{
                players[this.playerID] = new YT.Player(this.playerID,e)
            }
            )),
            window.isYoutubeAPILoaded = !0
        }
        checkPlayerVisibility(e) {
            let t;
            if ("string" == typeof e)
                t = e;
            else {
                if (null == e.data)
                    return;
                t = e.data.id
            }
            const s = document.getElementById(t + "-container");
            if (!s)
                return;
            const i = players[t]
              , o = s.getBoundingClientRect();
            let r = visibilityHelper.isElementPartiallyVisible(s) || visibilityHelper.isElementTotallyVisible(s);
            o.top < 0 && s.clientHeight + o.top >= 0 && (r = !0),
            r && i && "function" == typeof i.playVideo ? i.playVideo() : !r && i && "function" == typeof i.pauseVideo && i.pauseVideo()
        }
        onUnload() {
            const e = "youtube-" + this.container.getAttribute(selectors$z.dataSectionId);
            players[e] && players[e].destroy()
        }
    }
    const selectors$A = {
        dataVideoId: "data-video-id",
        dataVideoType: "data-video-type",
        videoIframe: "[data-video-id]"
    }
      , classes$h = {
        loaded: "loaded"
    };
    class LoadVideoNative {
        constructor(e) {
            this.container = e,
            this.player = this.container.querySelector(selectors$A.videoIframe),
            this.player && (this.videoID = this.player.getAttribute(selectors$A.dataVideoId),
            this.videoType = this.player.getAttribute(selectors$A.dataVideoType),
            "native" == this.videoType && this.init())
        }
        init() {
            if (window.isPlyrLoaded)
                this.loadNativePlayer();
            else {
                loadScript({
                    name: "video-ui",
                    version: "1.0"
                }).then((()=>this.loadNativePlayer()))
            }
        }
        loadNativePlayer() {
            new Shopify.Plyr(this.player,{
                focusOnPlay: !0
            }).on("ready", (e=>{
                e.target.classList.add(classes$h.loaded)
            }
            )),
            window.isPlyrLoaded = !0
        }
    }
    const selectors$B = {
        popupContainer: ".pswp",
        popupCloseBtn: ".pswp__custom-close",
        popupIframe: "iframe, video",
        popupCustomIframe: ".pswp__custom-iframe",
        popupThumbs: ".pswp__thumbs",
        dataOptionClasses: "data-pswp-option-classes",
        dataVideoType: "data-video-type"
    }
      , classes$i = {
        classCurrent: "is-current",
        classCustomLoader: "pswp--custom-loader",
        classCustomOpen: "pswp--custom-opening",
        classLoader: "pswp__loader"
    }
      , loaderHTML = `<div class="${classes$i.classLoader}"><div class="loader pswp__loader-line"><div class="loader-indeterminate"></div></div></div>`;
    class LoadPhotoswipe {
        constructor(e, t="") {
            this.items = e,
            this.pswpElement = document.querySelectorAll(selectors$B.popupContainer)[0],
            this.popup = null,
            this.popupThumbs = null,
            this.popupThumbsContainer = this.pswpElement.querySelector(selectors$B.popupThumbs),
            this.closeBtn = this.pswpElement.querySelector(selectors$B.popupCloseBtn);
            this.options = "" !== t ? t : {
                history: !1,
                focus: !1,
                mainClass: ""
            },
            this.init()
        }
        init() {
            this.pswpElement.classList.add(classes$i.classCustomOpen),
            this.initLoader(),
            loadScript({
                url: window.theme.assets.photoswipe
            }).then((()=>this.loadPopup())).catch((e=>console.error(e)))
        }
        initLoader() {
            if (this.pswpElement.classList.contains(classes$i.classCustomLoader) && "" !== this.options && this.options.mainClass) {
                this.pswpElement.setAttribute(selectors$B.dataOptionClasses, this.options.mainClass);
                let e = document.createElement("div");
                e.innerHTML = loaderHTML,
                e = e.firstChild,
                this.pswpElement.appendChild(e)
            } else
                this.pswpElement.setAttribute(selectors$B.dataOptionClasses, "")
        }
        loadPopup() {
            const e = window.themePhotoswipe.PhotoSwipe.default
              , t = window.themePhotoswipe.PhotoSwipeUI.default;
            this.pswpElement.classList.contains(classes$i.classCustomLoader) && this.pswpElement.classList.remove(classes$i.classCustomLoader),
            this.pswpElement.classList.remove(classes$i.classCustomOpen),
            this.popup = new e(this.pswpElement,t,this.items,this.options),
            this.popup.init(),
            this.initVideo(),
            this.thumbsActions(),
            this.popup.listen("close", (()=>this.onClose())),
            this.closeBtn && this.closeBtn.addEventListener("click", (()=>this.popup.close()))
        }
        initVideo() {
            const e = this.pswpElement.querySelector(selectors$B.popupCustomIframe);
            if (e) {
                const t = e.getAttribute(selectors$B.dataVideoType);
                "youtube" == t ? new LoadVideoYT(e.parentElement) : "vimeo" == t ? new LoadVideoVimeo(e.parentElement) : "native" == t && new LoadVideoNative(e.parentElement)
            }
        }
        thumbsActions() {
            this.popupThumbsContainer && this.popupThumbsContainer.firstChild && (this.popupThumbsContainer.addEventListener("wheel", (e=>this.stopDisabledScroll(e))),
            this.popupThumbsContainer.addEventListener("mousewheel", (e=>this.stopDisabledScroll(e))),
            this.popupThumbsContainer.addEventListener("DOMMouseScroll", (e=>this.stopDisabledScroll(e))),
            this.popupThumbs = this.pswpElement.querySelectorAll(`${selectors$B.popupThumbs} > *`),
            this.popupThumbs.forEach(((e,t)=>{
                e.addEventListener("click", (s=>{
                    s.preventDefault(),
                    e.parentElement.querySelector(`.${classes$i.classCurrent}`).classList.remove(classes$i.classCurrent),
                    e.classList.add(classes$i.classCurrent),
                    this.popup.goTo(t)
                }
                ))
            }
            )),
            this.popup.listen("imageLoadComplete", (()=>this.setCurrentThumb())),
            this.popup.listen("beforeChange", (()=>this.setCurrentThumb())))
        }
        stopDisabledScroll(e) {
            e.stopPropagation()
        }
        onClose() {
            const e = this.pswpElement.querySelector(selectors$B.popupIframe);
            if (e && e.parentNode.removeChild(e),
            this.popupThumbsContainer && this.popupThumbsContainer.firstChild)
                for (; this.popupThumbsContainer.firstChild; )
                    this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
            this.pswpElement.setAttribute(selectors$B.dataOptionClasses, "");
            const t = this.pswpElement.querySelector(`.${classes$i.classLoader}`);
            t && this.pswpElement.removeChild(t)
        }
        setCurrentThumb() {
            const e = this.pswpElement.querySelector(`${selectors$B.popupThumbs} > .${classes$i.classCurrent}`);
            if (e && e.classList.remove(classes$i.classCurrent),
            !this.popupThumbs)
                return;
            const t = this.popupThumbs[this.popup.getCurrentIndex()];
            t.classList.add(classes$i.classCurrent),
            this.scrollThumbs(t)
        }
        scrollThumbs(e) {
            const t = this.popupThumbsContainer.scrollLeft + this.popupThumbsContainer.offsetWidth
              , s = e.offsetLeft;
            if (t <= s + e.offsetWidth || t > s) {
                const t = parseInt(window.getComputedStyle(e).marginLeft);
                this.popupThumbsContainer.scrollTo({
                    top: 0,
                    left: s - t,
                    behavior: "smooth"
                })
            }
        }
    }
    const selectors$C = {
        zoomWrapper: "[data-zoom-wrapper]",
        dataImageSrc: "data-image-src",
        dataImageWidth: "data-image-width",
        dataImageHeight: "data-image-height",
        dataImageZoomEnable: "data-image-zoom-enable",
        thumbs: ".pswp__thumbs",
        caption: "[data-zoom-caption]"
    }
      , classes$j = {
        variantSoldOut: "variant--soldout",
        variantUnavailable: "variant--unavailabe",
        popupThumb: "pswp__thumb",
        popupClass: "pswp-zoom-gallery",
        popupClassNoThumbs: "pswp-zoom-gallery--single",
        popupTitle: "product__title",
        popupTitleNew: "product__title pswp__title"
    };
    class Zoom {
        constructor(e) {
            this.container = e.container,
            this.zoomWrappers = this.container.querySelectorAll(selectors$C.zoomWrapper),
            this.thumbsContainer = document.querySelector(selectors$C.thumbs),
            this.zoomCaptionElem = this.container.querySelector(selectors$C.caption),
            this.zoomEnable = "true" === this.container.getAttribute(selectors$C.dataImageZoomEnable),
            this.zoomEnable && this.init()
        }
        init() {
            const e = this;
            this.zoomWrappers.length && this.zoomWrappers.forEach(((t,s)=>{
                t.addEventListener("click", (function(t) {
                    t.preventDefault(),
                    e.createZoom(s)
                }
                )),
                t.addEventListener("keyup", (function(t) {
                    13 === t.keyCode && (t.preventDefault(),
                    e.createZoom(s))
                }
                ))
            }
            ))
        }
        createZoom(e) {
            const t = this;
            let s = []
              , i = 0
              , o = "";
            this.zoomWrappers.forEach((r=>{
                const a = r.getAttribute(selectors$C.dataImageSrc)
                  , n = parseInt(r.getAttribute(selectors$C.dataImageWidth))
                  , l = parseInt(r.getAttribute(selectors$C.dataImageHeight));
                if (s.push({
                    src: a,
                    w: n,
                    h: l,
                    msrc: a
                }),
                o += `<a href="#" class="${classes$j.popupThumb}" style="background-image: url('${a}')"></a>`,
                i += 1,
                t.zoomWrappers.length === i) {
                    let r = `${classes$j.popupClass}`;
                    1 === i && (r = `${classes$j.popupClass} ${classes$j.popupClassNoThumbs}`);
                    new LoadPhotoswipe(s,{
                        history: !1,
                        focus: !1,
                        index: e,
                        mainClass: r,
                        showHideOpacity: !0,
                        howAnimationDuration: 150,
                        hideAnimationDuration: 250,
                        closeOnScroll: !1,
                        closeOnVerticalDrag: !1,
                        captionEl: !0,
                        closeEl: !0,
                        closeElClasses: ["caption-close", "title"],
                        tapToClose: !1,
                        clickToCloseNonZoomable: !1,
                        maxSpreadZoom: 2,
                        loop: !0,
                        spacing: 0,
                        allowPanToNext: !0,
                        pinchToClose: !1,
                        addCaptionHTMLFn: function(e, s, i) {
                            t.zoomCaption(e, s, i)
                        },
                        getThumbBoundsFn: function() {
                            const s = t.zoomWrappers[e]
                              , i = window.pageYOffset || document.documentElement.scrollTop
                              , o = s.getBoundingClientRect();
                            return {
                                x: o.left,
                                y: o.top + i,
                                w: o.width
                            }
                        }
                    }),
                    t.thumbsContainer && "" !== o && (t.thumbsContainer.innerHTML = o)
                }
            }
            ))
        }
        zoomCaption(e, t) {
            let s = "";
            const i = t.children[0];
            return this.zoomCaptionElem && (s = this.zoomCaptionElem.innerHTML,
            this.zoomCaptionElem.closest(`.${classes$j.variantSoldOut}`) ? i.classList.add(classes$j.variantSoldOut) : i.classList.remove(classes$j.variantSoldOut),
            this.zoomCaptionElem.closest(`.${classes$j.variantUnavailable}`) ? i.classList.add(classes$j.variantUnavailable) : i.classList.remove(classes$j.variantUnavailable)),
            s = s.replaceAll(classes$j.popupTitle, classes$j.popupTitleNew),
            i.innerHTML = s,
            !1
        }
    }
    const selectors$D = {
        videoPlayer: "[data-video]",
        modelViewer: "[data-model]",
        dataType: "data-type",
        dataMediaId: "data-media-id",
        dataVideoLooping: "data-video-looping",
        dataYoutubeId: "data-youtube-id",
        productMediaWrapper: "[data-product-single-media-wrapper]",
        productMediaContainer: "[data-product-single-media-group]",
        classMediaHidden: "media--hidden"
    };
    theme.mediaInstances = {};
    class Video {
        constructor(e) {
            this.section = e,
            this.container = e.container,
            this.id = e.id,
            this.players = {},
            this.init()
        }
        init() {
            const e = this.container.querySelectorAll(selectors$D.videoPlayer);
            let t = !1
              , s = !1;
            for (let i = 0; i < e.length; i++) {
                const o = e[i].getAttribute("id")
                  , r = e[i].getAttribute(selectors$D.dataType)
                  , a = e[i].getAttribute(selectors$D.dataMediaId);
                if (this.players[o] = {},
                this.players[o].id = o,
                this.players[o].type = r,
                this.players[o].mediaId = a,
                this.players[o].container = e[i],
                this.players[o].element = e[i].querySelector("iframe, video"),
                !this.players[o].element)
                    return;
                if ("external_video" === r) {
                    const s = e[i].getAttribute(selectors$D.dataYoutubeId);
                    this.players[o].externalID = s,
                    t = !0
                } else
                    "video" === r && (s = !0)
            }
            if (s)
                if (window.isPlyrLoaded)
                    this.nativeInitCallback();
                else {
                    loadScript({
                        name: "video-ui",
                        version: "1.0"
                    }).then((()=>this.nativeInitCallback()))
                }
            t && (window.isYoutubeAPILoaded ? this.youTubeInitCallback() : loadScript({
                url: "https://www.youtube.com/iframe_api"
            }).then((()=>this.youTubeInitCallback())))
        }
        youTubeInitCallback() {
            for (const e in this.players)
                if ("external_video" === this.players[e].type) {
                    const t = this.players[e]
                      , s = "true" === this.players[e].container.closest(`[${selectors$D.dataVideoLooping}]`).getAttribute(selectors$D.dataVideoLooping)
                      , i = {
                        ...{
                            playerVars: {
                                cc_load_policy: 0,
                                iv_load_policy: 3,
                                modestbranding: 1,
                                playsinline: 1,
                                autohide: 0,
                                controls: 1,
                                branding: 0,
                                showinfo: 0,
                                rel: 0,
                                fs: 0,
                                wmode: "opaque"
                            },
                            events: {
                                onStateChange: e=>{
                                    0 === e.data && s && e.target.seekTo(0);
                                    const t = e.target.getIframe().closest(`[${selectors$D.dataMediaId}]`);
                                    let i = "";
                                    t && (i = t.getAttribute(selectors$D.dataMediaId)),
                                    1 === e.data && this.pauseOtherMedia(i)
                                }
                            }
                        }
                    };
                    i.videoId = t.externalID,
                    YT.ready((()=>{
                        this.players[e].player = new YT.Player(t.element,i),
                        window.isYoutubeAPILoaded = !0,
                        this.players[e].container.addEventListener("mediaHidden", (e=>this.onHidden(e, !0))),
                        this.players[e].container.addEventListener("xrLaunch", (e=>this.onHidden(e, !0))),
                        this.players[e].container.addEventListener("mediaVisible", (e=>this.onVisible(e, !0)))
                    }
                    ))
                }
        }
        nativeInitCallback() {
            for (const e in this.players)
                if ("video" === this.players[e].type) {
                    const t = this.players[e]
                      , s = {
                        loop: {
                            active: "true" === this.players[e].container.closest(`[${selectors$D.dataVideoLooping}]`).getAttribute(selectors$D.dataVideoLooping)
                        },
                        focusOnPlay: !0
                    };
                    this.players[e].player = new Shopify.Plyr(t.element,s),
                    t.element.addEventListener("play", (e=>{
                        const t = e.target.closest(`[${selectors$D.dataMediaId}]`);
                        let s = "";
                        t && (s = t.getAttribute(selectors$D.dataMediaId)),
                        this.pauseOtherMedia(s)
                    }
                    )),
                    window.isPlyrLoaded = !0,
                    this.players[e].container.addEventListener("mediaHidden", (e=>this.onHidden(e, !1))),
                    this.players[e].container.addEventListener("xrLaunch", (e=>this.onHidden(e, !1))),
                    this.players[e].container.addEventListener("mediaVisible", (e=>this.onVisible(e, !1)))
                }
        }
        onHidden(e, t=!1) {
            if (void 0 !== e.target.dataset.playerId) {
                const s = e.target.dataset.playerId
                  , i = this.players[s];
                !0 === t && i.player && i.player.pauseVideo ? i.player.pauseVideo() : i.player && i.player.pause && i.player.pause()
            }
        }
        onVisible(e, t=!1) {
            if (!window.theme.touched && void 0 !== e.target.dataset.playerId) {
                const s = e.target.dataset.playerId
                  , i = this.players[s];
                !0 === t && i.player && i.player.playVideo ? i.player.playVideo() : i.player && i.player.play && i.player.play()
            }
        }
        pauseOtherMedia(e) {
            const t = `[${selectors$D.dataMediaId}="${e}"]`
              , s = document.querySelector(`${selectors$D.productMediaWrapper}${t}`)
              , i = document.querySelectorAll(`${selectors$D.productMediaWrapper}:not(${t})`);
            s.classList.remove(selectors$D.classMediaHidden),
            i.length && i.forEach((e=>{
                e.dispatchEvent(new CustomEvent("mediaHidden")),
                e.classList.add(selectors$D.classMediaHidden)
            }
            ))
        }
    }
    theme.mediaInstances = {};
    const selectors$E = {
        videoPlayer: "[data-video]",
        modelViewer: "[data-model]",
        sliderEnabled: "flickity-enabled",
        classMediaHidden: "media--hidden"
    };
    class Media {
        constructor(e) {
            this.section = e,
            this.id = e.id,
            this.container = e.container
        }
        init() {
            new Video(this.section),
            this.detect3d(),
            this.launch3d(),
            new Zoom(this.section),
            new InitSlider(this.section)
        }
        detect3d() {
            const e = this.container.querySelectorAll(selectors$E.modelViewer);
            e.length && e.forEach((e=>{
                theme.ProductModel.init(e, this.id)
            }
            ))
        }
        launch3d() {
            const e = this;
            document.addEventListener("shopify_xr_launch", (function() {
                e.container.querySelector(`${e.selectors.modelViewer}:not(.${selectors$E.classMediaHidden})`).dispatchEvent(new CustomEvent("xrLaunch"))
            }
            ))
        }
    }
    const selectors$F = {
        pickupContainer: "[data-store-availability-container]",
        shopifySection: ".shopify-section",
        drawer: "[data-pickup-drawer]",
        drawerBody: "[data-pickup-drawer-body]",
        drawerOpen: "[data-pickup-drawer-open]",
        drawerClose: "[data-pickup-drawer-close]",
        body: "body"
    }
      , classes$k = {
        isOpen: "is-open"
    };
    let sections$h = {};
    class PickupAvailability {
        constructor(e) {
            this.container = e.container,
            this.drawer = null,
            this.drawerBody = null,
            this.buttonDrawerOpen = null,
            this.buttonDrawerClose = null,
            this.body = document.querySelector(selectors$F.body),
            this.a11y = a11y,
            this.container.addEventListener("theme:variant:change", (e=>this.fetchPickupAvailability(e))),
            this.closeEvent()
        }
        fetchPickupAvailability(e) {
            const t = this.container.querySelector(selectors$F.pickupContainer)
              , s = e.detail.variant;
            this.drawer && this.body.removeChild(this.drawer),
            t && s && fetch(`${window.theme.routes.root}variants/${s.id}/?section_id=api-pickup-availability`).then((e=>e.text())).then((e=>{
                const s = (new DOMParser).parseFromString(e, "text/html").querySelector(selectors$F.shopifySection).innerHTML;
                t.innerHTML = s,
                this.drawer = this.container.querySelector(selectors$F.drawer),
                this.clone = this.drawer.cloneNode(!0),
                this.body.appendChild(this.clone),
                t.removeChild(this.drawer),
                this.drawer = this.body.querySelector(selectors$F.drawer),
                this.drawerBody = this.body.querySelector(selectors$F.drawerBody),
                this.buttonDrawerOpen = this.body.querySelector(selectors$F.drawerOpen),
                this.buttonDrawerClose = this.body.querySelectorAll(selectors$F.drawerClose),
                this.buttonDrawerOpen && this.buttonDrawerOpen.addEventListener("click", (()=>{
                    this.openDrawer(),
                    window.accessibility.lastElement = this.buttonDrawerOpen
                }
                )),
                this.buttonDrawerClose.length && this.buttonDrawerClose.forEach((e=>{
                    e.addEventListener("click", (()=>this.closeDrawer()))
                }
                )),
                this.drawer.addEventListener("keyup", (e=>{
                    e.which === window.theme.keyboardKeys.ESCAPE && this.closeDrawer()
                }
                ))
            }
            )).catch((e=>{
                console.error(e)
            }
            ))
        }
        openDrawer() {
            this.drawer && (this.drawer.classList.add(classes$k.isOpen),
            this.drawer.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                bubbles: !0,
                detail: this.drawerBody
            })),
            setTimeout((()=>{
                const e = this.drawer.querySelector(selectors$F.drawerClose);
                this.a11y.removeTrapFocus(),
                this.a11y.trapFocus(this.drawer, {
                    elementToFocus: e
                })
            }
            ), 200))
        }
        closeDrawer() {
            this.drawer && (this.drawer.classList.remove(classes$k.isOpen),
            this.drawer.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                bubbles: !0,
                detail: this.drawerBody
            })),
            this.a11y.removeTrapFocus(),
            window.accessibility.lastElement && setTimeout((()=>{
                window.accessibility.lastElement.focus()
            }
            ), 200))
        }
        closeEvent() {
            document.addEventListener("click", (e=>{
                const t = e.target;
                t.matches(selectors$F.drawerOpen) || t.closest(selectors$F.drawer) || this.closeDrawer()
            }
            ))
        }
    }
    const pickupAvailability = {
        onLoad() {
            sections$h[this.id] = new PickupAvailability(this)
        }
    }
      , selectors$G = {
        product: "[data-product]",
        productForm: "[data-product-form]",
        addToCart: "[data-add-to-cart]",
        addToCartText: "[data-add-to-cart-text]",
        comparePrice: "[data-compare-price]",
        comparePriceText: "[data-compare-text]",
        formWrapper: "[data-form-wrapper]",
        originalSelectorId: "[data-product-select]",
        priceWrapper: "[data-price-wrapper]",
        productSlideshow: "[data-product-slideshow]",
        productImage: "[data-product-image]",
        productJson: "[data-product-json]",
        productPrice: "[data-product-price]",
        unitPrice: "[data-product-unit-price]",
        unitBase: "[data-product-base]",
        unitWrapper: "[data-product-unit]",
        preOrderTag: "_preorder",
        sliderEnabled: "flickity-enabled",
        productSlide: ".product__slide",
        dataTallLayout: "data-tall-layout",
        dataEnableHistoryState: "data-enable-history-state",
        subPrices: "[data-subscription-watch-price]",
        subSelectors: "[data-subscription-selectors]",
        subOffWrap: "[data-price-off]",
        subsToggle: "[data-toggles-group]",
        subsChild: "data-group-toggle",
        subOffAmount: "[data-price-off-amount]",
        subDescription: "[data-plan-description]",
        dataImageId: "data-image-id",
        idInput: '[name="id"]'
    }
      , classes$l = {
        hide: "hide",
        variantSoldOut: "variant--soldout",
        variantUnavailable: "variant--unavailabe",
        productPriceSale: "product__price--sale"
    };
    class ProductAddForm {
        constructor(e) {
            if (this.section = e,
            this.container = e.container,
            this.tallLayout = "true" === this.container.getAttribute(selectors$G.dataTallLayout),
            this.product = this.container.querySelector(selectors$G.product),
            this.productForm = this.container.querySelector(selectors$G.productForm),
            !this.product || !this.productForm)
                return;
            this.enableHistoryState = "true" === this.container.getAttribute(selectors$G.dataEnableHistoryState),
            this.hasUnitPricing = this.container.querySelector(selectors$G.unitWrapper),
            this.subSelectors = this.container.querySelector(selectors$G.subSelectors),
            this.subPrices = this.container.querySelector(selectors$G.subPrices);
            new QuantityCounter(this.container).init(),
            this.init()
        }
        init() {
            let e = null;
            const t = this.container.querySelector(selectors$G.productJson);
            t && (e = t.innerHTML),
            e ? (this.productJSON = JSON.parse(e),
            this.linkForm()) : console.error("Missing product JSON")
        }
        destroy() {
            this.productForm.destroy()
        }
        linkForm() {
            this.productForm = new ProductForm(this.productForm,this.productJSON,{
                onOptionChange: this.onOptionChange.bind(this),
                onPlanChange: this.onPlanChange.bind(this)
            }),
            this.pushState(this.productForm.getFormState()),
            this.subsToggleListeners()
        }
        onOptionChange(e) {
            this.pushState(e.dataset),
            this.updateProductImage(e)
        }
        onPlanChange(e) {
            this.subPrices && this.pushState(e.dataset)
        }
        pushState(e) {
            this.productState = this.setProductState(e),
            this.updateAddToCartState(e),
            this.updateProductPrices(e),
            this.updateSubscriptionText(e),
            this.fireHookEvent(e),
            this.enableHistoryState && this.updateHistoryState(e)
        }
        updateAddToCartState(e) {
            const t = e.variant;
            let s = theme.strings.addToCart;
            const i = this.container.querySelectorAll(selectors$G.priceWrapper)
              , o = this.container.querySelectorAll(selectors$G.addToCart)
              , r = this.container.querySelectorAll(selectors$G.addToCartText)
              , a = this.container.querySelectorAll(selectors$G.formWrapper);
            this.productJSON.tags.includes(selectors$G.preOrderTag) && (s = theme.strings.preOrder),
            i.length && t && i.forEach((e=>{
                e.classList.remove(classes$l.hide)
            }
            )),
            o.length && o.forEach((e=>{
                t && t.available ? e.disabled = !1 : e.disabled = !0
            }
            )),
            r.length && r.forEach((e=>{
                t ? t.available ? e.innerHTML = s : e.innerHTML = theme.strings.soldOut : e.innerHTML = theme.strings.unavailable
            }
            )),
            a.length && a.forEach((e=>{
                if (t) {
                    t.available ? e.classList.remove(classes$l.variantSoldOut, classes$l.variantUnavailable) : (e.classList.add(classes$l.variantSoldOut),
                    e.classList.remove(classes$l.variantUnavailable));
                    const s = e.querySelector(selectors$G.originalSelectorId);
                    s && (s.value = t.id)
                } else
                    e.classList.add(classes$l.variantUnavailable),
                    e.classList.remove(classes$l.variantSoldOut)
            }
            ))
        }
        updateHistoryState(e) {
            const t = e.variant
              , s = e.plan
              , i = window.location.href;
            if (t && i.includes("/product")) {
                const e = new window.URL(i)
                  , o = e.searchParams;
                o.set("variant", t.id),
                s && s.detail && s.detail.id && this.productState.hasPlan ? o.set("selling_plan", s.detail.id) : o.delete("selling_plan"),
                e.search = o.toString();
                const r = e.toString();
                window.history.replaceState({
                    path: r
                }, "", r)
            }
        }
        getBaseUnit(e) {
            return 1 === e.unit_price_measurement.reference_value ? e.unit_price_measurement.reference_unit : e.unit_price_measurement.reference_value + e.unit_price_measurement.reference_unit
        }
        subsToggleListeners() {
            this.container.querySelectorAll(selectors$G.subsToggle).forEach((e=>{
                e.addEventListener("change", function(e) {
                    const t = e.target.value.toString()
                      , s = this.container.querySelector(`[${selectors$G.subsChild}="${t}"]`)
                      , i = this.container.querySelectorAll(`[${selectors$G.subsChild}]`);
                    if (s) {
                        s.classList.remove(classes$l.hide);
                        const e = s.querySelector('[name="selling_plan"]');
                        e.checked = !0,
                        e.dispatchEvent(new Event("change"))
                    }
                    i.forEach((e=>{
                        if (e !== s) {
                            e.classList.add(classes$l.hide);
                            e.querySelectorAll('[name="selling_plan"]').forEach((e=>{
                                e.checked = !1,
                                e.dispatchEvent(new Event("change"))
                            }
                            ))
                        }
                    }
                    ))
                }
                .bind(this))
            }
            ))
        }
        updateSubscriptionText(e) {
            const t = e.plan
              , s = this.container.querySelector(selectors$G.subOffWrap)
              , i = this.container.querySelector(selectors$G.subOffAmount)
              , o = this.container.querySelector(selectors$G.subDescription);
            if (this.productState.planSale) {
                const e = t.detail.price_adjustments[0]
                  , o = e.value;
                e && "percentage" === e.value_type ? i.innerHTML = `${o}%` : i.innerHTML = themeCurrency.formatMoney(o, theme.moneyFormat),
                s.classList.remove(classes$l.hide)
            } else
                s.classList.add(classes$l.hide);
            t ? (o.innerHTML = t.detail.description,
            o.classList.remove(classes$l.hide)) : o && o.classList.add(classes$l.hide)
        }
        updateProductPrices(e) {
            const t = e.variant
              , s = e.plan;
            this.container.querySelectorAll(selectors$G.priceWrapper).forEach((e=>{
                const i = e.querySelector(selectors$G.comparePrice)
                  , o = e.querySelector(selectors$G.productPrice)
                  , r = e.querySelector(selectors$G.comparePriceText);
                let a = ""
                  , n = "";
                this.productState.available && (a = t.compare_at_price,
                n = t.price),
                this.productState.hasPlan && (n = s.allocation.price),
                this.productState.planSale && (a = s.allocation.compare_at_price,
                n = s.allocation.price),
                i && (this.productState.onSale || this.productState.planSale ? (i.classList.remove(classes$l.hide),
                r.classList.remove(classes$l.hide),
                o.classList.add(classes$l.productPriceSale)) : (i.classList.add(classes$l.hide),
                r.classList.add(classes$l.hide),
                o.classList.remove(classes$l.productPriceSale)),
                i.innerHTML = themeCurrency.formatMoney(a, theme.moneyFormat)),
                o.innerHTML = themeCurrency.formatMoney(n, theme.moneyFormat)
            }
            )),
            this.hasUnitPricing && this.updateProductUnits(e)
        }
        updateProductUnits(e) {
            const t = e.variant
              , s = e.plan;
            let i = null;
            if (t && t.unit_price && (i = t.unit_price),
            s && s.allocation && s.allocation.unit_price && (i = s.allocation.unit_price),
            i) {
                const e = this.getBaseUnit(t)
                  , s = themeCurrency.formatMoney(i, theme.moneyFormat);
                this.container.querySelector(selectors$G.unitPrice).innerHTML = s,
                this.container.querySelector(selectors$G.unitBase).innerHTML = e,
                showElement(this.container.querySelector(selectors$G.unitWrapper))
            } else
                hideElement(this.container.querySelector(selectors$G.unitWrapper))
        }
        fireHookEvent(e) {
            const t = e.variant;
            this.container.dispatchEvent(new CustomEvent("theme:variant:change",{
                detail: {
                    variant: t
                },
                bubbles: !0
            }))
        }
        setProductState(e) {
            const t = e.variant
              , s = e.plan
              , i = {
                available: !0,
                soldOut: !1,
                onSale: !1,
                showUnitPrice: !1,
                requiresPlan: !1,
                hasPlan: !1,
                planPerDelivery: !1,
                planSale: !1
            };
            return !t || t.requires_selling_plan && !s ? i.available = !1 : (t.available || (i.soldOut = !0),
            t.compare_at_price > t.price && (i.onSale = !0),
            t.unit_price && (i.showUnitPrice = !0),
            this.product && this.product.requires_selling_plan && (i.requiresPlan = !0),
            s && this.subPrices && (i.hasPlan = !0,
            s.allocation.per_delivery_price !== s.allocation.price && (i.planPerDelivery = !0),
            t.price > s.allocation.price && (i.planSale = !0))),
            i
        }
        updateProductImage(e) {
            const t = e.dataset.variant;
            if (t && t.featured_media) {
                const e = this.container.querySelector(`${selectors$G.productImage}[${selectors$G.dataImageId}="${t.featured_media.id}"]`)
                  , s = e.closest(selectors$G.productSlide);
                if (s) {
                    const t = Array.from(s.parentElement.children).indexOf(s)
                      , i = this.container.querySelector(selectors$G.productSlideshow);
                    if (i && i.classList.contains(selectors$G.sliderEnabled) && FlickityFade.data(i).select(t),
                    !theme.variables.bpSmall && this.tallLayout) {
                        const s = e.getBoundingClientRect().top + window.scrollY;
                        if (0 === t && s > window.pageYOffset)
                            return;
                        document.dispatchEvent(new CustomEvent("poppy:close")),
                        window.scrollTo({
                            top: s,
                            left: 0,
                            behavior: "smooth"
                        })
                    }
                }
            }
        }
    }
    const productFormSection = {
        onLoad() {
            this.section = new ProductAddForm(this)
        }
    }
      , selectors$H = {
        elements: {
            accordionHolder: "[data-accordion-holder]",
            accordion: "[data-accordion]",
            accordionToggle: "[data-accordion-toggle]",
            accordionBody: "[data-accordion-body]",
            accordionExpandValue: "data-accordion-expand",
            accordionBlockValue: "data-block-id"
        },
        classes: {
            open: "is-open"
        }
    }
      , sections$i = {};
    class GlobalAccordions {
        constructor(e) {
            this.container = e.container,
            this.accordion = this.container.querySelector(selectors$H.elements.accordion),
            this.accordionToggles = this.container.querySelectorAll(selectors$H.elements.accordionToggle),
            this.accordionTogglesLength = this.accordionToggles.length,
            this.accordionBody = this.container.querySelector(selectors$H.elements.accordionBody),
            this.accordionTogglesLength && this.accordionBody && this.accordionEvents()
        }
        accordionEvents() {
            this.accordionToggles.forEach((e=>{
                e.addEventListener("click", throttle((t=>{
                    t.preventDefault();
                    const s = e.parentElement.querySelector(selectors$H.elements.accordionBody);
                    s && this.onAccordionToggle(e, s)
                }
                ), 800))
            }
            )),
            "true" === this.accordion.getAttribute(selectors$H.elements.accordionExpandValue) && (this.accordionToggles[0].classList.add(selectors$H.classes.open),
            showElement(this.accordionToggles[0].parentElement.querySelector(selectors$H.elements.accordionBody)))
        }
        closeOtherAccordions(e, t=!0) {
            let s = [...this.accordionToggles];
            const i = this.container.closest(selectors$H.elements.accordionHolder);
            i && (s = [...i.querySelectorAll(selectors$H.elements.accordionToggle)]),
            s.filter((s=>{
                const i = s.parentElement.querySelector(selectors$H.elements.accordionBody);
                s !== e && s.classList.contains(selectors$H.classes.open) && i && this.onAccordionClose(s, i, t)
            }
            ))
        }
        onAccordionOpen(e, t, s=!0) {
            e.classList.add(selectors$H.classes.open),
            slideDown(t),
            this.closeOtherAccordions(e, s)
        }
        onAccordionClose(e, t, s=!0) {
            e.classList.remove(selectors$H.classes.open),
            s ? slideUp(t) : hideElement(t)
        }
        onAccordionToggle(e, t) {
            e.classList.toggle(selectors$H.classes.open),
            slideToggle(t),
            this.closeOtherAccordions(e)
        }
        onBlockToggle(e, t=!0) {
            const s = this.container.querySelector(`${selectors$H.elements.accordionToggle}[${selectors$H.elements.accordionBlockValue}="${e.detail.blockId}"]`);
            if (!s)
                return;
            const i = s.parentElement.querySelector(selectors$H.elements.accordionBody);
            i && (t ? this.onAccordionOpen(s, i, !1) : this.onAccordionClose(s, i))
        }
        onSelectToggle(e=!0) {
            this.accordionBody && this.accordionTogglesLength && this.accordionTogglesLength < 2 && (e ? this.onAccordionOpen(this.accordionToggles[0], this.accordionBody, !1) : this.onAccordionClose(this.accordionToggles[0], this.accordionBody))
        }
        onSelect() {
            this.onSelectToggle(!0)
        }
        onDeselect() {
            this.onSelectToggle(!1)
        }
        onBlockSelect(e) {
            this.onBlockToggle(e, !0)
        }
        onBlockDeselect(e) {
            this.onBlockToggle(e, !1)
        }
    }
    const accordions = {
        onLoad() {
            sections$i[this.id] = new GlobalAccordions(this)
        },
        onReorder() {
            sections$i[this.id] = new GlobalAccordions(this)
        },
        onSelect() {
            sections$i[this.id].onSelect()
        },
        onDeselect() {
            sections$i[this.id].onDeselect()
        },
        onBlockSelect(e) {
            sections$i[this.id].onBlockSelect(e)
        },
        onBlockDeselect(e) {
            sections$i[this.id].onBlockDeselect(e)
        }
    };
    window.theme.variables = {
        productPageSticky: !1,
        bpSmall: !1
    };
    const selectors$I = {
        addToCart: "[data-add-to-cart]",
        priceWrapper: "[data-price-wrapper]",
        slideshow: "[data-product-slideshow]",
        productImage: "[data-product-image]",
        productJson: "[data-product-json]",
        form: "[data-product-form]",
        thumbs: "[data-product-thumbs]",
        dataSectionId: "data-section-id",
        dataTallLayout: "data-tall-layout",
        dataStickyEnabled: "data-sticky-enabled",
        dataCartBar: "data-cart-bar",
        dataReviews: "data-reviews",
        dataProductShare: "[data-product-share]",
        dataProductShareValue: "data-product-share",
        dataProductShareTitleValue: "data-product-share-title",
        productPage: ".product__page",
        formWrapper: ".form__wrapper",
        cartBar: "#cart-bar",
        productSubmitAdd: ".product__submit__add",
        cartBarAdd: "data-add-to-cart-bar",
        cartBarScroll: "data-cart-bar-scroll",
        templateProduct: "#template-product",
        siteFooterWrapper: ".site-footer-wrapper",
        shopifyProductReviews: "#shopify-product-reviews",
        toggleTruncateHolder: "[data-truncated-holder]",
        toggleTruncateButton: "[data-truncated-button]",
        toggleTruncateContent: "[data-truncated-content]",
        toggleTruncateContentAttr: "data-truncated-content",
        headerSticky: '[data-header-sticky="sticky"]',
        upsellButton: "[data-upsell-btn]",
        upsellButtonText: "[data-upsell-btn-text]",
        scrollToElement: "[data-scroll-to]",
        scrollToElementValue: "data-scroll-to",
        accordionHolder: "[data-accordion-holder]",
        accordionToggle: "[data-accordion-toggle]",
        headerHeight: "[data-header-height]",
        dataModalButton: "data-product-popup",
        formWrapper: "[data-form-wrapper]",
        tooltip: "[data-tooltip]",
        tooltipStopMousenterValue: "data-tooltip-stop-mouseenter"
    }
      , classes$m = {
        classExpanded: "is-expanded",
        classSticky: "is-sticky",
        classStickyHeader: "with-sticky-header",
        classVisible: "is-visible",
        classLoading: "is-loading",
        classSiteFooterPush: "site-footer--push",
        open: "is-open",
        hasPopup: "has-popup"
    }
      , sections$j = {};
    class Product {
        constructor(e) {
            this.section = e,
            this.container = e.container,
            this.id = this.container.getAttribute(selectors$I.dataSectionId),
            this.tallLayout = "true" === this.container.getAttribute(selectors$I.dataTallLayout),
            this.stickyEnabled = "true" === this.container.getAttribute(selectors$I.dataStickyEnabled),
            this.headerSticky = null !== document.querySelector(selectors$I.headerSticky),
            this.showReviews = "true" === this.container.getAttribute(selectors$I.dataReviews),
            this.thumbs = this.container.querySelector(selectors$I.thumbs),
            this.shareButton = this.container.querySelector(selectors$I.dataProductShare),
            this.upsellButton = this.container.querySelector(selectors$I.upsellButton),
            this.scrollToButton = this.container.querySelector(selectors$I.scrollToElement),
            this.truncateElementHolder = this.container.querySelector(selectors$I.toggleTruncateHolder),
            this.truncateElement = this.container.querySelector(selectors$I.toggleTruncateContent),
            this.modalButton = this.container.querySelectorAll(`[${selectors$I.dataModalButton}]`),
            this.formWrapper = this.container.querySelector(selectors$I.formWrapper),
            this.resizeEventTruncate = ()=>this.truncateText(),
            this.resizeEventSticky = ()=>this.stickyScrollCheck(),
            this.resizeEventUpsell = ()=>this.calcUpsellButtonDemensions(),
            this.scrollEvent = ()=>this.scrollTop(),
            Shopify.Products.recordRecentlyViewed(),
            this.scrollToButton && this.scrollToReviews(),
            this.shareToggle(),
            this.truncateElementHolder && this.truncateElement && (setTimeout(this.resizeEventTruncate, 50),
            document.addEventListener("theme:resize", this.resizeEventTruncate));
            const t = this.container.querySelector(selectors$I.productJson);
            if (t && !t.innerHTML || !t) {
                return void new QuantityCounter(this.container).init()
            }
            this.form = this.container.querySelector(selectors$I.form),
            this.init(),
            this.stickyEnabled && this.stickyScroll(),
            "true" === this.container.getAttribute(selectors$I.dataCartBar) && this.initCartBar();
            const s = "function" == typeof window.SPR;
            this.showReviews && s && (window.SPR.initDomEls(),
            window.SPR.loadBadges()),
            this.upsellButton && this.upsellButtonDemensions(),
            this.modalButton.length > 0 && this.productPopup()
        }
        init() {
            theme.mediaInstances[this.id] = new Media(this.section),
            theme.mediaInstances[this.id].init()
        }
        productPopup() {
            this.modalButton.forEach((e=>{
                e.addEventListener("click", (t=>{
                    t.preventDefault();
                    const s = document.querySelector(`#${e.getAttribute(selectors$I.dataModalButton)}`);
                    "none" !== window.getComputedStyle(s).display && (fadeOut(s),
                    this.formWrapper.classList.remove(classes$m.hasPopup),
                    document.dispatchEvent(new CustomEvent("theme:scroll:unlock",{
                        bubbles: !0
                    }))),
                    "none" === window.getComputedStyle(s).display && (fadeIn(s),
                    this.formWrapper.classList.add(classes$m.hasPopup),
                    document.dispatchEvent(new CustomEvent("theme:scroll:lock",{
                        bubbles: !0,
                        detail: s
                    })))
                }
                ))
            }
            ))
        }
        upsellButtonDemensions() {
            this.calcUpsellButtonDemensions(),
            document.addEventListener("theme:resize", this.resizeEventUpsell)
        }
        calcUpsellButtonDemensions() {
            const e = this.upsellButton.querySelector(selectors$I.upsellButtonText);
            e && this.upsellButton.style.setProperty("--btn-text-width", `${e.clientWidth}px`)
        }
        stickyScroll() {
            this.stickyScrollCheck(),
            document.addEventListener("theme:resize", this.resizeEventSticky)
        }
        stickyScrollCheck() {
            const e = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= window.theme.sizes.small
              , t = this.container.querySelector(selectors$I.formWrapper)
              , s = this.container.querySelector(`${selectors$I.productPage} ${selectors$I.formWrapper}`);
            if (e) {
                const e = this.container.querySelector(selectors$I.slideshow);
                if (!t || !e)
                    return;
                const i = t.offsetHeight;
                i < e.offsetHeight || i < window.innerHeight ? (theme.variables.productPageSticky = !0,
                s.classList.add(classes$m.classSticky),
                this.headerSticky && s.classList.add(classes$m.classStickyHeader)) : (theme.variables.productPageSticky = !1,
                s.classList.remove(classes$m.classSticky))
            } else
                s.classList.remove(classes$m.classSticky)
        }
        truncateText() {
            if (this.truncateElementHolder.classList.contains(classes$m.classVisible))
                return;
            const e = this.truncateElement.cloneNode(!0)
              , t = this.truncateElement.getAttribute(selectors$I.toggleTruncateContentAttr)
              , s = this.truncateElement.nextElementSibling;
            s && s.remove(),
            this.truncateElement.parentElement.append(e);
            const i = this.truncateElement.nextElementSibling;
            i.classList.add(t),
            i.removeAttribute(selectors$I.toggleTruncateContentAttr),
            showElement(i),
            ellipsed.ellipsis(i, 5, {
                replaceStr: ""
            }),
            hideElement(i),
            this.truncateElement.innerHTML !== i.innerHTML ? this.truncateElementHolder.classList.add(classes$m.classExpanded) : (i.remove(),
            this.truncateElementHolder.classList.remove(classes$m.classExpanded)),
            this.toggleTruncatedContent(this.truncateElementHolder)
        }
        toggleTruncatedContent(e) {
            const t = e.querySelector(selectors$I.toggleTruncateButton);
            t && t.addEventListener("click", (t=>{
                t.preventDefault(),
                e.classList.remove(classes$m.classExpanded),
                e.classList.add(classes$m.classVisible)
            }
            ))
        }
        shareToggle() {
            this.shareButton && this.shareButton.addEventListener("click", (function() {
                const e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (navigator.share && e <= 1024) {
                    const e = this.hasAttribute(selectors$I.dataProductShareTitleValue) ? this.getAttribute(selectors$I.dataProductShareTitleValue) : window.location.hostname
                      , t = this.hasAttribute(selectors$I.dataProductShareValue) ? this.getAttribute(selectors$I.dataProductShareValue) : window.location.href;
                    navigator.share({
                        title: e,
                        url: t
                    }).then((()=>{
                        console.log("Thanks for sharing!")
                    }
                    )).catch(console.error)
                } else
                    this.parentElement.classList.toggle(classes$m.classExpanded)
            }
            ))
        }
        initCartBar() {
            const e = document.querySelector(selectors$I.cartBar)
              , t = e.querySelector(selectors$I.productSubmitAdd);
            t && (t.addEventListener("click", (e=>{
                e.preventDefault(),
                e.target.hasAttribute(selectors$I.cartBarAdd) ? (theme.cartDrawerEnabled && (e.target.classList.add(classes$m.classLoading),
                e.target.setAttribute("disabled", "disabled")),
                this.form.querySelector(selectors$I.addToCart).dispatchEvent(new Event("click",{
                    bubbles: !0
                }))) : e.target.hasAttribute(selectors$I.cartBarScroll) && this.scrollToTop()
            }
            )),
            t.hasAttribute(selectors$I.cartBarAdd) && document.addEventListener("product:bar:error", (()=>this.scrollToTop())),
            theme.cartDrawerEnabled && document.addEventListener("product:bar:button", (()=>{
                t && t.classList.contains(classes$m.classLoading) && (t.classList.remove(classes$m.classLoading),
                t.removeAttribute("disabled"))
            }
            ))),
            this.cartBar = e,
            document.addEventListener("theme:scroll", this.scrollEvent)
        }
        scrollToTop() {
            const e = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= window.theme.sizes.small ? this.container : this.form;
            window.scrollTo({
                top: e.getBoundingClientRect().top + window.scrollY,
                left: 0,
                behavior: "smooth"
            })
        }
        scrollTop() {
            const e = window.pageYOffset
              , t = document.querySelector(selectors$I.siteFooterWrapper);
            if (this.form && this.cartBar) {
                const s = e > this.form.offsetTop + this.form.offsetHeight;
                this.cartBar.classList.toggle(classes$m.classVisible, s),
                t.classList.toggle(classes$m.classSiteFooterPush, s),
                t.style.marginBottom = t.classList.contains(classes$m.classSiteFooterPush) ? `${this.cartBar.offsetHeight}px` : "0"
            }
        }
        scrollToReviews() {
            this.scrollToButton.addEventListener("click", (e=>{
                e.preventDefault();
                const t = document.querySelector(this.scrollToButton.getAttribute(selectors$I.scrollToElementValue));
                if (!t)
                    return;
                const s = t.querySelector(selectors$I.accordionToggle)
                  , i = s.closest(selectors$I.accordionHolder);
                let o = !1;
                !s.classList.contains(classes$m.open) && i && i.querySelector(`${selectors$I.accordionToggle}.${classes$m.open}`) && (o = !0),
                s.classList.contains(classes$m.open) || s.dispatchEvent(new Event("click")),
                o ? setTimeout((()=>this.scrollToElement(t)), 500) : this.scrollToElement(t)
            }
            ))
        }
        scrollToElement(e) {
            const t = this.headerSticky ? document.querySelector(selectors$I.headerHeight).getBoundingClientRect().height : 0;
            window.scrollTo({
                top: e.getBoundingClientRect().top + window.scrollY - t,
                left: 0,
                behavior: "smooth"
            });
            const s = document.querySelectorAll(`${selectors$I.tooltip}:not([${selectors$I.tooltipStopMousenterValue}])`);
            s.length && s.forEach((e=>{
                e.setAttribute(selectors$I.tooltipStopMousenterValue, ""),
                setTimeout((()=>{
                    e.removeAttribute(selectors$I.tooltipStopMousenterValue)
                }
                ), 1e3)
            }
            ))
        }
        onUnload() {
            this.truncateElementHolder && this.truncateElement && document.removeEventListener("theme:resize", this.resizeEventTruncate),
            this.stickyEnabled && document.removeEventListener("theme:resize", this.resizeEventSticky),
            this.upsellButton && document.removeEventListener("theme:resize", this.resizeEventUpsell),
            "true" === this.container.getAttribute(selectors$I.dataCartBar) && document.removeEventListener("theme:scroll", this.scrollEvent)
        }
    }
    const productSection = {
        onLoad() {
            sections$j[this.id] = new Product(this)
        },
        onUnload(e) {
            sections$j[this.id].onUnload(e)
        }
    };
    register("product", [productSection, pickupAvailability, productFormSection, swatchSection, tooltipSection, popoutSection, tabs, accordions, copyClipboard]);
    const selectors$J = {
        dataRelatedSectionElem: "[data-related-section]",
        dataRelatedProduct: "[data-product-grid-item]",
        dataProductId: "data-product-id",
        dataLimit: "data-limit",
        dataMinimum: "data-minimum",
        recentlyViewed: "[data-recent-wrapper]",
        recentlyViewedWrapper: "[data-recently-viewed-wrapper]",
        recentlyProduct: "#recently-viewed-products",
        dataProductItem: ".product-item",
        slider: "[data-slider]"
    };
    class Related {
        constructor(e) {
            this.section = e,
            this.sectionId = e.id,
            this.container = e.container,
            this.init(),
            this.recent()
        }
        init() {
            const e = this.container.querySelector(selectors$J.dataRelatedSectionElem);
            if (!e)
                return;
            const t = this
              , s = e.getAttribute(selectors$J.dataProductId)
              , i = e.getAttribute(selectors$J.dataLimit)
              , o = `${window.theme.routes.product_recommendations_url}?section_id=related&limit=${i}&product_id=${s}`;
            fetch(o).then((function(e) {
                return e.text()
            }
            )).then((function(s) {
                const i = document.createElement("div");
                i.innerHTML = s;
                const o = i.querySelector(selectors$J.dataRelatedSectionElem);
                if (o.querySelector(selectors$J.dataRelatedProduct)) {
                    const s = o.innerHTML;
                    hideElement(e),
                    e.innerHTML = s,
                    slideDown(e);
                    const i = e.querySelectorAll(selectors$J.dataRelatedProduct);
                    i.forEach((e=>{
                        new QuickAddProduct(e)
                    }
                    )),
                    makeGridSwatches(t.section),
                    i.length > 4 && e.querySelector(selectors$J.slider) && new Slider(e)
                } else
                    e.dispatchEvent(new CustomEvent("tabs:hideRelatedTab",{
                        bubbles: !0
                    }))
            }
            )).catch((function() {
                e.dispatchEvent(new CustomEvent("tabs:hideRelatedTab",{
                    bubbles: !0
                }))
            }
            ))
        }
        recent() {
            const e = this.container.querySelector(selectors$J.recentlyViewed)
              , t = e ? parseInt(e.getAttribute(selectors$J.dataLimit)) : 4;
            Shopify.Products.showRecentlyViewed({
                howManyToShow: t,
                wrapperId: `recently-viewed-products-${this.sectionId}`,
                templateId: `recently-viewed-product-template-${this.sectionId}`,
                section: this.section,
                onComplete: (e,t)=>{
                    const s = t.container
                      , i = s.querySelector(selectors$J.recentlyViewed)
                      , o = s.querySelector(selectors$J.recentlyViewedWrapper)
                      , r = e.querySelectorAll(selectors$J.dataProductItem)
                      , a = i.hasAttribute(selectors$J.dataMinimum) ? parseInt(i.getAttribute(selectors$J.dataMinimum)) : 4
                      , n = !o && r.length > 0
                      , l = o && r.length >= a;
                    (n || l) && (l && o.classList.remove("is-hidden"),
                    fadeIn(i),
                    i.dispatchEvent(new CustomEvent("tabs:checkRecentTab",{
                        bubbles: !0
                    })),
                    r.forEach((e=>{
                        new QuickAddProduct(e)
                    }
                    )),
                    makeGridSwatches(t),
                    r.length > 4 && i.querySelector(selectors$J.slider) && new Slider(i))
                }
            })
        }
    }
    const relatedSection = {
        onLoad() {
            this.section = new Related(this),
            this.container.querySelectorAll(selectors$J.dataRelatedProduct).forEach((e=>{
                new QuickAddProduct(e)
            }
            ))
        }
    };
    register("related", [relatedSection, popoutSection, tabs]),
    register("reviews", accordions);
    const selectors$K = {
        scrollElement: "[data-block-scroll]",
        flickityEnabled: "flickity-enabled"
    }
      , sections$k = {};
    class BlockScroll {
        constructor(e) {
            this.container = e.container
        }
        onBlockSelect(e) {
            const t = this.container.querySelector(selectors$K.scrollElement);
            if (t && !t.classList.contains(selectors$K.flickityEnabled)) {
                const s = e.srcElement;
                s && t.scrollTo({
                    top: 0,
                    left: s.offsetLeft,
                    behavior: "smooth"
                })
            }
        }
    }
    const blockScroll = {
        onLoad() {
            sections$k[this.id] = new BlockScroll(this)
        },
        onBlockSelect(e) {
            sections$k[this.id].onBlockSelect(e)
        }
    }
      , sections$l = {}
      , selectors$L = {
        logo: "[data-slider-logo]",
        text: "[data-slider-text]",
        slide: "[data-slide]",
        slideData: "data-slide",
        asNavFor: "#nav-for-",
        slideIndex: "data-slide-index",
        flickityEnabled: "flickity-enabled"
    }
      , classes$n = {
        classIsSelected: "is-selected"
    };
    class LogoList {
        constructor(e) {
            this.container = e.container,
            this.slideshowNav = this.container.querySelector(selectors$L.logo),
            this.slideshowNav && (this.slideshowText = this.container.querySelector(selectors$L.text),
            this.logoSlides = this.slideshowNav.querySelectorAll(selectors$L.slide),
            this.resizeEvent = debounce((()=>this.setSlideshowNavState()), 200),
            this.flkty = null,
            this.flktyNav = null,
            this.init())
        }
        init() {
            if (this.slideshowText) {
                this.flkty = new FlickityFade(this.slideshowText,{
                    fade: !0,
                    autoPlay: !1,
                    prevNextButtons: !1,
                    cellAlign: "left",
                    contain: !0,
                    pageDots: !1,
                    wrapAround: !1,
                    selectedAttraction: .2,
                    friction: .6,
                    draggable: !1
                });
                const e = this.slideshowText.querySelectorAll(selectors$L.slide);
                if (e.length) {
                    let t = -1;
                    e.forEach((e=>{
                        const s = parseFloat(getComputedStyle(e, null).height.replace("px", ""));
                        s > t && (t = s)
                    }
                    )),
                    e.forEach((e=>{
                        const s = parseFloat(getComputedStyle(e, null).height.replace("px", ""));
                        if (s < t) {
                            const i = Math.ceil((t - s) / 2);
                            e.style.margin = `${i}px 0`
                        }
                    }
                    ))
                }
            }
            this.logoSlides.forEach((e=>{
                e.addEventListener("click", (e=>{
                    const t = parseInt(e.currentTarget.getAttribute(selectors$L.slideIndex))
                      , s = this.slideshowNav.classList.contains(selectors$L.flickityEnabled);
                    if (this.flkty && this.flkty.select(t),
                    s)
                        this.flktyNav.select(t),
                        this.slideshowNav.classList.contains(classes$n.classIsSelected) || this.flktyNav.playPlayer();
                    else {
                        const t = this.slideshowNav.querySelector(`.${classes$n.classIsSelected}`);
                        t && t.classList.remove(classes$n.classIsSelected),
                        e.currentTarget.classList.add(classes$n.classIsSelected)
                    }
                }
                ))
            }
            )),
            this.initSlideshowNav()
        }
        onUnload() {
            if (!this.slideshowNav)
                return;
            this.slideshowNav.classList.contains(selectors$L.flickityEnabled) && this.flktyNav.destroy(),
            this.flkty && this.flkty.destroy(),
            window.removeEventListener("resize", this.resizeEvent)
        }
        onBlockSelect(e) {
            if (!this.slideshowNav)
                return;
            const t = this.slideshowNav.querySelector(`[${selectors$L.slideData}="${e.detail.blockId}"]`)
              , s = parseInt(t.getAttribute(selectors$L.slideIndex));
            this.slideshowNav.classList.contains(selectors$L.flickityEnabled) ? (this.flktyNav.select(s),
            this.flktyNav.stopPlayer(),
            this.slideshowNav.classList.add(classes$n.classIsSelected)) : t.dispatchEvent(new Event("click"))
        }
        onBlockDeselect() {
            this.slideshowNav && this.slideshowNav.classList.contains(selectors$L.flickityEnabled) && (this.flktyNav.playPlayer(),
            this.slideshowNav.classList.remove(classes$n.classIsSelected))
        }
        setSlideshowNavState() {
            const e = this.slideshowNav.querySelectorAll(selectors$L.slide).length
              , t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
              , s = 200 * e
              , i = this.slideshowNav.classList.contains(selectors$L.flickityEnabled);
            if (s > t) {
                if (!i) {
                    const e = this.slideshowNav.querySelector(`.${classes$n.classIsSelected}`);
                    e && e.classList.remove(classes$n.classIsSelected),
                    this.logoSlides[0].classList.add(classes$n.classIsSelected),
                    this.flktyNav = new Flickity(this.slideshowNav,{
                        autoPlay: 4e3,
                        prevNextButtons: !1,
                        contain: !0,
                        pageDots: !1,
                        wrapAround: !0,
                        watchCSS: !0,
                        selectedAttraction: .05,
                        friction: .8,
                        initialIndex: 0
                    }),
                    this.flkty && (this.flkty.select(0),
                    this.flktyNav.on("change", (e=>this.flkty.select(e))))
                }
            } else
                i && (this.flktyNav.destroy(),
                this.logoSlides[0].classList.add(classes$n.classIsSelected),
                this.flkty && this.flkty.select(0))
        }
        initSlideshowNav() {
            this.setSlideshowNavState(),
            window.addEventListener("resize", this.resizeEvent)
        }
    }
    const LogoListSection = {
        onLoad() {
            sections$l[this.id] = new LogoList(this)
        },
        onUnload(e) {
            sections$l[this.id].onUnload(e)
        },
        onBlockSelect(e) {
            sections$l[this.id].onBlockSelect(e)
        },
        onBlockDeselect(e) {
            sections$l[this.id].onBlockDeselect(e)
        }
    };
    register("logos", [LogoListSection, blockScroll]);
    const selectors$M = {
        videoPlay: "[data-video-play]",
        videoPlayValue: "data-video-play"
    };
    class VideoPlay {
        constructor(e, t=selectors$M.videoPlay, s=selectors$M.videoPlayValue) {
            this.container = e,
            this.videoPlay = this.container.querySelectorAll(t),
            this.videoPlay.length && this.videoPlay.forEach((e=>{
                e.addEventListener("click", (e=>{
                    const t = e.currentTarget;
                    if (t.hasAttribute(s) && "" !== t.getAttribute(s).trim()) {
                        e.preventDefault();
                        const i = [{
                            html: t.getAttribute(s)
                        }];
                        new LoadPhotoswipe(i)
                    }
                }
                ))
            }
            ))
        }
    }
    const videoPlay = {
        onLoad() {
            new VideoPlay(this.container)
        }
    };
    register("featured-video", [videoPlay, parallaxHero]),
    register("slideshow", [slider, parallaxHero]);
    const sections$m = {};
    class ImageWithText {
        constructor(e) {
            document.dispatchEvent(new CustomEvent("header:check",{
                bubbles: !1
            }))
        }
    }
    const ImageWithTextSection = {
        onLoad() {
            sections$m[this.id] = new ImageWithText(this)
        }
    };
    register("custom-content", [slider, ImageWithTextSection, videoPlay, parallaxHero, productGridReviews, quickAddProduct, swatchGridSection]);
    var styles = {};
    function mapStyle(e) {
        return styles[e]
    }
    styles.basic = [],
    styles.light = [{
        featureType: "administrative",
        elementType: "labels",
        stylers: [{
            visibility: "simplified"
        }, {
            lightness: "64"
        }, {
            hue: "#ff0000"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#bdbdbd"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            color: "#f0f0f0"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "landscape.natural.landcover",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape.natural.terrain",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            lightness: "100"
        }]
    }, {
        featureType: "poi.park",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
            saturation: "-41"
        }, {
            color: "#e8ede7"
        }]
    }, {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
            saturation: "-100"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            lightness: "25"
        }, {
            gamma: "1.06"
        }, {
            saturation: "-100"
        }]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            gamma: "10.00"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.01"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{
            weight: "0.8"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{
            gamma: "10.00"
        }, {
            lightness: "100"
        }, {
            weight: "0.4"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels",
        stylers: [{
            visibility: "simplified"
        }, {
            weight: "0.01"
        }, {
            lightness: "39"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels.text.stroke",
        stylers: [{
            weight: "0.50"
        }, {
            gamma: "10.00"
        }, {
            lightness: "100"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
            color: "#cfe5ee"
        }, {
            visibility: "on"
        }]
    }],
    styles.white_label = [{
        featureType: "all",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "all",
        elementType: "labels",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{
            gamma: "3.86"
        }, {
            lightness: "100"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#cccccc"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            color: "#f2f2f2"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
            saturation: -100
        }, {
            lightness: 45
        }]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            weight: "0.8"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.8"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{
            weight: "0.8"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels.text",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
            color: "#e4e4e4"
        }, {
            visibility: "on"
        }]
    }],
    styles.dark_label = [{
        featureType: "all",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
            saturation: 36
        }, {
            color: "#000000"
        }, {
            lightness: 40
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "on"
        }, {
            color: "#000000"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }, {
            weight: 1.2
        }]
    }, {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{
            visibility: "simplified"
        }, {
            lightness: "-82"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels.text.stroke",
        stylers: [{
            invert_lightness: !0
        }, {
            weight: "7.15"
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "landscape",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 21
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }, {
            weight: "0.8"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 29
        }, {
            weight: "0.01"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 18
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{
            weight: "0.01"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 19
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: "#000000"
        }, {
            lightness: 17
        }]
    }],
    window.theme.allMaps = window.theme.allMaps || {};
    let allMaps = window.theme.allMaps;
    window.theme.mapAPI = window.theme.mapAPI || null;
    class Map {
        constructor(e) {
            this.container = e.container,
            this.mapContainer = this.container.querySelector("[data-map-container]"),
            this.key = this.container.getAttribute("data-api-key"),
            this.styleString = this.container.getAttribute("data-style") || "",
            this.zoomString = this.container.getAttribute("data-zoom") || 14,
            this.address = this.container.getAttribute("data-address"),
            this.enableCorrection = this.container.getAttribute("data-latlong-correction"),
            this.lat = this.container.getAttribute("data-lat"),
            this.long = this.container.getAttribute("data-long"),
            this.key && this.initMaps()
        }
        initMaps() {
            loadAPI(this.key).then((()=>"true" === this.enableCorrection && "" !== this.lat && "" !== this.long ? new google.maps.LatLng(this.lat,this.long) : geocodeAddressPromise(this.address))).then((e=>{
                const t = {
                    zoom: parseInt(this.zoomString, 10),
                    styles: mapStyle(this.styleString),
                    center: e,
                    draggable: !0,
                    clickableIcons: !1,
                    scrollwheel: !1,
                    zoomControl: !1,
                    disableDefaultUI: !0
                };
                return createMap(this.mapContainer, t)
            }
            )).then((e=>{
                this.map = e,
                allMaps[this.id] = e
            }
            )).catch((e=>{
                console.log("Failed to load Google Map"),
                console.log(e)
            }
            ))
        }
        unload() {
            void 0 !== window.google && google.maps.event.clearListeners(this.map, "resize")
        }
    }
    const mapSection = {
        onLoad() {
            allMaps[this.id] = new Map(this)
        },
        onUnload() {
            "function" == typeof allMaps[this.id].unload && allMaps[this.id].unload()
        }
    };
    function loadAPI(e) {
        if (null === window.theme.mapAPI) {
            const t = `https://maps.googleapis.com/maps/api/js?key=${e}`;
            window.theme.mapAPI = loadScript({
                url: t
            })
        }
        return window.theme.mapAPI
    }
    function createMap(e, t) {
        var s = new google.maps.Map(e,t)
          , i = s.getCenter();
        new google.maps.Marker({
            map: s,
            position: i
        });
        return google.maps.event.addDomListener(window, "resize", (function() {
            google.maps.event.trigger(s, "resize"),
            s.setCenter(i)
        }
        )),
        s
    }
    function geocodeAddressPromise(e) {
        return new Promise(((t,s)=>{
            (new google.maps.Geocoder).geocode({
                address: e
            }, (function(e, i) {
                if ("OK" == i) {
                    var o = {
                        lat: e[0].geometry.location.lat(),
                        lng: e[0].geometry.location.lng()
                    };
                    t(o)
                } else
                    s(i)
            }
            ))
        }
        ))
    }
    register("map", mapSection),
    register("search", [quickAddProduct, swatchGridSection]);
    const selectors$N = {
        largePromoInner: "[data-large-promo-inner]",
        trackingInner: "[data-tracking-consent-inner]",
        tracking: "[data-tracking-consent]",
        trackingAccept: "[data-confirm-cookies]",
        close: "[data-close-modal]",
        modalUnderlay: "[data-modal-underlay]",
        newsletterPopup: "[data-newsletter]",
        newsletterPopupHolder: "[data-newsletter-holder]",
        newsletterClose: "[data-newsletter-close]",
        newsletterHeading: "[data-newsletter-heading]",
        newsletterField: "[data-newsletter-field]",
        promoPopup: "[data-promo-text]",
        newsletterForm: "[data-newsletter-form]",
        delayAttribite: "data-popup-delay",
        cookieNameAttribute: "data-cookie-name",
        dataTargetReferrer: "data-target-refferer"
    }
      , classes$o = {
        hide: "hide",
        hasValue: "has-value",
        success: "has-success"
    };
    let sections$n = {};
    class PopupCookie {
        constructor(e, t) {
            this.configuration = {
                expires: null,
                path: "/",
                domain: window.location.hostname
            },
            this.name = e,
            this.value = t
        }
        write() {
            (-1 !== document.cookie.indexOf("; ") && !document.cookie.split("; ").find((e=>e.startsWith(this.name))) || -1 === document.cookie.indexOf("; ")) && (document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`)
        }
        read() {
            if (-1 !== document.cookie.indexOf("; ") && document.cookie.split("; ").find((e=>e.startsWith(this.name)))) {
                return document.cookie.split("; ").find((e=>e.startsWith(this.name))).split("=")[1]
            }
            return !1
        }
        destroy() {
            document.cookie.split("; ").find((e=>e.startsWith(this.name))) && (document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`)
        }
    }
    class DelayShow {
        constructor(e, t) {
            this.element = t,
            this.delay = e.getAttribute(selectors$N.delayAttribite),
            "always" === this.delay && this.always(),
            "delayed" === this.delay && this.delayed(),
            "bottom" === this.delay && this.bottom(),
            "idle" === this.delay && this.idle()
        }
        always() {
            fadeIn(this.element)
        }
        delayed() {
            setTimeout((()=>{
                fadeIn(this.element)
            }
            ), 1e4)
        }
        bottom() {
            window.addEventListener("scroll", (()=>{
                window.scrollY + window.innerHeight >= document.body.clientHeight && fadeIn(this.element)
            }
            ))
        }
        idle() {
            let e = 0;
            const t = ["mousemove", "mousedown", "click", "touchmove", "touchstart", "touchend", "keydown", "keypress"]
              , s = ["load", "resize", "scroll"]
              , i = ()=>{
                e = setTimeout((()=>{
                    e = 0,
                    fadeIn(this.element)
                }
                ), 6e4),
                t.forEach((e=>{
                    document.addEventListener(e, o)
                }
                )),
                s.forEach((e=>{
                    window.addEventListener(e, o)
                }
                ))
            }
              , o = ()=>{
                e && clearTimeout(e),
                t.forEach((e=>{
                    document.removeEventListener(e, o)
                }
                )),
                s.forEach((e=>{
                    window.removeEventListener(e, o)
                }
                )),
                i()
            }
            ;
            i()
        }
    }
    class TargetReferrer {
        constructor(e) {
            if (this.el = e,
            this.locationPath = location.href,
            !this.el.hasAttribute(selectors$N.dataTargetReferrer))
                return !1;
            this.init()
        }
        init() {
            -1 !== this.locationPath.indexOf(this.el.getAttribute(selectors$N.dataTargetReferrer)) || window.Shopify.designMode || this.el.parentNode.removeChild(this.el)
        }
    }
    class LargePopup {
        constructor(e) {
            this.popup = e,
            this.modal = this.popup.querySelector(selectors$N.largePromoInner),
            this.close = this.popup.querySelector(selectors$N.close),
            this.underlay = this.popup.querySelector(selectors$N.modalUnderlay),
            this.form = this.popup.querySelector(selectors$N.newsletterForm),
            this.cookie = new PopupCookie(this.popup.getAttribute(selectors$N.cookieNameAttribute),"user_has_closed"),
            this.isTargeted = new TargetReferrer(this.popup),
            this.init()
        }
        init() {
            !1 !== this.cookie.read() && !window.Shopify.designMode || (window.Shopify.designMode || new DelayShow(this.popup,this.modal),
            this.form && this.form.classList.contains(classes$o.success) && this.checkForSuccess(),
            this.initClosers())
        }
        checkForSuccess() {
            fadeIn(this.modal),
            this.cookie.write()
        }
        initClosers() {
            this.close.addEventListener("click", this.closeModal.bind(this)),
            this.underlay.addEventListener("click", this.closeModal.bind(this))
        }
        closeModal(e) {
            e.preventDefault(),
            fadeOut(this.modal),
            this.cookie.write()
        }
        onBlockSelect(e) {
            this.popup.contains(e.target) && (fadeIn(this.modal),
            this.initClosers())
        }
        onBlockDeselect(e) {
            this.popup.contains(e.target) && fadeOut(this.modal)
        }
    }
    class Tracking {
        constructor(e) {
            this.popup = e,
            this.modal = document.querySelector(selectors$N.tracking),
            this.close = this.modal.querySelector(selectors$N.close),
            this.acceptButton = this.modal.querySelector(selectors$N.trackingAccept),
            this.enable = "true" === this.modal.getAttribute("data-enable"),
            this.showPopup = !1,
            window.Shopify.loadFeatures([{
                name: "consent-tracking-api",
                version: "0.1"
            }], (e=>{
                if (e)
                    throw e;
                const t = window.Shopify.customerPrivacy.userCanBeTracked()
                  , s = window.Shopify.customerPrivacy.getTrackingConsent();
                this.showPopup = !t && "no_interaction" === s && this.enable,
                window.Shopify.designMode && (this.showPopup = !0),
                this.init()
            }
            ))
        }
        init() {
            this.showPopup && fadeIn(this.modal),
            this.clickEvents()
        }
        clickEvents() {
            this.close.addEventListener("click", (e=>{
                e.preventDefault(),
                window.Shopify.customerPrivacy.setTrackingConsent(!1, (()=>fadeOut(this.modal))),
                document.documentElement.style.setProperty("--cookie-bar-height", "0px")
            }
            )),
            this.acceptButton.addEventListener("click", (e=>{
                e.preventDefault(),
                window.Shopify.customerPrivacy.setTrackingConsent(!0, (()=>fadeOut(this.modal))),
                document.documentElement.style.setProperty("--cookie-bar-height", "0px")
            }
            )),
            document.addEventListener("trackingConsentAccepted", (function() {
                console.log("trackingConsentAccepted event fired")
            }
            ))
        }
        onBlockSelect(e) {
            this.popup.contains(e.target) && this.showPopup && fadeIn(this.modal)
        }
        onBlockDeselect(e) {
            this.popup.contains(e.target) && fadeOut(this.modal)
        }
    }
    class PromoText {
        constructor(e) {
            this.popup = e,
            this.close = this.popup.querySelector(selectors$N.close),
            this.cookie = new PopupCookie(this.popup.getAttribute(selectors$N.cookieNameAttribute),"user_has_closed"),
            this.isTargeted = new TargetReferrer(this.popup),
            this.init()
        }
        init() {
            !1 !== this.cookie.read() && !window.Shopify.designMode || (window.Shopify.designMode ? fadeIn(this.popup) : new DelayShow(this.popup,this.popup),
            this.clickEvents())
        }
        clickEvents() {
            this.close.addEventListener("click", (e=>{
                e.preventDefault(),
                fadeOut(this.popup),
                this.cookie.write()
            }
            ))
        }
        onBlockSelect(e) {
            this.popup.contains(e.target) && fadeIn(this.popup)
        }
        onBlockDeselect(e) {
            this.popup.contains(e.target) && fadeOut(this.popup)
        }
    }
    class NewsletterPopup {
        constructor(e) {
            this.popup = e,
            this.holder = this.popup.querySelector(selectors$N.newsletterPopupHolder),
            this.close = this.popup.querySelector(selectors$N.newsletterClose),
            this.heading = this.popup.querySelector(selectors$N.newsletterHeading),
            this.newsletterField = this.popup.querySelector(selectors$N.newsletterField),
            this.cookie = new PopupCookie(this.popup.getAttribute(selectors$N.cookieNameAttribute),"newsletter_is_closed"),
            this.form = this.popup.querySelector(selectors$N.newsletterForm),
            this.isTargeted = new TargetReferrer(this.popup),
            this.init()
        }
        init() {
            !1 !== this.cookie.read() && !window.Shopify.designMode || (this.show(),
            this.form.classList.contains(classes$o.success) && this.checkForSuccess())
        }
        show() {
            window.Shopify.designMode ? fadeIn(this.holder) : new DelayShow(this.popup,this.holder),
            this.showForm(),
            this.inputField(),
            this.closePopup()
        }
        checkForSuccess() {
            fadeIn(this.holder),
            this.cookie.write()
        }
        showForm() {
            this.heading.addEventListener("click", (e=>{
                e.preventDefault(),
                this.heading.classList.add(classes$o.hide),
                this.newsletterField.focus()
            }
            ))
        }
        closePopup() {
            this.close.addEventListener("click", (e=>{
                e.preventDefault(),
                fadeOut(this.holder),
                this.cookie.write()
            }
            ))
        }
        inputField() {
            this.newsletterField.addEventListener("input", (()=>{
                "" !== this.newsletterField.value && this.holder.classList.add(classes$o.hasValue, "" !== this.newsletterField.value)
            }
            )),
            this.newsletterField.addEventListener("focus", (()=>{
                "" !== this.newsletterField.value && this.holder.classList.add(classes$o.hasValue, "" !== this.newsletterField.value)
            }
            )),
            this.newsletterField.addEventListener("focusout", (()=>{
                setTimeout((()=>{
                    this.holder.classList.remove(classes$o.hasValue)
                }
                ), 2e3)
            }
            ))
        }
        onBlockSelect(e) {
            this.popup.contains(e.target) && fadeIn(this.holder)
        }
        onBlockDeselect(e) {
            this.popup.contains(e.target) && fadeOut(this.holder)
        }
    }
    const popupSection = {
        onLoad() {
            sections$n[this.id] = [];
            this.container.querySelectorAll("[data-large-promo]").forEach((e=>{
                sections$n[this.id].push(new LargePopup(e))
            }
            ));
            this.container.querySelectorAll(selectors$N.tracking).forEach((e=>{
                sections$n[this.id].push(new Tracking(e))
            }
            ));
            this.container.querySelectorAll(selectors$N.newsletterPopup).forEach((e=>{
                sections$n[this.id].push(new NewsletterPopup(e))
            }
            ));
            this.container.querySelectorAll(selectors$N.promoPopup).forEach((e=>{
                sections$n[this.id].push(new PromoText(e))
            }
            ))
        },
        onBlockSelect(e) {
            sections$n[this.id].forEach((t=>{
                if ("function" == typeof t.onBlockSelect) {
                    t.onBlockSelect(e);
                    Array.prototype.filter.call(e.target.parentNode.children, (t=>t !== e.target)).forEach((e=>{
                        fadeOut(e)
                    }
                    ))
                }
            }
            ))
        },
        onBlockDeselect(e) {
            sections$n[this.id].forEach((t=>{
                "function" == typeof t.onBlockDeselect && Array.prototype.forEach.call(e.target.parentNode.children, (e=>{
                    fadeIn(e)
                }
                ))
            }
            ))
        }
    };
    register("popups", [popupSection, newsletterCheckForResultSection]);
    const selectors$O = {
        loginToggle: "#AdminLoginToggle",
        newsletterToggle: "#NewsletterToggle",
        login: "#AdminLogin",
        signup: "#CustomerSignup",
        errors: ".errors",
        contactErrors: "#contact_form .errors",
        loginErrors: "#login_form .errors"
    };
    class Password {
        constructor(e) {
            this.container = e.container,
            this.loginToggle = this.container.querySelector(selectors$O.loginToggle),
            this.newsletterToggle = this.container.querySelector(selectors$O.newsletterToggle),
            this.login = this.container.querySelector(selectors$O.login),
            this.signup = this.container.querySelector(selectors$O.signup),
            this.errors = this.container.querySelector(selectors$O.errors),
            this.contactErrors = this.container.querySelector(selectors$O.contactErrors),
            this.loginErrors = this.container.querySelector(selectors$O.loginErrors),
            this.init()
        }
        init() {
            this.loginToggle.addEventListener("click", (e=>{
                e.preventDefault(),
                slideDown(this.login),
                hideElement(this.signup),
                this.errors && hideElement(this.errors)
            }
            )),
            this.newsletterToggle.addEventListener("click", (e=>{
                e.preventDefault(),
                hideElement(this.login),
                slideDown(this.signup),
                this.errors && hideElement(this.errors)
            }
            )),
            this.contactErrors && (hideElement(this.login),
            slideDown(this.signup)),
            this.loginErrors && (slideDown(this.login),
            hideElement(this.signup))
        }
    }
    const passwordSection = {
        onLoad() {
            new Password(this)
        }
    };
    register("password-template", passwordSection),
    register("faq", accordions),
    register("list-collections", [slider, quickAddProduct, swatchGridSection, blockScroll]),
    register("columns-with-image", [slider, blockScroll, videoPlay]),
    register("newsletter", newsletterCheckForResultSection),
    document.addEventListener("DOMContentLoaded", (function() {
        load("*");
        "true" === document.body.getAttribute("data-animations") && AOS.init({
            once: !0,
            offset: 0
        });
        const e = document.querySelector("[data-scroll-top-button]");
        e && (e.addEventListener("click", (()=>{
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        }
        )),
        document.addEventListener("theme:scroll", (()=>{
            e.classList.toggle("is-visible", window.pageYOffset > window.innerHeight)
        }
        ))),
        document.addEventListener("lazyloaded", (function(e) {
            const t = e.target.parentNode;
            t.classList.contains("lazy-image") && (t.style.backgroundImage = "none")
        }
        )),
        window.self !== window.top && document.querySelector("html").classList.add("iframe"),
        "scrollBehavior"in document.documentElement.style || loadScript({
            url: window.theme.assets.smoothscroll
        })
    }
    )),
    window.navigator.cookieEnabled && (document.documentElement.className = document.documentElement.className.replace("supports-no-cookies", "supports-cookies"))
}
)(themeVendor.BodyScrollLock, themeVendor.themeCurrency, themeVendor.themeImages, themeVendor.themeAddresses, themeVendor.Sqrl, themeVendor.Flickity, themeVendor.FlickityFade, themeVendor.Rellax, themeVendor.ellipsis, themeVendor.AOS);
