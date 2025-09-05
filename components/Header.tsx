
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                MinexHooks AI
            </h1>
            <p className="mt-2 text-lg text-content-200">
                Generate platform-tailored hooks in seconds.
            </p>
        </header>
    );
};
