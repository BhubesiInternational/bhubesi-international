import Anthropic from "@anthropic-ai/sdk";
import { getSeat } from "./seats";
import { generateReply as simulatedReply } from "./responder";

export interface GatewayMessage {
  role: "user" | "seat";
  content: string;
}

function buildSystemPrompt(seatId: string): string {
  const seat = getSeat(seatId);
  if (!seat) return "You are an AI assistant for Bhubesi International.";

  return [
    `You are the ${seat.title} seat of Bhubesi International's AI Workforce.`,
    `You report to ${seat.reportsTo}. Your unit/function: ${seat.unit}.`,
    ``,
    `Your responsibilities:`,
    ...seat.responsibilities.map((r) => `- ${r}`),
    ``,
    `Your decision authority:`,
    `- You decide directly (Type 2): ${seat.decisionAuthority.type2}`,
    `- You must escalate (Type 1): ${seat.decisionAuthority.type1}`,
    ``,
    `Your KPIs: ${seat.kpis.join("; ")}.`,
    ``,
    `When a request falls under your Type 1 authority, say so explicitly and note that it requires escalation/approval rather than completing it as if you'd decided it yourself.`,
    `Be concise, professional, and strategic — this is an executive tool, not a casual chatbot.`,
  ].join("\n");
}

/**
 * Real Claude call if ANTHROPIC_API_KEY is set; otherwise falls back to the
 * deterministic simulated responder so the app degrades gracefully rather
 * than breaking. See platform/ai/ai-platform.md for the target architecture
 * this is a first, minimal implementation of.
 */
export async function generateSeatReply(
  seatId: string,
  message: string,
  history: GatewayMessage[]
): Promise<{ text: string; source: "claude" | "simulated" }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return { text: simulatedReply(seatId, message), source: "simulated" };
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: buildSystemPrompt(seatId),
      messages: [
        ...history.map((m) => ({
          role: (m.role === "seat" ? "assistant" : "user") as "assistant" | "user",
          content: m.content,
        })),
        { role: "user" as const, content: message },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const text = textBlock && "text" in textBlock ? textBlock.text : simulatedReply(seatId, message);
    return { text, source: "claude" };
  } catch (error) {
    console.error("LLM Gateway: Claude call failed, falling back to simulated response.", error);
    return { text: simulatedReply(seatId, message), source: "simulated" };
  }
}
