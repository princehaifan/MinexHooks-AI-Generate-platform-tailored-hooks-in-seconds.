
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Modal } from './components/Modal';
import { generateHooks } from './services/geminiService';
import type { HookCategory, ModalInfo, ContentType } from './types';
import { CONTENT_TYPES } from './constants';

const App: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [contentType, setContentType] = useState<ContentType>(CONTENT_TYPES[0]);
    const [hooks, setHooks] = useState<HookCategory[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({ type: null, data: null });

    const handleGenerateHooks = useCallback(async () => {
        if (!idea.trim()) {
            setError('Please enter a content idea.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setHooks(null);

        try {
            const result = await generateHooks(idea, contentType);
            setHooks(result);
        } catch (err: any) {
            if (err.message === '401') {
                setModalInfo({ type: 'login', data: null });
            } else if (err.message === '402') {
                setModalInfo({ type: 'credits', data: { current: 5, required: 10 } });
            } else {
                setError('Failed to generate hooks. The AI may be experiencing high demand. Please try again later.');
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [idea, contentType]);

    const closeModal = () => {
        setModalInfo({ type: null, data: null });
    };

    return (
        <div className="min-h-screen bg-base-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-3xl mx-auto">
                <Header />
                <main className="mt-8">
                    <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-2xl border border-base-300">
                        <InputForm
                            idea={idea}
                            setIdea={setIdea}
                            contentType={contentType}
                            setContentType={setContentType}
                            onSubmit={handleGenerateHooks}
                            isLoading={isLoading}
                        />
                    </div>
                    
                    <div className="mt-8">
                        {isLoading && <LoadingSpinner />}
                        {error && <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg">{error}</div>}
                        {!isLoading && !hooks && !error && (
                            <div className="text-center text-content-200 p-8 border-2 border-dashed border-base-300 rounded-2xl">
                                <h3 className="text-lg font-semibold">Ready to create?</h3>
                                <p>Your powerful new hooks will appear here.</p>
                            </div>
                        )}
                        {hooks && <ResultsDisplay hookCategories={hooks} />}
                    </div>
                </main>
            </div>
            
            <Modal isOpen={modalInfo.type === 'login'} onClose={closeModal} title="Login Required">
                <p>Please log in to generate hooks and access your MinexTools features.</p>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-base-300 hover:bg-opacity-80 transition-colors">Sign Up</button>
                    <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-light transition-colors">Log In</button>
                </div>
            </Modal>

            <Modal isOpen={modalInfo.type === 'credits'} onClose={closeModal} title="Insufficient Credits">
                 <p>
                    You have <span className="font-bold text-amber-400">{modalInfo.data?.current}</span> credits remaining. 
                    This generation requires <span className="font-bold text-amber-400">{modalInfo.data?.required}</span> credits.
                </p>
                <p className="mt-2">Please top up your account to continue.</p>
                <div className="flex justify-end mt-6">
                    <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-light transition-colors">Buy More Credits</button>
                </div>
            </Modal>
        </div>
    );
};

export default App;
