/* ==========================================================================
   DASS Montréal Language School — tuition-fees.js
   Renders the Tuition & Fees page tables directly from js/pricing-data.js,
   so this page and the quote estimator (js/quote.js) can never disagree.
   Requires: pricing-data.js, pricing-engine.js, pricing-i18n.js (in that
   order) to be loaded first.
   ========================================================================== */

(function () {
  "use strict";

  // `compact`: simple 2-column tables (course fees, other fees) render with
  // no horizontal scroll — capped width on desktop, fits the phone screen
  // on mobile. Wider comparison tables (homestay, residence) keep the
  // scrollable wrapper since they carry more columns of information.
  function buildTable(headers, rows, numericCols, compact) {
    numericCols = numericCols || [];
    var thead = "<tr>" + headers.map(function (h, i) {
      return "<th" + (numericCols.indexOf(i) !== -1 ? ' class="num"' : "") + ">" + h + "</th>";
    }).join("") + "</tr>";
    var tbody = rows.map(function (row) {
      return "<tr>" + row.map(function (cell, i) {
        return "<td" + (numericCols.indexOf(i) !== -1 ? ' class="num"' : "") + ">" + cell + "</td>";
      }).join("") + "</tr>";
    }).join("");
    var wrapperClass = compact ? "price-table-wrapper price-table-wrapper--compact" : "price-table-wrapper";
    var tableClass = compact ? "price-table compact-price-table" : "price-table";
    return '<div class="' + wrapperClass + '"><table class="' + tableClass + '"><thead>' + thead +
      "</thead><tbody>" + tbody + "</tbody></table></div>";
  }

  function fillTemplate(template, values) {
    return template.replace(/\{(\w+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
    });
  }

  function currency(amount) {
    return pricingData.currency + " " + PricingEngine.formatAmount(amount);
  }

  // Renders the weekly-rate table shared by General, Intensive, and exam-prep
  // courses. Exam prep (courseType "exam") follows the English track's IELTS
  // entry for lesson count/rates — French DELF/DALF uses identical rates
  // (see js/pricing-data.js), so one table serves both languages either way.
  function renderCourseTable(containerId, courseType, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var t = i18n.tuitionTable;
    var englishData = courseType === "exam" ? pricingData.tuition.english.ielts : pricingData.tuition.english[courseType];
    var courseTitle = i18n.courseNames.english[courseType] + i18n.pairJoiner + i18n.courseNames.french[courseType];
    var lessonsLabel = fillTemplate(i18n.units.lessonsPerWeek, { n: englishData.lessonCount });
    var title = fillTemplate(t.generalIntensiveTitle, { course: courseTitle, lessons: lessonsLabel });

    var tiers = ["short", "standard", "medium", "long"];
    var rows = tiers.map(function (tier) {
      return [i18n.weekRanges[tier], currency(englishData.rates[tier])];
    });

    container.innerHTML =
      '<p class="price-table-title">' + title + "</p>" +
      buildTable([t.durationHeader, t.weeklyRateHeader], rows, [1], true);
  }

  function renderOtherFeesTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var t = i18n.tuitionTable;
    var rows = t.otherFeesRows;
    var perWeek = function (n) { return fillTemplate(t.perWeekFormat, { n: PricingEngine.formatAmount(n) }); };
    var cap = function (n) { return fillTemplate(t.capFormat, { n: currency(n) }); };

    var data = [
      [rows.registrationFee.label, currency(pricingData.registrationFee)],
      [rows.materialsFeeBase.label, currency(pricingData.materialsFee.firstFourWeeks)],
      [
        rows.materialsFeePerWeek.label,
        perWeek(pricingData.materialsFee.weeklyFromWeekFive) + "（" + cap(pricingData.materialsFee.maximum) + "）"
      ],
      [rows.placementFee.label, currency(pricingData.accommodationPlacementFee)],
      [rows.airportOneWay.label, currency(pricingData.airportTransfer.oneWay)],
      [rows.airportRoundTrip.label, currency(pricingData.airportTransfer.roundTrip)],
      [rows.insurance.label, perWeek(pricingData.insurance.weekly)],
      [rows.minorSupport.label, currency(pricingData.minorSupport.fixed)]
    ];

    container.innerHTML =
      '<p class="price-table-title">' + t.otherFeesTitle + "</p>" +
      buildTable(t.otherFeesHeaders, data, [1], true);
  }

  function renderHomestayTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var t = i18n.tuitionTable;
    var rows = Object.keys(pricingData.homestay).map(function (key) {
      return [t.homestayRows[key], currency(pricingData.homestay[key])];
    });
    container.innerHTML =
      '<p class="price-table-title">' + t.homestayTitle + "</p>" +
      buildTable(t.homestayHeaders, rows, [1], true);
  }

  function renderResidenceTable(containerId, i18n) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var t = i18n.tuitionTable;
    var rows = Object.keys(pricingData.residence).map(function (key) {
      return [t.residenceRows[key], currency(pricingData.residence[key])];
    });
    container.innerHTML =
      '<p class="price-table-title">' + t.residenceTitle + "</p>" +
      buildTable(t.residenceHeaders, rows, [1], true);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof pricingData === "undefined" || typeof PricingEngine === "undefined" || typeof PricingI18n === "undefined") {
      return;
    }
    var lang = document.documentElement.lang || "ja";
    var i18n = PricingI18n[lang] || PricingI18n.ja;

    renderCourseTable("general-table-container", "general", i18n);
    renderCourseTable("intensive-table-container", "intensive", i18n);
    renderCourseTable("exam-table-container", "exam", i18n);
    renderOtherFeesTable("other-fees-table-container", i18n);
    renderHomestayTable("homestay-table-container", i18n);
    renderResidenceTable("residence-table-container", i18n);
  });
})();
