import { ArrowLeft, ArrowRight, Check, Compass, X } from "lucide-react";
import type { TabId } from "../types";

export interface TourStep {
  tab: TabId;
  title: string;
  why: string;
  canDo: string;
  notice: string;
}

interface ProductTourProps {
  open: boolean;
  steps: TourStep[];
  index: number;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onClose: () => void;
}

export function ProductTour({
  open,
  steps,
  index,
  onBack,
  onNext,
  onFinish,
  onClose,
}: ProductTourProps) {
  if (!open) {
    return null;
  }

  const step = steps[index];
  const isLast = index === steps.length - 1;

  return (
    <div className="tour-backdrop" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-panel">
        <div className="tour-header">
          <div className="tour-icon" aria-hidden="true">
            <Compass size={20} />
          </div>
          <div>
            <p className="eyeline">Product tour</p>
            <h2 id="tour-title">{step.title}</h2>
          </div>
          <button className="icon-button ghost" type="button" onClick={onClose} aria-label="Close product tour">
            <X size={18} />
          </button>
        </div>

        <div className="tour-progress" aria-label={`Step ${index + 1} of ${steps.length}`}>
          {steps.map((item, stepIndex) => (
            <span
              className={stepIndex <= index ? "active" : ""}
              key={item.title}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="tour-copy">
          <section>
            <span>Why it matters</span>
            <p>{step.why}</p>
          </section>
          <section>
            <span>What you can do</span>
            <p>{step.canDo}</p>
          </section>
          <section>
            <span>Signal to notice</span>
            <p>{step.notice}</p>
          </section>
        </div>

        <div className="tour-footer">
          <button className="button secondary" type="button" onClick={onBack} disabled={index === 0}>
            <ArrowLeft size={16} />
            Back
          </button>
          <span>
            {index + 1} / {steps.length}
          </span>
          {isLast ? (
            <button className="button primary" type="button" onClick={onFinish}>
              <Check size={16} />
              Finish
            </button>
          ) : (
            <button className="button primary" type="button" onClick={onNext}>
              Next
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
