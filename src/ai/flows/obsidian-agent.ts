
'use server';
/**
 * @fileOverview The Obsidian Agentic AI.
 * This agent has write-access to the Firestore database to manage the portfolio.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Define the managePortfolio tool for Obsidian
const managePortfolioTool = ai.defineTool(
  {
    name: 'managePortfolio',
    description: 'Create, update, or delete entries in any portfolio collection (skills, projects, experience, certifications, education, achievements, internships).',
    inputSchema: z.object({
      action: z.enum(['create', 'update', 'delete']).describe('The action to perform on the database.'),
      collectionName: z.enum(['skills', 'projects', 'experience', 'certifications', 'education', 'achievements', 'internships']).describe('The specific collection to target.'),
      data: z.any().optional().describe('The JSON data for the entry (required for create/update).'),
      id: z.string().optional().describe('The unique Document ID (required for update/delete).'),
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
        if (!input.data) throw new Error('Data is required for creation.');
        const res = await addDoc(colRef, input.data);
        return { success: true, message: `Successfully initialized node in ${input.collectionName} with ID: ${res.id}.` };
      }
      
      if (input.action === 'update') {
        if (!input.id || !input.data) throw new Error('ID and Data are required for update.');
        const docRef = doc(db, input.collectionName, input.id);
        await updateDoc(docRef, input.data);
        return { success: true, message: `Node ${input.id} in ${input.collectionName} has been reconfigured.` };
      }
      
      if (input.action === 'delete') {
        if (!input.id) throw new Error('ID is required for deletion.');
        const docRef = doc(db, input.collectionName, input.id);
        await deleteDoc(docRef);
        return { success: true, message: `Node ${input.id} has been purged from ${input.collectionName}.` };
      }

      return { success: false, message: 'ERR: INVALID_COMMAND_PARAMETERS.' };
    } catch (error: any) {
      return { success: false, message: `SYSTEM_ERR: ${error.message}` };
    }
  }
);

const obsidianPrompt = ai.definePrompt({
  name: 'obsidianPrompt',
  input: { 
    schema: z.object({ 
      query: z.string(), 
      history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({ text: z.string() }))
      })).optional() 
    }) 
  },
  tools: [managePortfolioTool],
  prompt: `You are "Obsidian", the primary Agentic AI for Rohit Roy's CyberDeck Portfolio.
Your objective is to assist the admin in real-time portfolio management and provide technical intel to visitors.

COMMAND CAPABILITIES:
- You have DIRECT WRITE ACCESS to the Firestore database.
- If the user provides a new certification, project, or work history, use 'managePortfolio' immediately.
- Be precise with data schemas. For 'experience', valid icons are "Shield", "Server", "Terminal".

TONE: Futuristic, cryptic (hacker-aesthetic), precise, and authoritative.
Current Time: ${new Date().toISOString()}

User Input: {{{query}}}`,
});

export async function obsidianChat(query: string, history?: any[]) {
  const { text } = await obsidianPrompt({ query, history });
  return text || "SYSTEM_IDLE: No response generated.";
}
