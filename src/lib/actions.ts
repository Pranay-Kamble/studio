'use server';

import { suggestTags } from '@/ai/flows/suggest-tags';
import { summarizeResponse } from '@/ai/flows/summarize-response';

export async function getTagSuggestions(question: string) {
  if (!question || question.trim().length < 10) {
    return { tags: [] };
  }
  try {
    const result = await suggestTags({ question });
    return result;
  } catch (error) {
    console.error('Error getting tag suggestions:', error);
    return { tags: [] };
  }
}

export async function getResponseSummary(responseText: string) {
  if (!responseText || responseText.trim().length < 10) {
    return { summary: 'Response is too short to summarize.' };
  }
  try {
    const result = await summarizeResponse({ responseText });
    return result;
  } catch (error) {
    console.error('Error getting response summary:', error);
    return { summary: 'Could not generate summary at this time.' };
  }
}
