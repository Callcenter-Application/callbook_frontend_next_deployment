"use client";

import { useState } from "react";
import { CallControls } from "@/components/calls/CallControls";
import { CallerCell } from "@/components/Identity";
import { PageHeader } from "@/components/PageHeader";
import { TimeRangeFilter } from "@/components/TimeRangeFilter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader, TextLink } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Band, Panel } from "@/components/ui/Surface";
import { Table, Td, Th } from "@/components/ui/Table";
import { useCallControls } from "@/hooks/useCallControls";
import { CALL_STATUS_TONE } from "@/lib/constants";
import { LIVE_CALLS, SUPERVISOR_CALL_STATS } from "@/lib/data/calls";

export function SupervisorLiveCalls() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const current = activeIndex === null ? null : LIVE_CALLS[activeIndex];
  const controls = useCallControls(current !== null);

  const join = (i: number) => {
    setActiveIndex(i);
    controls.reset();
  };

  return (
    <>
      <PageHeader title="Live calls" subtitle="Real-time view of every active and waiting call">
        <TimeRangeFilter />
        <Button>Export report</Button>
      </PageHeader>

      <Band>
        <div className="mr-auto flex flex-col gap-0.5 px-2">
          <h2 className="text-base font-semibold">{current ? `Monitoring · ${current.caller}` : "No active call"}</h2>
          <span className="text-sm text-muted">
            {current
              ? `${current.queue} · with ${current.agent === "—" ? "queue" : current.agent} · Real-time call disposition`
              : "Join a call from the queue to listen in or take over"}
          </span>
        </div>
        <CallControls
          controls={controls}
          duration={current?.duration ?? "00:00"}
          onEnd={() => {
            setActiveIndex(null);
            controls.reset();
          }}
        />
      </Band>

      <Panel>
        <StatGrid stats={SUPERVISOR_CALL_STATS} />
        <SectionHeader title="Call queue" action={<TextLink href="/recordings">View all</TextLink>} />
        <Table minWidth={620}>
          <thead>
            <tr>
              <Th>Caller</Th>
              <Th>Queue</Th>
              <Th>Agent</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {LIVE_CALLS.map((call, i) => {
              const joined = activeIndex === i;
              return (
                <tr key={call.number}>
                  <Td>
                    <CallerCell caller={call.caller} number={call.number} />
                  </Td>
                  <Td>{call.queue}</Td>
                  <Td>{call.agent}</Td>
                  <Td mono>{call.duration}</Td>
                  <Td>
                    <Badge tone={CALL_STATUS_TONE[call.status]}>{call.status}</Badge>
                  </Td>
                  <Td align="right">
                    <Button size="sm" variant={joined ? "primary" : "subtle"} aria-pressed={joined} onClick={() => join(i)}>
                      {joined ? "Joined" : "Join"}
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
