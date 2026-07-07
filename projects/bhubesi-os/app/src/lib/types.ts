export interface ChatMessage {
  id: string;
  role: "user" | "seat";
  text: string;
  ts: number;
}
