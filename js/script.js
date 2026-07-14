/* ==========================================================================
   DASS Montréal Language School — script.js
   Mobile hamburger menu, Courses dropdown, + smooth scrolling for anchors.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after a nav link is tapped.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Courses dropdown: click-to-toggle on PC, accordion on mobile.
  document.querySelectorAll(".has-dropdown").forEach(function (item) {
    var toggle = item.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var isOpen = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      // Close any other open dropdowns.
      document.querySelectorAll(".has-dropdown.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherToggle = other.querySelector(".dropdown-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  // Clicking outside a dropdown closes it (PC hover already handles the rest).
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".has-dropdown")) {
      document.querySelectorAll(".has-dropdown.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        var toggle = item.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Smooth scroll for same-page anchor links (e.g. "#faq").
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href").slice(1);
      var target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
