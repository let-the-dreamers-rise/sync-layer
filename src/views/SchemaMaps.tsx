import { Braces, CheckCircle2, GitCommitVertical, WandSparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { schemaMaps } from "../data/syncData";

export function SchemaMaps() {
  const [selectedId, setSelectedId] = useState(schemaMaps[0].id);
  const [requiredOnly, setRequiredOnly] = useState(false);
  const [testOutput, setTestOutput] = useState(false);

  const selectedSchema = schemaMaps.find((schema) => schema.id === selectedId) ?? schemaMaps[0];
  const fields = useMemo(
    () => selectedSchema.fields.filter((field) => !requiredOnly || field.required),
    [requiredOnly, selectedSchema],
  );

  return (
    <section className="view-grid schema-grid">
      <div className="panel map-list">
        <div className="section-heading">
          <div>
            <p className="eyeline">Canonical layer</p>
            <h3>Department mappings</h3>
          </div>
          <Braces size={21} />
        </div>

        {schemaMaps.map((schema) => (
          <button
            className={schema.id === selectedId ? "schema-card active" : "schema-card"}
            key={schema.id}
            type="button"
            onClick={() => {
              setSelectedId(schema.id);
              setTestOutput(false);
            }}
          >
            <span>
              <strong>{schema.department}</strong>
              <small>{schema.service}</small>
            </span>
            <span className="coverage-ring" style={{ "--coverage": `${schema.coverage}%` } as CSSProperties}>
              {schema.coverage}%
            </span>
          </button>
        ))}
      </div>

      <div className="panel schema-workbench">
        <div className="section-heading">
          <div>
            <p className="eyeline">{selectedSchema.freshness}</p>
            <h3>{selectedSchema.department}</h3>
          </div>
          <StatusPill label={`${selectedSchema.coverage}% mapped`} tone={selectedSchema.coverage > 94 ? "green" : "amber"} />
        </div>

        <div className="schema-toolbar">
          <label className="toggle-control">
            <input
              checked={requiredOnly}
              onChange={(event) => setRequiredOnly(event.target.checked)}
              type="checkbox"
            />
            <span>Required fields only</span>
          </label>
          <button className="button primary" type="button" onClick={() => setTestOutput((shown) => !shown)}>
            <WandSparkles size={16} />
            Test Translation
          </button>
        </div>

        <div className="mapping-table" role="table" aria-label="Schema mapping table">
          <div className="mapping-row header" role="row">
            <span>Canonical</span>
            <span>SWS path</span>
            <span>Department path</span>
            <span>Rule</span>
          </div>
          {fields.map((field) => (
            <div className="mapping-row" key={`${field.canonical}-${field.department}`} role="row">
              <span>
                <strong>{field.canonical}</strong>
                {field.required ? <small>required</small> : <small>optional</small>}
              </span>
              <code>{field.sws}</code>
              <code>{field.department}</code>
              <span>{field.rule}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="panel transform-preview">
        <div className="section-heading">
          <div>
            <p className="eyeline">Transform preview</p>
            <h3>Canonical bridge</h3>
          </div>
          <GitCommitVertical size={21} />
        </div>

        <div className="bridge-visual">
          <div>SWS</div>
          <span />
          <div>Canonical</div>
          <span />
          <div>{selectedSchema.department.split(" ")[0]}</div>
        </div>

        {testOutput ? (
          <div className="translation-result">
            <CheckCircle2 size={18} />
            <div>
              <strong>Translation test passed</strong>
              <p>
                Required fields are present, state transition is valid, and the generated payload keeps the UBID unchanged.
              </p>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            Run a translation test to validate field coverage before enabling a route.
          </div>
        )}

        <div className="json-preview" aria-label="Generated payload preview">
          <code>{`{
  "ubid": "KA-BLR-2026-014829",
  "serviceType": "${selectedSchema.service.toUpperCase().slice(0, 24)}",
  "route": "SWS -> ${selectedSchema.department}",
  "idempotencyKey": "op_7G3F9Q2A"
}`}</code>
        </div>
      </aside>
    </section>
  );
}
