import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useGameEngine } from '../../hooks/useGameEngine';
import { submitLead } from '../../services/api';
import { SCREENS } from '../../constants/game';
import styles from './LeadModal.module.css';

export default function LeadModal({ onClose }) {
    const { setUser, navigate } = useGame();
    const { initGame } = useGameEngine();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNameSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (phone.length !== 10) newErrors.phone = 'Enter valid 10-digit number';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            // Save user data
            setUser({ name, phone });

            // Submit to API
            await submitLead({ name, phone });

            // Start Game
            initGame();
            navigate(SCREENS.GAME);
        } catch (error) {
            console.error(error);
            // Even if API fails, let them play? Or show error?
            // For now, let's assume we let them play or just show error.
            // User snippet didn't handle error explicitly other than console, 
            // but original LeadModal did. I'll allow play for now to not block.
            initGame();
            navigate(SCREENS.GAME);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.overlay}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.modal}
                >
                    <button
                        onClick={onClose}
                        className={styles.closeBtn}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className={styles.header}>
                        <div className={styles.iconWrapper}>
                            <span className={styles.iconEmoji}>👋</span>
                        </div>
                        <h2 className={styles.title}>Welcome!</h2>
                        <p className={styles.subtitle}>Enter your details to start.</p>
                    </div>

                    <form onSubmit={handleNameSubmit} className={styles.form}>
                        {/* Name Field */}
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="userName">
                                Your Name
                            </label>
                            <input
                                id="userName"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^[A-Za-z\s]*$/.test(val)) {
                                        setName(val);
                                        if (errors.name) setErrors({ ...errors, name: '' });
                                    }
                                }}
                                placeholder="Full Name"
                                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                autoFocus
                            />
                            {errors.name && (
                                <p className={styles.errorText}>{errors.name}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="phone">
                                Mobile Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                maxLength={10}
                                value={phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    if (val === '' || /^[6-9]/.test(val)) {
                                        setPhone(val);
                                        if (errors.phone) setErrors({ ...errors, phone: '' });
                                    }
                                }}
                                placeholder="9876543210"
                                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                            />
                            {errors.phone && (
                                <p className={styles.errorText}>{errors.phone}</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className={styles.termsRow}>
                            <div className={styles.checkboxWrapper}>
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <Check className={styles.checkIcon} strokeWidth={4} />
                            </div>
                            <label htmlFor="terms" className={styles.termsLabel}>
                                I agree to the <button type="button" onClick={() => setShowTerms(true)} className={styles.termsLink}>Term & condition</button> and Acknowledge the Privacy Policy.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={!name.trim() || phone.length !== 10 || !termsAccepted || isSubmitting}
                            className={styles.submitBtn}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className={styles.spinner} />
                                    <span>Starting...</span>
                                </>
                            ) : (
                                "Let's Go!"
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Terms Popup Overlay */}
                <AnimatePresence>
                    {showTerms && (
                        <div className={styles.termsOverlay} onClick={() => setShowTerms(false)}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className={styles.termsModal}
                            >
                                <button
                                    onClick={() => setShowTerms(false)}
                                    className={styles.closeBtn}
                                    style={{ top: 12, right: 12 }}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h3 className={styles.termsTitle}>Terms & Conditions</h3>
                                <div className={styles.termsContent}>
                                    <p>BAJAJ LIFE INSURANCE</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                </div>
                                <button
                                    onClick={() => { setShowTerms(false); setTermsAccepted(true); }}
                                    className={styles.agreeBtn}
                                >
                                    I Agree
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
