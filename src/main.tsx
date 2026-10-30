import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import WeincErrorBoundary from './WeincErrorBoundary'
import './index.css'

const container = document.getElementById('root')!

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
