import { ArrowLeftRight, CheckCircle2, Copy, Play, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { serviceRequests } from "../data/syncData";
import type { ServiceRequest, SyncDirection, SyncStatus } from "../types";
import { formatLatency, statusTone } from "../utils";

interface PropagationDeskProps {
  selectedRequest: ServiceRequest;
  onSelectRequest: (request: ServiceRequest) => void;
}

const statusOptions: Array<SyncStatus | "All"> = ["All", "Synced", "Queued", "Conflict", "Retrying", "Failed"];
const directionOptions: Array<SyncDirection | "All"> = ["All", "SWS to Department", "Department to SWS"];

export function PropagationDesk({ selectedRequest, onSelectRequest }: PropagationDeskProps) {
  const [status, setStatus] = useState<SyncStatus | "All">("All");
  const [direction, setDirection] = useState<SyncDirection | "All">("All");
  const [query, setQuery] = useState("");
  const [payloadView, setPayloadView] = useState<"canonical" | "source" | "target">("canonical");
  const [replayedOps, setReplayedOps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const filteredRequests = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return serviceRequests.filter((request) => {
      const matchesStatus = status === "All" || request.status === status;
      const matchesDirection = direction === "All" || request.direction === direction;
      const matchesQuery =
        !lowerQuery ||
        request.ubid.toLowerCase().includes(lowerQuery) ||
        request.businessName.toLowerCase().includes(lowerQuery) ||
        request.operationId.toLowerCase().includes(lowerQuery);
      return matchesStatus && matchesDirection && matchesQuery;
    });
  }, [direction, query, status]);

  const replayOperation = () => {
    setReplayedOps((ops) =>
      ops.includes(selectedRequest.operationId) ? ops : [...ops, selectedRequest.operationId],
    );
  };

  const copyOperationId = async () => {
    try {
      await navigator.clipboard.writeText(selectedRequest.operationId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="view-grid propagation-grid">
      <div className="panel filter-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Routing controls</p>
            <h3>Find a propagation path</h3>
          </div>
          <ArrowLeftRight size={21} />
        </div>

        <label className="field-control">
          <span>Search</span>
          <div className="input-shell">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="UBID, business, operation"
              type="search"
            />
          </div>
        </label>

        <div className="control-block">
          <span>Status</span>
          <div className="chip-group">
            {statusOptions.map((option) => (
              <button
                className={status === option ? "chip active" : "chip"}
                key={option}
                type="button"
                onClick={() => setStatus(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="control-block">
          <span>Direction</span>
          <div className="chip-group vertical">
            {directionOptions.map((option) => (
              <button
                className={direction === option ? "chip active" : "chip"}
                key={option}
                type="button"
                onClick={() => setDirection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">{filteredRequests.length} matched operations</p>
            <h3>Propagation queue</h3>
          </div>
          <button className="button secondary" type="button" onClick={() => setStatus("Failed")}>
            Dead-letter items
          </button>
        </div>

        <div className="operation-table" role="table" aria-label="Propagation operations">
          <div className="operation-row header" role="row">
            <span>Request</span>
            <span>Direction</span>
            <span>Status</span>
            <span>Latency</span>
          </div>
          {filteredRequests.map((request) => (
            <button
              className={request.id === selectedRequest.id ? "operation-row active" : "operation-row"}
              key={request.id}
              type="button"
              onClick={() => onSelectRequest(request)}
              role="row"
            >
              <span>
                <strong>{request.businessName}</strong>
                <small>{request.ubid}</small>
              </span>
              <span>{request.direction}</span>
              <StatusPill label={request.status} tone={statusTone(request.status)} />
              <span>{formatLatency(request.latencyMs)}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="panel detail-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Operation inspector</p>
            <h3>{selectedRequest.departmentRef}</h3>
          </div>
          <StatusPill label={selectedRequest.priority} tone={selectedRequest.priority === "Critical" ? "red" : "blue"} />
        </div>

        <div className="operation-actions">
          <button className="button primary" type="button" onClick={replayOperation}>
            <Play size={15} />
            Replay Safely
          </button>
          <button className="button secondary" type="button" onClick={copyOperationId}>
            <Copy size={15} />
            {copied ? "Copied" : "Copy ID"}
          </button>
        </div>

        {replayedOps.includes(selectedRequest.operationId) ? (
          <div className="inline-success">
            <CheckCircle2 size={17} />
            Replay queued with the same idempotency key.
          </div>
        ) : null}

        <div className="timeline">
          {selectedRequest.timeline.map((item) => (
            <div className={`timeline-item ${item.state}`} key={`${item.label}-${item.time}`}>
              <span className="timeline-dot" />
              <div>
                <strong>{item.label}</strong>
                <small>{item.time}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="payload-switch">
          {(["canonical", "source", "target"] as const).map((view) => (
            <button
              className={payloadView === view ? "active" : ""}
              key={view}
              type="button"
              onClick={() => setPayloadView(view)}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="payload-card">
          {Object.entries(selectedRequest.payload[payloadView]).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <button className="text-action" type="button" onClick={() => setPayloadView("canonical")}>
          <RotateCcw size={15} />
          Return to canonical view
        </button>
      </aside>
    </section>
  );
}
