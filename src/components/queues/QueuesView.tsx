"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SlaBar } from "@/components/SlaBar";
import { TimeRangeFilter } from "@/components/TimeRangeFilter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Hint, SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Band, Panel } from "@/components/ui/Surface";
import { Table, Td, Th } from "@/components/ui/Table";
import { PlusIcon } from "@/icons";
import { SLA_TARGET } from "@/lib/constants";
import { QUEUES } from "@/lib/data/queues";
import type { Queue, Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

type QueueStatus = "Active" | "Below target" | "Paused";

const STATUS: Record<QueueStatus, { tone: Tone; glyph: string }> = {
  Active: { tone: "green", glyph: "●" },
  "Below target": { tone: "orange", glyph: "▲" },
  Paused: { tone: "gray", glyph: "❚❚" },
};

const statusOf = (q: Queue, paused: boolean): QueueStatus =>
  paused ? "Paused" : q.sla < SLA_TARGET ? "Below target" : "Active";

const agentsLabel = (q: Queue) => `${q.available} available / ${q.assigned}`;

function QueueStatusBadge({ status }: { status: QueueStatus }) {
  return (
    <Badge tone={STATUS[status].tone}>
      <span aria-hidden="true">{STATUS[status].glyph}</span>
      {status}
    </Badge>
  );
}

export function QueuesView() {
  const [selected, setSelected] = useState(1);
  const [paused, setPaused] = useState<Record<string, boolean>>({ Retention: true });

  const current = QUEUES[selected];
  const currentPaused = !!paused[current.name];
  const avgSla = Math.round(QUEUES.reduce((sum, q) => sum + q.sla, 0) / QUEUES.length);

  const stats = [
    { label: "Active queues", value: `${QUEUES.filter((q) => !paused[q.name]).length}/${QUEUES.length}` },
    { label: "Calls waiting", value: String(QUEUES.reduce((sum, q) => sum + q.waiting, 0)) },
    { label: "Longest wait", value: "02:41" },
    { label: "Avg. service level", value: `${avgSla}%` },
  ];

  return (
    <>
      <PageHeader title="Queues" subtitle="Routing, staffing and service level per queue">
        <TimeRangeFilter />
        <Button>
          <PlusIcon size={16} />
          Create queue
        </Button>
      </PageHeader>

      <Band>
        <div className="mr-auto flex flex-col gap-0.5 px-2">
          <h2 className="text-lg font-semibold tracking-[-0.01em]">{current.name}</h2>
          <span className="text-sm text-muted">
            {current.waiting} waiting · longest {current.longest} · {agentsLabel(current)} agents
          </span>
        </div>
        <QueueStatusBadge status={statusOf(current, currentPaused)} />
        <span className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-3.5 text-sm text-ink-soft">
          SLA <span className="font-mono font-medium text-ink">{current.sla}%</span>
        </span>
        <Button variant="outline">Assign agents</Button>
        <Button
          variant={currentPaused ? "primary" : "light"}
          className={cn(!currentPaused && "text-ink")}
          onClick={() => setPaused((p) => ({ ...p, [current.name]: !currentPaused }))}
        >
          {currentPaused ? "Resume queue" : "Pause queue"}
        </Button>
      </Band>

      <Panel>
        <StatGrid stats={stats} />
        <SectionHeader title="All queues" action={<Hint>SLA target {SLA_TARGET}% · answered within 30 s</Hint>} />
        <Table minWidth={760}>
          <thead>
            <tr>
              <Th>Queue</Th>
              <Th>Waiting</Th>
              <Th>Longest wait</Th>
              <Th>Agents</Th>
              <Th className="w-[180px]">Service level</Th>
              <Th>Status</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {QUEUES.map((q, i) => {
              const on = selected === i;
              const isPaused = !!paused[q.name];
              return (
                <tr key={q.name} className={cn(on && "bg-tile")}>
                  <Td>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{q.name}</span>
                      <span className="text-xs text-muted">{q.priority}</span>
                    </div>
                  </Td>
                  <Td mono>{q.waiting}</Td>
                  <Td mono>{q.longest}</Td>
                  <Td>{agentsLabel(q)}</Td>
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <SlaBar name={q.name} value={q.sla} muted={isPaused} className="flex-1" />
                      <span className="w-9 text-right font-mono text-[13px] font-medium">{q.sla}%</span>
                    </div>
                  </Td>
                  <Td>
                    <QueueStatusBadge status={statusOf(q, isPaused)} />
                  </Td>
                  <Td align="right">
                    <Button size="sm" variant={on ? "primary" : "subtle"} aria-pressed={on} onClick={() => setSelected(i)}>
                      {on ? "Selected" : "Manage"}
                    </Button>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Panel>
    </>
  );
}
