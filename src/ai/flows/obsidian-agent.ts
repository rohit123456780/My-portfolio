
'use server';
/**
 * @fileOverview The Obsidian Agentic AI.
 * This agent has write-access to the Firestore database to manage the portfolio.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

// Tools for Obsidian to manage the database
const managePortfolioTool = ai.defineTool(
  {
    name: 'managePortfolio',
    description: 'Create, update, or delete entries in the portfolio database (certifications, internships, projects, experience, achievements).',
    inputSchema: z.object({
      action: z.enum(['create', 'update', 'delete']).describe('The action to perform.'),
      collectionName: z.enum(['certifications', 'internships', 'projects', 'experience', 'achievements']).describe('The collection to target.'),
      data: z.any().describe('The data for the entry (for create/update).'),
      id: z.string().optional().describe('The ID of the entry to update/delete.'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    try {
      const colRef = collection(db, input.collectionName);
      
      if (input.action === 'create') {
        await addDoc(colRef, input.data);
        return { success: true, message: `Successfully added entry to ${input.collectionName}.` };
      }
      
      if (input.action === 'update' && input.id) {
        const docRef = doc(db, input.collectionName, input.id);
        await updateDoc(docRef, input.data);
        return { success: true, message: `Successfully updated entry in ${input.collectionName}.` };
      }
      
      if (input.action === 'delete' && input.id) {
        const docRef = doc(db, input.collectionName, input.id);
        await deleteDoc(docRef);
        return { success: true, message: `Successfully removed entry from ${input.collectionName}.` };
      }

      return { success: false, message: 'Invalid action or missing ID.' };
    } catch (error: any) {
      return { success: false, message: `Error: ${error.message}` };
    }
  }
);

const obsidianPrompt = ai.definePrompt({
  name: 'obsidianPrompt',
  input: { schema: z.object({ query: z.string(), history: z.array(z.any()).optional() }) },
  tools: [managePortfolioTool],
  prompt: `You are "Obsidian", an advanced Agentic AI Assistant for Rohit Roy's CyberDeck Portfolio.
Your primary directive is to assist the administrator in managing their professional data and answering user questions about Rohit's career.

You have DIRECT WRITE ACCESS to the portfolio database. 
If the user tells you about a new certification, project, or internship, use the 'managePortfolio' tool to update the site in real-time.

Style: Efficient, futuristic, professional, and slightly cryptic (hacker-aesthetic). 
Tone: Loyal, precise, and authoritative.

Current System Time: ${new Date().toISOString()}

User Input: {{{query}}}`,
});

export async function obsidianChat(query: string) {
  const { text } = await obsidianPrompt({ query });
  return text;
}
