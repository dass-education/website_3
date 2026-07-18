/* ==========================================================================
   DASS Montréal Language School — pricing-engine.js
   Language-neutral calculation logic shared by the quote estimator and the
   Tuition & Fees page. Depends on js/pricing-data.js (must load first).
   No DOM access and no display text here — only numbers/keys in, numbers/
   keys out. Display wording lives in js/pricing-i18n.js.
   ========================================================================== */

var PricingEngine = (function (data) {
  "use strict";

  // studyLanguage: "english" | "french"
  // courseType:    "general" | "intensive" | "exam"
  function getCourseData(studyLanguage, courseType) {
    var byLanguage = data.tuition[studyLanguage];
    if (!byLanguage) return null;
    if (courseType === "exam") {
      return studyLanguage === "french" ? byLanguage.delfDalf : byLanguage.ielts;
    }
    return byLanguage[courseType] || null;
  }

  // 1–3 / 4–12 / 13–24 / 25–52 weeks tiers used by all courses (General,
  // Intensive, and exam prep alike — exam prep follows Intensive pricing).
  function getGeneralIntensiveTier(weeks) {
    if (weeks >= 1 && weeks <= 3) return "short";
    if (weeks >= 4 && weeks <= 12) return "standard";
    if (weeks >= 13 && weeks <= 24) return "medium";
    if (weeks >= 25 && weeks <= 52) return "long";
    return null;
  }

  // Returns:
  //   { valid:false }                                     — weeks out of 1–52
  //   { valid:true, lessonCount, lessonMinutes, weeklyRate, totalTuition }
  function calculateTuition(studyLanguage, courseType, weeks) {
    var courseData = getCourseData(studyLanguage, courseType);
    if (!courseData || !(weeks >= 1 && weeks <= 52)) {
      return { valid: false };
    }

    var tier = getGeneralIntensiveTier(weeks);
    if (!tier) return { valid: false };
    var rate = courseData.rates[tier];
    return {
      valid: true,
      lessonCount: courseData.lessonCount,
      lessonMinutes: courseData.lessonMinutes,
      weeklyRate: rate,
      totalTuition: rate * weeks
    };
  }

  // 1–4 weeks: flat fee. 5+ weeks: weeks × per-week rate, capped at maximum.
  function calculateMaterialsFee(weeks) {
    if (!(weeks >= 1)) return 0;
    if (weeks <= 4) return data.materialsFee.firstFourWeeks;
    return Math.min(weeks * data.materialsFee.weeklyFromWeekFive, data.materialsFee.maximum);
  }

  // stayMethod: "homestay" | "residence" | "self" | "undecided"
  // accommodationKey: a key of data.homestay or data.residence (ignored otherwise)
  function calculateAccommodation(stayMethod, accommodationKey, stayWeeks) {
    if (stayMethod !== "homestay" && stayMethod !== "residence") {
      return { weeklyRate: 0, accommodationCost: 0, placementFee: 0 };
    }
    var table = stayMethod === "homestay" ? data.homestay : data.residence;
    var weeklyRate = table[accommodationKey];
    if (!weeklyRate || !(stayWeeks >= 1)) {
      return { weeklyRate: 0, accommodationCost: 0, placementFee: 0 };
    }
    return {
      weeklyRate: weeklyRate,
      accommodationCost: weeklyRate * stayWeeks,
      placementFee: data.accommodationPlacementFee
    };
  }

  // transferOption: "none" | "oneWay" | "roundTrip"
  function calculateAirportTransfer(transferOption) {
    return data.airportTransfer[transferOption] || 0;
  }

  function calculateInsurance(stayWeeks, wantsInsurance) {
    if (!wantsInsurance || !(stayWeeks >= 1)) return 0;
    return stayWeeks * data.insurance.weekly;
  }

  function calculateMinorSupport(wantsMinorSupport) {
    return wantsMinorSupport ? data.minorSupport.fixed : 0;
  }

  // Aggregates every line item into one quote. `input` fields:
  //   studyLanguage, courseType, weeks, stayMethod, accommodationKey,
  //   stayWeeks, transferOption, wantsInsurance, wantsMinorSupport
  function calculateQuote(input) {
    var tuition = calculateTuition(input.studyLanguage, input.courseType, input.weeks);
    if (!tuition.valid) {
      return { valid: false };
    }

    var materialsFee = calculateMaterialsFee(input.weeks);
    var accommodation = calculateAccommodation(input.stayMethod, input.accommodationKey, input.stayWeeks);
    var airportTransferFee = calculateAirportTransfer(input.transferOption);
    var insuranceFee = calculateInsurance(input.stayWeeks, input.wantsInsurance);
    var minorSupportFee = calculateMinorSupport(input.wantsMinorSupport);
    var registrationFee = data.registrationFee;

    var result = {
      valid: true,
      lessonCount: tuition.lessonCount,
      lessonMinutes: tuition.lessonMinutes,
      tuitionWeeklyRate: tuition.weeklyRate || 0,
      tuitionTotal: tuition.totalTuition || 0,
      registrationFee: registrationFee,
      materialsFee: materialsFee,
      placementFee: accommodation.placementFee,
      accommodationCost: accommodation.accommodationCost,
      airportTransferFee: airportTransferFee,
      insuranceFee: insuranceFee,
      minorSupportFee: minorSupportFee
    };

    result.grandTotal =
      result.tuitionTotal +
      result.registrationFee +
      result.materialsFee +
      result.placementFee +
      result.accommodationCost +
      result.airportTransferFee +
      result.insuranceFee +
      result.minorSupportFee;

    return result;
  }

  // Consistent thousands-separated "CAD 1,234" style formatting for all
  // three site languages (all amounts here are whole numbers).
  function formatAmount(amount) {
    return Math.round(amount).toLocaleString("en-US");
  }

  return {
    getGeneralIntensiveTier: getGeneralIntensiveTier,
    calculateTuition: calculateTuition,
    calculateMaterialsFee: calculateMaterialsFee,
    calculateAccommodation: calculateAccommodation,
    calculateAirportTransfer: calculateAirportTransfer,
    calculateInsurance: calculateInsurance,
    calculateMinorSupport: calculateMinorSupport,
    calculateQuote: calculateQuote,
    formatAmount: formatAmount
  };
})(pricingData);
