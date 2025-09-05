
import { GoogleGenAI, Type } from "@google/genai";
import type { HookCategory, ContentType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        description: 'A creative category for the hooks, e.g., "Strong", "Intriguing", "Question".',
      },
      hooks: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: 'The generated hook text.',
            },
            emoji: {
              type: Type.STRING,
              description: 'A single emoji relevant to the hook.',
            },
          },
          required: ['text', 'emoji'],
        },
      },
    },
    required: ['category', 'hooks'],
  },
};

const createPrompt = (idea: string, contentType: ContentType): string => {
  return `
    Content Idea: "${idea}"
    Content Type: "${contentType}"

    Based on the idea and content type, generate 5-7 engaging and platform-optimized hooks.
    Group these hooks into at least 3 distinct, creative categories (e.g., "The Bold Claim", "The Burning Question", "The Relatable Moment").
    For each individual hook, provide a single, relevant emoji.

    Your response MUST be a JSON object that strictly adheres to the provided schema. Do not include any introductory text, explanations, or markdown formatting like \`\`\`json. The entire response must be the JSON object itself.
  `;
};

const simulateBackendCheck = (): void => {
    const random = Math.random();
    // 10% chance of 401, 10% chance of 402
    if (random < 0.1) {
        throw new Error('401');
    }
    if (random >= 0.1 && random < 0.2) {
        throw new Error('402');
    }
    // 80% chance of success
};


export const generateHooks = async (idea: string, contentType: ContentType): Promise<HookCategory[]> => {
    simulateBackendCheck();

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createPrompt(idea, contentType),
            config: {
                systemInstruction: "You are an expert copywriter and content strategist specializing in creating viral hooks for social media and digital content. Your goal is to generate a variety of engaging hooks based on a user's content idea and chosen platform.",
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        const generatedHooks = JSON.parse(jsonText) as HookCategory[];
        
        // Basic validation
        if (!Array.isArray(generatedHooks) || generatedHooks.length === 0) {
            throw new Error("Invalid response structure from AI.");
        }
        
        return generatedHooks;
    } catch (error) {
        console.error("Error generating hooks with Gemini:", error);
        throw new Error("Failed to parse or receive valid data from AI.");
    }
};
