import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'h':
                        e.preventDefault();
                        navigate('/');
                        break;
                    case 'p':
                        e.preventDefault();
                        navigate('/plan');
                        break;
                    case 's':
                        e.preventDefault();
                        navigate('/saved');
                        break;
                    case 'k':
                        e.preventDefault();
                        document.querySelector('input[type="text"]')?.focus();
                        break;
                    default:
                        break;
                }
            }

            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('[role="dialog"]');
                if (modals.length > 0) {
                    const closeButton = modals[modals.length - 1].querySelector('[aria-label*="Close"]');
                    closeButton?.click();
                }
            }

            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    const event = new CustomEvent('show-shortcuts');
                    window.dispatchEvent(event);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [navigate]);
};

export const shortcuts = [
    { keys: ['Ctrl', 'H'], description: 'Go to Home' },
    { keys: ['Ctrl', 'P'], description: 'Plan New Trip' },
    { keys: ['Ctrl', 'S'], description: 'View Saved Trips' },
    { keys: ['Ctrl', 'K'], description: 'Focus Search' },
    { keys: ['Esc'], description: 'Close Modal' },
    { keys: ['?'], description: 'Show Shortcuts' },
];
