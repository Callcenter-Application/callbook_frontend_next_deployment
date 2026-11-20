"use client";

import { useState } from "react";
import { CallControls } from "@/components/calls/CallControls";
import { Dialer } from "@/components/calls/Dialer";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader, TextLink } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Card, Panel } from "@/components/ui/Surface";
import { useCallControls } from "@/hooks/useCallControls";
import { CheckIcon, TransferIcon } from "@/icons";
import { CALL_STATUS_TONE } from "@/lib/constants";
import { OPERATOR_CALLS, OPERATOR_CALL_STATS } from "@/lib/data/calls";
import type { CallStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function OperatorLiveCalls() {
  const [ended, setEnded] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const controls = useCallControls(!ended);

  const currentStatus: CallStatus = ended ? "Ended" : controls.held ? "On hold" : controls.ivr ? "In IVR" : "On call";
  const calls = OPERATOR_CALLS.map((call, i) => (i === 0 ? { ...call, status: currentStatus } : call));

  return (
    <>
      <PageHeader title="Live calls" subtitle="Real-time call disposition">
        <CallControls
          controls={controls}
          duration={OPERATOR_CALLS[0].handle}
          onEnd={() => {
            setEnded(true);
            setTransferring(false);
            controls.reset();
          }}
        />
      </PageHeader>

      <Panel>
        <StatGrid stats={OPERATOR_CALL_STATS} />

        <div className="flex flex-wrap items-start gap-5">
          <section aria-labelledby="my-calls" className="flex min-w-0 flex-[999_1_420px] flex-col gap-3">
            <SectionHeader id="my-calls" title="My calls" action={<TextLink href="/recordings">Call history</TextLink>} />

            {ended && (
              <div role="status" className="flex items-center gap-2.5 rounded-[10px] bg-success-soft px-3.5 py-3 text-sm font-medium text-success-ink">
                <CheckIcon />
                Call ended. Add a disposition to wrap up.
              </div>
            )}

            {calls.map((call, i) => (
              <Card
                key={call.number}
                className={cn("flex flex-col gap-3 p-4", i === 0 && !ended && "shadow-[inset_3px_0_0_var(--color-accent)]")}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={call.caller} size="md" />
                  <div className="mr-auto flex min-w-0 flex-col gap-0.5">
                    <span className="text-xs font-medium tracking-[0.04em] text-muted uppercase">{call.type}</span>
                    <span className="font-semibold">{call.caller}</span>
                    <span className="font-mono text-xs text-muted">{call.number}</span>
                  </div>
                  <Badge tone={CALL_STATUS_TONE[call.status]}>{call.status}</Badge>
                </div>
                <dl className="grid grid-cols-3 gap-3 border-t border-line-soft pt-3">
                  <Metric label="Queue" value={call.queue} />
                  <Metric label="Handle time" value={call.handle} mono />
                  <Metric label="Hold time" value={call.hold} mono />
                </dl>
              </Card>
            ))}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setTransferring((v) => !v)}>
                <TransferIcon size={16} />
                {transferring ? "Cancel transfer" : "Transfer call"}
              </Button>
              {transferring && (
                <span className="text-[13px] text-muted">Dial a number or extension, then press Call to transfer.</span>
              )}
            </div>
          </section>

          <Dialer callLabel={transferring ? "Call to transfer" : "Call"} />
        </div>
      </Panel>
    </>
  );
}

function Metric({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={mono ? "font-mono text-base font-medium" : "text-sm font-medium"}>{value}</dd>
    </div>
  );
}
