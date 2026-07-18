/* ==========================================================================
   DASS Montréal Language School — pricing-data.js
   Single source of truth for all fee amounts used by the quote estimator
   (js/quote.js) and the Tuition & Fees page renderer (js/tuition-fees.js).
   Update numbers here only — never hard-code amounts in HTML or elsewhere.
   ========================================================================== */

// Shared rate tables so exam-prep courses can reference (not duplicate)
// their language's Intensive pricing, per current business rules:
// exam-prep lesson count matches General (24/week); exam-prep pricing
// matches Intensive (same weekly rates, same 1–52 week tiers).
var englishIntensiveRates = { short: 455, standard: 445, medium: 435, long: 425 };
var frenchIntensiveRates = { short: 455, standard: 445, medium: 435, long: 425 };

var pricingData = {
  currency: "CAD",
  effectiveDate: "2026-07",

  tuition: {
    english: {
      general: {
        lessonCount: 24,
        lessonMinutes: 50,
        rates: { short: 390, standard: 385, medium: 375, long: 365 }
      },
      intensive: {
        lessonCount: 30,
        lessonMinutes: 50,
        rates: englishIntensiveRates
      },
      ielts: {
        lessonCount: 24,
        lessonMinutes: 50,
        rates: englishIntensiveRates
      }
    },

    french: {
      general: {
        lessonCount: 24,
        lessonMinutes: 50,
        rates: { short: 390, standard: 385, medium: 375, long: 365 }
      },
      intensive: {
        lessonCount: 30,
        lessonMinutes: 50,
        rates: frenchIntensiveRates
      },
      delfDalf: {
        lessonCount: 24,
        lessonMinutes: 50,
        rates: frenchIntensiveRates
      }
    }
  },

  registrationFee: 220,

  materialsFee: {
    firstFourWeeks: 60,
    weeklyFromWeekFive: 15,
    maximum: 450
  },

  accommodationPlacementFee: 250,

  airportTransfer: {
    none: 0,
    oneWay: 135,
    roundTrip: 270
  },

  insurance: {
    weekly: 25
  },

  minorSupport: {
    fixed: 150,
    weekly: 0
  },

  homestay: {
    privateNoMeals: 320,
    privateBreakfast: 350,
    privateTwoMeals: 390,
    privateThreeMeals: 420,
    sharedTwoMeals: 340
  },

  residence: {
    sharedRoom: 350,
    privateSharedBathroom: 500,
    privateBathroom: 600
  }
};
