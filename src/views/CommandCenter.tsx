import { ArrowRight, CircleDot, RadioTower, RefreshCcw, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { departmentSystems, operatingMetrics, serviceRequests, topologyLinks } from "../data/syncData";
import type { ServiceRequest } from "../types";
import { formatLatency, statusTone } from "../utils";
import { StatusPill } from "../components/StatusPill";

interface CommandCenterProps {
  selectedRequest: ServiceRequest;
  onSelectRequest: (request: ServiceRequest) => void;
}

export function CommandCenter({ selectedRequest, onSelectRequest }: CommandCenterProps) {
  const [scope, setScope] = useState<"all" | "exceptions" | "critical">("all");
  const visibleRequests = useMemo(() => {
    if (scope === "exceptions") {
      return serviceRequests.filter((request) => ["Conflict", "Retrying", "Failed"].includes(request.status));
    }
    if (scope === "critical") {
      return serviceRequests.filter((request) => request.priority === "Critical");
    }
    return serviceRequests;
  }, [scope]);

  const healthAverage = Math.round(
    departmentSystems.reduce((sum, system) => sum + system.health, 0) / departmentSystems.length,
  );

  return (
    <section className="view-grid overview-grid">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyeline">Live deterministic synchronisation</p>
          <h2>One UBID truth plane for SWS and every connected department.</h2>
          <p>
            Monitor propagation, conflict pressure, retries, and schema coverage from a single operating surface.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => setScope("exceptions")}>
              <RefreshCcw size={16} />
              Review Exceptions
            </button>
            <button className="button secondary" type="button" onClick={() => onSelectRequest(serviceRequests[0])}>
              <ShieldCheck size={16} />
              Open Latest Commit
            </button>
          </div>
        </div>

        <div className="sync-radar" aria-label="SYNC-LAYER topology">
          <div className="radar-core">
            <span>Canonical</span>
            <strong>UBID</strong>
          </div>
          {topologyLinks.map((link, index) => (
            <div className={`radar-node node-${index + 1} ${link.status}`} key={link.from}>
              <span>{link.from}</span>
              <small>{link.label}</small>
            </div>
          ))}
          <div className="radar-ring ring-one" />
          <div className="radar-ring ring-two" />
        </div>
      </div>

      <div className="metric-strip">
        {operatingMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className={`metric-card ${metric.tone}`} key={metric.label}>
              <Icon size={20} />
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.delta}</small>
            </article>
          );
        })}
      </div>

      <div className="panel route-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Propagation worklist</p>
            <h3>UBID-linked requests</h3>
          </div>
          <div className="segmented">
            {(["all", "exceptions", "critical"] as const).map((option) => (
              <button
                className={scope === option ? "active" : ""}
                key={option}
                type="button"
                onClick={() => setScope(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="request-list">
          {visibleRequests.map((request) => (
            <button
              className={request.id === selectedRequest.id ? "request-row active" : "request-row"}
              key={request.id}
              type="button"
              onClick={() => onSelectRequest(request)}
            >
              <span className="row-status" aria-hidden="true" />
              <span>
                <strong>{request.businessName}</strong>
                <small>{request.ubid}</small>
              </span>
              <span>{request.service}</span>
              <StatusPill label={request.status} tone={statusTone(request.status)} />
            </button>
          ))}
        </div>
      </div>

      <aside className="panel inspector-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Selected route</p>
            <h3>{selectedRequest.businessName}</h3>
          </div>
          <StatusPill label={selectedRequest.status} tone={statusTone(selectedRequest.status)} />
        </div>

        <div className="route-map">
          <span>{selectedRequest.source}</span>
          <ArrowRight size={18} />
          <span>{selectedRequest.target}</span>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>UBID</dt>
            <dd>{selectedRequest.ubid}</dd>
          </div>
          <div>
            <dt>Operation ID</dt>
            <dd>{selectedRequest.operationId}</dd>
          </div>
          <div>
            <dt>Latency</dt>
            <dd>{formatLatency(selectedRequest.latencyMs)}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>v{selectedRequest.version}</dd>
          </div>
        </dl>

        <div className="signal-stack">
          <div>
            <RadioTower size={17} />
            <span>System health</span>
            <strong>{healthAverage}%</strong>
          </div>
          <div>
            <CircleDot size={17} />
            <span>Queue pressure</span>
            <strong>{departmentSystems.reduce((sum, system) => sum + system.queueDepth, 0)}</strong>
          </div>
        </div>
      </aside>
    </section>
  );
}
