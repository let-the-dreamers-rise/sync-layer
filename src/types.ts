import type { LucideIcon } from "lucide-react";

export type TabId =
  | "overview"
  | "propagation"
  | "schemas"
  | "conflicts"
  | "audit"
  | "health"
  | "guide";

export type SyncDirection = "SWS to Department" | "Department to SWS";
export type SyncStatus = "Synced" | "Queued" | "Conflict" | "Retrying" | "Failed";
export type SystemMode = "API" | "Webhook" | "Polling" | "Snapshot";
export type ConnectorStatus = "Healthy" | "Lagging" | "Degraded" | "Offline";
export type Tone = "green" | "amber" | "red" | "blue" | "violet" | "neutral";

export interface NavItem {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  description: string;
}

export interface ServiceRequest {
  id: string;
  ubid: string;
  businessName: string;
  service: string;
  district: string;
  source: string;
  target: string;
  direction: SyncDirection;
  status: SyncStatus;
  priority: "Standard" | "High" | "Critical";
  operationId: string;
  updatedAt: string;
  latencyMs: number;
  attempts: number;
  version: number;
  departmentRef: string;
  timeline: Array<{
    label: string;
    time: string;
    state: "complete" | "active" | "blocked";
  }>;
  payload: {
    canonical: Record<string, string>;
    source: Record<string, string>;
    target: Record<string, string>;
  };
}

export interface DepartmentSystem {
  id: string;
  name: string;
  owner: string;
  mode: SystemMode;
  status: ConnectorStatus;
  health: number;
  lag: string;
  throughput: number;
  queueDepth: number;
  lastHeartbeat: string;
  policy: string;
  coverage: string[];
}

export interface ConflictRecord {
  id: string;
  ubid: string;
  businessName: string;
  field: string;
  swsValue: string;
  departmentValue: string;
  detectedAt: string;
  sources: string[];
  policy: "Source priority" | "Field-level merge" | "Last-write-wins";
  recommendation: string;
  risk: "Low" | "Medium" | "High";
  reversible: boolean;
}

export interface SchemaMap {
  id: string;
  department: string;
  service: string;
  freshness: string;
  coverage: number;
  fields: Array<{
    canonical: string;
    sws: string;
    department: string;
    rule: string;
    required: boolean;
  }>;
}

export interface AuditEvent {
  id: string;
  operationId: string;
  ubid: string;
  route: string;
  timestamp: string;
  actor: string;
  action: string;
  result: "Committed" | "Queued" | "Replayed" | "Conflict logged" | "Dead-lettered";
  before: string;
  after: string;
}

export interface GuideSection {
  title: string;
  summary: string;
  signals: string[];
  actions: string[];
}
