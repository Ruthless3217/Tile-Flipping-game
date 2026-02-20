import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useGameEngine } from '../../hooks/useGameEngine';
import { getStars, getScoreMessage, formatTime } from '../../utils/gameUtils';
import { TOTAL_PAIRS, SCREENS } from '../../constants/game';
import { submitScore } from '../../services/api';
import Button from '../ui/Button';
import BookModal from '../modals/BookModal';
import styles from './ScoreScreen.module.css';

const CIRCUMFERENCE = 380;

export default function ScoreScreen({ showToast }) {
    const { state, navigate, dispatch } = useGame();
    const { initGame } = useGameEngine();
    const { game, user } = state;
    const { score, flipsCount, timeRemaining, elapsedSeconds } = game;

    const [showBook, setShowBook] = useState(false);
    const fillRef = useRef(null);

    const stars = getStars(score);
    const message = getScoreMessage(score);
    const elapsed = elapsedSeconds || (120 - timeRemaining);

    // Animate the score ring on mount
    useEffect(() => {
        const target = CIRCUMFERENCE - (score / TOTAL_PAIRS) * CIRCUMFERENCE;
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (fillRef.current) {
                    fillRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
                    fillRef.current.style.strokeDashoffset = String(target);
                }
            }, 300);
        });

        // Submit score in background
        submitScore({ ...user, score, flips: flipsCount, elapsed }).catch(() => { });
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    function handlePlayAgain() {
        initGame();
        navigate(SCREENS.GAME);
    }

    function handleShare() {
        const text = `I scored ${score}/${TOTAL_PAIRS} in the Life Insurance Memory Game! Can you beat me? 🛡️`;
        if (navigator.share) {
            navigator.share({ title: 'My Game Score', text }).catch(() => { });
        } else {
            navigator.clipboard.writeText(text).then(() => showToast?.('Score copied to clipboard!', 'success'));
        }
    }

    return (
        <>
            <div className={`screen ${styles.scoreScreen}`}>
                <div className={`screen-inner ${styles.inner}`}>

                    {/* Header */}
                    <p className={styles.label}>Your Result</p>

                    {/* Score Ring */}
                    <div className={styles.ringWrap}>
                        <div className={styles.ring}>
                            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                                <defs>
                                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#F97316" />
                                        <stop offset="100%" stopColor="#FFB380" />
                                    </linearGradient>
                                </defs>
                                <circle className={styles.track} cx="70" cy="70" r="60" />
                                <circle
                                    ref={fillRef}
                                    className={styles.fill}
                                    cx="70" cy="70" r="60"
                                    strokeDashoffset={CIRCUMFERENCE}
                                />
                            </svg>
                            <div className={styles.ringInner}>
                                <div className={styles.scoreBig}>{score}</div>
                                <div className={styles.scoreDenom}>/ {TOTAL_PAIRS}</div>
                                <div className={styles.scoreLbl}>Pairs</div>
                            </div>
                        </div>
                    </div>

                    {/* Stars */}
                    <div className={styles.stars}>
                        {[1, 2, 3].map((n) => (
                            <span
                                key={n}
                                className={`${styles.star} ${n <= stars ? styles.lit : ''}`}
                                style={{ animationDelay: `${(n - 1) * 0.15}s` }}
                            >
                                {n <= stars ? '⭐' : '☆'}
                            </span>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <div className={styles.statVal}>{formatTime(elapsed)}</div>
                            <div className={styles.statLbl}>Time Taken</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statVal}>{flipsCount}</div>
                            <div className={styles.statLbl}>Flips Used</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statVal}>{score > 0 ? (flipsCount / score).toFixed(1) : '—'}</div>
                            <div className={styles.statLbl}>Flips/Match</div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className={styles.messagebox}>
                        <p className={styles.message}>{message}</p>
                    </div>

                    <p className={styles.cta}>
                        "Real protection is better than matching tiles. Let us secure your future today."
                    </p>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <div className={styles.actionsRow}>
                            <button className={`${styles.shareBtn}`} onClick={handleShare} aria-label="Share score" title="Share">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                            <Button variant="primary" fullWidth onClick={() => window.location.href = 'tel:18001234567'} id="btn-call-now">
                                📞&nbsp; Call Now
                            </Button>
                        </div>
                        <Button variant="secondary" fullWidth onClick={() => setShowBook(true)} id="btn-book-slot">
                            📅&nbsp; Book a Consultation Slot
                        </Button>
                        <Button variant="outline" fullWidth onClick={handlePlayAgain} id="btn-play-again">
                            🔄&nbsp; Play Again
                        </Button>
                    </div>

                </div>
            </div>

            {showBook && <BookModal onClose={() => setShowBook(false)} showToast={showToast} />}
        </>
    );
}
