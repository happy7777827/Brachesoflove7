// weinc-link-doctor
// Sends header links and buttons that would do nothing to the page their label
// names (a dead "#" link, a button with no handler). Leaves anything that
// already does something alone. Safe to delete if you wire your own links.
var ROUTES = ["/","/about","/contact","/blog","/privacy","/terms"];
var TEL = "";
var BASE = String((import.meta.env && import.meta.env.BASE_URL) || "/").replace(/\/$/, "");
(function () {

  // The number is left where whichever copy of this runtime installed first
  // can read it: a published page may carry one copy with it and one without.
  if (typeof window !== "undefined" && typeof TEL === "string" && TEL) window.__weincTel = TEL;
  if (typeof document === "undefined" || window.__weincLinkDoctor) return;
  window.__weincLinkDoctor = true;
  var resolve = function(e,t,n){let r=[["/",["home","homepage","top"]],["/about",["about","about us","our story","story","team","our team","who we are","company"]],["/services",["services","our services","what we do","treatments","solutions","offerings","work","our work","projects","portfolio","classes","our classes","lessons","courses","programs","programmes"]],["/blog",["blog","news","journal","articles","insights","stories","updates"]],["/contact",["contact","contact us","get in touch","enquire","enquiry","inquire","book","book now","book appointment","book an appointment","book a table","book a call","appointment","reserve","reservations","schedule","get a quote","quote","request a quote","free quote","get started","start now","start today","hire us","work with us","call us","visit us","let's talk","lets talk","talk to us","sign up","join","join us","apply","donate","order","order now","consultation","free consultation"]]],i=String(e||"").toLowerCase().replace(/[\u2019']/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim(),a=String(t||"").replace(/^#/,"").replace(/[-_]+/g," ").toLowerCase().replace(/[\u2019']/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim();if("book online"===a)return{section:"book-online"};let o=[a,i];for(let e=0;e<o.length;e++){let t=o[e];if(!t)continue;let i="/"+t.replace(/ /g,"-");if("/"!==i&&-1!==n.indexOf(i))return{route:i};for(let e=0;e<r.length;e++){let i=r[e][0],a=r[e][1],o=-1!==a.indexOf(t);if(!o&&"/contact"===i){for(let e=0;e<a.length;e++)if(0===t.indexOf(a[e]+" ")){o=!0;break}}if(o){if(-1!==n.indexOf(i))return{route:i};return{section:"/"===i?"top":i.slice(1)}}}}let s=(a||i).replace(/ /g,"-");return s&&s.length<=40?{section:s,loose:!0}:null};
  var SKIP_LABELS = /^(menu|open menu|close|close menu|open|toggle|x|next|prev|previous|back|more|show more|read more|see more|learn more|view|view all|see all|details|view details|expand|collapse|filter|sort|play|pause)$/i;
  // "Call us" dials the owner's number when there is one (call-cta.ts).
  var CALL = new RegExp("^(?:(?:or |just |please )?call(?: (?:us|now|today|me|our|the|for|or|and|to|on|at|direct|directly|anytime|free|\\d).*)?|(?:or )?(?:phone|dial) (?:us|now|today|our|the)(?: .*)?|(?:or )?ring (?:us|now|today|the|our|me)(?: .*)?|give us a (?:call|ring)(?: .*)?|(?:tap|click|press) to call(?: .*)?|ll[aá]m(?:a|e|ar|anos|enos)(?: .*)?|lig(?:ue|ar)(?:-nos| .*)?|telefone(?:-nos| para .*| agora)|appel(?:er|ez|le)(?:-nous| .*)?|chiam(?:a|aci|are|ateci)(?: .*)?|telefona(?:ci)?(?: .*)?|(?:jetzt |gleich )?anrufen|ruf(?:en sie)? (?:uns )?an|bel(?:len)? (?:ons|nu|direct|vandaag)(?: .*)?|bellen|ring (?:oss|os|nu|n[aå]|til os|i dag|idag)(?: .*)?|(?:za)?dzwo[nń](?: .*)?|sun[aă](?:[tț]i)?(?:-ne| .*)?|(?:hemen|[sş]imdi|bizi) ara(?:y[iı]n)?|aray[iı]n|(?:καλέστε|τηλεφωνήστε|κάλεσε)(?: .*)?|(?:позвонить|позвоните|позвони|звоните)(?: .*)?|(?:подзвонити|зателефонувати|телефонуйте|дзвоніть)(?: .*)?|telepon (?:kami|sekarang)|g[oọ]i (?:ngay|cho|[dđ]i[eệ]n)(?: .*)?|โทร(?:เลย|หาเรา)?|(?:अभी |हमें )?(?:कॉल|फ़ोन|फोन) करें|(?:ابھی )?کال کریں|اتصل(?: بنا| الآن| الان)?|(?:تماس بگیرید|زنگ بزنید)|(?:התקשרו|התקשר|חייגו)(?: .*)?|(?:今すぐ)?(?:電話する|お電話|電話をかける)(?:.*)?|(?:지금 )?전화(?:하기| 걸기| 문의)|(?:立即|马上)?(?:致电|拨打电话|打电话|电话联系|拨打)(?:.*)?)$", "i");
  var NOT_CALL = new RegExp("^call (?:to action|for (?:papers|entries|speakers|artists|submissions|proposals|volunteers)|out|outs|back|backs|centre|center|sheet|sign|log|recording)\\b", "i");
  function dialsFor(el, label) {
    if (!window.__weincTel) return false;
    var text = String(label || "").toLowerCase().replace(/[\u2019']/g, "'").replace(/[\u2190-\u21ff\u2300-\u27bf\u2b00-\u2bff>»›:!.,…|·•()\[\]"]+/g, " ").replace(/\s+/g, " ").trim();
    if (!text || text.length > 48 || !CALL.test(text) || NOT_CALL.test(text)) return false;
    if (el.tagName === "A") {
      var raw = (el.getAttribute("href") || "").trim();
      // Already a call link, or one that leaves the site: not ours to change.
      if (/^(tel|sms|mailto|https?):/i.test(raw) || raw.indexOf("//") === 0) return false;
      return true;
    }
    return !((el.type === "submit" && el.form) || el.disabled);
  }
  function reactProps(el) {
    for (var k in el) if (k.indexOf("__reactProps$") === 0) return el[k] || {};
    return {};
  }
  // The element or a close ancestor (a clickable card) has a click handler.
  function hasHandler(el) {
    for (var n = el, d = 0; n && n !== document.body && d < 6; n = n.parentElement, d++) {
      if (reactProps(n).onClick || (n !== el && n.hasAttribute && n.hasAttribute("onclick"))) return true;
      if (n.tagName === "HEADER" || n.tagName === "NAV") break;
    }
    return false;
  }
  function deadHref(a) {
    var raw = a.getAttribute("href");
    if (raw === null || raw === "" || raw === "#" || /^javascript:/i.test(raw)) return "#";
    if (raw.charAt(0) === "#" && raw.length > 1) {
      try { if (!document.getElementById(decodeURIComponent(raw.slice(1)))) return raw; } catch (e) { return raw; }
    }
    return null;
  }
  function findSection(name) {
    if (name === "top") return document.body;
    var safe = String(name).replace(/[^a-z0-9-]/gi, "");
    if (!safe) return null;
    return document.getElementById(safe) ||
      document.querySelector('[id="' + safe + '-section" i], [id="section-' + safe + '" i], [id^="' + safe + '-" i]') ||
      (safe === "contact" ? document.querySelector("form, footer") : null);
  }
  function atHome() {
    var p = window.location.pathname;
    return p === BASE + "/" || p === BASE || p === "" || p === "/";
  }
  // The brand/logo control: marked as such, holds the logo image, or is the
  // header's first control.
  function isLogo(el) {
    var header = el.closest("header") || el.closest("nav");
    if (!header) return false;
    if (/logo|brand/i.test((el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "") || el.querySelector("img, svg")) return true;
    return header.querySelector("a, button") === el;
  }
  // Scroll to #id once the router has rendered it; "/" with no section when
  // it never appears (so a guessed "#brand-name" does not stay in the URL).
  function seek(id, keepHashOnMiss) {
    var tries = 0;
    (function look() {
      var found = null;
      try { found = id ? document.getElementById(decodeURIComponent(id)) : null; } catch (err) { found = null; }
      if (found) { found.scrollIntoView({ block: "start" }); return; }
      if (id && ++tries < 40) { setTimeout(look, 50); return; }
      if (id && !keepHashOnMiss) window.history.replaceState({}, "", BASE + "/");
      if (!keepHashOnMiss) window.scrollTo(0, 0);
    })();
  }
  function goHome(hash) {
    window.history.pushState({}, "", BASE + "/" + (hash || ""));
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    seek(hash ? hash.slice(1) : "", false);
  }
  // Run act() only if the click changed nothing: no navigation, no scroll, no
  // menu or dialog opened (a DOM change near the control or a new node).
  // Handlers we cannot see (addEventListener: Calendly, Stripe, carts) and
  // React's own onClick run BEFORE the bubble listener below, so the "before"
  // snapshot and the observer start in the capture phase, and nothing is ever
  // redirected on the spot.
  var watch = null;
  document.addEventListener("click", function (e) {
    if (watch && watch.obs) watch.obs.disconnect();
    var el = e.target && e.target.closest ? e.target.closest("a, button") : null;
    if (!el) { watch = null; return; }
    var w = { el: el, url: window.location.href, x: window.scrollX, y: window.scrollY, changed: false, obs: null };
    if (typeof MutationObserver !== "undefined") {
      w.obs = new MutationObserver(function (records) {
        for (var i = 0; i < records.length; i++) {
          var r = records[i];
          if (r.type === "childList" || r.attributeName !== "class" || (r.target !== el && !el.contains(r.target))) { w.changed = true; return; }
        }
      });
      w.obs.observe(el.closest("header, nav") || el.parentElement || document.body, { attributes: true, subtree: true, attributeFilter: ["class", "aria-expanded", "hidden", "open", "data-state"] });
      w.obs.observe(document.body, { childList: true, subtree: true });
    }
    watch = w;
  }, true);
  function whenNothingHappens(el, act) {
    var w = watch;
    if (!w || w.el !== el) return;
    setTimeout(function () {
      if (w.obs) { w.changed = w.changed || w.obs.takeRecords().length > 0; w.obs.disconnect(); }
      if (w.changed || window.location.href !== w.url || window.scrollX !== w.x || window.scrollY !== w.y) return;
      act();
    }, 150);
  }
  function goRoute(route) {
    var path = BASE + route;
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    }
    window.scrollTo(0, 0);
  }
  // A LIVE control whose label names one of this site's pages but which goes
  // somewhere else: a header "Services" button that only scrolls the home page
  // (Cedar/Juniper, 2026-09-27 QA: inner pages unreachable), or a "View Menu"
  // link pointing at /contact (Red Lion). The page the label names wins.
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/s+/g, " ").trim();
  }
  function pageNamedBy(label) {
    var text = norm(label);
    if (!text || text.split(" ").length > 4) return null;
    var t = resolve(label, "", ROUTES);
    if (t && t.route && t.route !== "/") return t.route;
    var words = " " + text + " ";
    for (var i = 0; i < ROUTES.length; i++) {
      var r = ROUTES[i];
      if (r === "/" || r.indexOf("/", 1) !== -1) continue;
      if (words.indexOf(" " + r.slice(1).replace(/-/g, " ") + " ") !== -1) return r;
    }
    return null;
  }
  // The site route an <a> points at ("/contact", "/"), or null: external,
  // a hash, a file, another tab.
  function routeOfHref(a) {
    var raw = a.getAttribute("href");
    if (!raw || raw.charAt(0) === "#" || /^(mailto|tel|sms|javascript):/i.test(raw)) return null;
    var u;
    try { u = new URL(raw, window.location.href); } catch (err) { return null; }
    if (u.origin !== window.location.origin || u.hash) return null;
    var p = u.pathname;
    if (BASE && p.indexOf(BASE) === 0) p = p.slice(BASE.length);
    p = p.replace(/\/+$/, "") || "/";
    return p === "/" || ROUTES.indexOf(p) !== -1 ? p : null;
  }
  function namesRoute(label, route) {
    if (route === "/") return /(home|homepage)/.test(norm(label));
    return pageNamedBy(label) === route || (" " + norm(label) + " ").indexOf(" " + route.slice(1).replace(/-/g, " ") + " ") !== -1;
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var el = e.target && e.target.closest ? e.target.closest("a, button") : null;
    if (!el || el.closest("[data-no-link-doctor]")) return;
    if (el.hasAttribute("aria-expanded") || el.hasAttribute("aria-controls") || el.hasAttribute("aria-haspopup")) return;
    var label = (el.getAttribute("aria-label") || el.innerText || el.textContent || "").trim();
    if (dialsFor(el, label)) {
      if (el.tagName === "A") e.preventDefault();
      e.__weincRouted = true;
      window.location.href = window.__weincTel;
      return;
    }
    // "Menu" on a button is a menu toggle; on a link to a page it is a page.
    if (label.length < 3 || (SKIP_LABELS.test(label) && !(el.tagName === "A" && routeOfHref(el)))) return;
    var page = pageNamedBy(label);
    if (!page || ROUTES.indexOf(page) === -1 || window.location.pathname === BASE + page) return;
    var inNav = !!el.closest("header, nav");
    // The brand mark: a salon called "About Face" is not the About page.
    if (inNav && isLogo(el)) return;
    if (el.tagName === "A") {
      if (el.getAttribute("target") && el.getAttribute("target") !== "_self") return;
      if (el.hasAttribute("download")) return;
      var raw = el.getAttribute("href") || "";
      var hrefRoute = routeOfHref(el);
      var steer = false;
      // A header link that only jumps within the page ("#services", "/#about").
      if (inNav && (raw === "" || raw.charAt(0) === "#" || /^\/?#/.test(raw))) steer = true;
      // A link to a different page than the one its label names.
      else if (hrefRoute && hrefRoute !== page && !namesRoute(label, hrefRoute)) steer = true;
      if (!steer) return;
      // Cancelled before the router's own click handler runs; any menu-closing
      // handler still runs, then the page changes.
      e.preventDefault();
      e.__weincRouted = true;
      setTimeout(function () { goRoute(page); }, 0);
      return;
    }
    // A header button: its handler (usually a smooth scroll) runs first. If it
    // did not change the address or open anything, go to the page instead.
    if (!inNav || (el.type === "submit" && el.form) || el.disabled) return;
    e.__weincRouted = true;
    var url = window.location.href;
    var opened = false;
    var obs = typeof MutationObserver !== "undefined" ? new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) if (records[i].addedNodes && records[i].addedNodes.length) { opened = true; return; }
    }) : null;
    if (obs) obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () {
      if (obs) { var rest = obs.takeRecords(); for (var i = 0; i < rest.length; i++) if (rest[i].addedNodes.length) opened = true; obs.disconnect(); }
      if (opened || window.location.href !== url) return;
      goRoute(page);
    }, 150);
  }, true);
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var el = e.target && e.target.closest ? e.target.closest("a, button") : null;
    if (!el || e.__weincRouted) return;
    if (el.hasAttribute("aria-expanded") || el.hasAttribute("aria-controls") || el.hasAttribute("aria-haspopup") || el.hasAttribute("onclick")) return;
    if (el.closest("[data-no-link-doctor]")) return;
    var hash = "";
    var isLink = el.tagName === "A";
    if (isLink) {
      var dead = deadHref(el);
      if (dead === null) return;
      hash = dead === "#" ? "" : dead;
    } else if ((el.type === "submit" && el.form) || el.disabled) {
      return;
    }
    var label = (el.getAttribute("aria-label") || el.innerText || el.textContent || "").trim();
    if ((label.length < 3 || SKIP_LABELS.test(label)) && !hash) return;
    var target = resolve(label, hash, ROUTES) || (isLogo(el) ? { route: "/" } : null);
    if (!target) return;
    var inNav = !!el.closest("header, nav");
    // Something React-visible already handles this click (a modal, tab,
    // accordion, clickable card). Only a header/menu control may be steered,
    // and only if its handler turned out to do nothing (a menu link whose
    // handler just closes the menu; a logo/section button that scrolls to a
    // section this sub-page does not have).
    if (hasHandler(el) && !inNav) return;
    if (hasHandler(el) && !(isLink && target.route) && atHome()) return;
    // Never steer a button by a section guessed from free text ("Learn more").
    if (target.loose && !(inNav || (isLink && (hash || el.closest("footer"))))) return;
    // A dead link's own default (jumping to "#", or to an id that is not
    // there) does nothing useful, so it is safe to cancel now; a button has
    // no default to cancel.
    if (isLink) e.preventDefault();
    whenNothingHappens(el, function () {
      if (target.route) {
        if (target.route === "/" && !atHome()) goHome("");
        else goRoute(target.route);
        return;
      }
      var section = findSection(target.section);
      if (section) { section.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      // A one-page design's "#barbers" (or a header button naming a section)
      // clicked on a sub-page: the section lives on the home page, so go
      // there and scroll once it has rendered.
      if (atHome()) return;
      if (hash) goHome(hash);
      else if (inNav) goHome(isLogo(el) ? "" : "#" + target.section);
    });
  });
  // A hard refresh or Back/Forward onto "/#workshop": the browser looked for
  // the section before React rendered it, so look again once it exists.
  if (window.location.hash && atHome()) seek(window.location.hash.slice(1), true);
  window.addEventListener("popstate", function () {
    if (window.location.hash && atHome()) seek(window.location.hash.slice(1), true);
  });

})();
