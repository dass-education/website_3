/* ==========================================================================
   DASS Montréal Language School — quote.js
   Drives the quick-quote estimator on quote.html (all 3 languages).
   Real-time calculation via js/pricing-engine.js + js/pricing-data.js;
   course names / result wording via js/pricing-i18n.js. No personal data
   (name/email) is collected or stored here — only sessionStorage is used,
   and only for the values listed in the handoff summary below.
   ========================================================================== */

(function () {
  "use strict";

  var HANDOFF_KEY = "dassQuoteSummary";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof pricingData === "undefined" || typeof PricingEngine === "undefined" || typeof PricingI18n === "undefined") {
      return;
    }

    var form = document.getElementById("quote-form");
    if (!form) return;

    var lang = document.documentElement.lang || "ja";
    var i18n = PricingI18n[lang] || PricingI18n.ja;

    var el = {
      languageRadios: form.querySelectorAll('input[name="quote-language"]'),
      course: document.getElementById("quote-course"),
      courseError: document.getElementById("quote-course-error"),
      age: document.getElementById("quote-age"),
      ageError: document.getElementById("quote-age-error"),
      weeks: document.getElementById("quote-weeks"),
      weeksError: document.getElementById("quote-weeks-error"),
      start: document.getElementById("quote-start"),
      startError: document.getElementById("quote-start-error"),
      startPicker: document.getElementById("quote-start-picker"),
      startToggle: document.getElementById("quote-start-toggle"),
      startCalendar: document.getElementById("quote-start-calendar"),
      startPrev: document.getElementById("quote-start-prev"),
      startNext: document.getElementById("quote-start-next"),
      startMonth: document.getElementById("quote-start-month"),
      startGrid: document.getElementById("quote-start-grid"),
      stay: document.getElementById("quote-stay"),
      stayError: document.getElementById("quote-stay-error"),
      roomField: document.getElementById("quote-room-field"),
      room: document.getElementById("quote-room"),
      roomError: document.getElementById("quote-room-error"),
      mealField: document.getElementById("quote-meal-field"),
      meal: document.getElementById("quote-meal"),
      stayWeeksField: document.getElementById("quote-stay-weeks-field"),
      stayWeeks: document.getElementById("quote-stay-weeks"),
      stayWeeksError: document.getElementById("quote-stay-weeks-error"),
      airport: document.getElementById("quote-airport"),
      insurance: document.getElementById("quote-insurance"),
      minorSection: document.getElementById("quote-minor-section"),
      minorRadios: form.querySelectorAll('input[name="quote-minor-support"]'),
      minorNotice: document.getElementById("quote-minor-notice"),
      resetBtn: document.getElementById("quote-reset"),
      printBtn: document.getElementById("quote-print"),
      contactBtn: document.getElementById("quote-to-contact"),
      resultEmpty: document.getElementById("quote-result-empty"),
      resultContent: document.getElementById("quote-result-content"),
      breakdown: document.getElementById("quote-cost-breakdown"),
      totalRow: document.getElementById("quote-total-row"),
      totalLabel: document.getElementById("quote-total-label"),
      totalValue: document.getElementById("quote-total-value")
    };

    var touched = {};
    var lastValidSummary = null;

    function currency(amount) {
      return pricingData.currency + " " + PricingEngine.formatAmount(amount);
    }

    function fillTemplate(template, values) {
      return template.replace(/\{(\w+)\}/g, function (match, key) {
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
      });
    }

    // ---- Start-date calendar: Monday-first, Mondays only, current month through +24 months ----
    function makeCalendarDate(year, month, day) {
      return new Date(year, month, day, 12, 0, 0, 0);
    }

    function formatDateValue(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    function parseDateValue(value) {
      if (!value) return null;
      var parts = value.split("-");
      if (parts.length !== 3) return null;
      var date = makeCalendarDate(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return isNaN(date.getTime()) ? null : date;
    }

    var today = new Date();
    today = makeCalendarDate(today.getFullYear(), today.getMonth(), today.getDate());
    var calendarMinMonth = makeCalendarDate(today.getFullYear(), today.getMonth(), 1);
    var calendarMaxMonth = makeCalendarDate(today.getFullYear(), today.getMonth() + 24, 1);
    var calendarMaxDate = makeCalendarDate(calendarMaxMonth.getFullYear(), calendarMaxMonth.getMonth() + 1, 0);
    var calendarViewDate = makeCalendarDate(calendarMinMonth.getFullYear(), calendarMinMonth.getMonth(), 1);

    function compareMonth(a, b) {
      return (a.getFullYear() * 12 + a.getMonth()) - (b.getFullYear() * 12 + b.getMonth());
    }

    function formatMonthLabel(date) {
      return date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
    }

    function formatDateAriaLabel(date, selectable) {
      var weekdays = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
      var label = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + weekdays[date.getDay()];
      if (!selectable) label += "、選択できません";
      return label;
    }

    function isSelectableMonday(date) {
      return date && date.getDay() === 1 && date >= today && date <= calendarMaxDate;
    }

    function isMondayDate(value) {
      var date = parseDateValue(value);
      return !!date && isSelectableMonday(date);
    }

    function renderStartCalendar() {
      if (!el.startGrid || !el.startMonth) return;

      el.startMonth.textContent = formatMonthLabel(calendarViewDate);
      el.startPrev.disabled = compareMonth(calendarViewDate, calendarMinMonth) <= 0;
      el.startNext.disabled = compareMonth(calendarViewDate, calendarMaxMonth) >= 0;
      el.startGrid.innerHTML = "";

      var year = calendarViewDate.getFullYear();
      var month = calendarViewDate.getMonth();
      var firstDay = (makeCalendarDate(year, month, 1).getDay() + 6) % 7;
      var daysInMonth = makeCalendarDate(year, month + 1, 0).getDate();
      var selectedValue = el.start.value;

      for (var blank = 0; blank < firstDay; blank += 1) {
        var spacer = document.createElement("span");
        spacer.className = "monday-calendar-spacer";
        spacer.setAttribute("aria-hidden", "true");
        el.startGrid.appendChild(spacer);
      }

      for (var day = 1; day <= daysInMonth; day += 1) {
        (function () {
          var date = makeCalendarDate(year, month, day);
          var value = formatDateValue(date);
          var selectable = isSelectableMonday(date);
          var button = document.createElement("button");
          button.type = "button";
          button.className = "monday-calendar-day";
          button.textContent = String(day);
          button.setAttribute("role", "gridcell");
          button.setAttribute("aria-label", formatDateAriaLabel(date, selectable));

          if (date.getDay() === 1) button.classList.add("is-monday");
          if (!selectable) {
            button.disabled = true;
            button.classList.add("is-disabled");
          }
          if (value === selectedValue) {
            button.classList.add("is-selected");
            button.setAttribute("aria-selected", "true");
          } else {
            button.setAttribute("aria-selected", "false");
          }
          if (value === formatDateValue(today)) button.classList.add("is-today");

          if (selectable) {
            button.addEventListener("click", function () {
              el.start.value = value;
              touched.start = true;
              renderStartCalendar();
              closeStartCalendar();
              recalculate();
              el.start.focus();
            });
          }
          el.startGrid.appendChild(button);
        })();
      }
    }

    function openStartCalendar() {
      if (!el.startCalendar) return;
      var selectedDate = parseDateValue(el.start.value);
      if (selectedDate && compareMonth(selectedDate, calendarMinMonth) >= 0 && compareMonth(selectedDate, calendarMaxMonth) <= 0) {
        calendarViewDate = makeCalendarDate(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      }
      renderStartCalendar();
      el.startCalendar.hidden = false;
      el.startToggle.setAttribute("aria-expanded", "true");
    }

    function closeStartCalendar() {
      if (!el.startCalendar) return;
      el.startCalendar.hidden = true;
      el.startToggle.setAttribute("aria-expanded", "false");
    }

    function toggleStartCalendar() {
      if (el.startCalendar.hidden) openStartCalendar();
      else closeStartCalendar();
    }

    // ---- Course <select> options depend on the chosen study language ----
    function populateCourseOptions() {
      var studyLanguage = getStudyLanguage();
      el.course.innerHTML = "";
      var placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = i18n.placeholders.selectCourse;
      placeholder.disabled = true;
      placeholder.selected = true;
      el.course.appendChild(placeholder);

      if (!studyLanguage) {
        el.course.disabled = true;
        return;
      }
      el.course.disabled = false;
      ["general", "intensive", "exam"].forEach(function (courseType) {
        var option = document.createElement("option");
        option.value = courseType;
        option.textContent = i18n.courseNames[studyLanguage][courseType];
        el.course.appendChild(option);
      });
    }

    function getStudyLanguage() {
      var checked = form.querySelector('input[name="quote-language"]:checked');
      return checked ? checked.value : "";
    }

    function updateWeeksConstraint() {
      var minWeeks = el.course.value === "exam" ? 8 : 2;
      el.weeks.min = String(minWeeks);
      // For homestay, the accommodation period must match the course period.
      // Keep the same minimum-week rule on both inputs.
      if (el.stay && el.stay.value === "homestay") {
        el.stayWeeks.min = String(minWeeks);
      } else {
        el.stayWeeks.min = "1";
      }
    }

    function syncStayWeeksFromCourse() {
      if (el.stay.value !== "homestay") return;
      el.stayWeeks.value = el.weeks.value;
      touched.stayWeeks = touched.weeks || touched.stayWeeks;
    }

    function syncCourseWeeksFromStay() {
      if (el.stay.value !== "homestay") return;
      el.weeks.value = el.stayWeeks.value;
      touched.weeks = touched.stayWeeks || touched.weeks;
    }

    // ---- Room type / meal plan options depend on accommodation choice ----
    function populateRoomOptions() {
      var stayMethod = el.stay.value;
      el.room.innerHTML = "";
      var placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = i18n.placeholders.selectRoomType;
      placeholder.disabled = true;
      placeholder.selected = true;
      el.room.appendChild(placeholder);

      var needsAccommodation = stayMethod === "homestay" || stayMethod === "residence";
      el.roomField.hidden = !needsAccommodation;
      el.mealField.hidden = !(stayMethod === "homestay");
      el.stayWeeksField.hidden = !needsAccommodation;

      if (!needsAccommodation) {
        el.room.disabled = true;
        el.meal.disabled = true;
        el.meal.innerHTML = "";
        return;
      }

      el.room.disabled = false;
      var roomOptions = i18n.roomTypeOptions[stayMethod];
      Object.keys(roomOptions).forEach(function (key) {
        var option = document.createElement("option");
        option.value = key;
        option.textContent = roomOptions[key];
        el.room.appendChild(option);
      });

      populateMealOptions();
    }

    function populateMealOptions() {
      var stayMethod = el.stay.value;
      el.meal.innerHTML = "";

      if (stayMethod !== "homestay") {
        el.meal.disabled = true;
        return;
      }

      var roomType = el.room.value;
      var placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = i18n.placeholders.selectRoomType;
      placeholder.disabled = true;
      placeholder.selected = true;
      el.meal.appendChild(placeholder);

      if (!roomType) {
        el.meal.disabled = true;
        return;
      }
      el.meal.disabled = false;

      var mealKeys = ["twoMeals", "threeMeals"];
      mealKeys.forEach(function (key) {
        var option = document.createElement("option");
        option.value = key;
        option.textContent = i18n.mealPlanOptions[key];
        el.meal.appendChild(option);
      });
    }

    // Maps room type + meal plan selections to a js/pricing-data.js key.
    function getAccommodationKey() {
      var stayMethod = el.stay.value;
      if (stayMethod === "residence") {
        return el.room.value || null;
      }
      if (stayMethod === "homestay") {
        var room = el.room.value;
        var meal = el.meal.value;
        if (!room || !meal) return null;
        var privateMap = { twoMeals: "privateTwoMeals", threeMeals: "privateThreeMeals" };
        return privateMap[meal] || null;
      }
      return null;
    }

    function updateMinorSupportVisibility() {
      var age = parseInt(el.age.value, 10);
      var isMinor = el.age.value !== "" && age >= 1 && age < 18;
      el.minorSection.hidden = !isMinor;
      if (el.minorNotice) el.minorNotice.hidden = !isMinor;
    }

    function setError(node, message, field) {
      if (node) {
        node.textContent = message || "";
        node.hidden = !message;
      }
      if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    // Returns {valid, values} — values are only populated fields needed for
    // calculation; per-field error text is written into the *Error nodes.
    function validate() {
      var valid = true;
      var v = {};

      v.studyLanguage = getStudyLanguage();
      if (!v.studyLanguage) valid = false;

      v.courseType = el.course.value;
      if (!v.courseType) {
        setError(el.courseError, touched.course ? i18n.validation.course : "", el.course);
        valid = false;
      } else {
        setError(el.courseError, "", el.course);
      }

      var age = parseInt(el.age.value, 10);
      if (el.age.value === "" || isNaN(age) || age < 1 || age > 99) {
        setError(el.ageError, touched.age ? i18n.validation.age : "", el.age);
        valid = false;
      } else {
        setError(el.ageError, "", el.age);
        v.age = age;
      }

      var weeks = parseInt(el.weeks.value, 10);
      var minimumWeeks = v.courseType === "exam" ? 8 : 2;
      var weeksMessage = v.courseType === "exam" ? (i18n.validation.examWeeks || i18n.validation.weeks) : i18n.validation.weeks;
      if (el.weeks.value === "" || isNaN(weeks) || weeks < minimumWeeks || weeks > 52) {
        setError(el.weeksError, touched.weeks ? weeksMessage : "", el.weeks);
        valid = false;
      } else {
        setError(el.weeksError, "", el.weeks);
        v.weeks = weeks;
      }

      v.startDate = el.start.value;
      if (!v.startDate) {
        setError(el.startError, touched.start ? i18n.validation.startDate : "", el.start);
        valid = false;
      } else if (!isMondayDate(v.startDate)) {
        var mondayError = lang.indexOf("fr") === 0
          ? "La date de début doit être un lundi."
          : (lang.indexOf("en") === 0 ? "The start date must be a Monday." : "開始日は月曜日を選択してください。");
        setError(el.startError, touched.start ? mondayError : "", el.start);
        valid = false;
      } else {
        setError(el.startError, "", el.start);
      }

      v.stayMethod = el.stay.value;
      if (!v.stayMethod) {
        setError(el.stayError, touched.stay ? i18n.validation.stayMethod : "", el.stay);
        valid = false;
      } else {
        setError(el.stayError, "", el.stay);
      }

      var needsAccommodation = v.stayMethod === "homestay" || v.stayMethod === "residence";
      if (needsAccommodation) {
        v.accommodationKey = getAccommodationKey();
        if (!v.accommodationKey) {
          setError(el.roomError, touched.room ? i18n.validation.roomType : "", el.room);
          valid = false;
        } else {
          setError(el.roomError, "", el.room);
        }

        var stayWeeks = parseInt(el.stayWeeks.value, 10);
        var minimumStayWeeks = v.stayMethod === "homestay" ? minimumWeeks : 1;
        if (el.stayWeeks.value === "" || isNaN(stayWeeks) || stayWeeks < minimumStayWeeks || stayWeeks > 52) {
          setError(el.stayWeeksError, touched.stayWeeks ? i18n.validation.stayWeeks : "", el.stayWeeks);
          valid = false;
        } else {
          setError(el.stayWeeksError, "", el.stayWeeks);
          v.stayWeeks = stayWeeks;
        }
      } else {
        setError(el.roomError, "", el.room);
        setError(el.stayWeeksError, "", el.stayWeeks);
        v.accommodationKey = null;
        v.stayWeeks = 0;
      }

      v.transferOption = el.airport.value || "none";
      v.wantsInsurance = el.insurance.checked;

      var isMinor = !el.minorSection.hidden;
      if (isMinor) {
        var checkedMinor = form.querySelector('input[name="quote-minor-support"]:checked');
        v.wantsMinorSupport = checkedMinor ? checkedMinor.value === "yes" : false;
      } else {
        v.wantsMinorSupport = false;
      }
      v.ageBracket = isMinor ? "minor" : "adult";

      return { valid: valid, values: v };
    }

    function addonsSummaryText(v) {
      var parts = [];
      if (v.transferOption === "oneWay") parts.push(i18n.labels.airportTransfer + "：" + i18n.airportTransferOptions.oneWay);
      if (v.transferOption === "roundTrip") parts.push(i18n.labels.airportTransfer + "：" + i18n.airportTransferOptions.roundTrip);
      if (v.wantsInsurance) parts.push(i18n.labels.insurance);
      if (v.wantsMinorSupport) parts.push(i18n.labels.minorSupport);
      return parts.length ? parts.join(i18n.addonsSeparator) : i18n.addonsNone;
    }

    function buildRow(label, value) {
      var row = document.createElement("div");
      row.className = "quote-result-row";
      var dt = document.createElement("span");
      dt.className = "quote-result-label";
      dt.textContent = label;
      var dd = document.createElement("span");
      dd.className = "quote-result-value";
      dd.textContent = value;
      row.appendChild(dt);
      row.appendChild(dd);
      return row;
    }

    function renderResult(v, quote) {
      var rl = i18n.resultLabels;
      var stayMethodText = i18n.stayMethodOptions[v.stayMethod];
      var roomText = "—";
      var mealText = "—";
      if (v.stayMethod === "homestay") {
        roomText = i18n.roomTypeOptions.homestay[el.room.value] || "—";
        mealText = i18n.mealPlanOptions[el.meal.value] || "—";
      } else if (v.stayMethod === "residence") {
        roomText = i18n.roomTypeOptions.residence[el.room.value] || "—";
        mealText = i18n.mealPlanNotApplicable;
      }

      el.breakdown.innerHTML = "";
      var summaryRows = [
        [rl.studyLanguage, i18n.studyLanguageOptions[v.studyLanguage]],
        [rl.course, i18n.courseNames[v.studyLanguage][v.courseType]],
        [rl.weeklyHours, fillTemplate(i18n.units.weeklyHours, { n: quote.weeklyHours })],
        [rl.weeks, v.weeks + " " + i18n.units.weeks],
        [rl.startDate, v.startDate],
        [rl.stayMethod, stayMethodText],
        [rl.roomType, roomText],
        [rl.mealPlan, mealText],
        [rl.stayWeeks, v.stayMethod === "self" || v.stayMethod === "undecided" ? "—" : v.stayWeeks + " " + i18n.units.weeks],
        [rl.addons, addonsSummaryText(v)]
      ];
      summaryRows.forEach(function (pair) {
        el.breakdown.appendChild(buildRow(pair[0], pair[1]));
      });

      var costRows = [
        [rl.tuition, currency(quote.tuitionTotal)],
        [rl.registrationFee, currency(quote.registrationFee)],
        [rl.materialsFee, currency(quote.materialsFee)],
        [rl.placementFee, currency(quote.placementFee)],
        [rl.accommodationCost, currency(quote.accommodationCost)],
        [rl.airportTransferFee, currency(quote.airportTransferFee)],
        [rl.insuranceFee, currency(quote.insuranceFee)],
        [rl.minorSupportFee, currency(quote.minorSupportFee)]
      ];
      costRows.forEach(function (pair) {
        el.breakdown.appendChild(buildRow(pair[0], pair[1]));
      });

      el.totalLabel.textContent = rl.grandTotal;
      el.totalValue.textContent = currency(quote.grandTotal);

      el.resultEmpty.hidden = true;
      el.resultContent.hidden = false;
    }

    function recalculate() {
      var result = validate();
      var v = result.values;

      if (!result.valid) {
        el.resultEmpty.hidden = false;
        el.resultContent.hidden = true;
        lastValidSummary = null;
        return;
      }

      var quote = PricingEngine.calculateQuote({
        studyLanguage: v.studyLanguage,
        courseType: v.courseType,
        weeks: v.weeks,
        stayMethod: v.stayMethod,
        accommodationKey: v.accommodationKey,
        stayWeeks: v.stayWeeks,
        transferOption: v.transferOption,
        wantsInsurance: v.wantsInsurance,
        wantsMinorSupport: v.wantsMinorSupport
      });

      if (!quote.valid) {
        el.resultEmpty.hidden = false;
        el.resultContent.hidden = true;
        lastValidSummary = null;
        return;
      }

      renderResult(v, quote);

      lastValidSummary = {
        studyLanguage: v.studyLanguage,
        courseType: v.courseType,
        weeks: v.weeks,
        startDate: v.startDate,
        ageBracket: v.ageBracket,
        stayMethod: v.stayMethod,
        roomType: el.room.value || null,
        mealPlan: v.stayMethod === "homestay" ? (el.meal.value || null) : null,
        stayWeeks: v.stayMethod === "self" || v.stayMethod === "undecided" ? null : v.stayWeeks,
        transferOption: v.transferOption,
        wantsInsurance: v.wantsInsurance,
        wantsMinorSupport: v.wantsMinorSupport,
        grandTotal: quote.grandTotal,
        currency: pricingData.currency
      };
    }

    function markTouched(key) {
      return function () {
        touched[key] = true;
        recalculate();
      };
    }

    // ---- Wire up events ----
    el.languageRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        populateCourseOptions();
        updateWeeksConstraint();
        recalculate();
      });
    });
    el.course.addEventListener("change", function () {
      touched.course = true;
      updateWeeksConstraint();
      syncStayWeeksFromCourse();
      recalculate();
    });
    el.age.addEventListener("input", function () {
      touched.age = true;
      updateMinorSupportVisibility();
      recalculate();
    });
    el.weeks.addEventListener("input", function () {
      touched.weeks = true;
      syncStayWeeksFromCourse();
      recalculate();
    });
    el.start.addEventListener("click", openStartCalendar);
    el.start.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        openStartCalendar();
      } else if (event.key === "Escape") {
        closeStartCalendar();
      }
    });
    el.startToggle.addEventListener("click", toggleStartCalendar);
    el.startPrev.addEventListener("click", function () {
      if (compareMonth(calendarViewDate, calendarMinMonth) <= 0) return;
      calendarViewDate = makeCalendarDate(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1);
      renderStartCalendar();
    });
    el.startNext.addEventListener("click", function () {
      if (compareMonth(calendarViewDate, calendarMaxMonth) >= 0) return;
      calendarViewDate = makeCalendarDate(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1);
      renderStartCalendar();
    });
    document.addEventListener("click", function (event) {
      if (!el.startPicker || el.startCalendar.hidden) return;
      if (!el.startPicker.contains(event.target)) closeStartCalendar();
    });
    el.stay.addEventListener("change", function () {
      touched.stay = true;
      populateRoomOptions();
      updateWeeksConstraint();
      syncStayWeeksFromCourse();
      recalculate();
    });
    el.room.addEventListener("change", function () {
      touched.room = true;
      populateMealOptions();
      recalculate();
    });
    el.meal.addEventListener("change", markTouched("meal"));
    el.stayWeeks.addEventListener("input", function () {
      touched.stayWeeks = true;
      syncCourseWeeksFromStay();
      recalculate();
    });
    el.airport.addEventListener("change", recalculate);
    el.insurance.addEventListener("change", recalculate);
    el.minorRadios.forEach(function (radio) {
      radio.addEventListener("change", recalculate);
    });

    el.resetBtn.addEventListener("click", function () {
      form.reset();
      touched = {};
      populateCourseOptions();
      calendarViewDate = makeCalendarDate(calendarMinMonth.getFullYear(), calendarMinMonth.getMonth(), 1);
      renderStartCalendar();
      closeStartCalendar();
      updateWeeksConstraint();
      populateRoomOptions();
      updateMinorSupportVisibility();
      Object.keys(el).forEach(function (key) {
        if (/Error$/.test(key) && el[key]) setError(el[key]);
      });
      el.resultEmpty.hidden = false;
      el.resultContent.hidden = true;
      lastValidSummary = null;
      el.course.focus();
    });

    el.printBtn.addEventListener("click", function () {
      window.print();
    });

    el.contactBtn.addEventListener("click", function () {
      touched = { course: true, age: true, weeks: true, start: true, stay: true, room: true, stayWeeks: true, meal: true };
      recalculate();
      if (!lastValidSummary) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]') || el.course;
        firstInvalid.focus();
        return;
      }
      try {
        sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(lastValidSummary));
      } catch (e) {
        // sessionStorage unavailable (e.g. private mode) — continue without handoff.
      }
      window.location.href = "contact.html";
    });

    // ---- Initial state ----
    populateCourseOptions();
    renderStartCalendar();
    updateWeeksConstraint();
    populateRoomOptions();
    updateMinorSupportVisibility();
    el.resultEmpty.hidden = false;
    el.resultContent.hidden = true;
    el.resultEmpty.textContent = i18n.notFilledYet;
  });
})();
