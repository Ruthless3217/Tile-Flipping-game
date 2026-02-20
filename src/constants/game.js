// ================================================================
// GAME CONSTANTS
// ================================================================

/** All 8 unique insurance icon pairs */
export const ICONS = [
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'shield', label: 'Shield', emoji: '🛡️' },
    { id: 'heart', label: 'Health', emoji: '❤️‍🩹' },
    { id: 'umbrella', label: 'Umbrella', emoji: '☂️' },
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'medical', label: 'Medical', emoji: '➕' },
    { id: 'savings', label: 'Savings', emoji: '💰' },
    { id: 'policy', label: 'Policy', emoji: '📋' },
];

/** Total game duration in seconds */
export const GAME_DURATION = 120;

/** Delay before flipping back non-matching tiles (ms) */
export const MISMATCH_DELAY = 700;

/** Number of pairs */
export const TOTAL_PAIRS = ICONS.length;

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
