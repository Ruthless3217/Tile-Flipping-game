// ================================================================
// GAME CONSTANTS
// ================================================================

/** All 8 unique insurance icon pairs */

export const ICONS = [
    { id: 'family', label: 'Life', emoji: '🫂' },      // New: Hug/Family
    { id: 'shield', label: 'Protect', emoji: '🛡️' },   // Keep: Shield
    { id: 'heart', label: 'Health', emoji: '🩺' },     // New: Stethoscope
    { id: 'umbrella', label: 'Cover', emoji: '☂️' },    // Keep: Umbrella
    { id: 'home', label: 'Home', emoji: '🏡' },        // New: House with Garden
    { id: 'medical', label: 'Care', emoji: '🏥' },     // New: Hospital
    { id: 'savings', label: 'Grow', emoji: '💰' },     // Keep: Money Bag
    { id: 'policy', label: 'Secure', emoji: '📝' },    // New: Memo
];

/** Total game duration in seconds */
export const GAME_DURATION = 120;

/** Delay before flipping back non-matching tiles (ms) */
export const MISMATCH_DELAY = 700;

/** Number of pairs */
export const TOTAL_PAIRS = ICONS.length;

/** Maximum allowed flips */
export const MAX_FLIPS = 30;

/** Color palette for confetti */
export const CONFETTI_COLORS = [
    '#F97316', '#1E4ED8', '#10B981',
    '#FBBF24', '#EC4899', '#6366F1',
];

// ================================================================
// NAVIGATION STATES
// ================================================================
export const SCREENS = {
    INTRO: 'intro',
    GAME: 'game',
    SCORE: 'score',
    THANK_YOU: 'thankyou',
};
