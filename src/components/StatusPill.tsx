import type { Tone } from "../types";

interface StatusPillProps {
  label: string;
  tone?: Tone;
}

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return <span className={`status-pill ${tone}`}>{label}</span>;
}
