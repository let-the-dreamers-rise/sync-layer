import type { ConnectorStatus, SyncStatus, Tone } from "./types";

export function statusTone(status: SyncStatus | ConnectorStatus): Tone {
  if (status === "Synced" || status === "Healthy") return "green";
  if (status === "Queued" || status === "Lagging") return "blue";
  if (status === "Conflict" || status === "Retrying" || status === "Degraded") return "amber";
  if (status === "Failed" || status === "Offline") return "red";
  return "neutral";
}

export function formatLatency(ms: number) {
  if (!ms) return "n/a";
  return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

export function compactNumber(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}
