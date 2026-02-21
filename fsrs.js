const REVIEW_INTERVALS_MS = {
  0: 0, // unseen: always due
  1: 1 * 24 * 60 * 60 * 1000, // seen: after 1 day
  2: 3 * 24 * 60 * 60 * 1000, // learning: after 3 days
  3: 7 * 24 * 60 * 60 * 1000, // mastered: after 7 days
  4: 30 * 24 * 60 * 60 * 1000, // well-known: after 30 days
};
const MAX_REVIEW_LETTERS = 10;
const MAX_REVIEW_VOCAB = 10;
const MAX_REVIEW_GRAMMAR = 3;
const MAX_REVIEW_PHRASES = 3;

// ════════════════════════════════════════
//  FSRS-4.5 SPACED REPETITION (17-parameter variant)
// ════════════════════════════════════════
// Default FSRS-4.5 weights for formulas that reference w[0]..w[16].
const FSRS_W = [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589, 1.533, 0.1544, 1.007, 1.9395, 0.11, 0.29, 2.27, 0.07, 2.9898];
// Keep this in sync with formulas below; they implement the FSRS-4.5 17-weight model.
if (FSRS_W.length !== 17) throw new Error(`FSRS_W must contain 17 weights for FSRS-4.5 formulas (got ${FSRS_W.length})`);
const FSRS_AGAIN = 1,
  FSRS_HARD = 2,
  FSRS_GOOD = 3,
  FSRS_EASY = 4;

// Initial stability (days) after first exposure, indexed by rating 1-4
function fsrsInitS(rating) {
  return FSRS_W[rating - 1];
}

// Initial difficulty (1-10) after first exposure, indexed by rating
function fsrsInitD(rating) {
  return Math.max(1, Math.min(10, FSRS_W[4] - Math.exp(FSRS_W[5] * (rating - 1)) + 1));
}

// Estimated probability of recall after elapsedDays given stability s
function fsrsR(s, elapsedDays) {
  return Math.pow(1 + elapsedDays / (9 * s), -1);
}

// New stability after a successful recall (rating 2-4)
function fsrsSAfterRecall(d, s, r, rating) {
  const hardPenalty = rating === FSRS_HARD ? FSRS_W[15] : 1;
  const easyBonus = rating === FSRS_EASY ? FSRS_W[16] : 1;
  return s * (Math.exp(FSRS_W[8]) * (11 - d) * Math.pow(s, -FSRS_W[9]) * (Math.exp(FSRS_W[10] * (1 - r)) - 1) * hardPenalty * easyBonus) + 1;
}

// New stability after forgetting (rating 1 / Again)
function fsrsSAfterForgetting(d, s, r) {
  return FSRS_W[11] * Math.pow(d, -FSRS_W[12]) * (Math.pow(s + 1, FSRS_W[13]) - 1) * Math.exp(FSRS_W[14] * (1 - r));
}

// Updated difficulty after a review
function fsrsNextD(d, rating) {
  const d3 = fsrsInitD(FSRS_GOOD);
  const dp = d - FSRS_W[6] * (rating - 3);
  return Math.max(1, Math.min(10, FSRS_W[7] * d3 + (1 - FSRS_W[7]) * dp));
}

// Derive integer mastery 0-4 from FSRS stability (for curriculum/display)
function masteryFromFsrs(s) {
  if (!s || s < 0.5) return 1;
  if (s < 7) return 2;
  if (s < 21) return 3;
  return 4;
}

// Preview the resulting interval in days for a given rating without committing

export {
  REVIEW_INTERVALS_MS,
  MAX_REVIEW_LETTERS,
  MAX_REVIEW_VOCAB,
  MAX_REVIEW_GRAMMAR,
  MAX_REVIEW_PHRASES,
  FSRS_AGAIN,
  FSRS_HARD,
  FSRS_GOOD,
  FSRS_EASY,
  fsrsInitS,
  fsrsInitD,
  fsrsR,
  fsrsSAfterRecall,
  fsrsSAfterForgetting,
  fsrsNextD,
  masteryFromFsrs,
};
