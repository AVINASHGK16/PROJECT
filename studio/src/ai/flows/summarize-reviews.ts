// Summarizes user reviews for a service provider and generates suggestions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReviewsInputSchema = z.object({
  reviews: z.array(
    z.string().describe('A review from a user about the service provider.')
  ).describe('An array of user reviews to be summarized.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the user reviews.'),
  suggestions: z.string().describe('Suggestions for the service provider based on the reviews.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;

export async function summarizeReviews(input: SummarizeReviewsInput): Promise<SummarizeReviewsOutput> {
  return summarizeReviewsFlow(input);
}

const summarizeReviewsPrompt = ai.definePrompt({
  name: 'summarizeReviewsPrompt',
  input: {
    schema: SummarizeReviewsInputSchema,
  },
  output: {
    schema: SummarizeReviewsOutputSchema,
  },
  prompt: `You are an AI assistant helping to process reviews for service providers like electricians and plumbers.

  Given the following user reviews:
  {{#each reviews}}
  - {{{this}}}
  {{/each}}

  1.  Summarize the reviews, capturing the overall sentiment (positive, negative, mixed) and key themes.
  2.  Based on the reviews, provide a few specific, actionable suggestions to the service provider for improvement.
  `,
});

const summarizeReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeReviewsFlow',
    inputSchema: SummarizeReviewsInputSchema,
    outputSchema: SummarizeReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeReviewsPrompt(input);
    return output!;
  }
);
