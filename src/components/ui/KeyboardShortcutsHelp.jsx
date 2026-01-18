import { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import Modal from './Modal';
import { shortcuts } from '../../hooks/useKeyboardShortcuts';

const KeyboardShortcutsHelp = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleShow = () => setIsOpen(true);
        window.addEventListener('show-shortcuts', handleShow);
        return () => window.removeEventListener('show-shortcuts', handleShow);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg hover:scale-110 transition-transform z-40 no-print"
                aria-label="Keyboard shortcuts"
                title="Keyboard shortcuts (?)"
            >
                <Keyboard className="w-5 h-5" />
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Keyboard Shortcuts"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Use these keyboard shortcuts to navigate faster
                    </p>

                    <div className="space-y-2">
                        {shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                            >
                                <span className="text-gray-700 dark:text-gray-300">
                                    {shortcut.description}
                                </span>
                                <div className="flex gap-1">
                                    {shortcut.keys.map((key, i) => (
                                        <kbd
                                            key={i}
                                            className="px-2 py-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded text-sm font-mono font-semibold text-gray-800 dark:text-gray-200 shadow-sm"
                                        >
                                            {key}
                                        </kbd>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>💡 Tip:</strong> Press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-700 rounded text-xs font-mono">?</kbd> anytime to show this help
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default KeyboardShortcutsHelp;
