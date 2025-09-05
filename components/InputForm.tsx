import React from 'react';
import { MAX_IDEA_LENGTH, GROUPED_CONTENT_TYPES } from '../constants';
import type { ContentType } from '../types';

interface InputFormProps {
    idea: string;
    setIdea: (idea: string) => void;
    contentType: ContentType;
    setContentType: (contentType: ContentType) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
    idea,
    setIdea,
    contentType,
    setContentType,
    onSubmit,
    isLoading,
}) => {
    const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= MAX_IDEA_LENGTH) {
            setIdea(e.target.value);
        }
    };
    
    const charCountColor = idea.length === MAX_IDEA_LENGTH ? 'text-red-400' : 'text-content-200';

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="content-idea" className="block text-sm font-medium text-content-200 mb-1">
                        Your Content Idea
                    </label>
                    <textarea
                        id="content-idea"
                        value={idea}
                        onChange={handleIdeaChange}
                        placeholder="e.g., New features for AI video editing software"
                        className="w-full h-24 p-3 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition resize-none disabled:opacity-50"
                        disabled={isLoading}
                        aria-label="Your Content Idea"
                    />
                     <p className={`text-xs text-right mt-1 ${charCountColor}`}>
                        {idea.length}/{MAX_IDEA_LENGTH}
                    </p>
                </div>
                <div>
                     <label htmlFor="content-type" className="block text-sm font-medium text-content-200 mb-1">
                        Content Type
                    </label>
                    <div className="relative">
                        <select
                            id="content-type"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value as ContentType)}
                            className="w-full p-3 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition disabled:opacity-50 appearance-none"
                            disabled={isLoading}
                            aria-label="Select Content Type"
                        >
                            {GROUPED_CONTENT_TYPES.map((group) => (
                                <optgroup key={group.group} label={`🔹 ${group.group}`} className="bg-base-300 font-bold">
                                    {group.types.map((type) => (
                                        <option key={type} value={type} className="bg-base-100 font-normal">{type}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-content-200">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading || !idea.trim()}
                className="w-full mt-6 py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-primary transition-all duration-300 disabled:bg-base-300 disabled:cursor-not-allowed disabled:text-content-200 flex items-center justify-center"
            >
                {isLoading ? 'Generating...' : 'Generate Hooks'}
            </button>
        </form>
    );
};
