import type { Metadata } from "next";
import { StatusDonut } from "@/components/home/StatusDonut";
import { PageHeader } from "@/components/PageHeader";
import { SlaBar } from "@/components/SlaBar";
import { TimeRangeFilter } from "@/components/TimeRangeFilter";
import { ButtonLink } from "@/components/ui/Button";
import { Hint, SectionHeader, TextLink } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { StatusDot } from "@/components/ui/StatusDot";
import { Card, Panel } from "@/components/ui/Surface";
import { AlertTriangleIcon } from "@/icons";
import { SLA_TARGET } from "@/lib/constants";
import { HOME_STATS, TEAM_STATUS } from "@/lib/data/home";
import { QUEUES } from "@/lib/data/queues";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <>
      <PageHeader title="Home" subtitle="Today's operation at a glance">
        <TimeRangeFilter />
        <ButtonLink href="/live-calls">Go to live calls</ButtonLink>
      </PageHeader>

      <Panel>
        <StatGrid stats={HOME_STATS} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-4">
          <Card className="flex flex-col gap-3.5 px-5 py-[18px]">
            <SectionHeader title="Calls by status" action={<TextLink href="/live-calls">View live calls</TextLink>} />
            <StatusDonut />
          </Card>

          <Card className="flex flex-col gap-3.5 px-5 py-[18px]">
            <SectionHeader title="Service level by queue" action={<Hint>Target {SLA_TARGET}%</Hint>} />
            <div className="flex flex-col gap-3.5">
              {QUEUES.slice(0, 4).map((q) => (
                <div key={q.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="mr-auto text-sm font-medium">{q.name}</span>
                    {q.sla < SLA_TARGET && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-warning-ink">
                        <AlertTriangleIcon size={14} />
                        Below target
                      </span>
                    )}
                    <span className="font-mono text-sm font-medium">{q.sla}%</span>
                  </div>
                  <SlaBar name={q.name} value={q.sla} />
                  <span className="text-xs text-muted">
                    {q.waiting} waiting · AHT {q.aht}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section className="flex flex-col gap-3">
          <SectionHeader title="Team status" action={<TextLink href="/users">Manage users</TextLink>} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            {TEAM_STATUS.map((t) => (
              <div key={t.label} className="flex items-center gap-2.5 rounded-[10px] border border-line px-3.5 py-3">
                <StatusDot color={t.dot} size="md" />
                <span className="mr-auto text-sm">{t.label}</span>
                <span className="font-mono text-lg font-medium">{t.value}</span>
              </div>
            ))}
          </div>
        </section>
      </Panel>
    </>
  );
}
