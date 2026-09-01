/* ==========================================================================
   DASS Montréal Language School — pricing-data.js
   Single source of truth for tuition and other fee amounts used by the
   quote estimator and the Tuition & Fees page.
   ========================================================================== */

var pricingData = {
  currency: "CAD",
  effectiveDate: "2026-09",

  tuition: {
    english: {
      general: {
        weeklyHours: 15,
        schedule: "9:00–12:00",
        minWeeks: 2,
        rates: { short: 350, standard: 340, medium: 330, long: 320 }
      },
      intensive: {
        weeklyHours: 25,
        schedule: "9:00–15:30",
        minWeeks: 2,
        rates: { short: 550, standard: 540, medium: 530, long: 520 }
      },
      ielts: {
        weeklyHours: 25,
        schedule: "9:00–15:30",
        minWeeks: 8,
        rates: { standard: 570, medium: 560, long: 540 }
      }
    },

    french: {
      general: {
        weeklyHours: 15,
        schedule: "9:00–12:00",
        minWeeks: 2,
        rates: { short: 350, standard: 340, medium: 330, long: 320 }
      },
      intensive: {
        weeklyHours: 25,
        schedule: "9:00–15:30",
        minWeeks: 2,
        rates: { short: 550, standard: 540, medium: 530, long: 520 }
      },
      frenchExam: {
        weeklyHours: 25,
        schedule: "9:00–15:30",
        minWeeks: 8,
        rates: { standard: 570, medium: 560, long: 540 }
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
    privateTwoMeals: 390,
    privateThreeMeals: 420
  },

  residence: {
    private: 500
  }
};
