
import React, { useState } from 'react';
import type { Hook, HookCategory } from '../types';

interface ResultsDisplayProps {
    hookCategories: HookCategory[];
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const HookCard: React.FC<{ hook: Hook }> = ({ hook }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hook.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-start justify-between p-4 bg-base-100/50 rounded-lg mb-3">
            <p className="flex-1 mr-4">
                <span className="mr-2">{hook.emoji}</span>
                {hook.text}
            </p>
            <button
                onClick={handleCopy}
                className={`p-2 rounded-md transition-colors duration-200 ${
                    copied
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-base-300 hover:bg-brand-primary/50 text-content-200'
                }`}
                aria-label="Copy hook"
            >
                {copied ? <CheckIcon className="w-5 h-5"/> : <CopyIcon className="w-5 h-5"/>}
            </button>
        </div>
    );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ hookCategories }) => {
    const [allCopied, setAllCopied] = useState(false);

    const handleCopyAll = () => {
        const allHooksText = hookCategories
            .flatMap(category => category.hooks.map(hook => hook.text))
            .join('\n\n');
        navigator.clipboard.writeText(allHooksText);
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold">Your Generated Hooks</h2>
                 <button 
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-base-300 hover:bg-brand-primary/50 rounded-lg transition-colors"
                >
                    {allCopied ? <><CheckIcon className="w-4 h-4 text-green-400"/> Copied!</> : <><CopyIcon className="w-4 h-4"/> Copy All</>}
                 </button>
            </div>
            {hookCategories.map((category, index) => (
                <div key={index} className="bg-base-200 p-5 rounded-xl border border-base-300">
                    <h3 className="text-xl font-semibold mb-4 text-brand-light">{category.category}</h3>
                    {category.hooks.map((hook, hookIndex) => (
                        <HookCard key={hookIndex} hook={hook} />
                    ))}
                </div>
            ))}
        </div>
    );
};
