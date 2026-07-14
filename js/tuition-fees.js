/* ==========================================================================
   DASS Montréal Language School — tuition-fees.js
   Renders the Tuition & Fees page tables directly from js/pricing-data.js,
   so this page and the quote estimator (js/quote.js) can never disagree.
   Requires: pricing-data.js, pricing-engine.js, pricing-i18n.js (in that
   order) to be loaded first.
   ========================================================================== */

(function () {
  "use strict";

  function buildTable(headers, rows, numericCols) {
    numericCols = numericCols || [];
    var thead = "<tr>" + headers.map(function (h, i) {
      return "<th" + (numericCols.indexOf(i) !== -1 ? ' class="num"' : "") + ">" + h + "</th>";
    }).join("") + "</tr>";
    var tbody = rows.map(function (row) {
      return "<tr>" + row.map(function (cell, i) {
        return "<td" + (numericCols.indexOf(i) !== -1 ? ' class="num"' : "") + ">" + cell + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<div class="price-table-wrapper"><table class="price-table"><thead>' + thead +
      "</thead><tbody>" + tbody + "</tbody></table></div>";
  }

  function fillTemplate(template, values) {
    return template.replace(/\{(\w+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
    });
  }

  function renderGeneralOrIntensiveTable(containerId, courseType, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var t = i18n.tuitionTable;
    var englishData = pricingData.tuition.english[courseType];
    var courseTitle = i18n.courseNames.english[courseType] + i18n.pairJoiner + i18n.courseNames.french[courseType];
    var lessonsLabel = fillTemplate(i18n.units.lessonsPerWeek, { n: englishData.lessonCount });
    var title = fillTemplate(t.generalIntensiveTitle, { course: courseTitle, lessons: lessonsLabel });

    var tiers = ["short", "standard", "medium", "long"];
    var rows = tiers.map(function (tier) {
      return [i18n.weekRanges[tier], lessonsLabel, PricingEngine.formatAmount(englishData.rates[tier])];
    });

    container.innerHTML =
      '<p class="price-table-title">' + title + "</p>" +
      buildTable([t.durationHeader, t.lessonsHeader, t.weeklyRateHeader], rows, [2]);
  }

  function renderExamTable(containerId, noteId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var t = i18n.tuitionTable;
    var englishData = pricingData.tuition.english.ielts;
    var courseTitle = i18n.courseNames.english.exam + i18n.pairJoiner + i18n.courseNames.french.exam;
    var lessonsLabel = fillTemplate(i18n.units.lessonsPerWeek, { n: englishData.lessonCount });
    var title = fillTemplate(t.examTitle, { course: courseTitle, lessons: lessonsLabel });

    var rows = [
      [i18n.examWeekRanges.short, lessonsLabel, i18n.individualQuoteLabel],
      [i18n.examWeekRanges.standard, lessonsLabel, PricingEngine.formatAmount(englishData.rates.standard)],
      [i18n.examWeekRanges.medium, lessonsLabel, PricingEngine.formatAmount(englishData.rates.medium)],
      [i18n.examWeekRanges.long, lessonsLabel, i18n.individualQuoteLabel]
    ];

    container.innerHTML =
      '<p class="price-table-title">' + title + "</p>" +
      buildTable([t.durationHeader, t.lessonsHeader, t.weeklyRateHeader], rows, [2]);

    var note = document.getElementById(noteId);
    if (note) note.textContent = t.examNote;
  }

  function renderOtherFeesTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var t = i18n.tuitionTable;
    var perWeek = function (n) { return fillTemplate(t.perWeekFormat, { n: n }); };
    var rows = t.otherFeesRows;

    var data = [
      [rows.registrationFee.label, PricingEngine.formatAmount(pricingData.registrationFee), rows.registrationFee.calc],
      [rows.materialsFeeBase.label, PricingEngine.formatAmount(pricingData.materialsFee.firstFourWeeks), rows.materialsFeeBase.calc],
      [
        rows.materialsFeePerWeek.label,
        perWeek(PricingEngine.formatAmount(pricingData.materialsFee.weeklyFromWeekFive)),
        fillTemplate(rows.materialsFeePerWeek.calc, { cap: fillTemplate(t.capFormat, { n: PricingEngine.formatAmount(pricingData.materialsFee.maximum) }) })
      ],
      [rows.placementFee.label, PricingEngine.formatAmount(pricingData.accommodationPlacementFee), rows.placementFee.calc],
      [rows.airportOneWay.label, PricingEngine.formatAmount(pricingData.airportTransfer.oneWay), rows.airportOneWay.calc],
      [rows.airportRoundTrip.label, PricingEngine.formatAmount(pricingData.airportTransfer.roundTrip), rows.airportRoundTrip.calc],
      [rows.insurance.label, perWeek(PricingEngine.formatAmount(pricingData.insurance.weekly)), rows.insurance.calc],
      [rows.minorSupport.label, PricingEngine.formatAmount(pricingData.minorSupport.fixed), rows.minorSupport.calc]
    ];

    container.innerHTML =
      '<p class="price-table-title">' + t.otherFeesTitle + "</p>" +
      buildTable(t.otherFeesHeaders, data, [1]);
  }

  function renderHomestayTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var t = i18n.tuitionTable;
    var rows = Object.keys(pricingData.homestay).map(function (key) {
      return [t.homestayRows[key], PricingEngine.formatAmount(pricingData.homestay[key])];
    });
    container.innerHTML =
      '<p class="price-table-title">' + t.homestayTitle + "</p>" +
      buildTable(t.homestayHeaders, rows, [1]);
  }

  function renderResidenceTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var t = i18n.tuitionTable;
    var rows = Object.keys(pricingData.residence).map(function (key) {
      return [t.residenceRows[key], PricingEngine.formatAmount(pricingData.residence[key])];
    });
    container.innerHTML =
      '<p class="price-table-title">' + t.residenceTitle + "</p>" +
      buildTable(t.residenceHeaders, rows, [1]);
  }

  function applyTemporaryDataNotices(i18n) {
    var nodes = document.querySelectorAll(".js-temp-notice");
    nodes.forEach(function (node) {
      if (!pricingData.isTemporaryData) {
        node.hidden = true;
        return;
      }
      node.hidden = false;
      var textTarget = node.classList.contains("js-temp-notice") ? node.querySelector(".js-temp-notice-text") : node;
      if (textTarget) textTarget.textContent = i18n.temporaryDataNotice;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof pricingData === "undefined" || typeof PricingEngine === "undefined" || typeof PricingI18n === "undefined") {
      return;
    }
    var lang = document.documentElement.lang || "ja";
    var i18n = PricingI18n[lang] || PricingI18n.ja;

    applyTemporaryDataNotices(i18n);
    renderGeneralOrIntensiveTable("general-table-container", "general", i18n);
    renderGeneralOrIntensiveTable("intensive-table-container", "intensive", i18n);
    renderExamTable("exam-table-container", "exam-table-note", i18n);
    renderOtherFeesTable("other-fees-table-container", i18n);
    renderHomestayTable("homestay-table-container", i18n);
    renderResidenceTable("residence-table-container", i18n);
  });
})();
