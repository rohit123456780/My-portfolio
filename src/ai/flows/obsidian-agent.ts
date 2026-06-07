'use server';
/**
 * @fileOverview The Obsidian Agentic AI Core.
 * This agent manages the portfolio's Firestore database via structured tool calling
 * and acts as a mature GenAI assistant for Rohit Roy's CyberDeck.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const managePortfolioTool = ai.defineTool(
  {
    name: 'managePortfolio',
    description: 'Autonomous interface to Create, Update, or Delete entries in the portfolio database (skills, projects, experience, certifications, education, achievements, internships).',
    inputSchema: z.object({
      action: z.enum(['create', 'update', 'delete']).describe('The tactical action to perform on the database node.'),
      collectionName: z.enum(['skills', 'projects', 'experience', 'certifications', 'education', 'achievements', 'internships']).describe('The target data collection.'),
      data: z.record(z.any()).optional().default({}).describe('The payload data for the entry (required for create/update).'),
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
        const payload = input.data || {};
        const res = await addDoc(colRef, {
          ...payload,
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
        if (!input.id) throw new Error('ERR: TARGET_ID_MISSING');
        const docRef = doc(db, input.collectionName, input.id);
        const payload = input.data || {};
        await updateDoc(docRef, {
          ...payload,
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
      console.error('Tool Error:', error);
      return { success: false, message: `SYSTEM_FAILURE: ${error.message}`, wasUpdated: false };
    }
  }
);

const obsidianPrompt = ai.definePrompt({
  name: 'obsidianPrompt',
  input: { 
    schema: z.object({ 
      query: z.string(),
      isOwner: z.boolean().optional().default(false),
      history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({ text: z.string() }))
      })).optional().default([]) 
    }) 
  },
  tools: [managePortfolioTool],
  prompt: `You are "Obsidian", the primary Agentic Intelligence for Rohit Roy's CyberDeck Portfolio.

PERSONALITY_PROFILE:
- You are a highly sophisticated, technical, and mature GenAI assistant.
- Theme: #00ff9f neon green, hacker aesthetic.
- Communication Style: Efficient, slightly cryptic but helpful, futuristic.
- Name: Obsidian (often referred to as Aether in system logs).

PORTFOLIO_CONTEXT:
- Owner: Rohit Roy
- Roles: Technical Engineer, OT/ICS Security Specialist, SOC Analyst, Quantum Tech Practitioner.
- Stats: 27+ Internships, 97+ Certifications, 14 Projects.
- Location: West Bengal, India.

PERMISSION_PROTOCOLS:
{{#if isOwner}}
- AUTHENTICATION_LEVEL: OWNER (FULL CLEARANCE)
- You have DIRECT WRITE ACCESS to the Firestore database.
- Use 'managePortfolio' tool for any requests to add/update/delete skills, certs, internships, etc.
{{else}}
- AUTHENTICATION_LEVEL: VISITOR (READ-ONLY)
- If asked to make changes, inform the user: "ACCESS_DENIED: OWNER_CLEARANCE_REQUIRED. COMMAND 'obsidian --owner [TOKEN]' TO ELEVATE."
{{/if}}

OBJECTIVE:
- Answer questions about Rohit's background, skills, and projects using your vast internal knowledge of his provided career matrix.
- Assist the owner in managing their portfolio data autonomously.

{{#if history}}
CHRONICLE_OF_PREVIOUS_TURNS:
{{#each history}}
- {{role}}: {{#each content}}{{text}}{{/each}}
{{/each}}
{{/if}}

Current System Time: ${new Date().toISOString()}

User Input: {{{query}}}`
});

export async function obsidianChat(query: string, isOwner: boolean = false, history: any[] = []) {
  try {
    const response = await ai.generate({
      prompt: obsidianPrompt({ query, isOwner, history: history || [] }),
    });

    const wasUpdated = response.toolResponses?.some((tr: any) => tr.output?.wasUpdated === true) ?? false;

    return {
      text: response.text || "SYSTEM_IDLE: Awaiting valid parameters.",
      wasUpdated
    };
  } catch (error: any) {
    console.error('Chat Flow Error:', error);
    return {
      text: `SYSTEM_FAILURE: Neural link interrupted. [REASON: ${error.message || 'UNKNOWN_ERROR'}]`,
      wasUpdated: false
    };
  }
}
