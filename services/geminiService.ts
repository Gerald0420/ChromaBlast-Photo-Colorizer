
import { GoogleGenAI, Modality } from "@google/genai";
import type { FormState } from '../types';

if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we assume the key is set.
    console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const buildPrompt = (formState: FormState): string => {
    const { year, details, season, timeOfDay, lightConditions, saturation, photoType } = formState;

    let baseInstruction = `Your task is to colorize this photograph. `;
    if (photoType === 'Sepia') {
        baseInstruction += `It has a sepia tone which you must completely neutralize and replace with a full-spectrum, realistic color palette. Do not let the original brown/yellow tint influence the final colors.`;
    } else {
        baseInstruction += `It is a black-and-white photograph. You must replace the monochrome tones with a full, realistic color palette.`;
    }
    baseInstruction += ` Your color choices must be based on the context provided below.`
    
    let prompt = baseInstruction;

    let saturationInstruction = '';
    switch (saturation) {
        case 'Vibrant':
            saturationInstruction = 'Your primary goal for this image is to use hyper-realistic, intensely vibrant, and deeply saturated colors. The color palette must be bold, vivid, and cinematic. Prioritize artistic impact and extreme color saturation over subtle, naturalistic tones. The result should feel dramatic and striking, similar to a modern, high-contrast color film. Do not hold back on the color intensity. Muted or pale colors are unacceptable for this request.';
            break;
        case 'Natural':
        default:
            saturationInstruction = 'The colors should be natural, realistic, and historically-accurate for the era.';
            break;
    }

    prompt += `\n\n${saturationInstruction}`;
    prompt += `\n\nThe photo was taken around the year ${year}.`;
    
    const context = [];
    if (season !== 'Unknown') context.push(`The season is ${season}.`);
    if (timeOfDay !== 'Unknown') context.push(`It's ${timeOfDay}.`);
    if (lightConditions !== 'Unknown') context.push(`The lighting is ${lightConditions}.`);
    if (details) context.push(`Other pertinent details: ${details}.`);
    
    if (context.length > 0) {
        prompt += `\nFurther context for color accuracy: ${context.join(' ')}`;
    }

    prompt += `\n\nReturn only the colorized image, with no accompanying text or explanation.`

    return prompt;
}

export const colorizeImage = async (base64ImageData: string, mimeType: string, formState: FormState): Promise<string> => {
    try {
        const prompt = buildPrompt(formState);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        // The API can return multiple parts, we must find the image part.
        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        
        if (imagePart && imagePart.inlineData) {
            const imageMimeType = imagePart.inlineData.mimeType;
            const imageBase64 = imagePart.inlineData.data;
            return `data:${imageMimeType};base64,${imageBase64}`;
        } else {
            // Check if there's a text part with a safety block message
            const textPart = response.candidates?.[0]?.content?.parts.find(part => part.text);
            if(textPart?.text){
                throw new Error(`The model returned text instead of an image: "${textPart.text}" This might be due to a safety policy.`);
            }
            throw new Error("Colorization failed: The AI model did not return an image.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`API Error: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while contacting the AI service.");
    }
};