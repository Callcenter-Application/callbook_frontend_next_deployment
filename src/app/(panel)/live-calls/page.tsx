import type { Metadata } from "next";
import { LiveCallsView } from "@/components/calls/LiveCallsView";

export const metadata: Metadata = { title: "Live calls" };

export default function LiveCallsPage() {
  return <LiveCallsView />;
}
