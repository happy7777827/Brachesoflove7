// weinc-link-doctor
var ROUTES = ["/","/about","/contact","/blog","/privacy","/terms"];
var TEL = "";
var BASE = String((import.meta.env && import.meta.env.BASE_URL) || "/").replace(/\/$/, "");
(function () {
  if (typeof window !== "undefined" && typeof TEL === "string" && TEL) window.__weincTel = TEL;
  if (typeof document === "undefined" || window.__weincLinkDoctor) return;
  window.__weincLinkDoctor = true;
})();
