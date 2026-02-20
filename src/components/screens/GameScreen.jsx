import { useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useGameTimer } from '../../hooks/useGameTimer';
import { formatTime, getHintText } from '../../utils/gameUtils';
import { TOTAL_PAIRS, MAX_FLIPS } from '../../constants/game';
import GameBoard from './GameBoard';
import styles from './GameScreen.module.css';

export default function GameScreen({ showToast }) {
    const { state } = useGame();
    const { flipTile } = useGameEngine();
    const { game } = state;

    // Timer manages countdown and end conditions automatically
    useGameTimer(useCallback((reason) => {
        if (reason === 'win') showToast?.('🎉 You matched all pairs!', 'success');
        else if (reason === 'flips') showToast?.('⚠️ Out of moves!', 'info');
        else showToast?.(`⏰ Time's up!`, 'info');
    }, [showToast]));

    const { timeRemaining, matchedPairs, flipsCount, tiles } = game;
    const progress = Math.round((matchedPairs / TOTAL_PAIRS) * 100);
    const isWarning = timeRemaining <= 20 && timeRemaining > 0;

    const handleTileClick = useCallback((index) => {
        flipTile(state, index);
    }, [flipTile, state]);

    return (
        <div className={`screen ${styles.gameScreen}`}>

            {/* Top bar */}
            <div className={styles.topbar}>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>Time</span>
                    <span className={`${styles.statValue} ${isWarning ? styles.warn : ''}`}>
                        {formatTime(timeRemaining)}
                    </span>
                </div>
                <div className={styles.scoreBadge}>
                    <span className={styles.statLabel} style={{ color: 'rgba(255,255,255,0.6)' }}>Pairs Found</span>
                    <span className={styles.statValue}>{matchedPairs} / {TOTAL_PAIRS}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>Flips</span>
                    <span className={`${styles.statValue} ${flipsCount >= MAX_FLIPS - 5 ? styles.warn : ''}`}>
                        {flipsCount} / {MAX_FLIPS}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressTrack}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={matchedPairs}
                    aria-valuemax={TOTAL_PAIRS}
                />
            </div>

            {/* Hint */}
            <div className={styles.hint}>
                <div className={styles.hintChip}>
                    {isWarning
                        ? ` Hurry! Only ${timeRemaining}s left!`
                        : getHintText(matchedPairs)
                    }
                </div>
            </div>

            {/* Board */}
            <div className={styles.boardWrapper}>
                <GameBoard tiles={tiles} onTileClick={handleTileClick} locked={game.isLocked} />
            </div>

        </div>
    );
}
