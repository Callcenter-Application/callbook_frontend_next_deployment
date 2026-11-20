"use client";

import { useState } from "react";
import { CallerCell } from "@/components/Identity";
import { PageHeader } from "@/components/PageHeader";
import { TimeRangeFilter } from "@/components/TimeRangeFilter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/Segmented";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Panel } from "@/components/ui/Surface";
import { Table, Td, Th } from "@/components/ui/Table";
import { REVIEW_TONE } from "@/lib/constants";
import { RECORDINGS } from "@/lib/data/recordings";
import type { ReviewStatus } from "@/lib/types";
import { cn, countBy } from "@/lib/utils";
import { PlayerBar } from "./PlayerBar";

type Filter = "All" | ReviewStatus;

const FILTERS = (["All", "Pending", "Reviewed", "Flagged"] as const).map((value) => ({
  value: value as Filter,
  count: value === "All" ? RECORDINGS.length : countBy(RECORDINGS, "review", value),
}));

const STATS = [
  { label: "Recordings today", value: "286" },
  { label: "Avg. length", value: "05:12" },
  { label: "Reviewed", value: "41%" },
  { label: "Flagged", value: String(countBy(RECORDINGS, "review", "Flagged")) },
];

export function RecordingsView() {
  const [filter, setFilter] = useState<Filter>("All");
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const rows = RECORDINGS.map((rec, index) => ({ ...rec, index })).filter(
    (rec) => filter === "All" || rec.review === filter,
  );

  return (
    <>
      <PageHeader title="Recordings" subtitle="Listen to, review and flag recorded calls">
        <TimeRangeFilter />
        <Button>Export list</Button>
      </PageHeader>

      <PlayerBar recording={RECORDINGS[current]} playing={playing} onTogglePlay={() => setPlaying((p) => !p)} />

      <Panel>
        <StatGrid stats={STATS} />
        <SectionHeader
          title="Recorded calls"
          action={
            <SegmentedControl label="Filter by review status" tone="surface" options={FILTERS} value={filter} onChange={setFilter} />
          }
        />
        <Table minWidth={760}>
          <thead>
            <tr>
              <Th>Caller</Th>
              <Th>Agent</Th>
              <Th>Queue</Th>
              <Th>Date</Th>
              <Th>Length</Th>
              <Th>Review</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((rec) => {
              const on = current === rec.index;
              return (
                <tr key={rec.index} className={cn(on && "bg-tile")}>
                  <Td>
                    <CallerCell caller={rec.caller} number={rec.number} />
                  </Td>
                  <Td>{rec.agent}</Td>
                  <Td>{rec.queue}</Td>
                  <Td className="text-ink-soft">{rec.date}</Td>
                  <Td mono>{rec.length}</Td>
                  <Td>
                    <Badge tone={REVIEW_TONE[rec.review]}>{rec.review}</Badge>
                  </Td>
                  <Td align="right">
                    <Button
                      size="sm"
                      variant={on ? "primary" : "subtle"}
                      aria-pressed={on}
                      onClick={() => {
                        setCurrent(rec.index);
                        setPlaying(true);
                      }}
                    >
                      {on && playing ? "Playing" : "Play"}
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
