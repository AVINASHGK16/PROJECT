'use server';

/**
 * @fileOverview Generates suggestions for service providers based on customer reviews.
 *
 * - generateSuggestions - A function that generates suggestions for service providers.
 * - GenerateSuggestionsInput - The input type for the generateSuggestions function.
 * - GenerateSuggestionsOutput - The return type for the generateSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestionsInputSchema = z.object({
  reviews: z.array(
    z.object({
      text: z.string().describe('The text content of the review.'),
      rating: z.number().describe('The rating given in the review.'),
    })
  ).describe('An array of customer reviews for the service provider.'),
});
export type GenerateSuggestionsInput = z.infer<typeof GenerateSuggestionsInputSchema>;

const GenerateSuggestionsOutputSchema = z.object({
  summary: z.string().describe('A summary of the customer reviews.'),
  suggestions: z.array(z.string()).describe('AI-generated suggestions for the service provider based on the reviews.'),
});
export type GenerateSuggestionsOutput = z.infer<typeof GenerateSuggestionsOutputSchema>;

export async function generateSuggestions(input: GenerateSuggestionsInput): Promise<GenerateSuggestionsOutput> {
  return generateSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSuggestionsPrompt',
  input: {schema: GenerateSuggestionsInputSchema},
  output: {schema: GenerateSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping service providers improve their service quality based on customer reviews.

  You will receive a list of customer reviews, and you should provide a summary of the reviews and a list of suggestions for the service provider.

  Reviews:
  {{#each reviews}}
  - "{{this.text}}" (Rating: {{this.rating}})
  {{/each}}

  Summary:
  {{summary}}

  Suggestions:
  {{#each suggestions}}
  - {{this}}
  {{/each}}

  Please provide the summary and suggestions in a structured format.
  Summary:
  Suggestions:`, 
});

const generateSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: GenerateSuggestionsInputSchema,
    outputSchema: GenerateSuggestionsOutputSchema,
  },
  async input => {
    const {
      output: {summary, suggestions},
    } = await prompt(input);

    return {summary: summary!, suggestions: suggestions!};
  }
);
