import { AlertTriangle, ArrowRight, Check, History, MessageSquareText, RotateCcw } from "lucide-react";
import { useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { conflicts } from "../data/syncData";

type ResolutionState = "open" | "accepted" | "review" | "held";

export function ConflictDesk() {
  const [selectedId, setSelectedId] = useState(conflicts[0].id);
  const [resolutionState, setResolutionState] = useState<Record<string, ResolutionState>>({});
  const selectedConflict = conflicts.find((conflict) => conflict.id === selectedId) ?? conflicts[0];
  const currentState = resolutionState[selectedConflict.id] ?? "open";

  const setResolution = (state: ResolutionState) => {
    setResolutionState((existing) => ({ ...existing, [selectedConflict.id]: state }));
  };

  return (
    <section className="view-grid conflict-grid">
      <div className="panel conflict-list-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Collision queue</p>
            <h3>Open conflicts</h3>
          </div>
          <AlertTriangle size={21} />
        </div>

        <div className="conflict-list">
          {conflicts.map((conflict) => {
            const state = resolutionState[conflict.id] ?? "open";
            return (
              <button
                className={conflict.id === selectedId ? "conflict-card active" : "conflict-card"}
                key={conflict.id}
                type="button"
                onClick={() => setSelectedId(conflict.id)}
              >
                <span>
                  <strong>{conflict.businessName}</strong>
                  <small>{conflict.ubid}</small>
                </span>
                <StatusPill
                  label={state === "open" ? conflict.risk : state}
                  tone={conflict.risk === "High" && state === "open" ? "red" : state === "accepted" ? "green" : "amber"}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel conflict-compare">
        <div className="section-heading">
          <div>
            <p className="eyeline">{selectedConflict.detectedAt}</p>
            <h3>{selectedConflict.field}</h3>
          </div>
          <StatusPill label={selectedConflict.policy} tone="violet" />
        </div>

        <div className="value-compare">
          <div>
            <span>SWS value</span>
            <strong>{selectedConflict.swsValue}</strong>
          </div>
          <ArrowRight size={18} />
          <div>
            <span>Department value</span>
            <strong>{selectedConflict.departmentValue}</strong>
          </div>
        </div>

        <div className="explain-box">
          <strong>Recommended resolution</strong>
          <p>{selectedConflict.recommendation}</p>
          <div className="source-tags">
            {selectedConflict.sources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
        </div>

        <div className="resolution-actions">
          <button className="button primary" type="button" onClick={() => setResolution("accepted")}>
            <Check size={16} />
            Accept Recommendation
          </button>
          <button className="button secondary" type="button" onClick={() => setResolution("review")}>
            <MessageSquareText size={16} />
            Route to Review
          </button>
          <button className="button secondary" type="button" onClick={() => setResolution("held")}>
            <History size={16} />
            Hold with Note
          </button>
        </div>

        {currentState !== "open" ? (
          <div className={`resolution-banner ${currentState}`}>
            {currentState === "accepted"
              ? "Resolution staged. The write will be committed with an audit marker and rollback token."
              : currentState === "review"
                ? "Conflict routed to a department operator with both source versions attached."
                : "Conflict held. Downstream writes are paused for this UBID until a note is added."}
          </div>
        ) : null}
      </div>

      <aside className="panel rollback-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Reversibility</p>
            <h3>Rollback path</h3>
          </div>
          <RotateCcw size={21} />
        </div>

        <div className="rollback-steps">
          <div>
            <span>1</span>
            <p>Store before and after values in the audit ledger.</p>
          </div>
          <div>
            <span>2</span>
            <p>Commit the selected field-level update with operation metadata.</p>
          </div>
          <div>
            <span>3</span>
            <p>Issue a rollback token for the same UBID and field path.</p>
          </div>
        </div>

        <div className="policy-note">
          <strong>{selectedConflict.reversible ? "Reversible action" : "Final action"}</strong>
          <p>
            The conflict engine keeps the source versions, policy, operator action, and transformation evidence together.
          </p>
        </div>
      </aside>
    </section>
  );
}
