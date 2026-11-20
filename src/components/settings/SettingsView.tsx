"use client";

import { useState, type ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/Segmented";
import { Band, Panel } from "@/components/ui/Surface";
import { Switch } from "@/components/ui/Switch";
import { SETTINGS_DEFAULTS, SETTINGS_TABS, SETTINGS_TOGGLES, type SettingsTab } from "@/lib/data/settings";

/** Two-column settings block: description on the left, controls on the right. */
function SettingsSection({ title, description, divided, children }: { title: string; description: string; divided?: boolean; children: ReactNode }) {
  return (
    <section className={`grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] ${divided ? "border-t border-line-soft pt-5" : ""}`}>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">{title}</h2>
        <span className="text-[13px] text-muted">{description}</span>
      </div>
      {children}
    </section>
  );
}

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

const FORMS: Partial<Record<SettingsTab, { title: string; description: string; body: ReactNode }>> = {
  General: {
    title: "General",
    description: "Company details and working hours used across CallBook.",
    body: (
      <div className={grid}>
        <Field id="company" label="Company name"><Input id="company" defaultValue="[YOUR COMPANY]" /></Field>
        <Field id="tz" label="Time zone">
          <Select id="tz" options={["America/Bogota (UTC−05:00)", "America/New_York (UTC−05:00)", "America/Mexico_City (UTC−06:00)"]} />
        </Field>
        <Field id="open" label="Opens at"><Input id="open" type="time" defaultValue="07:00" /></Field>
        <Field id="close" label="Closes at"><Input id="close" type="time" defaultValue="19:00" /></Field>
        <Field id="lang" label="Default language"><Select id="lang" options={["English", "Spanish"]} /></Field>
      </div>
    ),
  },
  "Call routing": {
    title: "Call routing",
    description: "How calls are assigned and when they overflow to another queue.",
    body: (
      <div className={grid}>
        <Field id="strategy" label="Routing strategy">
          <Select id="strategy" options={["Longest idle agent", "Round robin", "Skills-based"]} />
        </Field>
        <Field id="overflow" label="Overflow after (seconds)"><Input id="overflow" type="number" defaultValue={120} /></Field>
        <Field id="sla" label="Service level target (%)"><Input id="sla" type="number" defaultValue={80} /></Field>
        <Field id="answer" label="Answer within (seconds)"><Input id="answer" type="number" defaultValue={30} /></Field>
        <Field id="wrap" label="Wrap-up time (seconds)"><Input id="wrap" type="number" defaultValue={45} /></Field>
      </div>
    ),
  },
  Recordings: {
    title: "Recordings",
    description: "What gets recorded and how long it is kept.",
    body: (
      <Field id="retention" label="Keep recordings for" className="max-w-[320px]">
        <Select id="retention" options={["90 days", "6 months", "1 year"]} />
      </Field>
    ),
  },
};

export function SettingsView() {
  const [tab, setTab] = useState<SettingsTab>("General");
  const [toggles, setToggles] = useState(SETTINGS_DEFAULTS);
  const [status, setStatus] = useState<"idle" | "dirty" | "saved">("idle");

  const form = FORMS[tab];
  const hint =
    status === "saved" ? "All changes saved" : status === "dirty" ? "You have unsaved changes" : "Configure the platform for your team";

  return (
    <>
      <PageHeader title="Settings" subtitle={hint}>
        <Button
          variant="secondary"
          onClick={() => {
            setToggles(SETTINGS_DEFAULTS);
            setStatus("idle");
          }}
        >
          Discard
        </Button>
        <Button onClick={() => setStatus("saved")}>Save changes</Button>
      </PageHeader>

      <Band className="px-2">
        <SegmentedControl label="Settings sections" options={SETTINGS_TABS} value={tab} onChange={setTab} asTabs />
        <span className="ml-auto text-[13px] text-muted">Only administrators can change these settings</span>
      </Band>

      <Panel className="gap-6 p-6">
        {form && (
          <SettingsSection title={form.title} description={form.description}>
            {form.body}
          </SettingsSection>
        )}

        <SettingsSection
          title={tab === "Notifications" ? "Notifications" : "Options"}
          description="Turn features on or off for everyone."
          divided={!!form}
        >
          <div className="flex flex-col gap-1">
            {SETTINGS_TOGGLES[tab].map((o) => (
              <div key={o.key} className="flex items-center gap-4 border-b border-line-soft py-2.5">
                <div className="mr-auto flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{o.label}</span>
                  <span className="text-[13px] text-muted">{o.hint}</span>
                </div>
                <Switch
                  label={o.label}
                  checked={!!toggles[o.key]}
                  onChange={() => {
                    setToggles((t) => ({ ...t, [o.key]: !t[o.key] }));
                    setStatus("dirty");
                  }}
                />
              </div>
            ))}
          </div>
        </SettingsSection>
      </Panel>
    </>
  );
}
