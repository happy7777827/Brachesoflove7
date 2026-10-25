import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import WeincErrorBoundary from './WeincErrorBoundary'
import './index.css'

const container = document.getElementById('root')!

// MOUNT ONCE, EVEN IF THIS MODULE RUNS TWICE.
//
// main.tsx exports no component, so an edit to it should force a full page
// reload. In WebContainer it does not always: Vite sends an HMR update, this
// module re-executes, and createRoot() is called a second time on a container
// that already holds a React root. The second call does not return a usable
// root — the ".render is not a function" crash — and the preview goes blank.
//
// One customer lost 75 minutes to that on 2026-09-01, across two projects,
// while the assistant kept blaming the dependency cache and re-applying
// protections that were already present. It also wrote its own version of the
// cache below, which crashed the same way because it trusted whatever was
// stored without checking it.
//
// So: keep the root on the container, and VALIDATE IT BEFORE USE. A stale or
// half-written value from an earlier edit must never be called; the fallback
// is a fresh root, which is always safe.
type RootHolder = HTMLElement & { __weincRoot?: unknown }
const holder = container as RootHolder
const cached = holder.__weincRoot as Root | undefined
const root: Root =
  cached && typeof (cached as Root).render === 'function'
    ? cached
    : createRoot(container)
holder.__weincRoot = root

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WeincErrorBoundary><App /></WeincErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);

// weinc-reveal-safety
// Reveal .reveal sections as they scroll in, and — whatever happens — make
// sure nothing is still invisible a moment after load.
//
// The leading semicolon is load-bearing. This block is appended to whatever
// the project's entry file already contains, and it opens with "(". If that
// entry ends in an unterminated expression, JavaScript does not insert a
// semicolon before "(" — it reads the two as one call. The scaffold ended
// with `root.render(...)` and no semicolon, so every project built from an
// affected template ran `root.render(...)(function () { ... })()`, called
// undefined, and crashed with "root.render(...) is not a function". Three
// customers hit that between 2026-08-31 and 2026-09-07 and none of their
// projects was ever published. Do not remove it: we append to entries we do
// not control, so the entry ending correctly is not something we can assume.
;(function () {
  if (typeof document === "undefined") return;
  var SHOWN = "reveal-shown";
  function showAll() {
    var all = document.querySelectorAll(".reveal");
    for (var i = 0; i < all.length; i++) all[i].classList.add(SHOWN);
  }
  function start() {
    var els = document.querySelectorAll(".reveal:not(." + SHOWN + ")");
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add(SHOWN); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  }
  // A LOADING SCREEN MUST NEVER BE PERMANENT.
  //
  // ms-bright-dental ships a splash that counts 0-100 and then removes itself.
  // Its timer was keyed on a prop the parent re-created every render, so it
  // restarted forever — and because the splash is `position:fixed; inset:0;
  // background:#fff`, the customer's whole site sat behind a blank white
  // sheet, on the live published page as well as in the preview. That is the
  // "page is still a blank" report.
  //
  // The template is fixed, but no site should be one bad timer away from
  // showing nothing, so anything that still covers the viewport after a few
  // seconds is taken down here. Deliberately narrow: it only considers
  // elements whose own class says they are a loading screen, so a real modal
  // or cookie banner the customer opens is never touched.
  var COVER = ".bd-splash,.splash,.preloader,.page-loader,.loading-screen,[data-splash]";
  function clearStuckCover() {
    var nodes = document.querySelectorAll(COVER);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var cs = window.getComputedStyle(el);
      if (cs.position !== "fixed" && cs.position !== "absolute") continue;
      var r = el.getBoundingClientRect();
      var coversViewport = r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.9;
      if (!coversViewport) continue;
      el.style.setProperty("display", "none", "important");
    }
  }

  // ANYTHING ADDED LATER MUST BE REVEALED TOO.
  //
  // Submitting a contact form swaps the form for a "Message sent" panel that
  // is itself inside a .reveal block. Nothing observed it, so the visitor who
  // had just sent an enquiry saw an empty white space and no confirmation —
  // verified on a live site 2026-08-29: the submission reached the database
  // and the customer was shown nothing.
  function watch() {
    if (typeof MutationObserver === "undefined") return;
    var mo = new MutationObserver(function (records) {
      var found = false;
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) continue;
          if (n.classList && n.classList.contains("reveal")) { found = true; break; }
          if (n.querySelector && n.querySelector(".reveal")) { found = true; break; }
        }
        if (found) break;
      }
      if (!found) return;
      start();
      // A panel that appears in response to a click is the answer to something
      // the visitor just did — show it rather than wait for a scroll.
      setTimeout(showAll, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function boot() {
    start();
    watch();
    setTimeout(start, 400);
    setTimeout(showAll, 2500);
    setTimeout(clearStuckCover, 6000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

;import "./weinc-link-doctor.js";
