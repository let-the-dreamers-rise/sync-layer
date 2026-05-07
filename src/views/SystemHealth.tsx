import { Activity, Gauge, Pause, Play, RefreshCw, ServerCog, Wifi } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { departmentSystems } from "../data/syncData";
import type { DepartmentSystem } from "../types";
import { compactNumber, statusTone } from "../utils";

export function SystemHealth() {
  const [selectedId, setSelectedId] = useState(departmentSystems[0].id);
  const [pausedRoutes, setPausedRoutes] = useState<string[]>([]);
  const [heartbeatRuns, setHeartbeatRuns] = useState<Record<string, number>>({});

  const selectedSystem = departmentSystems.find((system) => system.id === selectedId) ?? departmentSystems[0];
  const isPaused = pausedRoutes.includes(selectedSystem.id);

  const togglePause = (system: DepartmentSystem) => {
    setPausedRoutes((routes) =>
      routes.includes(system.id) ? routes.filter((id) => id !== system.id) : [...routes, system.id],
    );
  };

  const runHeartbeat = () => {
    setHeartbeatRuns((runs) => ({
      ...runs,
      [selectedSystem.id]: (runs[selectedSystem.id] ?? 0) + 1,
    }));
  };

  return (
    <section className="view-grid health-grid">
      <div className="panel health-map">
        <div className="section-heading">
          <div>
            <p className="eyeline">Connector mesh</p>
            <h3>Department systems</h3>
          </div>
          <ServerCog size={21} />
        </div>

        <div className="system-list">
          {departmentSystems.map((system) => (
            <button
              className={system.id === selectedId ? "system-row active" : "system-row"}
              key={system.id}
              type="button"
              onClick={() => setSelectedId(system.id)}
            >
              <span className={`health-dot ${statusTone(system.status)}`} />
              <span>
                <strong>{system.name}</strong>
                <small>{system.owner}</small>
              </span>
              <StatusPill label={pausedRoutes.includes(system.id) ? "Paused" : system.status} tone={pausedRoutes.includes(system.id) ? "neutral" : statusTone(system.status)} />
            </button>
          ))}
        </div>
      </div>

      <div className="panel health-detail">
        <div className="section-heading">
          <div>
            <p className="eyeline">{selectedSystem.mode} connector</p>
            <h3>{selectedSystem.name}</h3>
          </div>
          <StatusPill label={isPaused ? "Paused" : selectedSystem.status} tone={isPaused ? "neutral" : statusTone(selectedSystem.status)} />
        </div>

        <div className="gauge-wrap">
          <div className="big-gauge" style={{ "--gauge": `${selectedSystem.health}%` } as CSSProperties}>
            <strong>{selectedSystem.health}%</strong>
            <span>health</span>
          </div>
          <div className="health-stats">
            <div>
              <Wifi size={18} />
              <span>Lag</span>
              <strong>{selectedSystem.lag}</strong>
            </div>
            <div>
              <Activity size={18} />
              <span>Throughput</span>
              <strong>{compactNumber(selectedSystem.throughput)}/hr</strong>
            </div>
            <div>
              <Gauge size={18} />
              <span>Queue depth</span>
              <strong>{selectedSystem.queueDepth}</strong>
            </div>
          </div>
        </div>

        <div className="coverage-list">
          {selectedSystem.coverage.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="operation-actions">
          <button className="button primary" type="button" onClick={runHeartbeat}>
            <RefreshCw size={16} />
            Run Heartbeat
          </button>
          <button className="button secondary" type="button" onClick={() => togglePause(selectedSystem)}>
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
            {isPaused ? "Resume Route" : "Pause Route"}
          </button>
        </div>

        {heartbeatRuns[selectedSystem.id] ? (
          <div className="inline-success">
            <RefreshCw size={17} />
            Heartbeat completed. Last seen {selectedSystem.lastHeartbeat}; policy checked: {selectedSystem.policy}.
          </div>
        ) : null}
      </div>

      <aside className="panel queue-panel">
        <div className="section-heading">
          <div>
            <p className="eyeline">Reliability pressure</p>
            <h3>Retry posture</h3>
          </div>
          <Activity size={21} />
        </div>

        <div className="queue-bars">
          {departmentSystems.map((system) => (
            <div key={system.id}>
              <span>{system.name}</span>
              <strong>{system.queueDepth}</strong>
              <div>
                <i style={{ width: `${Math.min(system.queueDepth, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="policy-note">
          <strong>Policy in effect</strong>
          <p>{selectedSystem.policy}</p>
        </div>
      </aside>
    </section>
  );
}
