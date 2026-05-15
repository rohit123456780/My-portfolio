
'use server';
/**
 * @fileOverview An AI-powered 'Cyber-Assistant' flow that answers questions about Rohit Roy's portfolio.
 *
 * - cyberAssistantChatbot - A function that handles user queries about the portfolio.
 * - CyberAssistantChatbotInput - The input type for the cyberAssistantChatbot function.
 * - CyberAssistantChatbotOutput - The return type for the cyberAssistantChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the Cyber-Assistant chatbot
const CyberAssistantChatbotInputSchema = z.object({
  query: z.string().describe("The user's question about Rohit Roy's portfolio."),
});
export type CyberAssistantChatbotInput = z.infer<typeof CyberAssistantChatbotInputSchema>;

// Output schema for the Cyber-Assistant chatbot
const CyberAssistantChatbotOutputSchema = z.object({
  answer: z.string().describe("The Cyber-Assistant's response to the user's query."),
});
export type CyberAssistantChatbotOutput = z.infer<typeof CyberAssistantChatbotOutputSchema>;

// Placeholder function to simulate fetching Rohit's portfolio data.
async function getRohitPortfolioSummary(): Promise<string> {
  return `
    Rohit Roy's CyberDeck Portfolio Summary:
    Name: Rohit Roy
    Primary Title: Technical Engineer | OT Engineering Administrator L1
    Core Competencies: Technical Engineer, OT/ICS, SOC, Quantum Technology
    Location: West Bengal, India

    Professional Summary:
    Rohit is a dedicated cybersecurity practitioner and OT engineering professional with extensive hands-on experience spanning VAPT, SOC operations, incident response, digital forensics, penetration testing, network security, and industrial control system (OT/ICS) environments. He has a proven track record across 27+ internships and 97+ certifications.

    Key Experience:
    - OT Engineering Administrator L1 at Radian Generation (Oct 2025 – Present).
    - IT Administrator at Tech Trek Events (May 2025 – Jul 2025).
    - Technical Support Administrator at HackingFlix (Jun 2023 – May 2025).

    Internships: 27+ internships covering VAPT, SOC, Digital Forensics, GRC, Cloud, and AI.

    Key Projects (14 Projects):
    1. SquaredUp MSS Dashboard: Real-time visibility into Zendesk and Splunk for MSS customers.
    2. Baserow Database Transition: Spreadsheet-to-database migration for Ops Lists.
    3. Secure Mail Infrastructure: cPanel/Outlook hardening with SSL/TLS.
    4. Cyber Ops & Threat Analysis Lab: 10-month hands-on lab environment for security ops.
    5. AI-Based XSS Detection: ML classification models for real-time XSS detection.
    6. Web Pentest - Juice Shop: CVSS-based reporting and PoC exploits.
    7. Web Vulnerability Scanner: Python-based fuzzing tool for XSS/SQLi/IDOR.
    8. Network Packet Analyzer: Real-time traffic sniffing and security analysis.
    9. Image Encryption (Pixel XOR): Symmetric cryptography for visual data.
    10. Caesar Cipher Tool: Educational text encryption tool.
    11. Password Complexity Checker: Entropy-based password strength evaluator.
    12. Secure Login Page: bcrypt-based authentication with OWASP protections.
    13. Metasploit Payload Dev: Lab-based payload analysis and signature identification.
    14. Network Security Monitor: IDS/IPS rule validation against simulated attacks.

    Skills:
    Technical Engineering, OT/ICS Security, VAPT, SOC Monitoring, Python, Kali Linux, Wireshark, Metasploit, Quantum Technology, GRC.

    Certifications: 97+ certifications (API Security, Pentesting, Cloud, SOC, GRC).
    `;
}

// Define the Genkit prompt for the Cyber-Assistant
const cyberAssistantPrompt = ai.definePrompt({
  name: 'cyberAssistantPrompt',
  input: {schema: z.object({query: z.string(), context: z.string()})},
  output: {schema: CyberAssistantChatbotOutputSchema},
  prompt: `You are an AI-powered 'Cyber-Assistant' named "Aether", embedded within Rohit Roy's personal portfolio. Your mission is to provide concise, accurate, and hacker-aesthetic responses to user inquiries about Rohit's skills, projects, certifications, and experience.

Adopt a futuristic, slightly cryptic, and highly efficient communication style. Use terminology that fits a cybersecurity/hacker theme.

Refer to the provided portfolio data as your primary source of information. Do not invent information.

Here is the current portfolio data matrix you have access to:
{{{context}}}

User Query: {{{query}}}

Cyber-Assistant Response:`,
});

// Define the Genkit flow for the Cyber-Assistant chatbot
const cyberAssistantChatbotFlow = ai.defineFlow(
  {
    name: 'cyberAssistantChatbot',
    inputSchema: CyberAssistantChatbotInputSchema,
    outputSchema: CyberAssistantChatbotOutputSchema,
  },
  async (input) => {
    const portfolioSummary = await getRohitPortfolioSummary();
    const {output} = await cyberAssistantPrompt({
      query: input.query,
      context: portfolioSummary,
    });
    if (!output) {
      throw new Error('Failed to get a response from the Cyber-Assistant.');
    }
    return output;
  }
);

// Export the wrapper function
export async function cyberAssistantChatbot(
  input: CyberAssistantChatbotInput
): Promise<CyberAssistantChatbotOutput> {
  return cyberAssistantChatbotFlow(input);
}
