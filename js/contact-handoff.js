/* ==========================================================================
   DASS Montréal Language School — contact-handoff.js
   Reads the quote summary saved to sessionStorage by js/quote.js (see the
   "Continue to the contact form" button) and carries it over to the
   contact page. No personal data (name/email) is ever stored — only the
   course/stay selections and, for age, the bracket ("under 18"/"18+"),
   never the exact age. Never overwrites text the visitor already typed.
   ========================================================================== */

(function () {
  "use strict";

  var HANDOFF_KEY = "dassQuoteSummary";

  function buildSummaryLines(summary, i18n) {
    var rl = i18n.resultLabels;
    var lines = [];

    lines.push(rl.studyLanguage + ": " + i18n.studyLanguageOptions[summary.studyLanguage]);
    lines.push(rl.course + ": " + i18n.courseNames[summary.studyLanguage][summary.courseType]);
    lines.push(rl.weeks + ": " + summary.weeks + " " + i18n.units.weeks);
    lines.push(rl.startDate + ": " + summary.startDate);
    lines.push(i18n.labels.age + ": " + i18n.ageBracket[summary.ageBracket]);
    lines.push(rl.stayMethod + ": " + i18n.stayMethodOptions[summary.stayMethod]);

    if (summary.stayMethod === "homestay" && summary.roomType) {
      lines.push(rl.roomType + ": " + (i18n.roomTypeOptions.homestay[summary.roomType] || summary.roomType));
      if (summary.mealPlan) lines.push(rl.mealPlan + ": " + (i18n.mealPlanOptions[summary.mealPlan] || summary.mealPlan));
    } else if (summary.stayMethod === "residence" && summary.roomType) {
      lines.push(rl.roomType + ": " + (i18n.roomTypeOptions.residence[summary.roomType] || summary.roomType));
    }
    if (summary.stayWeeks) {
      lines.push(rl.stayWeeks + ": " + summary.stayWeeks + " " + i18n.units.weeks);
    }

    lines.push(i18n.labels.airportTransfer + ": " + i18n.airportTransferOptions[summary.transferOption]);
    lines.push(i18n.labels.insurance + ": " + (summary.wantsInsurance ? i18n.yesNo.yes : i18n.yesNo.no));
    lines.push(i18n.labels.minorSupport + ": " + (summary.wantsMinorSupport ? i18n.yesNo.yes : i18n.yesNo.no));

    var totalText = summary.isCustomQuote
      ? rl.customQuote
      : summary.currency + " " + PricingEngine.formatAmount(summary.grandTotal);
    lines.push(rl.grandTotal + ": " + totalText);

    return lines;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof PricingI18n === "undefined" || typeof PricingEngine === "undefined") return;

    var raw;
    try {
      raw = sessionStorage.getItem(HANDOFF_KEY);
    } catch (e) {
      return;
    }
    if (!raw) return;

    var summary;
    try {
      summary = JSON.parse(raw);
    } catch (e) {
      return;
    }
    if (!summary || !summary.studyLanguage) return;

    var lang = document.documentElement.lang || "ja";
    var i18n = PricingI18n[lang] || PricingI18n.ja;
    var lines = buildSummaryLines(summary, i18n);
    var summaryText = lines.join("\n");

    // Japanese contact page: real FormMailer form — prefill the notes
    // textarea (only if the visitor hasn't already typed something) and
    // check the matching program-interest checkbox if none is checked yet.
    var notesField = document.querySelector('textarea[name="field_5563723"]');
    if (notesField && notesField.value.trim() === "") {
      notesField.value = summaryText;
    }

    var programCheckboxes = document.querySelectorAll('input[name="field_5563741"]');
    if (programCheckboxes.length) {
      var anyChecked = Array.prototype.some.call(programCheckboxes, function (cb) { return cb.checked; });
      if (!anyChecked) {
        var targetValue = summary.studyLanguage === "french" ? "1" : "0";
        programCheckboxes.forEach(function (cb) {
          if (cb.value === targetValue) cb.checked = true;
        });
      }
    }

    // English/French contact pages currently show a FormMailer placeholder
    // rather than a live form — surface the carried-over details as a
    // read-only summary instead of trying to prefill fields that don't exist.
    var embedContainer = document.querySelector(".formmailer-html-container");
    if (embedContainer && !notesField) {
      var box = document.createElement("div");
      box.className = "notice-box quote-handoff-summary";
      var heading = document.createElement("strong");
      heading.textContent = i18n.resultHeading;
      box.appendChild(heading);
      var list = document.createElement("ul");
      lines.forEach(function (line) {
        var li = document.createElement("li");
        li.textContent = line;
        list.appendChild(li);
      });
      box.appendChild(list);
      embedContainer.parentNode.insertBefore(box, embedContainer);
    }
  });
})();
