/* ==========================================================================
   Portfolio — vanilla JavaScript
   - Mobile menu toggle (accessible)
   - Skip-link / focus behavior
   - External links open with rel handling
   ========================================================================== */

(function () {
  "use strict";

  // ---- Mobile menu --------------------------------------------------------
  var btn = document.querySelector(".mobile-menu-btn");
  var nav = document.querySelector(".nav-list");

  if (btn && nav) {
    var isOpen = false;

    function setOpen(open) {
      isOpen = open;
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    }

    btn.addEventListener("click", function () {
      setOpen(!isOpen);
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" && isOpen) setOpen(false);
    });
  }

  // ---- External links: mark target and rel -------------------------------
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    try {
      var host = new URL(link.href).hostname;
      if (host && host !== location.hostname) {
        link.setAttribute("rel", "noopener noreferrer");
        link.setAttribute("target", "_blank");
      }
    } catch (e) {
      // malformed URL; ignore
    }
  });
})();