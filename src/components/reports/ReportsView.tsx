"use client";

import { useState } from "react";
import { PersonCell } from "@/components/Identity";
import { PageHeader } from "@/components/PageHeader";
import { TimeRangeFilter } from "@/components/TimeRangeFilter";
import { Badge } from "@/components/ui/Badge";
import { Button, IconButton } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { Hint, SectionHeader, TextLink } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Band, Card, Panel } from "@/components/ui/Surface";
import { Table, Td, Th } from "@/components/ui/Table";
import { DownloadIcon, FileIcon } from "@/icons";
import type { TimeRange } from "@/lib/constants";
import {
  CALLS_PER_DAY,
  GENERATED_REPORTS,
  REPORT_FORMATS,
  REPORT_QUEUES,
  REPORT_TYPES,
  TOP_AGENTS,
} from "@/lib/data/reports";
import { CallsPerDayChart } from "./CallsPerDayChart";

const STATS = [
  { label: "Total calls", value: CALLS_PER_DAY.reduce((s, d) => s + d.value, 0).toLocaleString("en-US"), hint: "Last 7 days" },
  { label: "Answered", value: "94%", hint: "6% abandoned" },
  { label: "Avg. handle time", value: "05:24", hint: "Across all agents" },
  { label: "Avg. service level", value: "84%", hint: "Target 80%" },
];

const BUILDER_FIELDS = [
  { label: "Type", options: REPORT_TYPES },
  { label: "Queue", options: REPORT_QUEUES },
  { label: "Format", options: REPORT_FORMATS },
];

export function ReportsView() {
  const [range, setRange] = useState<TimeRange>("7 days");
  const [generated, setGenerated] = useState(false);

  const files = generated
    ? [{ name: "Call volume", meta: `All queues · ${range} · just now`, format: "PDF" }, ...GENERATED_REPORTS]
    : GENERATED_REPORTS;

  return (
    <>
      <PageHeader title="Reports" subtitle="Performance of the operation, queues and agents">
        <TimeRangeFilter value={range} onChange={setRange} />
        <Button>Export report</Button>
      </PageHeader>

      <Band className="gap-2.5 px-2">
        <span className="mr-1 text-sm font-semibold">Build a report</span>
        {BUILDER_FIELDS.map((f) => (
          <label key={f.label} className="flex items-center gap-1.5 text-[13px] text-ink-soft">
            {f.label}
            <Select compact options={f.options} />
          </label>
        ))}
        <Button variant="light" className="ml-auto" onClick={() => setGenerated(true)}>
          {generated ? "Generated ✓" : "Generate"}
        </Button>
      </Band>

      <Panel>
        <StatGrid stats={STATS} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-4">
          <Card className="flex flex-col gap-3 px-5 py-[18px]">
            <CallsPerDayChart />
          </Card>

          <Card className="flex flex-col gap-2.5 px-5 py-[18px]">
            <SectionHeader title="Top agents" action={<Hint>By calls handled</Hint>} />
            <Table minWidth={0} flush={false}>
              <thead>
                <tr>
                  <Th>Agent</Th>
                  <Th align="right">Calls</Th>
                  <Th align="right">AHT</Th>
                  <Th align="right">CSAT</Th>
                </tr>
              </thead>
              <tbody>
                {TOP_AGENTS.map((a) => (
                  <tr key={a.name}>
                    <Td className="py-2">
                      <PersonCell name={a.name} size="xs" />
                    </Td>
                    <Td align="right" mono>{a.calls}</Td>
                    <Td align="right" mono>{a.aht}</Td>
                    <Td align="right" mono>{a.csat}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>

        <section className="flex flex-col gap-2.5">
          <SectionHeader title="Generated reports" action={<TextLink href="/reports">View all</TextLink>} />
          {files.map((f) => (
            <div key={f.name + f.meta} className="flex items-center gap-3 rounded-[10px] border border-line px-3.5 py-3">
              <div className="flex size-9 flex-none items-center justify-center rounded-lg bg-surface text-link">
                <FileIcon />
              </div>
              <div className="mr-auto flex min-w-0 flex-col gap-0.5">
                <span className="font-medium">{f.name}</span>
                <span className="text-xs text-muted">{f.meta}</span>
              </div>
              <Badge className="text-ink-soft">{f.format}</Badge>
              <IconButton label={`Download ${f.name}`} className="size-10 border border-field bg-white">
                <DownloadIcon />
              </IconButton>
            </div>
          ))}
        </section>
      </Panel>
    </>
  );
}
