import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ProductTour, type TourStep } from "./components/ProductTour";
import { serviceRequests } from "./data/syncData";
import type { ServiceRequest, TabId } from "./types";
import { AuditLedger } from "./views/AuditLedger";
import { CommandCenter } from "./views/CommandCenter";
import { ConflictDesk } from "./views/ConflictDesk";
import { ProductGuide } from "./views/ProductGuide";
import { PropagationDesk } from "./views/PropagationDesk";
import { SchemaMaps } from "./views/SchemaMaps";
import { SystemHealth } from "./views/SystemHealth";

const tourSteps: TourStep[] = [
  {
    tab: "overview",
    title: "Command Center",
    why: "This is the operating picture for consistency across SWS and connected department systems.",
    canDo: "Scan live sync health, exception pressure, topology routes, and the most urgent UBID-linked requests.",
    notice: "The key signal is whether exceptions are concentrated in conflicts, retries, or connector lag.",
  },
  {
    tab: "propagation",
    title: "Propagation Desk",
    why: "Two-way synchronisation only works when every write can be inspected and safely replayed.",
    canDo: "Filter by direction, status, UBID, or operation ID, then inspect timelines and translated payloads.",
    notice: "Replay keeps the same operation ID so duplicate writes are ignored instead of corrupting data.",
  },
  {
    tab: "schemas",
    title: "Schema Maps",
    why: "Department systems use different names, formats, and state machines, so mapping must be explicit.",
    canDo: "Review canonical fields, department paths, required coverage, and run a translation test.",
    notice: "The strongest signal is mapping coverage for required fields before a route is enabled.",
  },
  {
    tab: "conflicts",
    title: "Conflict Desk",
    why: "SYNC-LAYER prevents silent overwrites by stopping collisions at the field level.",
    canDo: "Compare SWS and department values, accept a policy recommendation, hold, or route to review.",
    notice: "Every decision keeps the source versions and a rollback path attached to the UBID.",
  },
  {
    tab: "audit",
    title: "Audit Ledger",
    why: "Government interoperability needs explainability for every state transition, not only success logs.",
    canDo: "Search operations, inspect before and after values, and prepare an evidence packet.",
    notice: "The key workflow is tracing one operation from route to payload change to result.",
  },
  {
    tab: "health",
    title: "Systems Health",
    why: "Legacy systems will not all emit events, so connector lag and queues must be visible.",
    canDo: "Inspect modes, run heartbeat checks, pause routes, and watch retry pressure by department.",
    notice: "Lag and queue depth show where missed updates or retry storms may begin.",
  },
  {
    tab: "guide",
    title: "Product Guide",
    why: "Operators need a shared runbook for onboarding routes and handling exceptions consistently.",
    canDo: "Use workflow notes, mark operating checks, and reopen this tour whenever needed.",
    notice: "The guide ties product areas to daily operating decisions rather than static documentation.",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest>(serviceRequests[0]);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  useEffect(() => {
    const hasSeenTour = window.localStorage.getItem("sync-layer-tour-complete");
    if (!hasSeenTour) {
      setTourOpen(true);
      setActiveTab(tourSteps[0].tab);
    }
  }, []);

  const openTour = () => {
    setTourIndex(0);
    setActiveTab(tourSteps[0].tab);
    setTourOpen(true);
  };

  const closeTour = () => {
    setTourOpen(false);
  };

  const finishTour = () => {
    window.localStorage.setItem("sync-layer-tour-complete", "true");
    setTourOpen(false);
  };

  const moveTour = (nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(tourSteps.length - 1, nextIndex));
    setTourIndex(boundedIndex);
    setActiveTab(tourSteps[boundedIndex].tab);
  };

  const selectRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab} onOpenTour={openTour}>
      {activeTab === "overview" ? (
        <CommandCenter selectedRequest={selectedRequest} onSelectRequest={selectRequest} />
      ) : null}
      {activeTab === "propagation" ? (
        <PropagationDesk selectedRequest={selectedRequest} onSelectRequest={selectRequest} />
      ) : null}
      {activeTab === "schemas" ? <SchemaMaps /> : null}
      {activeTab === "conflicts" ? <ConflictDesk /> : null}
      {activeTab === "audit" ? <AuditLedger /> : null}
      {activeTab === "health" ? <SystemHealth /> : null}
      {activeTab === "guide" ? <ProductGuide onOpenTour={openTour} /> : null}

      <ProductTour
        open={tourOpen}
        steps={tourSteps}
        index={tourIndex}
        onBack={() => moveTour(tourIndex - 1)}
        onNext={() => moveTour(tourIndex + 1)}
        onFinish={finishTour}
        onClose={closeTour}
      />
    </AppShell>
  );
}

export default App;
