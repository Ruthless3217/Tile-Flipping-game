import { useState } from 'react';
import Button from '../ui/Button';
import LeadModal from '../modals/LeadModal';
import styles from './IntroScreen.module.css';

export default function IntroScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={`screen ${styles.intro}`}>
                <div className={`screen-inner ${styles.inner}`}>

                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot} />
                            Life Insurance Game
                        </div>
                        <h1 className={styles.title}>
                            Match for a<br />
                            <span>Secure Future</span>
                        </h1>
                        <p className={styles.subtitle}>Flip tiles, find pairs, protect your future 🛡️</p>
                    </div>

                    {/* Hero illustration */}
                    <div className={styles.hero} aria-hidden="true">
                        <div className={styles.heroStage}>
                            {/* Floating stars */}
                            <span className={`${styles.star} ${styles.star1}`}>✨</span>
                            <span className={`${styles.star} ${styles.star2}`}>⭐</span>
                            <span className={`${styles.star} ${styles.star3}`}>🌟</span>

                            {/* Left character */}
                            <div className={styles.character}>
                                <div className={styles.charBodyBlue}>
                                    <CharHead skinColor="#FFD09B" />
                                    <div className={styles.shirtBlue}>
                                        <span className={styles.shirtIcon}>🏠</span>
                                        <div className={`${styles.arm} ${styles.armRight}`} style={{ background: 'linear-gradient(135deg,#1E4ED8,#3B6EF5)' }} />
                                        <div className={`${styles.arm} ${styles.armLeft}`} style={{ background: 'linear-gradient(135deg,#1E4ED8,#3B6EF5)' }} />
                                    </div>
                                </div>
                                <span className={styles.charLabel}>You</span>
                            </div>

                            {/* Mini board */}
                            <div className={styles.miniBoard}>
                                {[null, '❤️‍🩹', null, '❤️‍🩹', null, null, null, null, null].map((e, i) => (
                                    <div key={i} className={`${styles.miniTile} ${e ? styles.miniTileFlipped : ''}`}>
                                        {e && <span style={{ fontSize: 16 }}>{e}</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Right character */}
                            <div className={styles.character}>
                                <div className={styles.charBodyOrange}>
                                    <CharHead skinColor="#FFB76B" />
                                    <div className={styles.shirtOrange}>
                                        <span className={styles.shirtIcon}>💰</span>
                                        <div className={`${styles.arm} ${styles.armRight}`} style={{ background: 'linear-gradient(135deg,#F97316,#FFB380)' }} />
                                        <div className={`${styles.arm} ${styles.armLeft}`} style={{ background: 'linear-gradient(135deg,#F97316,#FFB380)' }} />
                                    </div>
                                </div>
                                <span className={styles.charLabel}>Agent</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className={styles.bottom}>
                        <div className={styles.chips}>
                            <div className={styles.chip}><span>⏱</span> 2 Min</div>
                            <div className={styles.chip}><span>🎴</span> 16 Tiles</div>
                            <div className={styles.chip}><span>🧠</span> 8 Pairs</div>
                        </div>
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={() => setShowModal(true)}
                            id="btn-start-now"
                        >
                            🚀&nbsp; Start Now
                        </Button>
                    </div>

                </div>
            </div>

            {showModal && <LeadModal onClose={() => setShowModal(false)} />}
        </>
    );
}

function CharHead({ skinColor }) {
    return (
        <div style={{
            background: skinColor,
            borderRadius: '50%',
            width: 36,
            height: 36,
            margin: '0 auto',
            position: 'relative',
        }}>
            <div style={{ position: 'absolute', top: 10, left: 5, width: 6, height: 6, borderRadius: '50%', background: '#3B3B5C' }} />
            <div style={{ position: 'absolute', top: 10, right: 5, width: 6, height: 6, borderRadius: '50%', background: '#3B3B5C' }} />
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 14, height: 5, border: '2px solid #3B3B5C', borderTop: 'none', borderRadius: '0 0 8px 8px' }} />
        </div>
    );
}
