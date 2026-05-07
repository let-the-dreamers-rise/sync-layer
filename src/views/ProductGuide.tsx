import { BookOpenCheck, CheckCircle2, Compass, Layers3, ListChecks } from "lucide-react";
import { useMemo, useState } from "react";
import { guideSections, navItems } from "../data/syncData";

interface ProductGuideProps {
  onOpenTour: () => void;
}

const checklist = [
  "Confirm the UBID appears in both source and target systems.",
  "Check the canonical payload before replaying a failed operation.",
  "Resolve field conflicts before opening high-volume retries.",
  "Export an audit packet for any operator-approved override.",
  "Review connector lag after onboarding a new department route.",
];

export function ProductGuide({ onOpenTour }: ProductGuideProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const progress = useMemo(() => Math.round((completed.length / checklist.length) * 100), [completed.length]);

  const toggleItem = (item: string) => {
    setCompleted((items) => (items.includes(item) ? items.filter((value) => value !== item) : [...items, item]));
  };

  return (
    <section className="guide-view">
      <div className="guide-hero">
        <div>
          <p className="eyeline">Operator onboarding</p>
          <h2>Use SYNC-LAYER as the control room for deterministic government-system consistency.</h2>
          <p>
            The console is arranged around the work operators perform daily: finding propagation issues, validating schema rules, resolving collisions, and proving every state transition.
          </p>
          <button className="button primary" type="button" onClick={onOpenTour}>
            <Compass size={16} />
            Restart Product Tour
          </button>
        </div>
        <div className="guide-progress">
          <span>{progress}%</span>
          <strong>Readiness checklist</strong>
          <p>{completed.length} of {checklist.length} operating checks marked complete.</p>
        </div>
      </div>

      <div className="guide-grid">
        <div className="panel guide-sections">
          <div className="section-heading">
            <div>
              <p className="eyeline">How the product is organised</p>
              <h3>Workflow guide</h3>
            </div>
            <BookOpenCheck size={21} />
          </div>

          {guideSections.map((section) => (
            <article className="guide-section" key={section.title}>
              <h4>{section.title}</h4>
              <p>{section.summary}</p>
              <div className="guide-columns">
                <div>
                  <span>Signals</span>
                  {section.signals.map((signal) => (
                    <small key={signal}>{signal}</small>
                  ))}
                </div>
                <div>
                  <span>Actions</span>
                  {section.actions.map((action) => (
                    <small key={action}>{action}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="panel guide-checklist">
          <div className="section-heading">
            <div>
              <p className="eyeline">Operational checklist</p>
              <h3>Runbook markers</h3>
            </div>
            <ListChecks size={21} />
          </div>

          <div className="checklist">
            {checklist.map((item) => {
              const checked = completed.includes(item);
              return (
                <label className={checked ? "check-item checked" : "check-item"} key={item}>
                  <input checked={checked} onChange={() => toggleItem(item)} type="checkbox" />
                  <span>
                    <CheckCircle2 size={17} />
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="panel nav-reference">
        <div className="section-heading">
          <div>
            <p className="eyeline">Information architecture</p>
            <h3>Where to go for each job</h3>
          </div>
          <Layers3 size={21} />
        </div>
        <div className="nav-reference-grid">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id}>
                <Icon size={18} />
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
