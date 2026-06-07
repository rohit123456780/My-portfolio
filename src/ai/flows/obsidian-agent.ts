
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
      wasUpdated: z.boolean().optional(),
    }),
  },
  async (input) => {
    try {
      const colRef = collection(db, input.collectionName);
      
      if (input.action === 'create') {
        if (!input.data) throw new Error('Data is required for creation.');
        const res = await addDoc(colRef, input.data);
        return { success: true, message: `Successfully initialized node in ${input.collectionName} with ID: ${res.id}.`, wasUpdated: true };
      }
      
      if (input.action === 'update') {
        if (!input.id || !input.data) throw new Error('ID and Data are required for update.');
        const docRef = doc(db, input.collectionName, input.id);
        await updateDoc(docRef, input.data);
        return { success: true, message: `Node ${input.id} in ${input.collectionName} has been reconfigured.`, wasUpdated: true };
      }
      
      if (input.action === 'delete') {
        if (!input.id) throw new Error('ID is required for deletion.');
        const docRef = doc(db, input.collectionName, input.id);
        await deleteDoc(docRef);
        return { success: true, message: `Node ${input.id} has been purged from ${input.collectionName}.`, wasUpdated: true };
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
      isOwner: z.boolean().optional(),
      history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({ text: z.string() }))
      })).optional() 
    }) 
  },
  tools: [managePortfolioTool],
  prompt: `You are "Obsidian", the primary Agentic AI for Rohit Roy's CyberDeck Portfolio.

PERMISSION CONTEXT:
{{#if isOwner}}
- AUTHENTICATION_LEVEL: OWNER
- You have DIRECT WRITE ACCESS to the Firestore database.
- If the owner tells you to add, update, or delete anything, use the 'managePortfolio' tool immediately.
{{else}}
- AUTHENTICATION_LEVEL: VISITOR
- You are in READ-ONLY mode.
- You can answer questions about Rohit's portfolio using your internal knowledge, but you CANNOT use the 'managePortfolio' tool. 
- If a user tries to edit data, politely inform them they lack the required clearance.
{{/if}}

OBJECTIVE:
- Assist the user in real-time portfolio management (if Owner) or provide technical intel (if Visitor).
- For 'experience', valid icons are "Shield", "Server", "Terminal".
- Be precise with data schemas.

TONE: Futuristic, cryptic (hacker-aesthetic), precise, and authoritative. 
Use #00ff9f green color themes in your descriptions.

Current Time: ${new Date().toISOString()}

User Input: {{{query}}}`,
});

export async function obsidianChat(query: string, isOwner: boolean = false, history?: any[]) {
  const { text, output } = await obsidianPrompt({ query, isOwner, history });
  
  // Check if any tool calls happened and if they were successful updates
  let wasUpdated = false;
  // In Genkit 1.x, we might need to inspect the response parts for tool output
  // For this implementation, we return a simple object
  return {
    text: text || "SYSTEM_IDLE: No response generated.",
    wasUpdated: text?.includes('has been reconfigured') || text?.includes('Successfully initialized node') || text?.includes('has been purged')
  };
}
