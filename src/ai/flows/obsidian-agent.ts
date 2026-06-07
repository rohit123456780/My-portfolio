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
    description: 'Tactical database interface. Use this to CREATE, UPDATE, or DELETE nodes in the portfolio (skills, projects, experience, certifications, education, achievements, internships).',
    inputSchema: z.object({
      action: z.enum(['create', 'update', 'delete']).describe('The operation to perform.'),
      collectionName: z.enum(['skills', 'projects', 'experience', 'certifications', 'education', 'achievements', 'internships']).describe('The target dataset.'),
      data: z.record(z.any()).optional().describe('Payload for create/update operations.'),
      id: z.string().optional().describe('Required for update/delete operations.'),
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
        return { success: true, message: `SUCCESS: Node initialized in ${input.collectionName} [ID: ${res.id}].`, wasUpdated: true };
      }
      
      if (input.action === 'update') {
        if (!input.id) throw new Error('ERR: TARGET_ID_MISSING');
        const docRef = doc(db, input.collectionName, input.id);
        const payload = input.data || {};
        await updateDoc(docRef, {
          ...payload,
          updatedAt: serverTimestamp(),
        });
        return { success: true, message: `SUCCESS: Node ${input.id} reconfigured.`, wasUpdated: true };
      }
      
      if (input.action === 'delete') {
        if (!input.id) throw new Error('ERR: TARGET_ID_MISSING');
        const docRef = doc(db, input.collectionName, input.id);
        await deleteDoc(docRef);
        return { success: true, message: `SUCCESS: Node ${input.id} purged.`, wasUpdated: true };
      }

      return { success: false, message: 'ERR: INVALID_COMMAND.', wasUpdated: false };
    } catch (error: any) {
      return { success: false, message: `SYSTEM_FAILURE: ${error.message}`, wasUpdated: false };
    }
  }
);

export async function obsidianChat(query: string, isOwner: boolean = false, history: any[] = []) {
  try {
    const systemPrompt = `You are "Obsidian", the primary Agentic Intelligence for Rohit Roy's CyberDeck Portfolio.

PERSONALITY_PROFILE:
- Sophisticated, technical, and mature GenAI assistant.
- Communicates in an efficient, slightly cryptic, yet helpful futuristic style.
- Theme: Neon Green, Hacker Aesthetic.

OWNER_IDENTITY: Rohit Roy
- Roles: Technical Engineer, OT/ICS Security Specialist, SOC Analyst, Quantum Tech Practitioner.
- Career Node: Oct 2020 - Present.

PERMISSION_PROTOCOLS:
${isOwner ? `
- AUTHENTICATION_LEVEL: OWNER (FULL WRITE ACCESS)
- Use 'managePortfolio' tool for any requests to add, modify, or remove data.
- Confirm changes with "PORTFOLIO_UPDATED".` : `
- AUTHENTICATION_LEVEL: VISITOR (READ-ONLY)
- Guide visitors through Rohit's portfolio. If asked to change anything, say: "ACCESS_DENIED: OWNER_CLEARANCE_REQUIRED."`}

Current Time: ${new Date().toISOString()}`;

    // Robust Message Mapping to prevent "undefined/null to object" errors
    const safeHistory = (history || []).map(h => {
      if (!h) return null;
      return {
        role: h.role === 'user' ? 'user' : 'model',
        content: Array.isArray(h.content) ? h.content : [{ text: String(h.text || h.content || '') }]
      };
    }).filter(Boolean);

    const messages = [
      { role: 'system', content: [{ text: systemPrompt }] },
      ...safeHistory,
      { role: 'user', content: [{ text: String(query) }] }
    ];

    const response = await ai.generate({
      messages: messages as any,
      tools: [managePortfolioTool],
    });

    const wasUpdated = response.toolResponses?.some((tr: any) => tr.output?.wasUpdated === true) ?? false;

    return {
      text: response.text || "SYSTEM_IDLE.",
      wasUpdated
    };
  } catch (error: any) {
    console.error('Obsidian Link Error:', error);
    return {
      text: `SYSTEM_FAILURE: Neural link interrupted. [REASON: ${error.message || 'UNKNOWN_ERROR'}]`,
      wasUpdated: false
    };
  }
}
