import { useState } from 'react';
import Modal from '../ui/Modal';
import { FormInput, Checkbox } from '../ui/FormFields';
import Button from '../ui/Button';
import { useGame } from '../../context/GameContext';
import { useGameEngine } from '../../hooks/useGameEngine';
import { submitLead } from '../../services/api';
import { SCREENS } from '../../constants/game';

/** Validates the lead form. Returns an errors object. */
function validate(name, phone, agreed) {
    const errors = {};
    if (!name.trim()) {
        errors.name = 'Please enter your name';
    } else if (name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    if (!phone.trim()) {
        errors.phone = 'Please enter your phone number';
    } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
        errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!agreed) {
        errors.agreed = 'You must accept the terms to continue';
    }
    return errors;
}

export default function LeadModal({ onClose }) {
    const { setUser, navigate, dispatch } = useGame();
    const { initGame } = useGameEngine();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [agreed, setAgreed] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate(name, phone, agreed);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setLoading(true);
        try {
            await submitLead({ name: name.trim(), phone: phone.trim() });
            setUser({ name: name.trim(), phone: phone.trim() });
            initGame();
            navigate(SCREENS.GAME);
        } catch {
            setErrors({ phone: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal>
            <div style={{ textAlign: 'center', marginBottom: 6, fontSize: 32 }}>🛡️</div>
            <div className="modal-title">One Quick Step!</div>
            <div className="modal-subtitle">Enter your details to start the game and get personalised tips.</div>

            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                    id="lead-name"
                    label="Your Name"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />
                <FormInput
                    id="lead-phone"
                    label="Phone Number"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    maxLength={10}
                />
                <Checkbox
                    id="lead-tc"
                    label='I agree to the <a href="#" onclick="event.preventDefault()">Terms and Conditions</a> and consent to be contacted.'
                    checked={agreed}
                    onChange={setAgreed}
                />
                {errors.agreed && <div className="form-error">{errors.agreed}</div>}

                <div style={{ height: 12 }} />
                <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    loading={loading}
                    id="btn-lead-submit"
                >
                    {!loading && 'Start Playing 🎮'}
                </Button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
                🔒 Your data is safe with us. No spam, ever.
            </p>
        </Modal>
    );
}
