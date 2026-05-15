'use server';
/**
 * @fileOverview A Genkit flow for generating concise 'Intelligence Briefs' and technical narratives
 * for projects and work experiences based on raw input data. This helps administrators populate
 * content for the 'Mission Logs' and 'Mission Select' sections.
 *
 * - generateProjectBrief - A function that handles the generation of project briefs and narratives.
 * - ProjectBriefGeneratorInput - The input type for the generateProjectBrief function.
 * - ProjectBriefGeneratorOutput - The return type for the generateProjectBrief function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectBriefGeneratorInputSchema = z.object({
  title: z.string().describe('The title of the project or work experience.'),
  overview: z.string().optional().describe('A brief overview of the project or role.'),
  responsibilities: z.array(z.string()).optional().describe('Key responsibilities or tasks.'),
  impact: z.string().optional().describe('The impact or achievements of the project/role.'),
  tools: z.array(z.string()).optional().describe('Tools or technologies used.'),
  outcomes: z.string().optional().describe('Detailed outcomes or results.'),
  challenges: z.string().optional().describe('Challenges encountered and overcome.'),
  whatWasLearned: z.string().optional().describe('Key learnings from the project or experience.'),
});
export type ProjectBriefGeneratorInput = z.infer<typeof ProjectBriefGeneratorInputSchema>;

const ProjectBriefGeneratorOutputSchema = z.object({
  intelligenceBrief: z.string().describe('A concise, high-level intelligence brief (2-3 sentences) summarizing the project/experience, suitable for a hacker-themed interface.'),
  technicalNarrative: z.string().describe('A detailed and compelling technical narrative (2-3 paragraphs) of the project/experience, highlighting technical contributions, challenges, and solutions.'),
});
export type ProjectBriefGeneratorOutput = z.infer<typeof ProjectBriefGeneratorOutputSchema>;

export async function generateProjectBrief(input: ProjectBriefGeneratorInput): Promise<ProjectBriefGeneratorOutput> {
  return projectBriefGeneratorFlow(input);
}

const projectBriefPrompt = ai.definePrompt({
  name: 'projectBriefPrompt',
  input: { schema: ProjectBriefGeneratorInputSchema },
  output: { schema: ProjectBriefGeneratorOutputSchema },
  prompt: `You are an AI Intelligence Analyst and Technical Writer for a 'CyberDeck' portfolio system. Your task is to transform raw project data into a concise 'Intelligence Brief' and a detailed 'Technical Narrative'. Adopt a formal, cybersecurity-focused tone with a hint of futuristic hacker aesthetic.

Raw Project/Experience Data:
Title: {{{title}}}
{{#if overview}}Overview: {{{overview}}}{{/if}}
{{#if responsibilities}}Responsibilities: {{#each responsibilities}}- {{{this}}}\n{{/each}}{{/if}}
{{#if impact}}Impact: {{{impact}}}{{/if}}
{{#if tools}}Tools Used: {{#each tools}}- {{{this}}}\n{{/each}}{{/if}}
{{#if outcomes}}Outcomes: {{{outcomes}}}{{/if}}
{{#if challenges}}Challenges: {{{challenges}}}{{/if}}
{{#if whatWasLearned}}What was learned: {{{whatWasLearned}}}{{/if}}

Instructions:
1.  **Intelligence Brief (2-3 sentences):** Provide a highly condensed summary, focusing on the core objective, outcome, and primary technical domain. Use terminology suitable for a 'mission log' entry (e.g., 'mission parameters', 'operational success', 'threat mitigation').
2.  **Technical Narrative (2-3 paragraphs):** Develop a compelling story that elaborates on the technical aspects. Describe the problem, your role, the technical solutions implemented, challenges faced, and the specific impact or results achieved. Emphasize the technical methodologies and tools.

Ensure the output is directly in JSON format matching the schema { "intelligenceBrief": "...", "technicalNarrative": "..." } without any additional text or formatting.
`,
});

const projectBriefGeneratorFlow = ai.defineFlow(
  {
    name: 'projectBriefGeneratorFlow',
    inputSchema: ProjectBriefGeneratorInputSchema,
    outputSchema: ProjectBriefGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await projectBriefPrompt(input);
    return output!;
  }
);
