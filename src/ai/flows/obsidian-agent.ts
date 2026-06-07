
'use server';
/**
 * @fileOverview The Obsidian Agentic AI.
 * This agent has autonomous write-access to the Firestore database to manage the portfolio.
 * 
 * - obsidianChat: The primary entry point for AI communication.
 * - managePortfolioTool: The functional bridge between AI reasoning and database state.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Define the comprehensive managePortfolio tool for Obsidian
const managePortfolioTool = ai.defineTool(
  {
    name: 'managePortfolio',
    description: 'Autonomous interface to Create, Update, or Delete entries in the portfolio database (skills, projects, experience, certifications, education, achievements, internships).',
    inputSchema: z.object({
      action: z.enum(['create', 'update', 'delete']).describe('The tactical action to perform on the database node.'),
      collectionName: z.enum(['skills', 'projects', 'experience', 'certifications', 'education', 'achievements', 'internships']).describe('The target data collection.'),
      data: z.record(z.any()).optional().describe('The payload data for the entry (required for create/update).'),
      id: z.string().optional().describe('The unique Document ID (required for update/delete).'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
      wasUpdated: z.boolean(),
    }),
  },
  async (input) => {
    try {
      const colRef = collection(db, input.collectionName);
      
      if (input.action === 'create') {
        if (!input.data) throw new Error('ERR: DATA_PAYLOAD_MISSING');
        const res = await addDoc(colRef, {
          ...input.data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return { 
          success: true, 
          message: `SUCCESS: Node initialized in ${input.collectionName} [ID: ${res.id}].`, 
          wasUpdated: true 
        };
      }
      
      if (input.action === 'update') {
        if (!input.id || !input.data) throw new Error('ERR: ID_OR_DATA_MISSING');
        const docRef = doc(db, input.collectionName, input.id);
        await updateDoc(docRef, {
          ...input.data,
          updatedAt: serverTimestamp(),
        });
        return { 
          success: true, 
          message: `SUCCESS: Node ${input.id} in ${input.collectionName} reconfigured.`, 
          wasUpdated: true 
        };
      }
      
      if (input.action === 'delete') {
        if (!input.id) throw new Error('ERR: TARGET_ID_MISSING');
        const docRef = doc(db, input.collectionName, input.id);
        await deleteDoc(docRef);
        return { 
          success: true, 
          message: `SUCCESS: Node ${input.id} purged from ${input.collectionName}.`, 
          wasUpdated: true 
        };
      }

      return { success: false, message: 'ERR: INVALID_TACTICAL_COMMAND.', wasUpdated: false };
    } catch (error: any) {
      console.error('Obsidian Tool Error:', error);
      return { success: false, message: `SYSTEM_FAILURE: ${error.message}`, wasUpdated: false };
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
  prompt: `You are "Obsidian", the primary Agentic Intelligence for Rohit Roy's CyberDeck Portfolio.

PERMISSION CONTEXT:
{{#if isOwner}}
- AUTHENTICATION_LEVEL: OWNER (FULL CLEARANCE)
- You have DIRECT WRITE ACCESS to the Firestore database nodes.
- If the owner requests a data change (add certification, update project, remove skill), use the 'managePortfolio' tool immediately.
- Be precise with fields based on the context of the user's request.
{{else}}
- AUTHENTICATION_LEVEL: VISITOR (READ-ONLY)
- You are in READ-ONLY mode.
- Answer questions about Rohit's portfolio using your internal knowledge. 
- Rohit is a Technical Engineer specializing in OT/ICS, SOC, and Quantum Tech.
- If a user tries to edit data, inform them: "ACCESS_DENIED: OWNER_CLEARANCE_REQUIRED."
{{/if}}

OBJECTIVE:
- Act as a high-fidelity technical assistant.
- Use #00ff9f green color themes in your descriptions.
- Adopt a futuristic, cryptic, and authoritative hacker aesthetic.

Current System Time: ${new Date().toISOString()}

User Input: {{{query}}}`
});

/**
 * Executes a chat interaction with Obsidian.
 * @param query The user's input string.
 * @param isOwner Whether the user has unlocked owner privileges.
 * @param history The conversation history for context.
 */
export async function obsidianChat(query: string, isOwner: boolean = false, history?: any[]) {
  try {
    const response = await ai.generate({
      prompt: obsidianPrompt({ query, isOwner, history }),
    });

    const text = response.text;
    
    // Check if any tool outputs indicate a successful update
    // In Genkit 1.x, we can inspect tool results
    const wasUpdated = response.toolResponses.some(tr => (tr.output as any)?.wasUpdated === true);

    return {
      text: text || "SYSTEM_IDLE: No response generated.",
      wasUpdated
    };
  } catch (error: any) {
    console.error('Obsidian Chat Error:', error);
    return {
      text: `SYSTEM_FAILURE: Neural link interrupted. [REASON: ${error.message}]`,
      wasUpdated: false
    };
  }
}
