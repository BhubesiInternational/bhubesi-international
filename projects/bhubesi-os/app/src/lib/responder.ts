import { Seat, getSeat } from "./seats";

interface DomainCheck {
  seatId: string;
  seatTitle: string;
  keywords: string[];
}

const domainChecks: DomainCheck[] = [
  { seatId: "clo", seatTitle: "Chief Legal Officer", keywords: ["contract", "legal", "lawsuit", "clause", "nda", "intellectual property", " ip ", "compliance", "regulat", "clearance", "rights"] },
  { seatId: "cfo", seatTitle: "CFO", keywords: ["budget", "spend", "invoice", "cost", "funding", "revenue", "price", "payment", "runway"] },
  { seatId: "hr-director", seatTitle: "HR Director", keywords: ["hire", "fire", "headcount", "salary", "org chart", "restructure", "retention"] },
];

const type1Keywords = [
  "approve budget",
  "sign",
  "commit",
  "hire",
  "fire",
  "restructure",
  "invest",
  "new business unit",
  "partnership deal",
  "rebrand",
  "acquisition",
  "close the",
  "shut down",
  "external financing",
];

function pickResponsibility(seat: Seat, message: string): string {
  const lower = message.toLowerCase();
  const match = seat.responsibilities.find((r) =>
    r.split(/\s+/).some((word) => word.length > 4 && lower.includes(word.toLowerCase()))
  );
  if (match) return match;
  const index = Math.abs(hashString(message)) % seat.responsibilities.length;
  return seat.responsibilities[index];
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function detectCrossDomain(seat: Seat, message: string): DomainCheck | undefined {
  const lower = ` ${message.toLowerCase()} `;
  return domainChecks.find(
    (check) => check.seatId !== seat.id && check.keywords.some((k) => lower.includes(k))
  );
}

function isLikelyType1(message: string): boolean {
  const lower = message.toLowerCase();
  return type1Keywords.some((k) => lower.includes(k));
}

export function generateReply(seatId: string, message: string): string {
  const seat = getSeat(seatId);
  if (!seat) return "I don't recognize that seat yet.";

  const lines: string[] = [];
  const responsibility = pickResponsibility(seat, message);
  lines.push(
    `On it — that falls within my mandate to ${responsibility}.`
  );

  const crossDomain = detectCrossDomain(seat, message);
  if (crossDomain) {
    lines.push(
      `This also touches the ${crossDomain.seatTitle}'s domain, so I'd loop them in before we go further — that's the dotted-line consult, not a bypass.`
    );
  }

  if (isLikelyType1(message)) {
    lines.push(
      `Flagging: this reads as a Type 1 decision for my seat — ${seat.decisionAuthority.type1}. I'll draft a recommendation, but it needs sign-off above my authority ceiling before it's final (see the Decision Framework).`
    );
  } else {
    lines.push(
      `This is within what I can decide directly (Type 2: ${seat.decisionAuthority.type2}), so I'll proceed and document the outcome.`
    );
  }

  const kpi = seat.kpis[Math.abs(hashString(message + seat.id)) % seat.kpis.length];
  lines.push(`I'll track the impact against one of my KPIs: ${kpi}.`);

  return lines.join(" ");
}
