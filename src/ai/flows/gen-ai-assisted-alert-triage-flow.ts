
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenAIAssistedAlertTriageInputSchema = z.object({
  userName: z.string(),
  deviceName: z.string(),
  alertTimestamp: z.string(),
  triggerType: z.string().describe('The cause of the alert (e.g., Fall, Voice, Button)'),
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  sensorSnapshot: z.object({
    heartRate: z.number(),
    accelMagnitude: z.number(),
  }),
  locationHistory: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string(),
  })),
  accessibilityMode: z.string().optional(),
});
export type GenAIAssistedAlertTriageInput = z.infer<typeof GenAIAssistedAlertTriageInputSchema>;

const GenAIAssistedAlertTriageOutputSchema = z.object({
  summary: z.string(),
  recommendedAction: z.string(),
  urgencyLevel: z.enum(['Low', 'Medium', 'High', 'Critical']),
  riskAnalysis: z.string(),
  pwdContext: z.string().optional().describe('Contextual advice based on user accessibility needs.'),
});
export type GenAIAssistedAlertTriageOutput = z.infer<typeof GenAIAssistedAlertTriageOutputSchema>;

export async function genAIAssistedAlertTriage(input: GenAIAssistedAlertTriageInput): Promise<GenAIAssistedAlertTriageOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: `Act as an Emergency Dispatch Expert for a safety watch. 
    Analyze the following incident:
    - User: ${input.userName}
    - Trigger: ${input.triggerType}
    - Heart Rate: ${input.sensorSnapshot.heartRate} BPM
    - Fall Force: ${input.sensorSnapshot.accelMagnitude}G
    - Mode: ${input.accessibilityMode || 'Standard'}
    - Location: ${input.currentLocation.latitude}, ${input.currentLocation.longitude}
    
    Provide a triage summary, risk analysis, urgency level, and recommended actions. 
    If a PWD mode is active, include specific instructions for responders (e.g., "User is Deaf, use visual signals").`,
    output: { schema: GenAIAssistedAlertTriageOutputSchema }
  });
  return output!;
}
