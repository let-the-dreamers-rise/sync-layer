import { HelpCircle, Menu, Search, ShieldCheck, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { navItems } from "../data/syncData";
import type { TabId } from "../types";

interface AppShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenTour: () => void;
  children: ReactNode;
}

export function AppShell({ activeTab, onTabChange, onOpenTour, children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeItem = navItems.find((item) => item.id === activeTab) ?? navItems[0];

  const changeTab = (tab: TabId) => {
    onTabChange(tab);
    setMobileNavOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "open" : ""}`} aria-label="Primary navigation">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            SL
          </div>
          <div>
            <strong>SYNC-LAYER</strong>
            <span>Interoperability OS</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = item.id === activeTab;
            return (
              <button
                className={selected ? "nav-item active" : "nav-item"}
                key={item.id}
                type="button"
                onClick={() => changeTab(item.id)}
                aria-current={selected ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="trust-chip">
            <ShieldCheck size={17} />
            <span>UBID-controlled writes</span>
          </div>
          <button className="button full secondary" type="button" onClick={onOpenTour}>
            <HelpCircle size={16} />
            Product Tour
          </button>
        </div>
      </aside>

      <div className="mobile-topbar">
        <button
          className="icon-button"
          type="button"
          onClick={() => setMobileNavOpen((open) => !open)}
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="brand-lockup compact">
          <div className="brand-mark" aria-hidden="true">
            SL
          </div>
          <strong>SYNC-LAYER</strong>
        </div>
        <button className="icon-button" type="button" onClick={onOpenTour} aria-label="Open product tour">
          <HelpCircle size={19} />
        </button>
      </div>

      {mobileNavOpen ? (
        <button className="scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />
      ) : null}

      <main className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyeline">Karnataka Commerce & Industry</p>
            <h1>{activeItem.label}</h1>
            <p>{activeItem.description}</p>
          </div>
          <div className="header-actions">
            <label className="global-search">
              <Search size={17} />
              <input type="search" placeholder="Search UBID, operation ID, or department" />
            </label>
            <button className="button secondary desktop-only" type="button" onClick={onOpenTour}>
              <HelpCircle size={16} />
              Product Tour
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
