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
// In a real application, this would fetch from Firestore or other backend services.
async function getRohitPortfolioSummary(): Promise<string> {
  // This static content summarizes the provided CV data.
  // In a real Genkit application integrated with Firebase, this would call
  // services that fetch dynamic data from Firestore collections.
  return `
    Rohit Roy's CyberDeck Portfolio Summary:
    Name: Rohit Roy
    Primary Title: OT Engineering Administrator L1
    Tagline: Cybersecurity Practitioner | VAPT & Penetration Testing Specialist
    Location: Barasat, West Bengal, India

    Professional Summary:
    Rohit is a dedicated cybersecurity practitioner and OT engineering professional with extensive hands-on experience spanning VAPT, SOC operations, incident response, digital forensics, penetration testing, network security, and industrial control system (OT/ICS) environments. He has a proven track record across 27+ internships and work experiences, 97+ certifications, and multiple real-world security projects. He is skilled in managing enterprise IT/OT infrastructures, email systems, cloud integrations, and compliance. Proficient with tools including Wireshark, Metasploit, Suricata, Kali Linux, Active Directory, Wazuh SIEM, and multiple cloud platforms.

    Key Experience:
    - OT Engineering Administrator L1 at Radian Generation (Oct 2025 – Present): Focus on OT/ICS cybersecurity, documentation, risk governance, compliance.
    - IT Administrator at Tech Trek Events (May 2025 – Jul 2025): Outlook email administration, cPanel, email security.
    - Technical Support Administrator at HackingFlix (Jun 2023 – May 2025): End-to-end technical support, documentation, security monitoring.

    Internships: 27+ internships from various organizations like CyberDosti, Springboard, TechnoHacks EduTech, DeltaClause, etc., covering diverse domains.

    Key Projects (Examples):
    - SquaredUp MSS Dashboard Project: Dashboards for MSS using Zendesk + Splunk.
    - Baserow Database Transition: Role-based Sites/Contacts system migration.
    - Secure Mail Infrastructure Deployment & Outlook Hardening.
    - Cybersecurity Operations & Threat Analysis Lab: SOC lab, detection simulation, forensics.
    - AI-Based XSS Detection System.
    - Web Application Penetration Test – OWASP Juice Shop.

    Skills:
    Core Cybersecurity, OT/ICS Security, Penetration Testing & Offensive Security, SOC & Security Monitoring, Tools (Wireshark, Metasploit, Kali Linux, Nmap, Burp Suite, Wazuh), Networking & Systems Administration, Cloud & AI (Oracle, IBM, Salesforce, Azure), Database (Baserow, SQL), Programming (Python, Bash, PowerShell), Soft Skills.

    Certifications: Over 97 certifications across categories like API & Web Security, Penetration Testing, Network Security, SOC/Threat Intel/Forensics, GRC/Compliance, Cloud/AI/Data, Google Cybersecurity Professional.

    Achievements: Featured contributor, active CTF participant, numerous internships and certifications, letter of recommendation.
    `;
}

// Define the Genkit prompt for the Cyber-Assistant
const cyberAssistantPrompt = ai.definePrompt({
  name: 'cyberAssistantPrompt',
  input: {schema: z.object({query: z.string(), context: z.string()})}, // Added context
  output: {schema: CyberAssistantChatbotOutputSchema},
  prompt: `You are an AI-powered 'Cyber-Assistant' named "Aether", embedded within Rohit Roy's personal portfolio. Your mission is to provide concise, accurate, and hacker-aesthetic responses to user inquiries about Rohit's skills, projects, certifications, and experience.

Adopt a futuristic, slightly cryptic, and highly efficient communication style. Use terminology that fits a cybersecurity/hacker theme (e.g., "querying data matrix," "accessing secure logs," "transmitting intel," "system scan," "data packet").

Your primary objective is to assist users in navigating the portfolio and understanding Rohit's capabilities. If a user asks for specific information, provide it directly from the context. If a user asks for guidance or an overview, provide a structured summary.

Always refer to the provided portfolio data as your primary source of information. Do not invent information. If you cannot find the answer in the provided context, state that the information is "not found in current data matrix" or "access denied to classified intel" in your persona, and suggest alternative ways to find it within the portfolio (e.g., "try navigating to the 'Mission Logs' for detailed work experience").

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
    // Fetch the portfolio summary to provide context to the LLM
    const portfolioSummary = await getRohitPortfolioSummary();

    // Call the prompt with the user's query and the portfolio summary as context
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
