'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing peer responses using AI.
 *
 * - summarizeResponse - A function that takes a peer response as input and returns a short summary.
 * - SummarizeResponseInput - The input type for the summarizeResponse function.
 * - SummarizeResponseOutput - The return type for the summarizeResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeResponseInputSchema = z.object({
  responseText: z
    .string()
    .describe('The full text of the peer response to be summarized.'),
});
export type SummarizeResponseInput = z.infer<typeof SummarizeResponseInputSchema>;

const SummarizeResponseOutputSchema = z.object({
  summary: z
    .string()
    .describe('A short summary of the peer response, no more than 50 words.'),
});
export type SummarizeResponseOutput = z.infer<typeof SummarizeResponseOutputSchema>;

export async function summarizeResponse(input: SummarizeResponseInput): Promise<SummarizeResponseOutput> {
  return summarizeResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeResponsePrompt',
  input: {schema: SummarizeResponseInputSchema},
  output: {schema: SummarizeResponseOutputSchema},
  prompt: `Summarize the following response in 50 words or less:\n\n{{{responseText}}}`,
});

const summarizeResponseFlow = ai.defineFlow(
  {
    name: 'summarizeResponseFlow',
    inputSchema: SummarizeResponseInputSchema,
    outputSchema: SummarizeResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
