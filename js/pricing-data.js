/* ==========================================================================
   DASS Montréal Language School — pricing-data.js
   Single source of truth for all fee amounts used by the quote estimator
   (js/quote.js) and the Tuition & Fees page renderer (js/tuition-fees.js).
   Update numbers here only — never hard-code amounts in HTML or elsewhere.
   ========================================================================== */

var pricingData = {
  currency: "CAD",
  effectiveDate: "2026-07",

  // While true, every page that includes this file shows a "reference
  // pricing, not official" notice. Flip to false once real prices are set.
  isTemporaryData: true,

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
        rates: { short: 455, standard: 445, medium: 435, long: 425 }
      },
      ielts: {
        lessonCount: 30,
        lessonMinutes: 50,
        minimumWeeks: 4,
        maximumWeeks: 24,
        rates: { standard: 465, medium: 455 }
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
        rates: { short: 455, standard: 445, medium: 435, long: 425 }
      },
      delfDalf: {
        lessonCount: 30,
        lessonMinutes: 50,
        minimumWeeks: 4,
        maximumWeeks: 24,
        rates: { standard: 465, medium: 455 }
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
