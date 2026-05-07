import { Download, FileCheck2, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { auditEvents } from "../data/syncData";
import type { AuditEvent } from "../types";

const resultTone: Record<AuditEvent["result"], "green" | "blue" | "amber" | "red" | "violet"> = {
  Committed: "green",
  Queued: "blue",
  Replayed: "violet",
  "Conflict logged": "amber",
  "Dead-lettered": "red",
};

export function AuditLedger() {
  const [query, setQuery] = useState("");
  const [resultFilter, setResultFilter] = useState<AuditEvent["result"] | "All">("All");
  const [selectedId, setSelectedId] = useState(auditEvents[0].id);
  const [packetReady, setPacketReady] = useState(false);

  const filteredEvents = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return auditEvents.filter((event) => {
      const matchesResult = resultFilter === "All" || event.result === resultFilter;
      const matchesQuery =
        !lowerQuery ||
        event.ubid.toLowerCase().includes(lowerQuery) ||
        event.operationId.toLowerCase().includes(lowerQuery) ||
        event.route.toLowerCase().includes(lowerQuery);
      return matchesResult && matchesQuery;
    });
  }, [query, resultFilter]);

  const selectedEvent =
    filteredEvents.find((event) => event.id === selectedId) ??
    auditEvents.find((event) => event.id === selectedId) ??
    auditEvents[0];

  return (
    <section className="view-grid audit-grid">
      <div className="panel audit-filters">
        <div className="section-heading">
          <div>
            <p className="eyeline">Trace filters</p>
            <h3>Find evidence</h3>
          </div>
          <Filter size={21} />
        </div>

        <label className="field-control">
          <span>Search ledger</span>
          <div className="input-shell">
            <Search size={16} />
            <input
              type="search"
              placeholder="UBID, route, operation ID"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </label>

        <div className="control-block">
          <span>Result</span>
          <div className="chip-group vertical">
            {(["All", "Committed", "Queued", "Replayed", "Conflict logged", "Dead-lettered"] as const).map((result) => (
              <button
                className={resultFilter === result ? "chip active" : "chip"}
                key={result}
                type="button"
                onClick={() => setResultFilter(result)}
              >
                {result}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel audit-list-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">{filteredEvents.length} ledger entries</p>
            <h3>Propagation history</h3>
          </div>
          <FileCheck2 size={21} />
        </div>

        <div className="audit-list">
          {filteredEvents.map((event) => (
            <button
              className={event.id === selectedEvent.id ? "audit-row active" : "audit-row"}
              key={event.id}
              type="button"
              onClick={() => {
                setSelectedId(event.id);
                setPacketReady(false);
              }}
            >
              <span>
                <strong>{event.action}</strong>
                <small>{event.timestamp}</small>
              </span>
              <span>{event.route}</span>
              <StatusPill label={event.result} tone={resultTone[event.result]} />
            </button>
          ))}
        </div>
      </div>

      <aside className="panel audit-detail">
        <div className="section-heading">
          <div>
            <p className="eyeline">Audit packet</p>
            <h3>{selectedEvent.operationId}</h3>
          </div>
          <StatusPill label={selectedEvent.result} tone={resultTone[selectedEvent.result]} />
        </div>

        <dl className="detail-grid">
          <div>
            <dt>UBID</dt>
            <dd>{selectedEvent.ubid}</dd>
          </div>
          <div>
            <dt>Actor</dt>
            <dd>{selectedEvent.actor}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{selectedEvent.route}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{selectedEvent.timestamp}</dd>
          </div>
        </dl>

        <div className="before-after">
          <div>
            <span>Before</span>
            <p>{selectedEvent.before}</p>
          </div>
          <div>
            <span>After</span>
            <p>{selectedEvent.after}</p>
          </div>
        </div>

        <button className="button primary full" type="button" onClick={() => setPacketReady(true)}>
          <Download size={16} />
          Prepare Evidence Packet
        </button>

        {packetReady ? (
          <div className="inline-success">
            <FileCheck2 size={17} />
            Packet ready with payload diff, route metadata, and replay references.
          </div>
        ) : null}
      </aside>
    </section>
  );
}
