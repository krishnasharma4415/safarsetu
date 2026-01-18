import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import Button from './Button';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            const dismissed = localStorage.getItem('pwa-install-dismissed');
            if (!dismissed) {
                setTimeout(() => setShowPrompt(true), 3000);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
    };

    if (!showPrompt || !deferredPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-primary-200 dark:border-primary-700 p-6">
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Dismiss"
                >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                        <Download className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                            Install SafarSetu
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Install our app for quick access and offline use!
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={handleInstall} className="text-sm px-4 py-2">
                                Install
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleDismiss}
                                className="text-sm px-4 py-2"
                            >
                                Not now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
