"use client";

import { ArrowRight } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import type { DnsFixTab, DnsLeakCopy } from "@/data/dns-leak-test";

import styles from "./dns-leak-diagnostic.module.css";

type DnsFixTabsProps = {
  copy: DnsLeakCopy["deviceFix"];
};

export function DnsFixTabs({ copy }: DnsFixTabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTabId, setActiveTabId] = useState<DnsFixTab["id"]>(
    copy.tabs[0]?.id ?? "windows",
  );
  const activeTab =
    copy.tabs.find((tab) => tab.id === activeTabId) ?? copy.tabs[0];

  const activateTab = (index: number) => {
    const tab = copy.tabs[index];

    if (!tab) return;

    setActiveTabId(tab.id);
    const tabElement = tabRefs.current[index];
    tabElement?.focus();
    tabElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (copy.tabs.length === 0) return;

    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % copy.tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + copy.tabs.length) % copy.tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = copy.tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateTab(nextIndex);
  };

  return (
    <div className={styles.deviceGuide}>
      <header className={styles.deviceGuideHeader}>
        <h3>{copy.title}</h3>
        <p>{copy.intro}</p>
      </header>

      {activeTab ? (
        <>
          <p className={styles.deviceTabsHint} id={`${baseId}-tabs-hint`}>
            {copy.tabsHint}
            <ArrowRight aria-hidden="true" />
          </p>
          <div
            aria-describedby={`${baseId}-tabs-hint`}
            aria-label={copy.title}
            className={styles.deviceTabs}
            role="tablist"
          >
            {copy.tabs.map((tab, index) => {
              const isActive = tab.id === activeTab.id;
              const tabId = `${baseId}-tab-${tab.id}`;
              const panelId = `${baseId}-panel-${tab.id}`;

              return (
                <button
                  aria-controls={panelId}
                  aria-selected={isActive}
                  className={styles.deviceTab}
                  id={tabId}
                  key={tab.id}
                  onClick={() => activateTab(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            aria-labelledby={`${baseId}-tab-${activeTab.id}`}
            className={styles.devicePanel}
            id={`${baseId}-panel-${activeTab.id}`}
            role="tabpanel"
            tabIndex={0}
          >
            <ol>
              {activeTab.steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : null}

      <p className={styles.deviceSourceNote}>{copy.sourceNote}</p>
    </div>
  );
}
