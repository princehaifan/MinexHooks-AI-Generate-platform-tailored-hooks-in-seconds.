
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-base-200 rounded-2xl shadow-xl w-full max-w-md m-4 p-6 border border-base-300 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-content-200 hover:text-white">&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
