'use server';
/**
 * @fileOverview An AI agent for triaging emergency alerts.
 *
 * - genAIAssistedAlertTriage - A function that handles the AI-powered alert triage process.
 * - GenAIAssistedAlertTriageInput - The input type for the genAIAssistedAlertTriage function.
 * - GenAIAssistedAlertTriageOutput - The return type for the genAIAssistedAlertTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenAIAssistedAlertTriageInputSchema = z.object({
  locationHistory: z.array(z.object({
    latitude: z.number().describe('Latitude of the location point.'),
    longitude: z.number().describe('Longitude of the location point.'),
    timestamp: z.string().describe('Timestamp of the location point in ISO format.'),
  })).describe('A chronological list of recent location points for the device.'),
  currentLocation: z.object({
    latitude: z.number().describe('Latitude of the current location.'),
    longitude: z.number().describe('Longitude of the current location.'),
    timestamp: z.string().describe('Timestamp of the current location in ISO format.'),
  }).describe('The current location and timestamp of the device when the alert was triggered.'),
  alertTimestamp: z.string().describe('The timestamp when the alert was triggered in ISO format.'),
  audioSnippetDataUri: z
    .string()
    .optional()
    .describe(
      "An audio snippet related to the alert, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  deviceName: z.string().describe('The name or ID of the device that triggered the alert.'),
  userName: z.string().describe('The name of the user associated with the device.'),
  safeZones: z
    .array(
      z.object({
        name: z.string().describe('Name of the safe zone.'),
        latitude: z.number().describe('Latitude of the safe zone center.'),
        longitude: z.number().describe('Longitude of the safe zone center.'),
        radiusKm: z.number().describe('Radius of the safe zone in kilometers.'),
      })
    )
    .optional()
    .describe('Optional list of predefined safe zones.'),
  dangerAreas: z
    .array(
      z.object({
        name: z.string().describe('Name of the danger area.'),
        latitude: z.number().describe('Latitude of the danger area center.'),
        longitude: z.number().describe('Longitude of the danger area center.'),
        radiusKm: z.number().describe('Radius of the danger area in kilometers.'),
      })
    )
    .optional()
    .describe('Optional list of predefined danger areas.'),
});
export type GenAIAssistedAlertTriageInput = z.infer<typeof GenAIAssistedAlertTriageInputSchema>;

// Output Schema
const GenAIAssistedAlertTriageOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the incident, including key contextual details.'),
  recommendedAction: z.string().describe('A prioritized recommended response action for emergency responders.'),
  urgencyLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The calculated urgency level of the alert.'),
  locationRiskAssessment: z.string().describe('An assessment of the location risk, considering safe zones, danger areas, and recent movement patterns.'),
  audioAnalysis: z.string().optional().describe('Analysis of the transmitted audio snippet, if available. Describe any detected sounds or speech. If no audio, this field should be empty.'),
});
export type GenAIAssistedAlertTriageOutput = z.infer<typeof GenAIAssistedAlertTriageOutputSchema>;

// Internal Prompt Input Schema for pre-formatted data
const GenAIAssistedAlertTriagePromptInputSchema = GenAIAssistedAlertTriageInputSchema.extend({
  formattedLocationHistory: z.string().describe('Pre-formatted string of location history for the prompt.'),
  formattedSafeZones: z.string().optional().describe('Pre-formatted string of safe zones for the prompt.'),
  formattedDangerAreas: z.string().optional().describe('Pre-formatted string of danger areas for the prompt.'),
});

// Prompt Definition
const alertTriagePrompt = ai.definePrompt({
  name: 'alertTriagePrompt',
  input: { schema: GenAIAssistedAlertTriagePromptInputSchema },
  output: { schema: GenAIAssistedAlertTriageOutputSchema },
  prompt: `You are an AI assistant specialized in emergency alert triage for a Women Safety Smart Watch system named 'Guardian Beacon Dashboard'.
Your task is to analyze incoming alert data and provide a comprehensive summary, a location risk assessment, an urgency level, and a prioritized recommended response action for emergency responders.

Here is the incident data:
- User Name: {{{userName}}}
- Device Name: {{{deviceName}}}
- Alert Triggered At: {{{alertTimestamp}}}
- Current Location: Latitude {{{currentLocation.latitude}}}, Longitude {{{currentLocation.longitude}}}, Timestamp {{{currentLocation.timestamp}}}

---
Location History:
{{{formattedLocationHistory}}}
---

{{#if formattedSafeZones}}
Safe Zones:
{{{formattedSafeZones}}}
{{/if}}

{{#if formattedDangerAreas}}
Danger Areas:
{{{formattedDangerAreas}}}
{{/if}}

{{#if audioSnippetDataUri}}
Audio Snippet: {{media url=audioSnippetDataUri}}
Analyze the audio snippet for any sounds, speech, or indicators of distress.
{{/if}}

Based on the provided information:
1.  **Summarize the incident**: Provide a concise summary of the situation.
2.  **Assess Location Risk**: Analyze the current location in relation to the location history, safe zones, and danger areas to determine the risk level of the location.
3.  **Determine Urgency Level**: Assign an urgency level ('Low', 'Medium', 'High', 'Critical') to the alert.
4.  **Recommend Response Action**: Suggest a prioritized response action for emergency responders.
5.  **Analyze Audio (if present)**: If an audio snippet is provided, analyze its content and describe any relevant findings in the 'audioAnalysis' field. If no audio, leave 'audioAnalysis' empty.

Ensure your output strictly adheres to the JSON schema provided, populating all required fields. The 'audioAnalysis' field is optional and should only be present if an audio snippet is provided.
`
});

// Flow Definition
const genAIAssistedAlertTriageFlow = ai.defineFlow(
  {
    name: 'genAIAssistedAlertTriageFlow',
    inputSchema: GenAIAssistedAlertTriageInputSchema,
    outputSchema: GenAIAssistedAlertTriageOutputSchema,
  },
  async (input) => {
    // Pre-process location history for better prompt readability
    const formattedLocationHistory = input.locationHistory
      .map(
        (loc) =>
          `- Lat: ${loc.latitude}, Lon: ${loc.longitude}, Time: ${loc.timestamp}`
      )
      .join('\n');

    // Pre-process safe zones
    const formattedSafeZones = input.safeZones
      ?.map(
        (zone) =>
          `- ${zone.name} (Lat: ${zone.latitude}, Lon: ${zone.longitude}, Radius: ${zone.radiusKm}km)`
      )
      .join('\n');

    // Pre-process danger areas
    const formattedDangerAreas = input.dangerAreas
      ?.map(
        (area) =>
          `- ${area.name} (Lat: ${area.latitude}, Lon: ${area.longitude}, Radius: ${area.radiusKm}km)`
      )
      .join('\n');

    const promptInput = {
      ...input,
      formattedLocationHistory,
      formattedSafeZones,
      formattedDangerAreas,
    };

    const { output } = await alertTriagePrompt(promptInput);
    return output!;
  }
);

export async function genAIAssistedAlertTriage(
  input: GenAIAssistedAlertTriageInput
): Promise<GenAIAssistedAlertTriageOutput> {
  return genAIAssistedAlertTriageFlow(input);
}
