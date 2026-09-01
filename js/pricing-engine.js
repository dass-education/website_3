/* ==========================================================================
   DASS Montréal Language School — pricing-engine.js
   Language-neutral calculation logic shared by the quote estimator and the
   Tuition & Fees page. Depends on js/pricing-data.js (must load first).
   ========================================================================== */

var PricingEngine = (function (data) {
  "use strict";

  function getCourseData(studyLanguage, courseType) {
    var byLanguage = data.tuition[studyLanguage];
    if (!byLanguage) return null;
    if (courseType === "exam") {
      return studyLanguage === "french" ? byLanguage.frenchExam : byLanguage.ielts;
    }
    return byLanguage[courseType] || null;
  }

  // General / Intensive: 2–4, 5–12, 13–24, 25–52 weeks.
  // Exam preparation: 8–12, 13–24, 25–52 weeks.
  function getCourseTier(courseType, weeks) {
    if (courseType === "exam") {
      if (weeks >= 8 && weeks <= 12) return "standard";
      if (weeks >= 13 && weeks <= 24) return "medium";
      if (weeks >= 25 && weeks <= 52) return "long";
      return null;
    }
    if (weeks >= 2 && weeks <= 4) return "short";
    if (weeks >= 5 && weeks <= 12) return "standard";
    if (weeks >= 13 && weeks <= 24) return "medium";
    if (weeks >= 25 && weeks <= 52) return "long";
    return null;
  }

  function calculateTuition(studyLanguage, courseType, weeks) {
    var courseData = getCourseData(studyLanguage, courseType);
    if (!courseData) return { valid: false };

    var tier = getCourseTier(courseType, weeks);
    if (!tier) return { valid: false };
    var rate = courseData.rates[tier];
    if (!rate) return { valid: false };

    return {
      valid: true,
      weeklyHours: courseData.weeklyHours,
      weeklyRate: rate,
      totalTuition: rate * weeks
    };
  }

  function calculateMaterialsFee(weeks) {
    if (!(weeks >= 1)) return 0;
    if (weeks <= 4) return data.materialsFee.firstFourWeeks;
    return Math.min(weeks * data.materialsFee.weeklyFromWeekFive, data.materialsFee.maximum);
  }

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

  function calculateQuote(input) {
    var tuition = calculateTuition(input.studyLanguage, input.courseType, input.weeks);
    if (!tuition.valid) return { valid: false };

    var materialsFee = calculateMaterialsFee(input.weeks);
    var accommodation = calculateAccommodation(input.stayMethod, input.accommodationKey, input.stayWeeks);
    var airportTransferFee = calculateAirportTransfer(input.transferOption);
    var insuranceFee = calculateInsurance(input.stayWeeks, input.wantsInsurance);
    var minorSupportFee = calculateMinorSupport(input.wantsMinorSupport);
    var registrationFee = data.registrationFee;

    var result = {
      valid: true,
      weeklyHours: tuition.weeklyHours,
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

  function formatAmount(amount) {
    return Math.round(amount).toLocaleString("en-US");
  }

  return {
    getCourseTier: getCourseTier,
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
