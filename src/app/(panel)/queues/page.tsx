import type { Metadata } from "next";
import { QueuesView } from "@/components/queues/QueuesView";

export const metadata: Metadata = { title: "Queues" };

export default function QueuesPage() {
  return <QueuesView />;
}
